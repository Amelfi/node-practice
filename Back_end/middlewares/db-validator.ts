import User from "../models/user.model"
import Role from "../models/role.model";
import bcrypt from "bcrypt"

export const emailExits = async(email = '') => {

    let user = await User.findOne({where: {email}});
    
    if (user) {
        throw new Error('Email already exists'); 
    }
}

export const isValidEmail = async (email = '') => {
    let user = await User.findOne({where: {email}});
    if(!user){
        throw new Error('Email not found');
    }
}

export const isValidPassword = async (email = '', password = '') => {
    let user = await User.findOne({where: {email}});

    if(user){
        let passwordHash = bcrypt.compareSync(password, user!.password);
        if(!passwordHash){
            throw new Error('Invalid password');
        }
    }
}

export const isValidRole = async (role = '') => {
    let validRole = await Role.findByPk(role);
    if(!validRole){
        throw new Error('Invalid role');
    }
}