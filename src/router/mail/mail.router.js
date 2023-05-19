import { Router } from 'express'
import MailController from '../../controllers/mailer.controller.js'

const router = Router()

router.post('/', MailController.sendEmail)


export default router