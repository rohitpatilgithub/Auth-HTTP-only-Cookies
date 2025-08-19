
// Middleware for authentication and authorization
//
// 1. How cookie is extracted from browser:
//    - The browser automatically sends cookies with each request to the server.
//    - We access cookies in Express using req.cookies (requires cookie-parser middleware).
//
// 2. req.cookies?.token:
//    - This line extracts the 'token' property from the cookies object.
//    - The optional chaining (?.) ensures it doesn't throw an error if cookies are undefined.
//    - The token is our JWT, stored as an HTTP-only cookie for security.
//
// 3. Comparing JWT sign with our JWT_SECRET_KEY:
//    - We verify the JWT using jwt.verify(token, SECRET_JWT).
//    - This checks if the token was signed with our secret key and is not tampered with.
//    - If valid, the decoded user info is attached to req.user for use in protected routes.
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  const SECRET_JWT = process.env.JWT;

  // Get token from HTTP-only cookie
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
// {
//     "email":"rohit@gmail.com",
//     "password":"12345"
// }