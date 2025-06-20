# 📘 LMS Backend – Node.js + TypeScript
Project Status: In Development 🚧

This is a Learning Management System backend built with Node.js, TypeScript, Express, and MongoDB.
The goal is to create a scalable, secure platform for managing courses, users, and authentication.

📬 Features
User registration and authentication (JWT, password hashing)

Email verification with EJS templated emails

Course enrollment and management

Role-based access control

Redis caching for performance

Error handling and logging

API endpoints following REST principles


---

## 📁 Project Structure

server/
├── app.ts # Express app setup
├── server.ts # Entry point to start the server
├── controllers/ # Contains route controllers (e.g., user logic)
│ └── user.controller.ts
├── mails/ # EJS templates for sending emails
│ └── activation-mail.ejs
├── middleware/ # Error handling and async error wrapper
│ ├── catchAsyncErrors.ts
│ └── error.ts
├── models/ # Mongoose schemas and models
│ └── user.model.ts
├── utils/ # Utility functions and helpers
│ ├── db.ts # MongoDB connection
│ ├── ErrorHandler.ts # Custom error class
│ ├── redis.ts # Redis setup
│ └── sendMail.ts # Email sending logic
├── package.json
├── package-lock.json
├── tsconfig.json
├── .env # Environment variables (not committed)
└── .gitignore

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/LabSakshi/Learning-Management-System.git
cd server
2. Install dependencies
npm install
3. Create .env file
In the server/ directory, create a .env file with the following variables:

env

PORT=8000
MONGODB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/lms
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email@example.com
SMTP_PASS=your_email_password
ORIGIN=http://localhost:3000

🧪 Scripts
npm run dev – Start development server with nodemon

npm run build – Compile TypeScript to JavaScript

npm start – Run compiled JavaScript in dist/

📦 Technologies Used
Node.js – JavaScript runtime

TypeScript – Static typing and better tooling

Express – Server framework

MongoDB + Mongoose – NoSQL document database and ODM

Redis – In-memory data store / cache

EJS – Email templating engine

Nodemailer – SMTP email sending

bcryptjs – Password hashing

✉️ Email Template
mails/activation-mail.ejs – Template for account activation email after user registration

🛠 Future Enhancements
JWT authentication with refresh tokens

Role-based access control (RBAC)

Course management APIs & user dashboard

Password reset flow

Unit and integration testing

👩‍💻 Author
Sakshi Gupta








