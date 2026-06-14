# Personal Expense Management System

A full-stack Personal Expense Management application built using React.js, Node.js, Express.js, and MySQL. The application allows users to securely register, login, and manage their personal expenses through a modern web interface and RESTful API.

---

## Features

### Authentication
- User Registration
- User Login
- JWT Token Based Authentication
- Protected Routes
- Password Hashing using bcrypt

### Expense Management
- Add New Expense
- View All Expenses
- Update Existing Expenses
- Delete Expenses

### Security
- JWT Authentication
- Helmet Security Middleware
- CORS Protection
- Centralized Error Handling

---

## Tech Stack

### Frontend
- React.js
- Vite
- React Context API
- CSS

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- CORS

### Database
- MySQL

---

## Project Structure

```text
Personal-Expense-Management/
│
├── backend/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   └── expenseController.js
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   └── errorMiddleware.js
│   │
│   ├── models/
│   │   ├── userModel.js
│   │   └── expenseModel.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── expenseRoutes.js
│   │
│   ├── .env
│   ├── package.json
│   └── server.js
│
├── Database/
│   └── Schema.sql
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
├── .gitignore
└── README.md
```

---

## Database Setup

Create a MySQL database:

```sql
CREATE DATABASE expense1_tracker;
```

Import the schema file:

```bash
mysql -u root -p expense1_tracker < Database/Schema.sql
```

---

## Backend Setup

Navigate to backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=expense1_manager

JWT_SECRET=your_secret_key
```

Start the backend server:

```bash
npm start
```

or

```bash
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## Frontend Setup

Navigate to frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|----------|----------|----------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login user |

### Expenses

| Method | Endpoint | Description |
|----------|----------|----------|
| GET | /api/expenses | Get all expenses |
| POST | /api/expenses | Create a new expense |
| PUT | /api/expenses/:id | Update expense |
| DELETE | /api/expenses/:id | Delete expense |

---

## Security Measures

- JWT Authentication
- Password Hashing with bcrypt
- CORS Configuration
- Protected Routes
- Centralized Error Handling



## Author

**Krishnakant Vishwakarma**

GitHub Repository:

https://github.com/Krishna777-code/Personal-Expense-Management
