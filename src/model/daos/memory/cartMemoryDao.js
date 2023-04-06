import fs from 'fs/promises'
import { existsSync } from 'fs'

class cartMemoryDao{

constructor(path){
    this.path = path
}

async getAll(){
    try {
        if(!existsSync(this.path)){
            return []
        }
        const cart = await fs.readFile(this.path,'utf-8')
        if(!cart.length){
            return []
        }
        const parseCart = JSON.parse(cart)
        return parseCart
    } catch (error) {
        throw new Error(error.message)
    }
}

async getById(id){
    try{
        const saveCart = await this.getCart()
        const cartSelected = saveCart.find(cart => cart.id === id)
        if(!cartSelected){
            throw new Error('No se encuentra id especificado')
        }
        return cartSelected
    }catch(error){
        throw new Error(error.message)
    }
}

async add(){
    try{
        const saveProd = await this.getCart()
        const NewId = saveProd.length > 0 ? saveProd[saveProd.length -1].id + 1 : 1
        const NewCart = {
            id:NewId,
            products:[]
        }
        saveProd.push(NewCart)
        const cartString = JSON.stringify(saveProd, null, '\t')
        await fs.writeFile(this.path, cartString)
        console.log(`Agregado al carrito, cantidad: ${savedCarts.length}`)
        return NewCart
    }catch(error){
        throw new Error(error.message)
    }
}

async addProductToCart(cartId, productId){
    const allCarts = await this.getCart()
    const cart = await this.getCartById(cartId)
    const cartIndex = allCarts.findIndex(item => item.id === cart.id)
    if(cart.error){
        return cart.error
    }
    const existingProduct = cart.products.find(prod => prod.product === productId)
    if(existingProduct){
        const updatedCart = cart.products.map(prod => {
            if(prod.product === productId){
                return {
                    product: prod.id,
                    quantity: ++prod.quantity 
                }
            }else{
                return prod
            }
        })
    }else{
        cart.products.push({
            product: productId,
            quantity: 1
        })
    }
    allCarts[cartIndex] = cart
    const cartString = JSON.stringify(allCarts, null, '\t')
    await fs.writeFile(this.path, cartString)
    console.log('product added')
    return cart
}

}

export default cartMemoryDao;