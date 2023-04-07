import { HTTP_STATUS } from "../constants/api.constants.js";
import CartServices from "../services/cart.services.js";
import {apiSuccessResponse} from '../utils/api.utils.js'

const cartsServices = new CartServices()

class cartController{

static async getAll(req, res, next){
    try {
        const cart = await cartsServices.getCarts()
        const response = apiSuccessResponse(cart)
        res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
        next(error)
    }
}

static async getById(req, res, next){
    const {cid} = req.params
    try {
    const cart = await cartsServices.getCartId(cid)
    const response = apiSuccessResponse(cart)
    res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
        next(error)
    }
}

static async addCart(req, res, next){
    try {
        const cart = await cartsServices.createCart()
        const response = apiSuccessResponse(cart)
        res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
        next(error)
    }
}

static async addProduct(req, res, next){
    try {
        const { cid, pid } = req.params
        const amount = +req.body?.amount || 1
        const cart = await cartsServices.addToCart(cid, pid, amount)
        const response = apiSuccessResponse(cart)
        res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
        next(error)
    }
}

static async removeProduct(req, res, next){
    const { cid, pid } = req.params
    try {
        const cart = await cartsServices.deleteProduct(cid, pid)
        const response = apiSuccessResponse(cart)
        res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
        next(error)
    }
}

static async clearCart(req, res, next){
    const { cid }= req.params
    try {
        const cart = await cartsServices.deleteAllCart(cid)
        const response = apiSuccessResponse(cart)
        res.status(HTTP_STATUS.OK).json(response)
    } catch (error) {
    next(error)
    }
}

}

export default cartController;