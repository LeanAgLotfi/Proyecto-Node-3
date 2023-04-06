import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const { Schema } = mongoose;
export const userCollecion = 'user';

const userSchema = new Schema({

    firstName:{
        type:String,
        required:true
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
        unique:true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    },
    cart:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'cart',
        require:true
    },
    profilePic:{
        type: Object
    }
});

userSchema.plugin(mongoosePaginate);
const userModel = mongoose.model(userCollecion, userSchema);

export default userModel;