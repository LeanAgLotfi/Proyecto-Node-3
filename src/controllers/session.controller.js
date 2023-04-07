import ENV_CONFIG from '../config/enviroment.config.js';
import { HTTP_STATUS } from '../constants/api.constants.js';
import { getDaos } from '../model/daos/daos.factory.js';
import {apiSuccessResponse} from '../utils/api.utils.js';
import { HttPError } from '../utils/error.js';
import {generateToken} from '../utils/session.util.js';

const {usersDao} = getDaos()
export class sessionController{

    // static async register(req, res, next) {
    //     const { firstName, lastName, email, age } = req.body
    //     if(!firstName || !lastName || !age || !email || !password){
    //         console.log('missing fields');
    //         return done(null, false)
    //     }
    //     try {
    //         const user = await usersDao.getByEmail(username)
    //         const cart = await cartsDao.add()
    //         if(user){
    //             const message = 'User already exist'
    //             console.log(message);
    //             return done(null, false, {message})
    //         }
    //         const newUser = {
    //             firstName,
    //             lastName, 
    //             email,
    //             age,
    //             password: createHash(password),
    //             cart: cart._id,
    //         }
    //         let result = await usersDao.create(newUser)
    //         const access_token = generateToken(result);
    //         res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
    //           maxAge: 60 * 60 * 60 * 24 * 1000,
    //           httpOnly: true
    //         });
    //         const response = apiSuccessResponse("User created in successfully!");
    //         console.log(response);
    //         return res.redirect('/products');
    //     } catch (error) {
    //         next(error)
    //     }
    //   }

    static async login(req, res, next) {
        const { email, password } = req.body;
        try {
          const user = await usersDao.getByEmail(email);
          if (!user || user.password !== password) {
            throw new HttPError(HTTP_STATUS.BAD_REQUEST, "Wrong email or password");
          }
          const access_token = generateToken(user);
          res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
            maxAge: 60 * 60 * 60 * 24 * 1000,
            httpOnly: true
          });
          const response = apiSuccessResponse("User logued in successfully!");
          console.log(response);
          return res.redirect('/products');
        }
        catch(error) {
          next(error);
        }
      }

    static async loginGitHub(req,res,next){
        const user = req.user;
        const access_token = generateToken(user);
        res.cookie(ENV_CONFIG.SESSION_KEY, access_token, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
        });
        const response = apiSuccessResponse("User logeado con github!");
            res.json(response);
             return res.redirect('/products');
    }

    
    static async logout(req, res, next){
        try {
            res.clearCookie(ENV_CONFIG.SESSION_KEY);
            res.redirect('/');
        } catch (error) {
            next(error) 
        }
    }

    static async currentSession(req, res, next){
        const response = apiSuccessResponse(req.user);
        return res.json(response);
    }

}
