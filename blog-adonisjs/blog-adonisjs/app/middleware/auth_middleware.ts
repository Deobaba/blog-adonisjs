import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import jwtAuth from "../Utils/jwt.ts"
import {UserJWT} from "../interface.js"

export default  class AuthMiddleware {
  async handle({request,response}: HttpContext, next: NextFn) {
   let token

   if(request.headers().authorization && (request.headers().authorization as string).startsWith('Bearer')){
      token = (request.headers().authorization as string).split(' ')[1]
    }
    if(!token){
      return response.status(401).json({message: 'Unauthorized'})
    }

    const user =  jwtAuth.verifyToken(token)

    if(!user){
      return response.status(401).json({message: 'Unauthorized'})
    }

    console.log('user', user)

    request.user = user 
  
    // request.user = user as UserJWT

    await next()
    /**
     * Call next method in the pipeline and return its output
     */
    // const output = await next()
    // return output
  }
}

