import mongoose from "mongoose";

const {Schema} = mongoose;

export const cartCollecion = 'cart';

const cartSchema = new Schema({
    products:{
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity:{
                    type: Number,
                    default: 1,
                    required: true
                }
            }
        ],
        default: [],
        required: true
    }
});


cartSchema.pre('findById', function(){
    this.populate('product')
})

cartSchema.pre('find', function(){
    this.populate('products.product')
})

cartSchema.pre('findOne', function(){
    this.populate('products.product')
})


const cartModel = mongoose.model(cartCollecion, cartSchema);
export default cartModel;