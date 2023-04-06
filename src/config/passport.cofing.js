import passport from 'passport'
import local from 'passport-local'
import github from 'passport-github2'
import jwt from 'passport-jwt'
import { createHash, isValidPassword } from '../utils/bcryp.utils.js'
import getDaos from '../model/daos/daos.factory.js'
import { cookieExtractor } from '../utils/session.util.js'
import { SECRET_KEY } from '../constants/sessionsKey.js'
import ENV_CONFIG from './enviroment.config.js'


const { cartDao, userDao } = getDaos()

const LocalStrategy = local.Strategy
const GithubStrategy = github.Strategy
const JwtStrategy = jwt.Strategy

const ExtractJWT = jwt.ExtractJwt

const initializePassport = () =>{
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
                const user = await userDao.getByEmail(username)
                const cart = await cartDao.add()
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
                if(req.file){
                    const paths = {
                        path: req.file.path,
                        originalName: req.file.originalname  
                        }  
                    newUser.profilePic = paths
                } 
                let result = await userDao.addUser(newUser)
                return done(null, result)
            } catch (error) {
                return done('Error getting user: ' + error)
            }
        }

    )),

    //Local Login
    passport.use('login', new LocalStrategy(
        {usernameField: 'email'},
        async(username, password, done) =>{
            try {
                if(username === ENV_CONFIG.ADMIN_NAME && password === ENV_CONFIG.ADMIN_PASSWORD){
                    const user = {
                        firstName: 'Admin',
                        lastName: 'Coder',
                        email: ENV_CONFIG.ADMIN_NAME,
                        password: ENV_CONFIG.ADMIN_PASSWORD,
                        role: 'admin'
                    }
                    return done(null, user)
                }
                const user = await userDao.getByEmail(username)
                if(!user){
                    return done(null, false, 'user not found')
                }
                if(!isValidPassword(user, password)){
                    return done(null, false, 'wrong user or password')
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ))

    //Github Strategy
    passport.use(
        new GithubStrategy({
            clientID: 'Iv1.27cc1d5f10913cbd',
            clientSecret: '132c834b8386c66fd58118575f9672025db833b1',
            callbackURL: 'http://localhost:8080/api/session/github/callback'
        },
        async (accessToken, refreshToken, profile, done)=>{
            const userData = profile._json
            try {
                const user = await userDao.getByEmail(userData.email)
                if(!user){
                    const cart = await cartDao.add()
                    const newUser = {
                        firstName: userData.name.split(' ')[0],
                        lastName: userData.name.split(' ')[1],
                        age: userData.age || 0,
                        email: userData.email || ' ',
                        password: ' ',
                        githubLogin: userData.login,
                        cart: cart._id
                    }
                    const response = await userDao.addUser(newUser)
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
        secretOrKey: SECRET_KEY
    }, async (jwt_payload, done) =>{
        try {
            return done(null, jwt_payload)
        } catch (error) {
            return done(error)
        }
    }
    ))
}

passport.serializeUser((user, done) => {
    done(null, user._id);
});
  
passport.deserializeUser(async (id, done) => {
    const user = await userDao.getById(id)
    done(null, user);
});

export default initializePassport