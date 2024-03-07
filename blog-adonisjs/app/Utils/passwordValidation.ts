import {genSalt, hash, compare} from 'bcryptjs'


export default class PasswordValidation {
    
    public async hashPassword(password: string): Promise<string> {
        try {
            const salt = await genSalt(10);
            const hashedPassword = await hash(password, salt);
            return hashedPassword;
        } 
        catch (error) {
            console.error("Error hashing password:", error);
            return "";
        }
    }

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
        try {
            const isMatch = await compare(password, hashedPassword);
            return isMatch;
        } 
        catch (error) {
            console.error("Error comparing password:", error);
            return false;
        }
    }
}