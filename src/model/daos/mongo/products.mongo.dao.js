import MongoManager from "../../db/mongo/mongo.manager.js";
import productModel from "../../schemas/products.schema.js"

export class ProductMongoDao {
    
    
    constructor(){
        MongoManager.connect();
    }
    
    async getAll({limit, page, query, sort}) {
        let filter
        if(!query){
            filter =  {}
        }else if(query == 'true'){
            filter = {status: true}
        }else if(query == 'false'){
            filter = {status: false}
        }else{
            filter = {category: query}
        }
        const options = {
            sort: (sort ? {price: sort} : {}),
            limit: limit || 10,
            page: page || 1,
            lean: true
        }
        const products = await productModel.paginate(filter,options)
        return products
    }

     async getById(id) {
        const product = await productModel.findById(id)
        return product
    }

    async add(product) {
        await productModel.create(product)
        console.log(`${product.title} added`)
        const newProduct = {
            status: product.status || true,
            files: product.files || [],
            ...product
        }
        return newProduct
    }

    async updateById(id, product) {
        console.log(product);
        const updatedProduct = await productModel.updateOne({_id: id}, product)
        console.warn(`${product.title ?? 'product'} modified`)
        return updatedProduct
    }

    async delete(id) {
        const deletedProduct = await productModel.deleteOne({_id: id})
        console.warn(`product deleted`)
        return deletedProduct   
    }

}

