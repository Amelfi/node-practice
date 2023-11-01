import { verifyToken } from '../helper/generateToken';
import { Request, Response} from 'express';

const checkAuth = async (req: Request, res: Response, next: Function) => {
    const token = req.headers.authorization?.split(' ').pop();
    const tokenData = await verifyToken(token!);
    if(tokenData){
        next()
    }else{
        res.status(409);
        res.send('prohibido el paso');
    }
};

export{
    checkAuth
}