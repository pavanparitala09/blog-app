# Blog Application Backend

This directory contains the backend services for the Blog Platform Capstone Project, developed using Node.js, Express.js, and MongoDB.

## Implementation Details

### Architecture & Framework
- Built on **Node.js** with **Express.js (v5.x)**.
- Uses **ES Modules** (`type: "module"`) for modern JavaScript import/export syntax.
- Structured logically with separation of concerns: `APIs/` (Routes/Controllers), `models/` (Database schemas), `services/` (Business logic), and `middlewares/`.

### Database Design
- Uses **MongoDB** for flexible, document-based data storage.
- Integrated using **Mongoose** Object Data Modeling (ODM).
- Includes structured schemas for entities like `Users` (Authors, Admins, general Users) and `Articles/Blogs`.

### Authentication & Authorization
- **JWT (JSON Web Tokens)**: Used for secure, stateless authentication. Tokens are often passed via HTTP-only cookies to protect against XSS attacks.
- **Role-Based Access Control (RBAC)**: Custom middlewares validate user roles, ensuring distinct access for Admin (platform management), Author (content creation), and User (reading content).
- **Password Security**: Passwords are securely hashed and salted using `bcryptjs` before being stored in the database.

### File Uploads & Media Management
- **Multer**: Middleware used to handle `multipart/form-data` for uploading files, such as blog cover images or profile pictures.
- **Cloudinary Integration**: Images are securely uploaded and stored on Cloudinary, which provides optimized image delivery and transformation via URLs.

### Security & Environment Management
- Uses `dotenv` for securely managing sensitive environment variables such as `PORT`, `DB_URL`, JWT secrets, and Cloudinary credentials, ensuring they are not hardcoded in the source code.
- Uses `cors` middleware to securely handle Cross-Origin Resource Sharing requests from the frontend application.

## Setup & Running Locally

1. Create a `.env` file in this directory with the necessary variables:
   ```env
   PORT=4000
   DB_URL=mongodb://localhost:27017/blogdb
   # Add your JWT secrets
   # Add your Cloudinary API credentials
   ```
2. Install dependencies: 
   ```bash
   npm install
   ```
3. Run the backend server: 
   ```bash
   npm start
   ```
