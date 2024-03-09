import type { HttpContext } from '@adonisjs/core/http'

import UserService from '../services/userService.js'
import {createUser} from "../interface.ts"

class UsersController {
     /**
   * Create a new user.
   *
   * @param ctx HttpContext 
   */

  public async createUser({ request, response }: HttpContext ) {
    try {
      // Extract the request body
      const body = request.body() as createUser

      // Call userService to create a new user
      const user = await UserService.createUser(body)

      // If user creation is successful, return a success response
      if (user) {
        console.log('User created:', user)
        return response.status(201).json(user)
      }

      // If user creation fails, return a bad request response
      return response.status(400).json({ message: 'Error creating user' })

    } 

    catch (error) {
      // If an error occurs during user creation, log the error and return an internal server error response
      console.error('Error creating user:', error)

      return response.status(500).json({ message: 'Error creating user' })
    }
  }

  public async getAllUsers({ response}: HttpContext ) {
        try {
            const users = await UserService.getAllUsers();
            if (users) {
                return response.status(200).json(users);
            }
            return response.status(404).json({message: "No users found"});
        } 
        catch (error) {
            console.error("Error getting all users:", error);
            return response.status(500).json({message: "Error getting all users"});
        }
  }

  public async getUserById({ params, response}: HttpContext ) {
        try {
            const user = await UserService.getUserById(params.id);
            if (user) {
                return response.status(200).json(user);
            }
            return response.status(404).json({message: "User not found"});
        } 
        catch (error) {
            console.error("Error getting user by id:", error);
            return response.status(500).json({message: "Error getting user by id"});
        }
  }

  public async updateUser({ params, request, response}: HttpContext ) {
          try {
            let data = request.body();
            const user = await UserService.updateUser(params.id, data);
            if (user) {
                return response.status(200).json(user);
            }
            return response.status(404).json({message: "User not found"});
        } 
        catch (error) {
            console.error("Error updating user:", error);
            return response.status(500).json({message: "Error updating user"});
        }
  }

  public async deleteUser({ params, response}: HttpContext ) {
        try {
            const user = await UserService.deleteUser(params.id);
            if (user) {
                return response.status(200).json(user);
            }
            return response.status(404).json({message: "User not found"});
        } 
        catch (error) {
            console.error("Error deleting user:", error);
            return response.status(500).json({message: "Error deleting user"});
        }
  }

  public async getUserByEmail ({ params, response}: HttpContext ) {
        try {
            const user = await UserService.getUserByEmail(params.email);
            if (user) {
                return response.status(200).json(user);
            }
            return response.status(404).json({message: "User not found"});
        } 
        catch (error) {
            console.error("Error getting user by email:", error);
            return response.status(500).json({message: "Error getting user by email"});
        }
  }

  public async loginUser ({ request, response}: HttpContext ) {
        try {
            const body = request.body();
            const user = await UserService.login(body.email, body.password);
            if (user) {
                return response.status(200).json(user);
            }
            return response.status(404).json({message: "User not found"});
        } 
        catch (error) {
            console.error("Error logging in user:", error);
            return response.status(500).json({message: "Error logging in user"});
        }
  }
}


export default new UsersController()