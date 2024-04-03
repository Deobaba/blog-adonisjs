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
import CommentsController from "../app/controllers/comments_controller.js"
import Filesystem from "../app/controllers/filesystem.js"
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
router.put('/user/:id', UsersController.updateUser).use([middleware.auth()])
router.delete('/user/:id', UsersController.deleteUser).use([middleware.auth()])
router.get('/user/email/:email', UsersController.getUserByEmail).use([middleware.auth()])
router.post('/user/login', UsersController.loginUser)
router.post('/user/forgot-password', UsersController.forgotPassword)
router.post('/user/change-password', UsersController.changePassword).use([middleware.auth()])
router.post('/user/reset-password/:token', UsersController.resetPassword)

// post router
router.post('/post/create', PostsController.createPost).use([middleware.auth()])
router.get('/posts', PostsController.getAllPosts).use([middleware.auth()])
router.delete('/post/:id', PostsController.deletePost).use([middleware.auth()])
router.get('/post/:id', PostsController.getPostById).use([middleware.auth()])
router.put('/post/:id', PostsController.updatePost).use([middleware.auth()])
router.post('/post/publish/:id', PostsController.makePostPublished).use([middleware.auth()])
router.get("/post/user", PostsController.getAllPostByUserId).use([middleware.auth()])



// comment

router.post('/comment/create', CommentsController.createComment).use([middleware.auth()])
router.get('/comments', CommentsController.getAllComments).use([middleware.auth()])
router.delete('/comment/:id', CommentsController.deleteComment).use([middleware.auth()])
router.get('/comment/:id', CommentsController.getCommentById).use([middleware.auth()])
router.put('/comment/:id', CommentsController.updateComment).use([middleware.auth()])
router.get("/comment/post/:id", CommentsController.getCommentsByPostId)
router.get("/comment/user", CommentsController.getCommentsByUserId).use([middleware.auth()])


// filesystem

router.post ('/upload', Filesystem.uploadFile);
router.delete ('/delete', Filesystem.deleteFile);
router.get ('/read', Filesystem.readFile);