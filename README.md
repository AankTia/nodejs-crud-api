# Nodejs CRUD API

This tutorial will guide you through building a complete CRUD (Create, Read, Update, Delete) API using Node.js, Express, and MongoDB

## Prerequisite

- Node.js installed on your machine.
- MongoDB installed locally or MongoDB Atlas account
- Postman or similar API testing tool (optional)

### Project Setup

```bash
mkdir nodejs-crud-api
cd nodejs-crud-api
npm init -y
```

### Install Dependencies

```bash
# Core dependencies
npm install express mongoose dotenv cors

# Development dependencies
npm install -D nodemon
```

### Project Structure

```
nodejs-crud-api/
├── controllers/
│   └── userController.js
├── models/
│   └── User.js
├── routes/
│   └── userRoutes.js
├── middleware/
│   └── errorHandler.js
├── config/
│   └── database.js
├── .env
├── .gitignore
├── server.js
└── package.json
```

## Environment Configuration

### `.env`

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/crud_api
NODE_ENV=development
```

### `.gitignore`

```
node_modules/
.env
.DS_Store
logs/
*.log
```

## Database Configuration

### `config/database.js`

```javascript
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("Database connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
```

## Data Models

### `models/User.jd`

```javascript
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    age: {
      type: Number,
      min: [0, "Age must be positive"],
      max: [120, "Age must be realistic"],
    },
    city: {
      type: String,
      trim: true,
      maxlength: [30, "City name cannot exceed 30 characters"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt automatically
  }
);

module.exports = mongoose.model("User", userSchema);
```
