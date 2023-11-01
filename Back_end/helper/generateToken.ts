import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';
import * as dotenv from 'dotenv';
import { token } from 'morgan';

dotenv.config();

const tokenSign = async (user:UserModel) => {

    return jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET!,
        {
            expiresIn: "2h",
        }
    )
}

const verifyToken = async(token:string) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!);
    } catch (error) {
        return null;
        
    }
}

export {
    tokenSign,
    verifyToken
}