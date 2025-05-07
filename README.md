# Task Management API

## Description

This project is a Task Management API built with Node.js, Express, MongoDB, and includes features like user authentication, task management (CRUD operations), and role-based access control (RBAC). The application also includes unit tests for authentication, task management, and API functionality.

## Features

- **User Authentication** (Login, JWT-based)
- **Task Management** (Create, Read, Update, Delete tasks)
- **Role-based Access Control** (Admin, User roles)
- **Password Hashing** (Using CryptoJS)
- **Unit Testing** (Using Jest and Supertest)
- **MongoDB Integration**
- **Server Environment Configuration** (using `dotenv`)

## Requirements

- **Node.js** (v14.x or higher)
- **MongoDB** (Local or Atlas)
- **Postman or cURL** (for API testing)
- **Jest or Mocha** (for testing)
- **CryptoJS** (for password hashing)

## Installation

Follow these steps to get the application up and running.

# Install Dependencies

1. Run the following command to install all the dependencies.

```bash
npm install
```
# Configuration
Environment Variables: Create a .env file at the root of the project and add the following configurations:

```bash
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskdb # Or use MongoDB Atlas URI
JWT_SECRET=your_jwt_secret
```
2. Database: Ensure that MongoDB is running locally or use MongoDB Atlas for cloud storage.

Running the Application
Start the application with the following command:

```bash
npm run dev
```
This will start the server at http://localhost:5000.

# Running Tests
To run the tests, make sure MongoDB is connected and the application is not running on the same port. Then, run the following command to execute the tests:

```bash
npm run test
```