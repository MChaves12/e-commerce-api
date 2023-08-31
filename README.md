# E-Commerce API built with Node.js and Express

This is a RESTful API for an E-Commerce platform built using Node.js and Express. It provides endpoints for managing products, users, orders, and more, serving as the backend foundation for your E-Commerce application.

## Features

- **Product Management:** CRUD operations for managing products, including creation, editing, updating, and deletion.
- **User Authentication:** Secure user registration and login using JWT (JSON Web Tokens) for authentication.
- **Reviews Management:** CRUD operations for managing reviews for the products, including creation, editing, updating, and deletion.
- **Order Processing:** Endpoints to handle creating and managing orders.
- **Cart Functionality:** Manage user shopping carts and handle cart-related operations.
- **Authorization and Authentication:** Ensure secure access to routes using middleware for authorization and authentication.
- **Validation:** Request data validation using libraries like Joi to ensure data integrity.
- **Database Integration:** Interaction with a database MongoDB to store and retrieve data.
- **Error Handling:** Centralized error handling and consistent response format for API errors.

## Installation

1. Clone the repository: `git clone https://github.com/MChaves12/e-commerce-api.git`
2. Navigate to the project directory: `cd e-commerce-api`
3. Install dependencies: `npm install`
4. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add your configuration for the database connection, JWT secret, etc.

## Usage

1. Start the server: `npm run dev`
2. The API will be available at `http://localhost:5000` by default (you can configure this in the `.env` file).
3. Use tools like Postman or Insomnia to interact with the API's endpoints.

## API Endpoints

- `GET /products`: Get a list of all products.
- `GET /products/:id`: Get details of a specific product.
- `POST /products`: Create a new product.
- `PUT /products/:id`: Update details of a product.
- `DELETE /products/:id`: Delete a product.
- ... (similar endpoints for users, orders, authentication, etc.)

For a full list of API endpoints and their details, refer to the documentation.

## Documentation

The detailed API documentation can be found .

## Contributing

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push the branch to your fork: `git push origin feature/your-feature-name`
5. Open a pull request, detailing the changes you've made.

Happy coding!
