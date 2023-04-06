import MongoManager from "../../db/mongo/mongo.manager.js";
import cartModel from "../../schemas/cart.schema.js"

export class CartMongoDao {

    
    constructor(){
        MongoManager.connect();
    }
    

    async getAll() {
        const carts = await cartModel.find()
        return carts
    }

    async getById(id) {
        const cart = await cartModel.findById(id).lean()
        return cart
    }

    async add(){
        const newCart = await cartModel.create({})
        console.log('New cart created')
        return newCart
    }

    async addProductToCart(cid, pid, amount){
        const updatedCart = await cartModel.findByIdAndUpdate(cid, {
            $push: {
                products: {
                    product: pid,
                    quantity: amount
                }
            }
        })
        console.log(`product ${productId} added to cart`)
        return updatedCart
    }

    async updateCart(cid, payload){
        const updatedCart = await cartModel.findByIdAndUpdate(cid, payload)
        return updatedCart
    }

    async deleteProductFromCart(cid, pid){
        const cart = cartModel.updateOne({ _id: cid}, {$pull: {products: {product: {_id: pid}}}})
        console.warn(`product ${pid} deleted from cart`)
        return cart
    }

    async deleteAllProducts(cid){
        const emptyCart = cartModel.updateOne({ _id: cid}, {$pull: {products: {}}})
        console.log(`cart empty`)
        return emptyCart
    }
}

