import User  from "../models/user.model";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { tokenSign } from '../helper/generateToken'

export const login = async (req:Request, res:Response)=>{

    const user = await User.findOne({where: {email: req.body.email}});

    const token = await tokenSign(user!);

    res.status(200).json({user, token});
    
}
