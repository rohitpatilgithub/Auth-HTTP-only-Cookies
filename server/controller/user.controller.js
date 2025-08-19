
// Controller for user-related operations
//
// 1. Hashing the password:
//    - Before saving a user's password to the database, we hash it using bcrypt.
//    - This ensures that even if the database is compromised, the actual passwords are not exposed.
//    - Hashing is a one-way function, so the original password cannot be retrieved from the hash.
//
// 2. Comparing password and hashed password:
//    - When a user logs in, we compare the plain password they provide with the hashed password stored in the database.
//    - This is done using bcrypt's compare function, which hashes the input password and checks if it matches the stored hash.
//    - This process ensures that the password verification is secure and the actual password is never exposed.
//
// 3. Token generation and storing in HTTP-only cookies:
//    - After successful login, we generate a JWT (JSON Web Token) containing user information.
//    - The token is signed with a secret key and sent to the client as an HTTP-only cookie.
//    - HTTP-only cookies cannot be accessed via JavaScript, which helps prevent XSS attacks and increases security.
//
// 4. Values of user while JWT sign and how it helps us in future:
//    - When signing the JWT, we include essential user details (like userId, email, role, etc.).
//    - These values are embedded in the token payload and can be used to identify the user in future requests without querying the database every time.
//    - This makes authentication efficient and stateless, as the server can trust the token's contents if it is valid.
import User from "../model/user.model.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcrypt";

export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Enter complete credentials" });
    }
  // Hash the password before saving
  const hashPassword = await bycrpt.hash(password, 10); // 10 is the salt rounds
    const newUser = new User({
      name,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ msg: "User created", data: newUser });
  } catch (error) {
    return res.status(500).json({ msg: "Server error", error: error.message });
  }
};

export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Enter complete credentials" });
    }
    const inputUser = await User.findOne({ email });

    if (!inputUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

  // Compare the entered password with the hashed password in DB
  const isValidPassword = await bycrpt.compare(password, inputUser.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate JWT token with user info and set as HTTP-only cookie
    // The payload contains user id and email, which helps identify the user in future requests
    const token = jwt.sign(
      { id: inputUser._id, email: inputUser.email }, // values stored in JWT
      process.env.JWT,
      { expiresIn: "1h" }
    );
    // Store token in HTTP-only cookie for security
    res.cookie('token',token,{ httpOnly : true })
    res.status(200).json({
      message: "Login successful"
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
