import Post from "../models/post.js"

import {  createPost} from "../interface.js"


class PostService {

    public async createPost (body: createPost): Promise<Post | null>{
        try {
            const post = await Post.create(body);
            return post;
        } catch (error) {
            console.error("Error creating post:", error);
            return null;
        }
    }
    
    public async getAllPosts(): Promise<Post[] | null>{
        try {
            const posts = await Post.all();
            return posts;
        } catch (error) {
            console.error("Error getting all posts:", error);
            return null;
        }
    }
  
    public async deletePost(id: number): Promise<Post | null>{
        const post = await Post.find(id)
        if (post) {
            await post.delete()
            return post
        }
        return null
    }

    public async getPostById(id: number): Promise<Post | null>{
        try {
            const post = await Post.find(id);
            return post;
        } catch (error) {
            console.error("Error getting post by id:", error);
            return null;
        }
    }

    public async updatePost(id:number, fields: any) : Promise<Post | null>{
        try {
            const post = await Post.find(id);

            const updateDetails = {
                "title": fields.title,
                "content":fields.content,
                "isPublished":fields.isPublished
            }
            if (post) {
                post.merge(updateDetails);
                await post.save();
                return post;
            }
            return null;
        } catch (error) {
            console.error("Error updating post:", error);
            return null;
        }
    }

    public async getPostByUserId(userid: number): Promise<Post[] | null>{
        try {
            const posts = await Post.query().where('userid', userid).preload('user');
            return posts;
        } catch (error) {
            console.error("Error getting post by user id:", error);
            return null;
        }
    }

    public async getPostByTitle(title: string): Promise<Post[] | null>{
        try {
            const posts = await Post.query().where('title', title).preload('user');
            return posts;
        } catch (error) {
            console.error("Error getting post by title:", error);
            return null;
        }
    }

    public async makePostPublished (id: number): Promise<Post | null>{
        try {
            const post = await Post.find(id);
            if (post) {
                post.isPublished = true;
                await post.save();
                return post;
            }
            return null;
        } catch (error) {
            console.error("Error making post published:", error);
            return null;
        }
    }

    public async makePostUnpublished (id: number): Promise<Post | null>{
        try {
            const post = await Post.find(id);
            if (post) {
                post.isPublished = false;
                await post.save();
                return post;
            }
            return null;
        } catch (error) {
            console.error("Error making post unpublished:", error);
            return null;
        }
    }

    public async getPublishedPosts(): Promise<Post[] | null>{
        try {
            const posts = await Post.query().where('isPublished', true).preload('user');
            return posts;
        } catch (error) {
            console.error("Error getting published posts:", error);
            return null;
        }
    }

    public async getUnpublishedPosts(): Promise<Post[] | null>{
        try {
            const posts = await Post.query().where('isPublished', false).preload('user');
            return posts;
        } catch (error) {
            console.error("Error getting unpublished posts:", error);
            return null;
        }
    }

    public async getPublishedPostByAUser (userid: number): Promise<Post[] | null>{
        try {
            const posts = await Post.query().where('userid', userid).where('isPublished', true).preload('user');
            return posts;
        } catch (error) {
            console.error("Error getting published posts by user:", error);
            return null;
        }
    }

    public async getUnpublishedPostByAUser (userid: number): Promise<Post[] | null>{
        try {
            const posts = await Post.query().where('userid', userid).where('isPublished', false).preload('user');
            return posts;
        } catch (error) {
            console.error("Error getting unpublished posts by user:", error);
            return null;
        }
    }



}

export default new PostService()