import jwt from 'jsonwebtoken'
import env from '#start/env'

const {sign, verify} = jwt  // Destructuring the sign and verify methods from jwt



class jwtUtils {
  // Method to sign the token
  private secret: string;

  constructor() {
    // Getting the JWT_SECRET from the .env file
    this.secret = env.get('JWT_SECRET')!;
  }

  public signToken(payload: object) {
    return sign(payload, this.secret, {expiresIn: '1d'});
  }


  // Method to verify the token
  public verifyToken(token: string) {
    return verify(token, this.secret)
  }
}

export default new jwtUtils()