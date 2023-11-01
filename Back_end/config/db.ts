import { Sequelize } from "sequelize";
import * as dotenv from 'dotenv';

dotenv.config();
const db = new Sequelize({
    dialect: "mysql",
    username: process.env.USERNAME,
    database: process.env.DATABASE,
    host: process.env.HOST,
    password: process.env.PASSWORD
});

export default db;