import { Router } from 'express'
import MailController from '../../controllers/mailer.controller'

const router = Router()

router.post('/', MailController.sendEmail)


export default router