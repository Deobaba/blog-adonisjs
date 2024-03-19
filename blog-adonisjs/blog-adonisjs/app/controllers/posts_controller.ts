// import type { HttpContext } from '@adonisjs/core/http'

import type { HttpContext } from '@adonisjs/core/http'

import PostService from '../services/post_service.js'
import {createPost} from "../interface.ts"

 class PostsController {

    public async createPost({ request, response }: HttpContext ) {
        try{
            const body = request.body() as createPost
            const post = await PostService.createPost(body)
            
            return response.status(201).json(post)
        } catch(err){
            console.error('Error creating post:', err)
            return response.status(500).json({ message: 'Error creating post' })

        }

    }

    public async getAllPosts({ response}: HttpContext ) {
        try {
            const posts = await PostService.getAllPosts();
            if (posts) {
                return response.status(200).json(posts);
            }
            return response.status(404).json({message: "No posts found"});
        } 
        catch (error) {
            console.error("Error getting all posts:", error);
            return response.status(500).json({message: "Error getting all posts"});
        }
    }

    public async deletePost({ params, response}: HttpContext ) {
        try {
            const post = await PostService.deletePost(params.id);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "No post found"});
        } 
        catch (error) {
            console.error("Error deleting post:", error);
            return response.status(500).json({message: "Error deleting post"});
        }
    }

    public async getPostById({ params, response}: HttpContext ) {
        try {
            const post = await PostService.getPostById(params.id);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "No post found"});
        } 
        catch (error) {
            console.error("Error getting post by id:", error);
            return response.status(500).json({message: "Error getting post by id"});
        }
    }

    public async updatePost({ params, request, response}: HttpContext ) {
        try {
            let data = request.body();
            const post = await PostService.updatePost(params.id, data);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "Post not found"});
        } 
        catch (error) {
            console.error("Error updating post:", error);
            return response.status(500).json({message: "Error updating post"});
        }
    }

    public async makePostPublished ({ params, response}: HttpContext ) {
        try {
            const post = await PostService.makePostPublished(params.id);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "Post not found"});
        } 
        catch (error) {
            console.error("Error making post published:", error);
            return response.status(500).json({message: "Error making post published"});
        }
    }

    public async getAllPostByUserId ({ params, response}: HttpContext ) {
        try {
            const post = await PostService.getPostByUserId(params.id);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "Post not found"});
        } 
        catch (error) {
            console.error("Error getting post by user id:", error);
            return response.status(500).json({message: "Error getting post by user id"});
        }
    }

    public async getPublishedPostByAUser ({ params, response}: HttpContext ) {
        try {
            const post = await PostService.getPublishedPostByAUser(params.id);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "Post not found"});
        } 
        catch (error) {
            console.error("Error getting published post by user id:", error);
            return response.status(500).json({message: "Error getting published post by user id"});
        }
    }

    public async getUnpublishedPostByUserId ({ params, response}: HttpContext ) {
        try {
            const post = await PostService.getUnpublishedPostByAUser(params.id);
            if (post) {
                return response.status(200).json(post);
            }
            return response.status(404).json({message: "Post not found"});
        } 
        catch (error) {
            console.error("Error getting unpublished post by user id:", error);
            return response.status(500).json({message: "Error getting unpublished post by user id"});
        }
    }
}

export default new PostsController()