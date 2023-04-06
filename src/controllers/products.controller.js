import getDaos from "../model/daos/daos.factory.js";
import { apiSuccessResponse } from '../utils/api.utils.js';
import ProductsServices from "../services/products.services.js";

const productsServices = new ProductsServices();

class productController{

    static async getAll(req, res, next){
        const filter = req.query;
        try{
            const products = await productsServices.getProducts(filter)
            const response = apiSuccessResponse(products);
            res.status(200).json(response);
        }catch(error){
            next(error);
        }
    }

    static async getById(req, res, next){
        const {pid} = req.params
        try{
            const product = await productsServices.getProductById(pid)
            const response = apiSuccessResponse({product})
            res.status(200).json(response);
        }catch(error){
            next(error)
        }
    }

    static async addProduct(req, res, next){
        const productPayload = req.body
        const { files }= req // hay que ver los archivos que llegan por el body
        try{
            const addProduct = await productsServices.createProduct(productPayload, files) //lo mismo aca
            const response = apiSuccessResponse(addProduct)
            res.status(200).json(response)
        }catch(error){
            next(error)
        }
    }

    static async updateProduct(req, res, next ){
        const {pid} = req.params
        const productPayload = req.body
        try{
            const updateProd = await productsServices.updateProduct(pid, productPayload)
            const response = apiSuccessResponse(updateProd)
            res.status(200).json(response)
        }catch(error){
            next(error);
        }
    }

    static async deleteProduct(req, res, next){
        const {pid} = req.params
        try{
            const deleteProduct = await productsServices.deleteProduct(pid)
            const response = apiSuccessResponse(deleteProduct)
            res.status(200).json(response)
        }catch(error){
            next(error)
        }

    }
}

export default productController;