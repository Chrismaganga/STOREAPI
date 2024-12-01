Express API with TypeScript and PostgreSQL
Description
This is a RESTful API built with Express.js, TypeScript, and PostgreSQL. The API supports managing users, products, and orders, providing endpoints for creating, retrieving, updating, and deleting resources. Authentication and authorization are implemented using JSON Web Tokens (JWT).

Features
Products:

View all products.
View details of a single product.
Add new products (requires authentication).
View products by category.
Top 5 most popular products (optional).
Users:

Create a user account.
Retrieve all users (requires authentication).
View user details (requires authentication).
Orders:

View the current active order by user (requires authentication).
View completed orders by user (optional, requires authentication).
Add products to orders.
Authentication:

JWT-based authentication for secure endpoints.
Technologies Used
Backend:

Express.js
TypeScript
PostgreSQL
pg
bcrypt for password hashing.
jsonwebtoken for authentication.
Development Tools:

Nodemon for live reloading during development.
ESLint for linting.
Prettier for code formatting.
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/Chrismaganga/STOREAPI.git
cd STOREAPI
Install dependencies:

bash
Copy code
npm install
Create a .env file in the project root and configure it with the following variables:

plaintext
Copy code
PORT=3000
POSTGRES_HOST=localhost
POSTGRES_DB=store
POSTGRES_TEST_DB=store_test
POSTGRES_USER=your_user
POSTGRES_PASSWORD=your_password
BCRYPT_SALT_ROUNDS=10
JWT_SECRET=your_secret_key
Initialize the database:

Create the database:

bash
Copy code
createdb store
Run the migrations to create tables:

bash
Copy code
npm run migrate
Seed the database with sample data (optional):

bash

npm run seed
Start the development server:

bash

npm start
The server will start on http://localhost:3000/api.

Scripts
npm run build: Builds the project for production.
npm run dev: Runs the development server with live reloading.
npm run start: Starts the production server.
npm run lint: Runs ESLint to check code quality.
npm run migrate: Runs database migrations.
npm run seed: Seeds the database with sample data.
npm run test: Runs unit and integration tests.
API Endpoints
Products
Method	Endpoint	Description	Auth Required
GET	/api/products	Get all products	No
GET	/api/products/:id	Get a single product	No
POST	/api/products	Add a new product	Yes
GET	/api/products/top	Get top 5 products	No
GET	/api/products/category	Get products by category	No
Users
Method	Endpoint	Description	Auth Required
POST	/api/users	Create a new user	No
GET	/api/users	Get all users	Yes
GET	/api/users/:id	Get a user by ID	Yes
Orders
Method	Endpoint	Description	Auth Required
GET	/api/orders/:userId	Get the current active order	Yes
GET	/api/orders/completed	Get completed orders by user	Yes
POST	/api/orders	Create a new order	Yes
Project Structure
bash
Copy code
src/
├── config/
│   └── database.ts           # Database connection
├── controllers/
│   ├── productController.ts  # Product endpoints logic
│   ├── userController.ts     # User endpoints logic
│   └── orderController.ts    # Order endpoints logic
├── middlewares/
│   └── authMiddleware.ts     # JWT-based authentication middleware
├── models/
│   ├── productModel.ts       # Product data access
│   ├── userModel.ts          # User data access
│   └── orderModel.ts         # Order data access
├── routes/
│   ├── productRoutes.ts      # Product routes
│   ├── userRoutes.ts         # User routes
│   └── orderRoutes.ts        # Order routes
├── types/
│   ├── product.ts            # Product types
│   ├── user.ts               # User types
│   └── order.ts              # Order types
├── utils/
│   └── tokenUtils.ts         # JWT token generation and validation
├── app.ts                    # Express app configuration
├── server.ts                 # Server entry point
└── migrations/               # Database migration files
Testing
Run the tests:

bash
Copy code
npm run test
View test coverage:

bash
Copy code
npm run test:coverage
Contributing
Fork the repository.
Create a feature branch (git checkout -b feature-name).
Commit your changes (git commit -m 'Add some feature').
Push to the branch (git push origin feature-name).
Open a pull request.
