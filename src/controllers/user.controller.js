import { HTTP_STATUS } from "../constants/api.constants.js";
import {getDaos} from "../model/daos/daos.factory.js";
import {apiSuccessResponse} from '../utils/api.utils.js'
import { HttPError } from "../utils/error.js";

const { usersDao } = getDaos();

class usersController{

    static async getAll(req,res,next){
        try{
            const users = await usersDao.getAll()
            const response = apiSuccessResponse(users)
            return res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next(error);
        }
    }

    static async getById ( req, res, next){
        const { uid } = req.params
        try{
            const userid = await usersDao.getById(uid)
            if(!userid){
                throw new HttPError(HTTP_STATUS.NOT_FOUND,'user not found')
            }
            const response = apiSuccessResponse(userid)
            return res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next(error)
        }
    }

    static async create(req, res, next){
        const newUser = req.body;
        try{
           const addUser = await usersDao.create(newUser);
           const response = apiSuccessResponse(addUser)
           return res.status(HTTP_STATUS.CREATED).json(response)
        }catch(error){
            next(error);
        }
    }

    static async updateById(req, res, next){
        const user = req.body
        const {uid} = req.params
        try{
           const update = await usersDao.updateById(uid, user)
           if(!update){
            throw new HttPError(HTTP_STATUS.NOT_FOUND, 'user not found')
           }
           const response = apiSuccessResponse(update)
           return res.status(HTTP_STATUS.OK).json(response)
                 
        }catch(error){
            next(error);
        }
    }

    static async deleteUser(req, res, next){
        const {uid} = req.params
        try{
            const deleteUser = usersDao.deleteUser(uid)
            if (!deleteUser) {
                throw new HttPError(HTTP_STATUS.NOT_FOUND, 'User not found');
              }
            const response = apiSuccessResponse(deleteUser)
            return res.status(HTTP_STATUS.OK).json(response)
          
        }catch(error){
            next(error)
        }
    }

}

export default usersController;

