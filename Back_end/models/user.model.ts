import {Model, DataType, InferAttributes, InferCreationAttributes, DataTypes} from 'sequelize';
import Role from './role.model'
import db from '../config/db';

export interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isActive?: boolean;
  status?: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  role?: typeof Role;
}

const User = db.define<UserModel>("User", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    primaryKey: true,
    autoIncrement: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date
  },
  updatedAt:{
    type: DataTypes.DATE,
    defaultValue: new Date
  },
  deletedAt: {
    type: DataTypes.DATE,
  }
},
{
  paranoid: true,
});

User.belongsTo(Role, {
  foreignKey: 'role_id',
  as: 'role'
})

Role.hasMany(User,{
  foreignKey: 'role_id',
  as: 'users'
})

User.prototype.toJSON = function (){
  const value = Object.assign({}, this.get());
  delete value.password;
  return value;
}

export default User;