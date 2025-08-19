# Authentication Flow Documentation

This document explains the authentication flow of the project, focusing on JWT, password hashing, password comparison, cookie generation, cookie extraction, login, and the importance of HTTP-only cookies.

---

## 1. User Signup (Registration)
- **Password Hashing:**
  - When a user signs up, their password is hashed using a secure algorithm (e.g., bcrypt) before being stored in the database.
  - Hashing is a one-way function, so the original password cannot be retrieved from the hash.
  - This protects user credentials even if the database is compromised.

## 2. User Login
- **Password Comparison:**
  - When a user logs in, the entered password is compared with the hashed password stored in the database using bcrypt's compare function.
  - If the passwords match, authentication proceeds; otherwise, access is denied.

- **JWT Generation:**
  - Upon successful login, a JWT (JSON Web Token) is generated.
  - The JWT contains essential user information (e.g., user ID, email) in its payload and is signed with a secret key.
  - The token is set to expire after a certain period (e.g., 1 hour).

- **Cookie Generation:**
  - The JWT is sent to the client as an HTTP-only cookie.
  - HTTP-only cookies cannot be accessed via JavaScript, providing protection against XSS attacks.

## 3. Making Authenticated Requests
- **Cookie Request:**
  - The browser automatically includes the HTTP-only cookie (containing the JWT) in every request to the server.
  - The server extracts the token from `req.cookies.token`.

- **JWT Verification:**
  - The server verifies the JWT using the secret key.
  - If the token is valid and not expired, the user is authenticated and allowed to access protected routes.
  - If the token is missing, invalid, or expired, access is denied.

## 4. Protected Routes
- Middleware (e.g., `verifyUser`) checks for the presence and validity of the JWT in the HTTP-only cookie before granting access to protected endpoints (like `/home`).

---

## Why Use HTTP-only Cookies Instead of localStorage or sessionStorage?
- **Security:**
  - HTTP-only cookies are not accessible via JavaScript, making them immune to XSS attacks.
  - Tokens stored in localStorage or sessionStorage can be stolen if an attacker injects malicious scripts.
- **Automatic Handling:**
  - Cookies are automatically sent with every request to the server, reducing code repetition and respecting the DRY principle.
- **Best Practice:**
  - Storing authentication tokens in HTTP-only cookies is considered a best practice for web security.

**In summary:** Using HTTP-only cookies for JWT storage provides better security and a smoother developer experience compared to localStorage or sessionStorage.
