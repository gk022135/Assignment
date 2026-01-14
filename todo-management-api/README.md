# Todo Management API - Production Ready Backend

A fully functional, enterprise-grade backend API built with **NestJS** and **MongoDB (Mongoose)** featuring comprehensive authentication, authorization, and data management capabilities.

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Installation & Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
Create a `.env` file in the root directory:
```env
MONGO_URI=mongodb://localhost:27017/todo_app
JWT_SECRET=your-secret-key-here
JWT_EXPIRES_IN=86400
PORT=3000
```

3. **Start development server:**
```bash
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📋 Features

✅ **User Authentication** - Secure signup and login with JWT tokens  
✅ **Password Security** - Bcrypt hashing with 10 salt rounds  
✅ **Role-Based Authorization** - USER and ADMIN roles with protected routes  
✅ **Soft Deletes** - Deleted users cannot login or access protected routes  
✅ **Todo Management** - Full CRUD operations with user isolation  
✅ **Pagination** - Efficient data retrieval with page/limit parameters  
✅ **Input Validation** - DTOs with class-validator for all inputs  
✅ **Error Handling** - Centralized exception filter with consistent responses  
✅ **MongoDB Integration** - Mongoose ODM with proper schemas and indexing  
✅ **Guard-Based Security** - JWT and Role-based access control  

## 🏗️ Project Structure

```
src/
├── auth/                    # Authentication module
├── users/                   # Users module
├── todos/                   # Todos module
├── common/                  # Common utilities
├── database/                # Database config
├── app.module.ts            # Main module
└── main.ts                  # Bootstrap
```

## 🔐 API Endpoints

**Auth**: `POST /auth/signup`, `POST /auth/login`, `POST /auth/logout`  
**Users**: `GET /users/me`, `PATCH /users/me`, `DELETE /users/me`, `GET /users` (admin)  
**Todos**: `POST /todos`, `GET /todos?page=1&limit=10`, `PATCH /todos/:id`, `DELETE /todos/:id`  

## 🚀 Running

```bash
npm install       # Install dependencies
npm run start:dev # Development
npm run build     # Production build
npm run start:prod # Production
```

## 🛡️ Security

✅ Bcrypt password hashing (10 salt rounds)  
✅ JWT token authentication  
✅ Role-based access control  
✅ Soft delete user protection  
✅ User data isolation  
✅ Input validation with DTOs  
✅ Global error handling  

## 📊 Database

**User**: name, email, password (hashed), role, isDeleted, timestamps  
**Todo**: title, description, completed, userId (reference), timestamps  

## 🔗 Environment

```env
MONGO_URI=mongodb://localhost:27017/todo_app
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=86400
PORT=3000
```

## 📦 Tech Stack

NestJS v11 • MongoDB + Mongoose • JWT • Bcrypt • class-validator • TypeScript

## 📚 Detailed Docs

See [README_COMPLETE.md](README_COMPLETE.md) for comprehensive API documentation and examples.

## 📄 License

UNLICENSED
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
