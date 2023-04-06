import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
const {Schema} = mongoose;

export const productsCollecion = 'products';

const productsSchema = new Schema({
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true
    },
    code: { 
        type: String, 
        required: true, 
        unique: true
    },
    price: { 
        type: Number, 
        required: true
    },
    stock: { 
        type: Number, 
        required: true
    },
    category: { 
        type: String, 
        required: true
    },
    status: {
        type: Boolean,
        default: true
    },
    files:{
        type: [],
        default: []
    }
});

productsSchema.plugin(mongoosePaginate);
const productModel = mongoose.model(productsCollecion, productsSchema);
export default productModel;