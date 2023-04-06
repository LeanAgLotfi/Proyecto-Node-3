import Router  from 'express'
import uploader from '../../utils/multer.middleware.js'
import {sessionController} from  '../../controllers/session.controller.js'
import passportCall from '../../middlewares/passport.middleware.js'

const router = Router()

router.post('/register',
    uploader.single('file'),
    passportCall('register', {failureRedirect: '/api/session/failRegister', failureFlash: true}),
    (req, res)=>res.redirect('/login')
)

router.get('/failRegister', (req,res)=>{
    res.send({error: 'Failed Register'})
})

router.post('/login', 
    passportCall('login', {failureRedirect: '/api/session/failLogin'}),
    sessionController.login
)

router.get('/failLogin', (req,res)=>{
    res.send({error: 'Failed Login'})
})

router.get('/github', 
    passportCall('github', { scope: ['user:email'] })
)

// router.get('/github/callback',
//     passportCall('github', {failureRedirect: '/api/session/failLogin'}),
//     sessionController.loginGithub
// )

router.get('/logout', sessionController.logout)

router.get('/current', 
    passportCall('jwt'),
    sessionController.currentSession)

export default router