
// Routes for task-related endpoints
//
// 1. How auth protects the route /home:
//    - The verifyUser middleware is added before the homePage controller.
//    - This ensures only authenticated users with a valid JWT token (from HTTP-only cookie) can access /home.
//    - If the token is missing or invalid, access is denied.
//
// 2. How we respect the DRY rule by using HTTP-only cookie which is more secured:
//    - By storing the JWT in an HTTP-only cookie, we avoid sending tokens manually in every request (e.g., via headers).
//    - The browser automatically attaches the cookie, reducing code repetition (DRY principle).
//    - HTTP-only cookies are not accessible via JavaScript, making them more secure against XSS attacks.
import express from 'express'
import { verifyUser } from '../middleware/auth.middleware.js';
import { homePage } from '../controller/task.controller.js';

const route = express.Router();

route.get('/home',verifyUser,homePage);

const taskRoutes = route;

export default taskRoutes;