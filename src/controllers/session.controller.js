import {apiSuccessResponse} from '../utils/api.utils.js';
import {generateToken} from '../utils/session.util.js';

export class sessionController{

    static async login(req,res,next){
        const user = req.user;
        try {
            if(!user){
                throw new Error(404, 'User Not Found')
            }
            const access_token = generateToken(user);
            res.cookie(SESSION_KEY, access_token, {
              maxAge: 60 * 60 * 24 * 1000,
              httpOnly: true
            });
            const response = apiSuccessResponse("User logeado con login");
        } catch (error) {
            next(error)
        }
    }

    static async loginGitHub(req,res,next){
        const user = req.user;
        const access_token = generateToken(user);
        res.cookie(SESSION_KEY, access_token, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true
        });
        const response = apiSuccessResponse("User logeado con github!");
            res.json(response);
             return res.redirect('/products');
    }

    
    static async logout(req, res, next){
        try {
            res.clearCookie(SESSION_KEY);
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
