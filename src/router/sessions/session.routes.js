import Router  from 'express'
import uploader from '../../utils/multer.middleware.js'
import {sessionController} from  '../../controllers/session.controller.js'
import passportCall from '../../config/passport.cofing.js'


const router = Router()

router.post('/register',
    passportCall('jwt'),
    // sessionController.register,
    (req, res)=>res.redirect('/products')
)

router.get('/failRegister', (req,res)=>{
    res.send({error: 'Failed Register'})
})

router.post('/login', 
    sessionController.login,
    (req, res)=>res.redirect('/products')
)

router.get('/failLogin', (req,res)=>{
    res.send({error: 'Failed Login'})
})

router.get('/github', 
    passportCall('github', { scope: ['user:email'] })
)

router.get(
    '/github/callback',
    passportCall('github', { failureRedirect: '/github-error' }),
    sessionController.loginGitHub
  );

router.get('/logout', sessionController.logout)

router.get('/current', 
    passportCall('jwt'),
    sessionController.currentSession)

export default router