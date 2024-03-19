// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'

import CommentService from '../services/comment_service.js'
import {createComment} from "../interface.ts"

class CommentsController {

    public async createComment({ request, response }: HttpContext ) {
        try{
            const body = request.body() as createComment
            const comment = await CommentService.createComment(body)
            return response.status(201).json(comment)
        } catch(err){
            console.error('Error creating comment:', err)
            return response.status(500).json({ message: 'Error creating comment' })

        }

    }

    public async getAllComments({ response}: HttpContext ) {
        try {
            const comments = await CommentService.getAllComments();
            if (comments) {
                return response.status(200).json(comments);
            }
            return response.status(404).json({message: "No comments found"});
        } 
        catch (error) {
            console.error("Error getting all comments:", error);
            return response.status(500).json({message: "Error getting all comments"});
        }
    }

    public async deleteComment({ params, response}: HttpContext ) {
        try {
            const comment = await CommentService.deleteComment(params.id);
            if (comment) {
                return response.status(200).json(comment);
            }
            return response.status(404).json({message: "No comment found"});
        } 
        catch (error) {
            console.error("Error deleting comment:", error);
            return response.status(500).json({message: "Error deleting comment"});
        }
    }

    public async getCommentById({ params, response}: HttpContext ) {
        try {
            const comment = await CommentService.getCommentById(params.id);
            if (comment) {
                return response.status(200).json(comment);
            }
            return response.status(404).json({message: "No comment found"});
        } 
        catch (error) {
            console.error("Error getting comment by id:", error);
            return response.status(500).json({message: "Error getting comment by id"});
        }
    }

    public async updateComment({ params, request, response}: HttpContext ) {
        try {
            const fields = request.body()
            const comment = await CommentService.updateComment(params.id, fields);
            if (comment) {
                return response.status(200).json(comment);
            }
            return response.status(404).json({message: "No comment found"});
        } 
        catch (error) {
            console.error("Error updating comment:", error);
            return response.status(500).json({message: "Error updating comment"});
        }

    
    }

    public async getCommentsByPostId({ params, response}: HttpContext ) {
        try {
            const comments = await CommentService.getCommentByPostId(params.id);
            if (comments) {
                return response.status(200).json(comments);
            }
            return response.status(404).json({message: "No comments found"});
        } 
        catch (error) {
            console.error("Error getting comments by post id:", error);
            return response.status(500).json({message: "Error getting comments by post id"});
        }
    }

    public async getCommentsByUserId({ params, response}: HttpContext ) {
        try {
            const comments = await CommentService.getCommentByUserId(params.id);
            if (comments) {
                return response.status(200).json(comments);
            }
            return response.status(404).json({message: "No comments found"});
        } 
        catch (error) {
            console.error("Error getting comments by user id:", error);
            return response.status(500).json({message: "Error getting comments by user id"});
        }
    }
}


export default new CommentsController()