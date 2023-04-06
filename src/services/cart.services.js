import getDaos from "../model/daos/daos.factory.js";


const {productsDao, cartsDao} = getDaos();


class CartServices{

async getCart(){
    const carts = await cartsDao.getAll();
    return carts
}

async getCartId(cid){
    if(!cid){
        throw new Error(400, 'Field error')
    }
    const cartById = await cartsDao.cartById(cid)
    if(!cartById){
        throw new Error(400, 'Cart Not Found')
    }
    return cartById
}

async createCart(){
    const newCart = await cartsDao.add()
    return newCart
}

async addToCart(cid, pid, amount){
    if(!cid || !pid || !amount){
        throw new Error(400, 'Missing, require params')
    }
    const cart = await cartsDao.cartById(cid)
    if(!cart){
        throw Error(404, 'Cart Not found')
    }
    const product = await productsDao.getById(pid)
    if(!product){
        throw new Error(404, 'Product Not Found')
    }
    if(product.stock < amount){
        throw new Error(400, 'Insufficient stock')
    }
    const existingProduct = cart.products.find(item => item.product.code === product.code)
    const existingProductIndex = cart.products.findIndex(item => item.product.code === product.code)
    let addProduct
    if(existingProduct){
        cart.products[existingProductIndex].quantity += amount
        addProduct = await cartsDao.updateCart(cid, cart)
    }else{
        addProduct = await cartsDao.addProductToCart(cid,pid,amount)
    }
    return addProduct
}

async deleteProduct(cid, pid){
    if(!cid || !pid){
        throw new Error(400, 'Missing Fields')
    }
    const product = await productsDao.getById(pid)
    if(!product){
        throw new Error(404, 'Product Not Found')
    }
    const cart = await cartsDao.cartById(cid)
    if(!cart){
        throw new Error(404, 'Cart Not Found')
    }
    const deleteCart = await cartsDao.deleteProductFromCart(cid, pid)
    return deleteCart
}

async deleteAllCart(cid){
    if(!cid){
        throw new Error(400, 'Specify a cart ID ')
    }
    const cart = await cartsDao.getById(cid)
    if(!cart){
        throw new Error(404, 'Cart Not Found')
    }
    const vacio = await cartsDao.deleteAllCart(cid)
    return vacio
}

}

export default CartServices;