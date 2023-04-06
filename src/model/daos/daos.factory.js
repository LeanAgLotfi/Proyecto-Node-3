import ENV_CONFIG from '../../config/enviroment.config.js';
import MongoManager from "../db/mongo/mongo.manager.js";

let cartsDao, chatsDao, productsDao, usersDao

console.log(`Using ${ENV_CONFIG.PERSISTENCE} as persistence method`)

switch(ENV_CONFIG.PERSISTENCE){

    case "FILE": {
        const CartFileDao = await import('./memory/cartMemoryDao.js') 
        const ProductFileDao = await import('./memory/productMemoryDao.js') 
        cartsDao = new CartFileDao()
        productsDao = new ProductFileDao()
        break;
    }

    case "MONGO": {
        const {CartMongoDao} = await import('./mongo/cart.mongo.dao.js')
        const { ProductMongoDao } = await import('./mongo/products.mongo.dao.js')
        const {UserMongoDao} = await import('./mongo/user.mongo.dao.js')
        cartsDao = new CartMongoDao()
        productsDao = new ProductMongoDao()
        usersDao = new UserMongoDao()
        break;
    }

    default: {
        throw new Error('You must provide a valid persistence method')
    }
}

const getDaos = () => {
    return {
        cartsDao,
        productsDao, 
        usersDao
    }
}

export default getDaos;