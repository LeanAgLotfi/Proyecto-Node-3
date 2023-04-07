import passport from 'passport'
import local from 'passport-local'
import github from 'passport-github2'
import jwt from 'passport-jwt'

import { createHash, isValidPassword } from '../utils/bcryp.utils.js'
import {getDaos} from '../model/daos/daos.factory.js'
import { cookieExtractor } from '../utils/session.util.js'
import ENV_CONFIG from './enviroment.config.js'
import { USER_ROLES } from '../constants/userRoles.constants.js'
import { HTTP_STATUS } from '../constants/api.constants.js'


const { cartsDao, usersDao } = getDaos()

const LocalStrategy = local.Strategy
const GithubStrategy = github.Strategy
const JwtStrategy = jwt.Strategy

const ExtractJWT = jwt.ExtractJwt

export const initializePassport = () =>{
    //Local Register
    passport.use('register', new LocalStrategy(
        {
            passReqToCallback: true,
            usernameField: 'email'
        },
        async (req, username, password, done)=>{
            const { firstName, lastName, email, age } = req.body
            if(!firstName || !lastName || !age || !email || !password){
                console.log('missing fields');
                return done(null, false)
            }
            try {
                const user = await usersDao.getByEmail(username)
                const cart = await cartsDao.add()
                if(user){
                    const message = 'User already exist'
                    console.log(message);
                    return done(null, false, {message})
                }
                const newUser = {
                    firstName,
                    lastName, 
                    email,
                    age,
                    password: createHash(password),
                    cart: cart._id,
                }
                let result = await usersDao.create(newUser)
                const access_token = generateToken(result);
                        res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
                          maxAge: 60 * 60 * 60 * 24 * 1000,
                          httpOnly: true
                        });
                        const response = apiSuccessResponse("User created in successfully!");
                        console.log(response);
                        return res.redirect('/products');
            } catch (error) {
                return done('Error getting user: ' + error)
            }
        }

    )),

    //Github Strategy
    passport.use(
        new GithubStrategy({
            clientID: 'Iv1.27cc1d5f10913cbd',
            clientSecret: '132c834b8386c66fd58118575f9672025db833b1',
            callbackURL: 'http://localhost:8080/api/session/github/callback'
        },
        async (_accessToken, _refreshToken, profile, done)=>{
            const userData = profile._json
            try {
                const user = await usersDao.getByEmail(userData.email)
                if(!user){
                    const cart = await cartsDao.add()
                    const newUser = {
                        firstName: userData.name.split(' ')[0],
                        lastName: userData.name.split(' ')[1],
                        age: userData.age || 0,
                        email: userData.email,
                        password: null,
                        role: USER_ROLES.USER,
                        githubLogin: userData.login,
                        cart: cart._id
                    }
                    const response = await usersDao.create(newUser)
                    const finalUser = response._doc
                    done(null, finalUser)
                    return
                }
                done(null, user)
            } catch (error) {
                console.log('Github login error: ' + error);
                done(error)
            }
        }
    ))

    // JWT
    passport.use('jwt', new JwtStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: ENV_CONFIG.SECRET_KEY
    }, async (jwt_payload, done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

const passportCall = (strategy, options = {}) => {
    return async (req, res, next) => {
      await passport.authenticate(
        strategy, 
        { session: false, ...options }, 
        (error, user, info) => {
          if (error) {
            return next(error);
          }
          if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({ error: info.messages ?? `${info}`})
          }
          req.user = user;
          next();
        }
      )(req, res, next);
    }
}


passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
    const user = await usersDao.getById(id)
    done(null, user);
});

export default passportCall;
