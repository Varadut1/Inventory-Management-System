# Inventory Management System

### Deployed API URL
-inventory-management-system-git-8c5eeb-varads-projects-6d4aa35c.vercel.app/

### Published Documentation
https://documenter.getpostman.com/view/24278561/2sA3XMjj8g

### Postman Collection URL
https://blue-shuttle-105097.postman.co/workspace/Team-Workspace~920b85c8-469d-4eb0-80b9-48b57ece57ed/collection/24278561-e0c11c9b-da6c-4440-91ca-cef553f633c2?action=share&creator=24278561&active-environment=24278561-b9f18ddc-cff2-4933-97f8-7aafa5701c16

## Overview

This is an Inventory and Cart Management System built using Node.js and Express. It provides functionalities to manage customers, inventory items, discounts, and customer carts. The project utilizes JSON files to persist data and ensures consistent state management across different operations.

## Features

- Customer management (sign up, login, authentication)
- Inventory management (add, remove items)
- Cart management (add items to cart, view cart, get total value of cart)
- Discount management (create and apply discounts)
- JSON-based data storage
- Authentication using bearer tokens

## Project Structure

-├── controllers # Controller logic for different entities
-│ ├── customerController.js # Handles customer authentication
-│ ├── cartController.js # Manages cart operations
-│ ├── discountController.js # Manages discount operations
-│ └── inventoryController.js # Manages inventory operations
-│
-├── data # JSON files for data storage
-│ ├── cart.json # Stores cart information
-│ ├── customers.json # Stores customer information
-│ ├── discounts.json # Stores discount information
-│ └── inventory.json # Stores inventory information
-│
-├── models # Data models
-│ ├── Cart.js # Cart model
-│ ├── Customer.js # Customer model
-│ ├── Discount.js # Discount model
-│ └── Inventory.js # Inventory model
-│
-├── routes # API routes
-│ ├── customerRoutes.js # Routes for authentication
-│ ├── cartRoutes.js # Routes for cart operations
-│ ├── discountRoutes.js # Routes for discount operations
-│ └── inventoryRoutes.js # Routes for inventory operations
-│
-├── utils # Utility functions
-│ ├── appError.js # Custom error handling
-│ ├── catchAsync.js # Async error handling
-│ ├── jsonOp.js # JSON file operations
-│
-├── app.js # Application setup
-└── server.js # Server setup and configuration



## Getting Started

### Prerequisites

- Node.js installed on your machine

### Installation

1. Clone the repository:
    ```bash
    git clone <repository-url>
    ```
2. Navigate to the project directory:
    ```bash
    cd inventory-cart-management
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Application

1. Start the server:
    ```bash
    npm start
    ```
2. The server will start on `http://localhost:3000`

### API Endpoints

#### Auth Routes

- `POST /customer`: Sign up a new customer
- `POST /customer/login`: Login an existing customer

#### Inventory Routes

- `POST /inventory`: Add a new inventory item - Name, type and quantity is required
- `DELETE /inventory`: Remove an inventory item - productId and quantity is required

#### Cart Routes

- `POST /cart`: Add an item to the cart
- `GET /cart`: Get the current cart of the logged-in customer

#### Discount Routes

- `POST /discount`: Create a new discount
- `POST /discount/apply`: Apply a discount to the cart

### Authentication

This project uses bearer tokens for authentication. Include the token in the `Authorization` header as `Bearer <token>` for protected routes.

### JSON Data Files

- `cart.json`: Stores cart information
- `customers.json`: Stores customer information
- `discounts.json`: Stores discount information
- `inventory.json`: Stores inventory information

### Utility Functions

- `jsonOp.js`: Provides functions to read and write JSON files
- `tokenUtils.js`: Provides functions to generate and verify JWT tokens
- `appError.js`: Custom error handling
- `catchAsync.js`: Utility to catch errors in async functions

