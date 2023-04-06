import fs from 'fs/promises'
import { existsSync } from 'fs'
import path from 'path'

class productMemoryDao{
    constructor(filename){
        this.filePath = path.resolve(__dirname,`../../json/${filename}`)
    }

    async getAll(){
        try {
            if(existsSync(this.filePath)){
                const product = await fs.readFile(this.filePath,'utf-8')
                if(product.length > 0){
                    const productsParse = JSON.parse(product)
                    return productsParse
                }
                else return []
            }
           else return []

        } 
        catch (error) {
            throw new Error(404,'Products Not Found')
        }
    }

    async getById(id){
    const idProduct = Number(id)
    try {
        const saveProduct = await this.getProducts()
        const productSelect = saveProduct.find(prod => prod.id === idProduct);
        if(!productSelect){
            throw new Error(400, 'Producto No encontrado')
        }
            return productSelect
        } 
        catch (error) {
            throw new Error(error.message)
        }
    }

    async add(prod){
        try {
            const saveProduct = await this.getProducts();
            const duplicarProd = saveProduct.find(item => item.code === prod.code)
            if(duplicarProd){
                throw new Error(`ERROR: El siguiente codigo ya fue agregado: ${prod.code}`)
            }
            if(!prod.title || !prod.description || !prod.code || !prod.price || !prod.stock || !prod.category){
                throw new Error('Missing fields')
            }
            const newId = saveProduct.length > 0 ? saveProduct[saveProduct.length -1 ].id + 1 : 1
            const newProduct = {
                id: newId,
                status: prod.status || true,
                thumbnails: prod.files || [],
                ...prod
            }
            saveProduct.push(newProduct)
            const productListString = JSON.stringify(saveProduct, null, '\t')
            await fs.writeFile(this.filePath, productListString)
            console.log(`${product.title} added`)
            return newProduct
        } catch (error) {
            throw new Error(error.message)
        }
    }

async updateById(id, product){
    const idProd = Number(id)
    try {
        const saveProd = await this.getProducts();
        const targetProd = await this.getProductsById(idProd);
        const prodUpdate = {...targetProd,...product};
        const updateList = saveProd.map(prod => {
            if(prod.id === idProd){
                return prodUpdate
            }
            else{
                return prod
            }
        })
        const prodListString = JSON.stringify(updateList, null, '\t')
        await fs.writeFile(this.filePath, prodListString)
        console.log('Producto Modificado')
        return prodUpdate
    } catch (error) {
        throw new Error(error.message)
    }
}

async delete(id){
    const prodId = Number(id)
    try{
        const saveProd = await this.getProducts();
        const targetProd = await this.getProductsById(prodId);
        const filterList = saveProd.filter(prod => prod.id !== prodId)
        const prodListString = JSON.stringify(filterList, null, '\t')
        await fs.writeFile(this.filePath, prodListString)
        console.log(`${targetProd.title} deleted`)
        return targetProd
    }catch(error){
        throw new Error(error.message)
    }
}

}

export default productMemoryDao;