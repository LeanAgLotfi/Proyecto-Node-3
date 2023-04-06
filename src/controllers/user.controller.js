import getDaos from "../model/daos/daos.factory.js";
import {apiSuccessResponse} from '../utils/api.utils.js'

const { usersDao } = getDaos();

class usersController{

    static async getAll(req,res,next){
        try{
            const user = await usersDao.getAll()
            const apiSuccess = apiSuccessResponse(user)
            return res.status(200).json(apiSuccess)
        }catch(error){
            next(error);
        }
    }

    static async getById ( req, res, next){
        const { uid } = req.params
        try{
            const userid = await usersDao.getById(uid)
            if(!userid){
                throw new Error(404,'user not found')
            }
            const response = apiSuccessResponse(userid)
            return res.status(200).json(response)
        }catch(error){
            next(error)
        }
    }

    static async addUser(req, res, next){
        const newUser = req.body;
        try{
           const addUser = await usersDao.addUser(newUser);
           const response = apiSuccessResponse(addUser)
           return res.status(201).json(response)
        }catch(error){
            next(error);
        }
    }

    static async updateUser(req, res, next){
        const user = req.body
        const {uid} = req.params
        try{
           const update = await usersDao.updateUser(uid, user)
           if(!update){
            throw new Error(404, 'user not found')
           }
           const response = apiSuccessResponse(update)
           return res.status(200).json(response)
                 
        }catch(error){
            next(error);
        }
    }

    static async deleteUser(req, res, next){
        const {uid} = req.params
        try{
            const deleteUser = usersDao.deleteUser(uid)
            const response = apiSuccessResponse(deleteUser)
            return res.status(200).json(response)
          
        }catch(error){
            next(error)
        }
    }

}

export default usersController;