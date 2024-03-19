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
import PostsController from "../app/controllers/posts_controller.js"
import { middleware } from '#start/kernel'

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
// user router
router.post('/users', UsersController.createUser)
router.get('/users', UsersController.getAllUsers)
router.get('/user/:id', UsersController.getUserById).use([middleware.auth()])
router.put('/user/:id', UsersController.updateUser)
router.delete('/user/:id', UsersController.deleteUser)
router.get('/user/email/:email', UsersController.getUserByEmail)
router.post('/user/login', UsersController.loginUser)
router.post('/user/forgot-password', UsersController.forgotPassword)
router.post('/user/change-password', UsersController.changePassword)
router.post('/user/reset-password/:token', UsersController.resetPassword)

// post router
router.post('/post/create', PostsController.createPost)
router.get('/posts', PostsController.getAllPosts)
router.delete('/post/:id', PostsController.deletePost)
router.get('/post/:id', PostsController.getPostById)
router.put('/post/:id', PostsController.updatePost)
router.post('/post/publish/:id', PostsController.makePostPublished)

