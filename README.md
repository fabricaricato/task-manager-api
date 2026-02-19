# 🚀 Task Manager API

RESTful API for a secure task management application. Users can register, log in, and manage their own private tasks through a full CRUD interface, all protected with JWT authentication.

**Live Demo:** Deployed on [Vercel](https://vercel.com)

---

## 🛠️ Tech Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| **Node.js**       | Runtime environment           |
| **Express 5**     | Web framework                 |
| **MongoDB Atlas** | Cloud database                |
| **Mongoose**      | ODM / Data modeling           |
| **JWT**           | Token-based authentication    |
| **Bcrypt.js**     | Password hashing              |
| **CORS**          | Cross-origin resource sharing |

---

## 📁 Project Structure

```
src/
├── config/
│   └── mongodb.js          # Database connection
├── controllers/
│   ├── auth.controller.js  # Register & login logic
│   └── task.controller.js  # CRUD operations for tasks
├── middleware/
│   └── middleware.js        # JWT validation
├── models/
│   ├── user.model.js       # User schema (username, email, password)
│   └── task.model.js       # Task schema (title, description, completed, creator)
├── router/
│   ├── authRouter.js       # Auth routes (/api/auth)
│   └── taskRouter.js       # Task routes (/api/tasks)
├── docs/
│   └── peticiones-bruno/   # Ready-to-import Bruno/Postman collection
└── index.js                # App entry point & server config
```

---

## ⚙️ Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB)

### Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/fabricaricato/task-manager-api.git
   cd task-manager-api
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Copy the example file and fill in your values:

   ```bash
   cp .env.example .env
   ```

   ```env
   URI_DB=your_mongodb_connection_string
   PORT=50000
   JWT_SECRET=your_secret_key
   JWT_EXPIRES=2h
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The server will start at `http://localhost:50000` (or your configured port).

---

## 📡 API Endpoints

### Base URL

```
http://localhost:50000/api
```

---

### 🔐 Authentication — `/api/auth`

#### Register a new user

```
POST /api/auth/register
```

**Request body:**

```json
{
  "username": "JohnDoe",
  "email": "john@example.com",
  "password": "mypassword123"
}
```

**Validations:**

- All fields are required
- Email must be valid and end with `.com`
- Password must be at least 5 characters

**Success response** `200`:

```json
{
  "success": true,
  "data": {
    "_id": "664f...",
    "username": "JohnDoe",
    "email": "john@example.com",
    "password": "$2a$10$..."
  }
}
```

---

#### Login

```
POST /api/auth/login
```

**Request body:**

```json
{
  "email": "john@example.com",
  "password": "mypassword123"
}
```

**Success response** `200`:

```json
{
  "success": true,
  "data": "Successfully authentication",
  "token": "eyJhbGciOiJIUzI1NiIs..."
}
```

> 💡 **Save the token!** You'll need it for all task endpoints.

---

### 📝 Tasks — `/api/tasks`

> ⚠️ **All task endpoints require authentication.**
> Include the token in the request header:
>
> ```
> Authorization: your_jwt_token
> ```

#### Get all tasks

```
GET /api/tasks
```

**Success response** `200`:

```json
{
  "success": true,
  "data": [
    {
      "_id": "664f...",
      "title": "Finish backend project",
      "description": "Complete README and deploy",
      "creator": "664e...",
      "completed": false
    }
  ]
}
```

---

#### Create a task

```
POST /api/tasks
```

**Request body:**

```json
{
  "title": "Finish backend project",
  "description": "Complete README and deploy"
}
```

**Success response** `201`:

```json
{
  "success": true,
  "data": {
    "_id": "664f...",
    "title": "Finish backend project",
    "description": "Complete README and deploy",
    "creator": "664e...",
    "completed": false
  }
}
```

---

#### Update a task

```
PATCH /api/tasks/:id
```

**Request body** (any field):

```json
{
  "completed": true
}
```

**Success response** `200`:

```json
{
  "success": true,
  "data": {
    "_id": "664f...",
    "title": "Finish backend project",
    "description": "Complete README and deploy",
    "creator": "664e...",
    "completed": true
  }
}
```

---

#### Delete a task

```
DELETE /api/tasks/:id
```

**Success response** `200`:

```json
{
  "success": true,
  "data": { "...deleted task object..." }
}
```

---

## ❌ Error Responses

All errors follow a consistent format:

```json
{
  "success": false,
  "error": "Error description message"
}
```

| Status Code | Meaning                                        |
| ----------- | ---------------------------------------------- |
| `400`       | Bad request / Invalid token                    |
| `401`       | Unauthorized / Missing token or wrong password |
| `404`       | Task not found                                 |
| `500`       | Internal server error                          |

---

## 🧪 API Testing Collection

Inside `src/docs/peticiones-bruno/` you'll find a ready-to-use [Bruno](https://www.usebruno.com/) collection with all endpoints pre-configured. You can also import it into **Postman** or **Thunder Client**.

---

## 🌐 Deployment

This project is configured for deployment on **Vercel**. The `vercel.json` file is already set up — just connect your repository to Vercel and add the environment variables in the dashboard.

---

## ✒️ Author

**Fabrizio Caricato** — [GitHub](https://github.com/fabricaricato)
