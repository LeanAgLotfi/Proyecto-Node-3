import {getDaos} from "../model/daos/daos.factory.js";

const { productsDao, cartDao} = getDaos();

export class vistasController{


    static async register(req, res, next) {
        res.render('register', {
            title: 'Pagina de Registro!',
            styles: 'registro.css'
        })
    }

    static async login(req, res, next) {
        res.render('login', {
            title: 'Logueate!',
            styles: 'login.css'
        })
    }

    static async products(req, res, next) {
        const user = req.user
        try {
            const products = await productsDao.getAll(req.query)
            res.render('index', {
                title: "Api products",
                styles:"index.css",
                products: products.docs,
                user: user
            })
        } catch (error) {
            res.status(500).send({
                status: "error",
                error: error.message
            })
        }
    }

    static async recover(req, res, next) {
        res.render('recover', {
            title: 'Recover your password',
            styles: 'index.css'
        })
    }


    static async cart(req, res, next) {
        const cartId = req.params.cid 
        const user = req.user
        try {
            const cart = await cartDao.getById(cartId)
            res.render('cart', {
                title: "Carrito de compras",
                styles:"index.css",
                user,
                cart
            })
        } catch (error) {
            res.status(500).send({
                status: "error",
                error: error.message
            })
        }
    }

}
