import {Model, DataType, InferAttributes, InferCreationAttributes, DataTypes} from 'sequelize';
import db from '../config/db';

export interface RoleModel extends Model <InferAttributes<RoleModel>, InferCreationAttributes<RoleModel>> {
    id: number;
    name: string;
}

const Role = db.define<RoleModel>('Role', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

export default Role;
