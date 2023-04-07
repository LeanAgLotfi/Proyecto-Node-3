import {getDaos} from "../model/daos/daos.factory.js";

const { productsDao } = getDaos();

class ProductsServices{

    async getProducts(filter = {}) {
        const products = await productsDao.getAll(filter)
        const productsPayload ={
            status: 'success',
            payload: products.docs,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage,
            prevLink: null,
            nexLink: null
        }
        return productsPayload
    }

    async getProductsById(pid){
        if(!pid){
            throw new Error(400, 'Misings Field')
        }
        const product = await productsDao.getById(pid)
        if(!product){
            throw new Error(404, 'Product not found')
        }
        return product
    }

    async createProduct(productPayload, files){
        const { title, description, code, stock, price, category } = productPayload
        if(!title || !description || !code || !stock || !price || !category){
            throw new Error(400, 'Please, include the all fields')
        }   
        if(files){
            const paths = files.map(file => {
                return {
                    path: file.path,
                    originalName: file.originalname  
                }  //es un map de los files que llegan 
            })
            productPayload.files = paths
        }else{
            productPayload.files = []
        }
        const newProduct = productsDao.add(productPayload)
        return newProduct;
    }

    async updateProduct(pid, productPayload){
        if(!pid || !productPayload){
            throw new Error(400 ,'Missing id or product')
        }
        const product = await productsDao.getById(pid);
        if(!product){
            throw new Error(404, 'Product Not found')
        }
        const updateProduct = await productPayload.updateById(pid, productPayload)
        return updateProduct;
    }

    async deleteProduct(pid){
        if(!pid){
            throw new Error(404, 'Wrong ID')
        }
        const deleteProduct = await productsDao.delete(pid)
        return deleteProduct;
    }
}

export default ProductsServices;