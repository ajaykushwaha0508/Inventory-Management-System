# Inventory Management System

A full-stack, multi-tenant Inventory Management System built with
**React (Vite), Node.js, Express.js, and MongoDB**.

## Tech Stack

### Frontend

-   React
-   Vite
-   JavaScript (no TypeScript)
-   Tailwind CSS
-   Axios
-   Zustand
-   Notistack
-   Lucide React

### Backend

-   Node.js
-   Express.js
-   JavaScript (no TypeScript)
-   MongoDB
-   Mongoose
-   JWT
-   HTTP-only cookies
-   Zod

## Features

-   Owner registration and login
-   Organization member login
-   JWT authentication with HTTP-only cookies
-   Role-based authorization
-   Organization management
-   Organization member management
-   Product CRUD
-   Category management
-   Product search and filtering
-   Pagination
-   Product details modal
-   Product update modal
-   Increase/reduce stock with resulting-stock preview
-   Low-stock and out-of-stock views
-   Inventory transaction support
-   Request validation with Zod
-   Layered backend architecture

## Roles

Organization members can have:

-   `ADMIN`
-   `MANAGER`
-   `USER`

## Product Status

Products use these statuses:

-   `IN_STOCK`
-   `LOW_STOCK`
-   `OUT_OF_STOCK`

## Project Structure

``` text
inventory-management-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── store/
│   │   ├── lib/
│   │   └── ...
│   ├── .env.example
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── validatorsSchema/
│   ├── .env.example
│   ├── app.js
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Backend Architecture

The backend follows a layered architecture:

``` text
Route
  ↓
Authentication
  ↓
Authorization
  ↓
Controller
  ↓
Validation
  ↓
Service
  ↓
Repository
  ↓
Mongoose Model
  ↓
MongoDB
```

Controllers handle HTTP requests, services contain business logic,
repositories handle database operations, and models define MongoDB
schemas.

## Authentication

### Owner

Owner registration:

``` http
POST /api/auth/register
```

Example:

``` json
{
  "name": "Ajay",
  "email": "ajay@example.com",
  "password": "password123",
  "organizationName": "ABC Industries",
  "organizationCode": "ABC001"
}
```

Owner login:

``` http
POST /api/auth/login
```

Owner JWT payload contains:

``` js
{
  userId,
  organizationId,
  role: "OWNER",
  accountType: "OWNER"
}
```

### Organization Member

Member login:

``` http
POST /api/auth/member-login
```

Example:

``` json
{
  "organizationCode": "ABC001",
  "loginId": "USR-1001",
  "password": "password123"
}
```

Member JWT payload contains:

``` js
{
  memberId,
  organizationId,
  role,
  accountType: "MEMBER"
}
```

## API Overview

Base URL:

``` text
http://localhost:5000/api
```

### Authentication

  Method   Endpoint               Description
  -------- ---------------------- -----------------------------------
  POST     `/auth/register`       Register owner and organization
  POST     `/auth/login`          Owner login
  POST     `/auth/member-login`   Organization member login
  GET      `/auth/me`             Get current authenticated account
  POST     `/auth/logout`         Logout

### Organizations

  Method   Endpoint                            Description
  -------- ----------------------------------- ---------------------------
  POST     `/organizations`                    Create organization
  GET      `/organizations/my-organizations`   Get owner's organizations
  GET      `/organizations/:id`                Get organization
  PUT      `/organizations/:id`                Update organization
  DELETE   `/organizations/:id`                Delete organization
  GET      `/organizations/:id/members`        Get organization members

### Products

  Method   Endpoint          Description
  -------- ----------------- ---------------------
  GET      `/products`       Get products
  POST     `/products`       Create product
  GET      `/products/:id`   Get product details
  PUT      `/products/:id`   Update product
  DELETE   `/products/:id`   Delete product

Product listing supports query parameters:

``` text
/products?search=keyboard
/products?status=LOW_STOCK
/products?category=categoryId
/products?page=1&limit=10
/products?sortBy=createdAt&sortOrder=desc
```

## Product Update and Stock Adjustment

The update product modal supports:

-   Updating product information
-   Increasing stock
-   Reducing stock
-   Previewing the resulting stock before applying changes

Example:

``` text
Current Stock:    100
Action:           Increase
Adjustment:        20
Resulting Stock:  120
```

For a reduction:

``` text
Current Stock:    100
Action:           Reduce
Adjustment:        30
Resulting Stock:   70
```

## Database Models

Main MongoDB models:

``` text
User
Organization
OrganizationMember
Category
Product
InventoryTransaction
```

High-level relationship:

``` text
User
  │
  │ creates
  ▼
Organization
  │
  ├───────────────┐
  │               │
  ▼               ▼
Members        Categories
                  │
                  ▼
               Products
                  │
                  ▼
        Inventory Transactions
```

The complete database schema / ER diagram is included with the project
documentation.

## Environment Variables

### Server

Create:

``` text
server/.env
```

using `server/.env.example`.

Example:

``` env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/inventory_management

JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

CLIENT_URL=http://localhost:5173
```

### Client

Create:

``` text
client/.env
```

using `client/.env.example`.

Example:

``` env
VITE_API_BASE_URL=http://localhost:5000/api
```

Do not commit real `.env` files or secrets to GitHub.

## Installation

### Prerequisites

Install:

-   Node.js 18+
-   npm
-   MongoDB or MongoDB Atlas
-   Git

### 1. Clone

``` bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd inventory-management-system
```

### 2. Backend

``` bash
cd server
npm install
```

Create `server/.env` from `.env.example`.

Start the backend:

``` bash
npm start
```

Backend:

``` text
http://localhost:5000
```

### 3. Frontend

Open another terminal:

``` bash
cd client
npm install
```

Create `client/.env`:

``` env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the frontend:

``` bash
npm run dev
```

Frontend:

``` text
http://localhost:5173
```

## API Documentation

API documentation is provided through the included **Postman Collection
/ Swagger/OpenAPI documentation**.

For Postman, configure the API base URL as:

``` text
http://localhost:5000/api
```

Authentication uses HTTP-only cookies.

## Security

The application includes:

-   Password hashing
-   JWT authentication
-   HTTP-only cookies
-   Protected APIs
-   Role-based authorization
-   Zod request validation
-   Organization-aware access control
-   Environment-based secrets












## License

This project was developed as part of a technical assignment.
