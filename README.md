# E-Commerce Platform

A modern full-stack e-commerce application built with React, Node.js, and MongoDB. This project demonstrates a complete online shopping experience with product browsing, user authentication, shopping cart, and order management.

## 📋 Overview

This is a complete e-commerce solution with separate frontend and backend implementations. The platform allows users to:

- Browse and filter products
- Manage user accounts
- Add items to cart
- Place and track orders
- View product details with images

## ✨ Features

### User Features

- **User Authentication**: Sign up, sign in, and secure session management
- **Product Browse**: View all products with pagination and filtering
- **Product Search**: Search and filter products by category and price
- **Shopping Cart**: Add/remove items, manage quantities
- **Order Management**: Place orders and view order history
- **User Profile**: View and manage user information

### Admin/Store Features

- **Product Management**: Add, update, and delete products
- **Category Management**: Organize products by categories
- **Order Tracking**: Monitor customer orders
- **Inventory Management**: Track product stock

## 🛠 Tech Stack

### Backend

- **Node.js** - JavaScript runtime
- **Express.js** - RESTful API framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication & authorization
- **Bcrypt** - Password encryption
- **CORS** - Cross-Origin Resource Sharing
- **Dotenv** - Environment variable management

### Frontend

- **React 19** - UI library
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Zustand** - State management
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Radix UI** - Accessible UI components
- **Axios** - HTTP client library

### Development Tools

- **Nodemon** - Development server auto-reload
- **ESLint** - Code linting
- **Tailwind CSS** - Styling

## 📦 Installation

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local or cloud instance)

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
```

4. Start the development server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory (if needed):

```env
VITE_API_URL=http://localhost:5000
```

4. Start the development server:

```bash
npm run dev
```

The frontend will typically run on `http://localhost:5173`

## 📁 Project Structure

```
Ecommerce/
├── backend/
│   ├── src/
│   │   ├── controllers/       # API logic
│   │   ├── models/           # Database schemas
│   │   ├── routes/           # API endpoints
│   │   ├── middlewares/      # Custom middleware
│   │   ├── libs/             # Database connection
│   │   ├── server.js         # Express app setup
│   │   └── seeder.js         # Database seeding
│   ├── package.json
│   └── README.md
│
└── frontend/
    ├── src/
    │   ├── components/       # Reusable React components
    │   ├── pages/           # Page components
    │   ├── services/        # API calls
    │   ├── stores/          # Zustand state management
    │   ├── hooks/           # Custom React hooks
    │   ├── types/           # TypeScript types
    │   ├── lib/             # Utilities
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    ├── vite.config.ts
    ├── tsconfig.json
    └── README.md
```

## 🚀 Running the Application

### Development Mode

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

### Production Build

**Backend:**

```bash
cd backend
npm start
```

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

## 🔗 API Endpoints

### Authentication Routes

- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - Login user
- `POST /api/auth/logout` - Logout user

### Product Routes

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create new product (admin)
- `PUT /api/products/:id` - Update product (admin)
- `DELETE /api/products/:id` - Delete product (admin)

### Cart Routes

- `GET /api/cart` - Get user's cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove from cart

### Order Routes

- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/:id` - Get order details

### User Routes

- `GET /api/users/:id` - Get user profile
- `PUT /api/users/:id` - Update user profile

## 🎨 UI Components

The frontend includes reusable UI components built with Radix UI:

- Button
- Card
- Input
- Checkbox
- Radio Group
- Dropdown Menu
- Slider
- Badge
- Pagination
- Separator

## 🔐 Security Features

- JWT-based authentication
- Password encryption with bcrypt
- CORS protection
- Secure HTTP-only cookies
- Input validation and sanitization

## 📝 Available Scripts

### Backend

- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check the `MONGO_URI` in your `.env` file
- Verify database credentials

### CORS Errors

- Ensure backend and frontend origins are correctly configured
- Check CORS settings in `server.js`

### Port Already in Use

- Change the port in `.env` or use `PORT=3001 npm run dev`

## 📚 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://react.dev/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the ISC License.

## 👨‍💻 Author

Created as a full-stack e-commerce platform project.

---

**Happy Coding! 🎉**
