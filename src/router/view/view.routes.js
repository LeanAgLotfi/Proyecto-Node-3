import { Router } from 'express';
import {vistasController} from '../../controllers/view.controller.js'
import { sessionMiddleware} from'../../middlewares/session.middleware.js'
import { authMiddleware } from '../../middlewares/auth.middleware.js'
import passportCall from '../../middlewares/passport.middleware.js'

const router = Router()

router.get('/', (req, res)=>{
    res.redirect('/login')
})

router.get('/register', 
    sessionMiddleware,
    vistasController.register
)

router.get('/login', 
    sessionMiddleware,
    vistasController.login
)

router.get('/products',
    authMiddleware,
    passportCall('jwt'),
    vistasController.products
)

router.get('/cart/:cid', 
    authMiddleware,
    passportCall('jwt'),
    vistasController.cart
)


export default router;