# Student API with JWT Authentication

A simple Express and MongoDB API for managing students. Login is handled through JWT authentication, and all student endpoints require a valid Bearer token.

## Requirements

- Node.js and npm
- MongoDB running locally or accessible through a MongoDB connection URI

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root by copying `.env.example`.

3. Set the environment variables in `.env`:

   | Variable | Description |
   | --- | --- |
   | `PORT` | Port for the Express server (defaults to `3000`) |
   | `MONGODB_URI` | MongoDB connection URI (defaults to `mongodb://localhost:27017/studentsDB`) |
   | `JWT_SECRET` | Secret used to sign and verify JWTs |
   | `ADMIN_USERNAME` | Username accepted by the login endpoint |
   | `ADMIN_PASSWORD` | Password accepted by the login endpoint |

   Use a long, random value for `JWT_SECRET` and a strong password for `ADMIN_PASSWORD`. Do not commit `.env`.

4. Start the server:

   ```bash
   npm start
   ```

   The server listens on `http://localhost:3000` by default. The MongoDB connection must succeed before the server starts accepting requests.

For development with Node.js watch mode, run:

```bash
npm run dev
```

## Authentication

### Log in

Send a `POST` request to `/auth/login` with the configured credentials:

```http
POST http://localhost:3000/auth/login
Content-Type: application/json
```

```json
{
  "username": "admin",
  "password": "your-configured-password"
}
```

A successful response contains a signed token that expires after one hour:

```json
{
  "token": "<jwt>",
  "tokenType": "Bearer",
  "expiresIn": "1h"
}
```

For protected requests, send the token in the `Authorization` header:

```http
Authorization: Bearer <jwt>
```

Requests without a Bearer token receive `401 Unauthorized`; invalid or expired tokens receive `403 Forbidden`.

## Student endpoints

All endpoints below are protected and require a valid JWT.

### List students

```http
GET http://localhost:3000/students
Authorization: Bearer <jwt>
```

Returns the student records as a JSON array.

### Create a student

```http
POST http://localhost:3000/students
Authorization: Bearer <jwt>
Content-Type: application/json
```

Example request body:

```json
{
  "name": "Taylor Smith",
  "age": 18,
  "grade": "A"
}
```

The `name` field is required. `age` and `grade` are optional. A successful request returns the created student with status `201 Created`.

## Project structure

```text
.
├── app.js
├── middleware/
│   └── authenticateJWT.js
├── models/
│   └── student.js
└── routes/
    ├── authRoutes.js
    └── studentRoutes.js
```

- `app.js` configures Express, connects to MongoDB, and mounts the routes.
- `routes/authRoutes.js` implements login and JWT issuance.
- `middleware/authenticateJWT.js` validates Bearer tokens for protected routes.
- `routes/studentRoutes.js` implements student creation and listing.
- `models/student.js` defines the Mongoose student schema.
