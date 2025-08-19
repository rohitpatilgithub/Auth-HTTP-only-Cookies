import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import userRoutes from './routes/user.routes.js'
import taskRoutes from './routes/tasks.routes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const port = process.env.PORT || 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/users',userRoutes);
app.use('/tasks',taskRoutes);

connectDB();
app.listen(port,() => {
    console.log(`Server started at port ${port}`)
})