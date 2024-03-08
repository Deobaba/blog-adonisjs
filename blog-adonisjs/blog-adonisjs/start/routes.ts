/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import UsersController from "../app/controllers/users_controller.js"

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

router.delete('/post', async () => {
  return {
    hello: 'world',
  }
})

router.post('/users', UsersController.createUser)
router.get('/users', UsersController.getAllUsers)
router.get('/user/:id', UsersController.getUserById)
router.put('/user/:id', UsersController.updateUser)
router.delete('/user/:id', UsersController.deleteUser)
router.get('/user/email/:email', UsersController.getUserByEmail)
router.post('/user/login', UsersController.loginUser)