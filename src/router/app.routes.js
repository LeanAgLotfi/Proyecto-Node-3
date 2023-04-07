import { Router } from 'express'
import productsRoutes from './products/products.routes.js'
import cartRoutes from './cart/cart.routes.js'
import sessionRoutes from './sessions/session.routes.js'
import userRoutes from './users/user.routes.js'
import errorMiddleware from '../middlewares/error.middleware.js'

const router = Router()

router.use('/products', productsRoutes)
router.use('/carts', cartRoutes)
router.use('/session', sessionRoutes)
router.use('/users', userRoutes.getRouter())
router.use(errorMiddleware)

export default router