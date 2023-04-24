import express from 'express';
import userRouter from './routes/userRouter.js';
import taskRouter from './routes/taskRouter.js';
import {config} from "dotenv"
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from "cors";

config({
    path: "./data/config.env"
});


export const app = express();


//Using Middlewares
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", 'DELETE'],
    credentials: true
}));

app.use(errorMiddleware);
