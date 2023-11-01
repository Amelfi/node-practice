import User, { UserModel } from "../models/user.model";
import Role, { RoleModel } from "../models/role.model";
import { Request, Response } from "express";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export const getAllUsers = async (req: Request, res: Response) => {

    const { page = 1 , size = 2, search, roleName, isActive} = req.query;

        const limit = +size;
        const offset = (+page - 1) * limit;


    try {
    const {rows, count} = await User.findAndCountAll({
        paranoid: false,
        offset,
        limit,
        where: {
            [Op.or]: 
            [
                {
                    firstName: {
                        [Op.iLike]:`%${search}%`,
                    },
                },
                {
                    lastName: {
                        [Op.iLike]:`%${search}%`
                    },
                },
            ],
        },
        
        include: [
            {
                model: Role,
                as: "role",
                where: {
                    name: roleName
                }
            },
        ],
    });

    res.status(200).json({count, users: rows});

    } catch (error) {
        res.json({ error });
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findByPk(req.params.id);
        res.status(200).json(user); 
    } catch (error) {
        res.json(error);
    }
};

export const createUser = async (req: Request, res: Response) => {

    try {
        let passwordSalt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, passwordSalt)
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.json({ error });
    }
};

export const updateUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.update(req.body, {
            where: {
                id: req.params.id,
            },
        });
        
        const userUpdated = await User.findByPk(req.params.id);

        res.status(200).json(userUpdated);
    } catch (error) {
        res.json({ error });
    }
    
};

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.destroy({
            where: {
                id: req.params.id,
            },
        });
        
        res.status(200).send(`The user was deleted successfully`);
    } catch (error) {
        res.json({ error });
    }
};

export const restoreUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.restore({
            where:{
                id: req.params.id
            }
        })
        res.status(200).send('The user was restored');
    } catch (error) {
        res.status(404).json({error})
    }
};
