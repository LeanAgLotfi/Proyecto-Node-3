import usersController from '../../controllers/user.controller.js'
import BaseRouter from "../base.router/base.routes.js";

export class UsersRouter extends BaseRouter {
  init() {
    this.get('/', ['ADMIN'],usersController.getAll)
    this.get('/:uid', ['ADMIN'],usersController.getById)
    this.post('/', ["PUBLIC"] ,usersController.create)
    this.put('/:uid', ['ADMIN'],usersController.updateById)
    this.delete('/:uid', ['ADMIN'],usersController.deleteUser)
  }
}

export default new UsersRouter();