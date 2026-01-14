# Todo Management API

A production-ready backend API built with **NestJS** and **MongoDB (Mongoose)** featuring JWT authentication, role-based authorization, and comprehensive user and todo management.

## Features

- **User Authentication**: Secure signup and login with JWT tokens
- **Password Security**: Bcrypt password hashing
- **Role-Based Authorization**: USER and ADMIN roles with protected routes
- **Soft Deletes**: Users can be soft-deleted and cannot access their account after deletion
- **Todo Management**: Create, read, update, and delete todos with user isolation
- **Pagination**: Paginated todo listing
- **Input Validation**: DTOs with class-validator for all inputs
- **Centralized Error Handling**: Global exception filter for consistent error responses
- **MongoDB Integration**: Mongoose ODM for database operations

## Tech Stack

- **Framework**: NestJS v11
- **Database**: MongoDB with Mongoose v9
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **Validation**: Class-validator and Class-transformer
- **Runtime**: Node.js with TypeScript

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

## Installation

1. **Clone the repository** (if applicable):
```bash
cd todo-management-api
```

2. **Install dependencies**:
```bash
npm install
```

3. **Configure environment variables**:
Create a `.env` file in the root directory with the following:
```env
# Database
MONGO_URI=mongodb://localhost:27017/todo_app

# JWT
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=1d

# Server
PORT=3000
```

## Running the Application

### Development Mode
```bash
npm run start:dev
```
The API will be available at `http://localhost:3000`

### Production Build
```bash
npm run build
npm run start:prod
```

## Project Structure

```
src/
├── auth/                      # Authentication module
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── jwt.strategy.ts        # JWT strategy for Passport
│   ├── jwt.guard.ts           # JWT authentication guard
│   ├── roles.guard.ts         # Role-based authorization guard
│   ├── roles.decorator.ts     # Roles decorator for routes
│   └── dto/
│       ├── signup.dto.ts
│       └── login.dto.ts
├── users/                     # Users module
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── schemas/
│   │   └── user.schema.ts
│   └── dto/
│       └── update-user.dto.ts
├── todos/                     # Todos module
│   ├── todos.controller.ts
│   ├── todos.service.ts
│   ├── todos.module.ts
│   ├── schemas/
│   │   └── todo.schema.ts
│   └── dto/
│       ├── create-todo.dto.ts
│       └── update-todo.dto.ts
├── common/                    # Common utilities
│   ├── enums/
│   │   └── role.enum.ts
│   └── filters/
│       └── http-exception.filter.ts
├── database/
│   └── mongoose.config.ts
├── app.module.ts
└── main.ts
```

## API Endpoints

### Authentication

#### Sign Up
```http
POST /auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**: 
```json
{
  "message": "User registered successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response**:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Logout
```http
POST /auth/logout
Authorization: Bearer <your_jwt_token>
```

**Response**:
```json
{
  "message": "Logged out successfully"
}
```

### Users

#### Get Current User Profile
```http
GET /users/me
Authorization: Bearer <your_jwt_token>
```

**Response**:
```json
{
  "id": "user_id",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Update Current User Profile
```http
PATCH /users/me
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "name": "Jane Doe",
  "password": "newpassword123"
}
```

**Response**:
```json
{
  "id": "user_id",
  "name": "Jane Doe",
  "email": "john@example.com",
  "role": "user"
}
```

#### Delete Current User (Soft Delete)
```http
DELETE /users/me
Authorization: Bearer <your_jwt_token>
```

**Response**:
```json
{
  "message": "User deleted successfully",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Get All Users (Admin Only)
```http
GET /users
Authorization: Bearer <admin_jwt_token>
```

**Response**:
```json
[
  {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user",
    "isDeleted": false
  }
]
```

#### Update User (Admin Only)
```http
PATCH /users/:id
Authorization: Bearer <admin_jwt_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "password": "newpassword"
}
```

#### Delete User (Admin Only - Soft Delete)
```http
DELETE /users/:id
Authorization: Bearer <admin_jwt_token>
```

### Todos

#### Create Todo
```http
POST /todos
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "completed": false
}
```

**Response**:
```json
{
  "message": "Todo created successfully",
  "todo": {
    "id": "todo_id",
    "title": "Buy groceries",
    "completed": false,
    "userId": "user_id"
  }
}
```

#### Get My Todos (Paginated)
```http
GET /todos?page=1&limit=10
Authorization: Bearer <your_jwt_token>
```

**Response**:
```json
{
  "data": [
    {
      "_id": "todo_id",
      "title": "Buy groceries",
      "description": "Milk, eggs, bread",
      "completed": false,
      "userId": "user_id",
      "createdAt": "2024-01-14T10:30:00.000Z",
      "updatedAt": "2024-01-14T10:30:00.000Z"
    }
  ],
  "pagination": {
    "total": 25,
    "page": 1,
    "limit": 10,
    "pages": 3
  }
}
```

#### Update Todo
```http
PATCH /todos/:id
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "Updated title",
  "completed": true
}
```

**Response**:
```json
{
  "message": "Todo updated successfully",
  "todo": {
    "id": "todo_id",
    "title": "Updated title",
    "completed": true,
    "userId": "user_id"
  }
}
```

#### Delete Todo
```http
DELETE /todos/:id
Authorization: Bearer <your_jwt_token>
```

**Response**:
```json
{
  "message": "Todo deleted successfully",
  "todo": {
    "id": "todo_id",
    "title": "Buy groceries",
    "completed": false,
    "userId": "user_id"
  }
}
```

## Error Responses

All errors follow this format:

```json
{
  "statusCode": 400,
  "message": "Error description",
  "timestamp": "2024-01-14T10:30:00.000Z"
}
```

**Common Status Codes**:
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid token)
- `403` - Forbidden (no permission)
- `404` - Not Found
- `409` - Conflict (email already exists)
- `500` - Internal Server Error

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with salt rounds of 10
2. **JWT Authentication**: All protected routes require valid JWT tokens
3. **Role-Based Authorization**: Admin routes are protected with role guards
4. **Soft Deletes**: Deleted users cannot login or access protected routes
5. **User Isolation**: Users can only access their own todos
6. **Input Validation**: All inputs are validated against DTOs using class-validator

## Testing

### Run Tests
```bash
npm run test
```

### Run E2E Tests
```bash
npm run test:e2e
```

### Run Tests with Coverage
```bash
npm run test:cov
```

## Database Models

### User Schema
```typescript
{
  name: string (required)
  email: string (required, unique)
  password: string (required, hashed)
  role: "user" | "admin" (default: "user")
  isDeleted: boolean (default: false)
  createdAt: Date
  updatedAt: Date
}
```

### Todo Schema
```typescript
{
  title: string (required)
  description: string (optional)
  completed: boolean (default: false)
  userId: ObjectId (reference to User, required)
  createdAt: Date
  updatedAt: Date
}
```

## Environment Variables Reference

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/todo_app` |
| `JWT_SECRET` | Secret key for JWT signing | `supersecretkey` |
| `JWT_EXPIRES_IN` | JWT token expiration time | `1d` |
| `PORT` | Server port | `3000` |

## Best Practices Implemented

- ✅ Separation of concerns (Controllers, Services, Guards)
- ✅ Input validation using DTOs
- ✅ Centralized error handling
- ✅ Environment-based configuration
- ✅ JWT-based authentication
- ✅ Role-based authorization
- ✅ Async/await for all database operations
- ✅ Mongoose schemas with proper typing
- ✅ Soft deletes for data integrity
- ✅ User isolation for data security
- ✅ Pagination for efficient data retrieval
- ✅ Global validation pipes
- ✅ Custom decorators for roles

## Troubleshooting

### MongoDB Connection Error
Ensure MongoDB is running:
```bash
# For local MongoDB
mongod

# Or check connection string in .env
MONGO_URI=mongodb://localhost:27017/todo_app
```

### JWT Token Issues
- Ensure `JWT_SECRET` is set in `.env`
- Check token expiration time in Authorization header
- Format: `Authorization: Bearer <token>`

### Port Already in Use
Change the PORT in `.env` or use:
```bash
PORT=3001 npm run start:dev
```

## License

This project is licensed under the UNLICENSED license.

## Support

For issues, questions, or contributions, please contact the development team or create an issue in the repository.
