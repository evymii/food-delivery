# Food Delivery Application

A modern food delivery application built with Next.js (frontend) and Express.js (backend) with TypeScript support.

## 🚀 Features

- **User Authentication**: Secure login/register with JWT tokens
- **Food Catalog**: Browse food items by categories
- **Shopping Cart**: Add/remove items with quantity management
- **Order Management**: Place and track orders
- **Admin Panel**: Manage food items and orders
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Type Safety**: Full TypeScript support

## 🏗️ Project Structure

```
├── frontend/                 # Next.js frontend application
│   ├── src/
│   │   ├── app/             # App router pages
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React context providers
│   │   ├── lib/             # Utility functions and API
│   │   ├── types/           # TypeScript type definitions
│   │   └── hooks/           # Custom React hooks
│   └── public/              # Static assets
├── backend2/                 # Express.js backend API
│   ├── src/
│   │   ├── config/          # Configuration files
│   │   ├── controllers/     # Route controllers
│   │   ├── middleware/      # Express middleware
│   │   ├── models/          # MongoDB models
│   │   └── routes/          # API routes
│   └── package.json
└── README.md
```

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible UI components
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend

- **Express.js** - Node.js web framework
- **TypeScript** - Type safety
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing
- **CORS** - Cross-origin resource sharing

## 📦 Installation

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend2
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```env
MONGOOSE_URL=mongodb://localhost:27017/food-delivery
PORT=4000
NODE_ENV=development
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=2h
FRONTEND_URL=http://localhost:3000
```

4. Start the development server:

```bash
npm run dev
```

The backend will be running on `http://localhost:4000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the frontend directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

4. Start the development server:

```bash
npm run dev
```

The frontend will be running on `http://localhost:3000`

## 🔧 Development

### Available Scripts

**Backend:**

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

**Frontend:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Code Structure

#### Frontend Components

- **Layout Components**: `Nav`, `Footer`, `ErrorBoundary`
- **Feature Components**: `Cart`, `FoodDetail`, `OrderSection`
- **UI Components**: `Button`, `Card`, `LoadingSpinner`
- **Form Components**: `LoginForm`, `SignupForm`

#### Backend Structure

- **Controllers**: Handle business logic
- **Models**: MongoDB schemas
- **Routes**: API endpoints
- **Middleware**: Authentication, error handling
- **Config**: Environment configuration

## 🔐 Authentication

The application uses JWT tokens for authentication:

1. **Login**: POST `/api/auth/signin`
2. **Register**: POST `/api/auth/signup`
3. **Protected Routes**: Use `authenticateToken` middleware

## 📱 API Endpoints

### Authentication

- `POST /api/auth/signin` - User login
- `POST /api/auth/signup` - User registration
- `GET /api/auth/profile` - Get user profile

### Food

- `GET /api/food` - Get all food items
- `GET /api/food/:id` - Get food by ID
- `GET /api/food/category/:id` - Get food by category

### Categories

- `GET /api/categories` - Get all categories

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/:id` - Get order by ID

## 🚀 Deployment

### Backend Deployment

1. Set up environment variables for production
2. Build the application: `npm run build`
3. Deploy to your preferred platform (Heroku, Vercel, etc.)

### Frontend Deployment

1. Set up environment variables for production
2. Build the application: `npm run build`
3. Deploy to Vercel or your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter any issues or have questions, please open an issue on GitHub.
