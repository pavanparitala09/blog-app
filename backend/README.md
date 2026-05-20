# Blog Application Backend

This directory contains the backend backend APIs and services for the Capstone Project, developed using Node.js, Express.js, and MongoDB.

## Folder Structure

The backend follows a modular, feature-based architecture to keep the code organized and maintainable.

```text
backend/
├── APIs/              # Contains route definitions and controller logic for handling incoming requests
│   ├── AdminAPI.js    # Routes and logic for Admin features
│   ├── AuthorAPI.js   # Routes and logic for Author features
│   ├── UserAPI.js     # Routes and logic for general User features
│   └── commonAPI.js   # Shared routes for authentication and general tasks
├── config/            # Configuration files for third-party services and database
│   └── cloudinary.js  # Cloudinary SDK setup and image upload configuration
├── middlewares/       # Custom Express middlewares
│   └── verifyToken.js # Middleware to verify JWT tokens and authorize users
├── models/            # Mongoose schemas and models representing MongoDB collections
│   ├── Article.js     # Schema for blog posts/articles
│   └── User.js        # Schema for platform users (Admin, Author, User)
├── server.js          # Entry point of the Express application (Server initialization, CORS, Error handling)
├── package.json       # Metadata and dependencies for the backend project
└── .env               # Environment variables (Database URL, JWT Secret, Port)
```

## Packages & Technologies Used

- **`express`**: Fast, unopinionated web framework for Node.js used to build the RESTful APIs.
- **`mongoose`**: Elegant MongoDB object modeling (ODM) for Node.js, providing schema validation and easy database interaction.
- **`jsonwebtoken`**: Used for securely generating and verifying JSON Web Tokens (JWT) for user authentication and session management.
- **`bcryptjs`**: Library to hash passwords securely before storing them in the database and to compare them during login.
- **`cloudinary`**: Cloud-based service for managing, optimizing, and delivering images. Used to store blog cover images or profile pictures.
- **`multer`**: Middleware for handling `multipart/form-data`, specifically used for uploading files (images) before they are sent to Cloudinary.
- **`cors`**: Middleware to enable Cross-Origin Resource Sharing, allowing the frontend React application to communicate with the backend.
- **`cookie-parser`**: Middleware to parse cookies attached to the client request object. Essential for handling JWTs stored in HTTP-only cookies.
- **`dotenv`**: Loads environment variables from a `.env` file into `process.env`, keeping sensitive configuration like database URLs and API keys secure.

## How It Works

1. **Server Initialization**: `server.js` sets up the Express application, applies global middlewares (like `cors`, `express.json()`, `cookieParser()`), and connects to MongoDB.
2. **Routing**: API endpoints are modularized in the `APIs/` directory. Each route file handles a specific domain (e.g., `/user-api`, `/admin-api`).
3. **Authentication Flow**: When a user logs in, the server generates a JWT and sends it back to the client as an HTTP-only cookie. Subsequent requests use the `verifyToken` middleware to check this cookie and authorize access.
4. **Database Operations**: Controllers in the `APIs/` directory interact with the MongoDB database using Mongoose models (`models/`).
5. **File Uploads**: When an image is uploaded (e.g., creating a new blog post), `multer` intercepts the file, and it is then uploaded to `Cloudinary` for storage.

## Setup & Running Locally

1. Create a `.env` file in the `backend/` directory:
   ```env
   PORT=4000
   DB_URL=mongodb://localhost:27017/blogdb
   # Add your JWT secrets and Cloudinary credentials here
   ```
2. Install the necessary dependencies: 
   ```bash
   npm install
   ```
3. Start the development server: 
   ```bash
   npm start
   ```

## Initial Project Setup Commands

If you are recreating this project from scratch, these are the initial commands used to initialize the backend environment:

```bash
# 1. Initialize Node.js project
npm init -y

# 2. Install core dependencies
npm install express mongoose dotenv cors jsonwebtoken bcryptjs cloudinary multer cookie-parser
```
