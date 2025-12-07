# Aura API Documentation

## Auth
- `POST /api/auth/signup` - Register a new user
    - Body: `{ name, email, password }`
- `POST /api/auth/login` - Login user
    - Body: `{ email, password }`
    - Returns: `{ _id, name, email, role, token }`
- `GET /api/auth/me` - Get current user (Private)

## Products
- `GET /api/products` - Get all products
    - Query: `?keyword=...&category=...&pageNumber=...`
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

## Users
- `GET /api/users` - Get all users (Admin)
- `PUT /api/users/me` - Update profile (Private)

## Cart
- `GET /api/cart` - Get user cart (Private)
- `POST /api/cart` - Add to cart (Private)
    - Body: `{ productId, qty, selectedSize }`
- `PUT /api/cart` - Update item qty (Private)
- `DELETE /api/cart/:itemId` - Remove item (Private)

## Orders
- `POST /api/orders` - Create order (Private)
- `GET /api/orders` - Get all orders (Admin)
- `GET /api/orders/myorders` - Get user orders (Private)

## Contact
- `POST /api/contact` - Submit message
    - Body: `{ name, email, message }`

## Authentication
Add `Authorization: Bearer <token>` header to protected requests.
