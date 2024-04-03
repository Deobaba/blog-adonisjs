// import type { HttpContext } from '@adonisjs/core/http'
import type { HttpContext } from '@adonisjs/core/http'
import { commentValidation, updateCommentValidation } from '#validators/comment/comment'

import CommentService from '../services/comment_service.js'
import {createComment} from "../interface.ts"

class CommentsController {

    public async createComment({ request, response }: HttpContext ) {
        try{
            const body = request.body() 
            body.userId = request.user?.id
            const { error } = commentValidation.validate(body)
            if (error) {
                return response.status(400).json({ message: error.details[0].message })
            }

            const comment = await CommentService.createComment(body as createComment)
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

    public async deleteComment({ params, response, request}: HttpContext ) {
        try {
            const confirmUser = await CommentService.getCommentById(params.id);

            if(confirmUser?.userId !== request.user?.id){
                return response.status(401).json({message: "You are not authorized to delete this comment"});
            }
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

    public async getCommentById({ params, response, request}: HttpContext ) {
        try {
            const confirmUser = await CommentService.getCommentById(params.id);

            if(confirmUser?.userId !== request.user?.id){
                return response.status(401).json({message: "You are not authorized to access this comment"});
            }

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
            const { error } = updateCommentValidation.validate(fields)
            if (error) {
                return response.status(400).json({ message: error.details[0].message })
            
            }
            const confirmUser = await CommentService.getCommentById(params.id);

            if(confirmUser?.userId !== request.user?.id){
                return response.status(401).json({message: "You are not authorized to update this comment"});
            }
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

    public async getCommentsByUserId({ response, request}: HttpContext ) {
        try {
            const data = request.user?.id
            const comments = await CommentService.getCommentByUserId(data);
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