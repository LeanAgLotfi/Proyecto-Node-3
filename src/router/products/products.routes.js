import { Router } from 'express' 
import uploader from '../../utils/multer.middleware.js'
import productController from '../../controllers/products.controller.js'

const router = Router()

router.get('/', productController.getAll)
router.get('/:pid', productController.getById)
router.post('/', uploader.array('files'), productController.addProduct)
router.put('/:pid', productController.updateProduct)
router.delete('/:pid', productController.deleteProduct)

export default router