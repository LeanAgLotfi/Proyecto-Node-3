import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { USER_ROLES } from "../../constants/userRoles.constants.js";

const { Schema } = mongoose;
export const userCollecion = 'user';

const userSchema = new Schema({    

    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String
    },
    email:{
        type:String, 
        unique:true,
        required:true
    },
    age:{
        type:Number
    },
    password:{
        type:String
    },
    githubLogin:{
        type:String,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: 'user',
        required: true
    },
    cart:{
        type: Schema.Types.ObjectId,
        ref:'cart',
        require:true
    }
});

userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model(userCollecion, userSchema);

export default userModel;