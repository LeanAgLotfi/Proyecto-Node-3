import ENV_CONFIG from '../../config/enviroment.config.js';
import {CartMongoDao} from './mongo/cart.mongo.dao.js'
import {ProductMongoDao} from './mongo/products.mongo.dao.js'
import {UserMongoDao} from './mongo/user.mongo.dao.js'

console.log(`Using ${ENV_CONFIG.PERSISTENCE} as persistence method`)

const cartsDao = new CartMongoDao()
const productsDao = new ProductMongoDao()
const usersDao = new UserMongoDao()
     
export const getDaos = () => {
    return {
        cartsDao,
        productsDao, 
        usersDao
    }
}

