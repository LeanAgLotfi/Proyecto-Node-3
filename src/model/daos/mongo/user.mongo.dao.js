import MongoManager from "../../db/mongo/mongo.manager.js"
import userModel from "../../schemas/user.schema.js"

export class UserMongoDao {
    
constructor(){
    MongoManager.connect();
}

    async getAll() {
        const { limit = 20, page = 1 } = filter;
        const users = await userModel.paginate({}, { limit, page });
        return users
    }

    async getById(id){
        const user = await userModel.findById(id, { __v: false }).populate('cart').lean();
        return user
    }

    async getByEmail(email){
        const user = await userModel.findOne({ email }, { __v: false }).lean();
        return user
    }

    async create(payload){
        const newUser = await userModel.create(payload)
        console.log('New user created')
        return newUser
    }

    async updateById(id, payload){
        const updatedUser = await userModel.findByIdAndUpdate((id, payload, { new: true }))
        console.log('User updated')
        return updatedUser
    }

    async deleteUser(id) {
        const deletedUser = await userModel.findByIdAndDelete(id);
        return deletedUser;
      }
}

