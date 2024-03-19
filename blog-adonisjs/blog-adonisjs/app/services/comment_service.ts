import Comment from "../models/comment.js"

import {  createComment} from "../interface.js"


class CommentService {

    public async createComment (body : createComment): Promise<Comment | null>{
        try {
            const comment = await Comment.create(body);
            return comment;
        } catch (error) {
            console.error("Error creating comment:", error);
            return null;
        }
    }
    
    public async getAllComments(): Promise<Comment[] | null>{
        try {
            const comments = await Comment.all();
            return comments;
        } catch (error) {
            console.error("Error getting all comments:", error);
            return null;
        }
    }
  
    public async deleteComment(id: number): Promise<Comment | null>{
        const comment = await Comment.find(id)
        if (comment) {
            await comment.delete()
            return comment
        }
        return null
    }

    public async getCommentById(id: number): Promise<Comment | null>{
        try {
            const comment = await Comment.find(id);
            return comment;
        } catch (error) {
            console.error("Error getting comment by id:", error);
            return null;
        }
    }

    public async updateComment(id:number, fields: any) : Promise<Comment | null>{
        try {
            const comment = await Comment.find(id);

            const updateDetails = {
                "comment":fields.comment,
            }
            if (comment) {
                comment.merge(updateDetails);
                await comment.save();
                return comment;
            }
            return null
        } catch (error) {
            console.error("Error updating comment:", error);
            return null;
        }
    }

    public async getCommentByPostId(postid: number): Promise<Comment[] | null>{
        try {
            const comments = await Comment.query().where('postId', postid).preload("post")
            return comments;
        } catch (error) {
            console.error("Error getting comment by postid:", error);
            return null;
        }
    }

    public async getCommentByUserId(userid: number): Promise<Comment[] | null>{
        try {
            const comments = await Comment.query().where('userId', userid).preload("user")
            return comments;
        } catch (error) {
            console.error("Error getting comment by userid:", error);
            return null;
        }
    }

}

export default new CommentService()