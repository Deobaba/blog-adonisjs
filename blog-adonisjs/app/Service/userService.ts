import User from "../models/user.ts"
import Comment from "../models/comment.ts";
import Post from "../models/post.ts";
import Review from "../models/review.ts";
import PasswordValidation from "../utils/passwordValidation.ts"

import {  createUser } from "../interface.ts"


export default class UserService {

    public async createUser(body:createUser): Promise<User | undefined> {
        try {

            body.password = await PasswordValidation.hashPassword(body.password);
            const newUser = await User.create(body);
            return newUser; 
        }
         catch (error) {
            // Handle error appropriately
            console.error("Error creating user:", error);
            return undefined;
        }
        
    }

    public async getUserById(id: number): Promise<User | null>{
        try {
            const user = await User.find(id);
            return user;
        } 
        catch (error) {
            console.error("Error getting user by id:", error);
            return null;
        }
    }

    public async getAllUsers() : Promise<User[] | null>{
        try {
            const users = await User.all();
            return users;
        } 
        catch (error) {
            console.error("Error getting all users:", error);
            return null;
        }
    }

    public async updateUser(id:number, fields: any) : Promise<User | null>{
        try {
            const user = await User.find(id);
            if (user) {
                user.merge(fields);
                await user.save();
                return user;
            }
            return null;
        } 
        catch (error) {
            console.error("Error updating user:", error);
            return null;
        }
      
    }

    public async deleteUser(id: number): Promise<User | null> {
        const user = await User.find(id)
        if (user) {
            await user.delete()
            return user
        }
        return null
    }

    public async getUserByEmail(email: string): Promise<User | null>{
        try {
            const user = await User.findBy('email', email);
            return user;
        }
        catch (error) {
            console.error("Error getting user by email:", error);
            return null;
        }
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        return await PasswordValidation.comparePassword(password, hashedPassword);
    }

   

}