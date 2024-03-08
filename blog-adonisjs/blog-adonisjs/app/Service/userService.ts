import User from "../models/user.ts"
import jwtAuth from "../Utils/jwt.ts"

import PasswordValidation from "../utils/passwordValidation.ts"

import {  createUser,  UserResponse} from "../interface.js"


 class UserService {

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

    public async login(email: string, password: string): Promise<UserResponse | null> {
        const user = await this.getUserByEmail(email);

        if (user) {

            const isMatch = await this.comparePassword(password, user.password);
            if (!isMatch) {
                return null;
            }
            
            return this.userResponseObject(user);
        }
        return null;
    }

    userResponseObject(user: any) : UserResponse  {
        return { 
            username: user.username,
            email: user.email,
            id: user.id, 
            "age": user.age,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
            "token": jwtAuth.signToken({id:user.id})
        };
    }

   

}

export default new UserService()