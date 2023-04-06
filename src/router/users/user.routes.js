import { Router } from 'express';
import  uploader from '../../utils/multer.middleware.js'
import usersController from '../../controllers/user.controller.js'

const router = Router()

router.get('/', usersController.getAll)
router.get('/:uid', usersController.getById)
router.post('/', uploader.single('file'), usersController.addUser)
router.put('/:uid', usersController.updateUser)
router.delete('/:uid', usersController.deleteUser)

export default router