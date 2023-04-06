import { Router } from 'express'
import cartController from '../../controllers/cart.controller.js'

const router = Router()

router.get('/', cartController.getAll)
router.get('/:cid', cartController.getById)
router.post('/', cartController.addCart)
router.put('/:cid/product/:pid', cartController.addProduct)
router.delete('/:cid/product/:pid', cartController.removeProduct)
router.delete('/:cid', cartController.clearCart)

export default router;