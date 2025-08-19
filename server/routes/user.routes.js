import express from 'express'
import { userLogin, userSignup } from '../controller/user.controller.js';

const route = express.Router();

route.post('/login',userLogin);
route.post('/signup',userSignup);

const userRoutes = route;

export default userRoutes;