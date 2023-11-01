import express from 'express';
import db from './config/db';
import * as dotenv from 'dotenv';
import { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRouter from './routes/auth.route';
import userRouter from './routes/user.route';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8000

//Middlewares
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended:false} ));

//Routes
app.use('/api/', authRouter);
app.use('/api/', userRouter);

//DB connection
const dbConnection = async () => {
    try{
        await db.authenticate();
        console.log('db connection');
    }catch(error){
        console.log(error);
    }

}
dbConnection();


app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
})