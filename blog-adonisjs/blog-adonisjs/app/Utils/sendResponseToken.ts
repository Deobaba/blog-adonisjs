
import jwtAuth from "./jwt.js"

class SendResponseToken {
    public sendToken(token: string, response: any) {
        response.status(200).json({ token });
    }
}

export default new SendResponseToken()