# 🎨 UIWAI - AI-Powered UI Component Generator

UIWAI is a full-stack web platform that leverages AI to generate production-ready React UI components. Users can describe what they want, and the AI creates fully functional, styled components instantly.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Installation & Setup](#installation--setup)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Component Library](#component-library)
- [Key Features Explained](#key-features-explained)
- [Contributing](#contributing)

## 🌟 Overview

UIWAI democratizes UI design by using artificial intelligence to generate React components based on simple text descriptions. Whether you're a beginner looking to learn component design or a professional aiming to speed up development, UIWAI provides an efficient solution.

### Core Purpose
- **Generate UI Components**: Describe your component needs and get AI-generated React code
- **Live Preview**: See components render in real-time before saving
- **Component Library**: Access a curated library of pre-built components
- **Monetization**: Freemium model with premium features via Razorpay payment integration

## ✨ Features

### 🤖 AI Component Generation
- Generate React components using natural language descriptions
- Support for multiple AI models (Gemini, OpenRouter)
- Real-time component preview and validation
- Component code refinement and customization

### 👤 User Management
- Google OAuth authentication
- User dashboards and profiles
- Track saved components
- Component usage analytics

### 💳 Payment Integration
- Razorpay payment gateway integration
- Flexible pricing plans
- Subscription management
- Transaction tracking

### 📦 Pre-built Component Library
- Button components with variants
- Card designs (standard, laptop, movie ticket booking)
- Profile cards
- Extensible component system

### 🎨 Component Features
- Inline styling (no CSS files)
- Fully functional props with defaults
- Self-contained components
- Live code editing and preview

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js with ES Modules
- **Framework**: Express.js 5.x
- **Database**: MongoDB with Mongoose
- **Authentication**: Google OAuth, JWT
- **AI Integration**: Gemini API, OpenRouter API
- **Payments**: Razorpay SDK
- **Development**: Nodemon for hot reload

### Frontend
- **Framework**: React 19.x with Vite
- **Styling**: Tailwind CSS 4.x
- **State Management**: Redux Toolkit
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **UI Components**: React Icons, Sandpack React
- **Code Preview**: React Live
- **Authentication**: Firebase
- **Charts**: Recharts

### Component Library (uiwai-lib)
- **Build Tool**: tsup
- **Language**: TypeScript
- **Export Formats**: CommonJS & ES Modules
- **Package Type**: Dual distribution

## 📁 Project Structure

```
UIWAI/
├── backend/                    # Node.js/Express API Server
│   ├── config/                # Configuration files
│   │   ├── connectdb.js      # MongoDB connection
│   │   └── token.js          # Token utilities
│   ├── controllers/           # Route handlers
│   │   ├── aicomponent.controller.js    # Component generation
│   │   ├── auth.controller.js           # Authentication
│   │   ├── component.controller.js      # Component management
│   │   ├── payment.controller.js        # Payment processing
│   │   └── user.controller.js           # User management
│   ├── middleware/            # Express middleware
│   │   └── isAuth.js         # Authentication middleware
│   ├── models/               # MongoDB schemas
│   │   ├── component.model.js
│   │   ├── payment.model.js
│   │   └── user.model.js
│   ├── routers/              # API route definitions
│   │   ├── auth.route.js
│   │   ├── component.route.js
│   │   ├── payment.route.js
│   │   └── user.route.js
│   ├── utils/                # Utility functions
│   │   ├── gemini.js        # Gemini AI integration
│   │   ├── openRouter.js    # OpenRouter AI integration
│   │   ├── razorpay.js      # Razorpay utilities
│   │   └── repairComponent.js # Component validation
│   ├── validators/           # Data validators
│   │   └── reactValidator.js # React component validation
│   ├── index.js             # Entry point
│   └── package.json
│
├── frontend/                 # React + Vite Application
│   ├── src/
│   │   ├── Pages/           # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── AdminDashboard.jsx
│   │   │   ├── ComponentGenerator.jsx
│   │   │   ├── Componentspage.jsx
│   │   │   ├── MyComponentsPage.jsx
│   │   │   └── PricingPage.jsx
│   │   ├── Components/      # Reusable components
│   │   │   ├── Auth.jsx
│   │   │   └── LiveComponentPreview.jsx
│   │   ├── redux/           # State management
│   │   │   ├── store.js
│   │   │   └── userSlice.js
│   │   ├── utils/           # Utilities
│   │   │   └── firebase.js
│   │   ├── data/            # Static data
│   │   │   └── uiwaiLibraryComponents.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── public/              # Static assets
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── index.html
│   └── package.json
│
├── uiwai-lib/               # Published React Component Library
│   ├── src/
│   │   ├── components/
│   │   │   ├── buttons/     # Button components
│   │   │   ├── cards/       # Card components
│   │   │   ├── LaptopCard/
│   │   │   ├── MovieTicketBookingCard/
│   │   │   └── ProfileCards/
│   │   └── index.js         # Library entry point
│   ├── tsup.config.js       # Build configuration
│   └── package.json
│
├── Test/                    # Testing application
│   └── test-app/           # Vite + React test environment
│
└── .agents/                 # Agent configurations
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB (local or Atlas)
- Google OAuth credentials (from Google Cloud Console)
- Gemini API key or OpenRouter API key
- Firebase project setup
- Razorpay account (for payments)

### Installation & Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd UIWAI
```

#### 2. Backend Setup
```bash
cd backend
npm install
```

#### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

#### 4. Component Library Setup
```bash
cd ../uiwai-lib
npm install
npm run build
```

## 🔧 Environment Variables

### Backend (.env)
```env
# Server Configuration
PORT=5000
CLIENT_ORIGIN=http://localhost:5173

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/<dbname>

# Google OAuth
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>

# JWT
JWT_SECRET=<your-jwt-secret>

# AI Models
GEMINI_API_KEY=<your-gemini-api-key>
OPENROUTER_API_KEY=<your-openrouter-api-key>

# Payment
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
```

### Frontend (.env)
```env
VITE_SERVER_URL=http://localhost:5000
VITE_FIREBASE_API_KEY=<your-firebase-key>
VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-domain>
VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
```

## 📦 Running the Application

### Development Mode

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
# App runs on http://localhost:5173
```

### Production Build

#### Backend
```bash
cd backend
npm start
```

#### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/googleSignup` - Google OAuth signup
- `GET /api/auth/logout` - User logout

### Components
- `GET /api/component` - Get all components
- `POST /api/component/generate` - Generate new component with AI
- `GET /api/component/:id` - Get single component
- `PUT /api/component/:id` - Update component
- `DELETE /api/component/:id` - Delete component

### Users
- `GET /api/user/currentuser` - Get current logged-in user
- `GET /api/user/:id` - Get user by ID
- `PUT /api/user/:id` - Update user

### Payments
- `POST /api/payment/initiate` - Initiate Razorpay payment
- `POST /api/payment/verify` - Verify payment
- `GET /api/payment/history` - Get payment history

## 📚 Component Library

The `uiwai-lib` is a published React component library containing pre-built UI components.

### Available Components
- **Buttons**: Various button styles and variants
- **Cards**: Standard cards, laptop cards, movie ticket booking cards
- **Profile Cards**: User profile card components

### Using the Library
```bash
npm install uiwai-lib
```

```jsx
import { Button, Card, ProfileCard } from 'uiwai-lib';

function App() {
  return (
    <>
      <Button>Click Me</Button>
      <Card title="Sample">Content here</Card>
      <ProfileCard name="User" />
    </>
  );
}
```

## 🎯 Key Features Explained

### Component Generation Workflow
1. User describes desired component in natural language
2. AI processes the description using Gemini or OpenRouter
3. AI returns JSON with component code, props, and metadata
4. Component is validated by React validator
5. Live preview renders the component
6. User can refine and save the component

### Live Preview
- Real-time rendering of generated components
- Interactive prop manipulation
- Code editor with syntax highlighting
- Error boundary and debugging

### Admin Dashboard
- View all generated components
- Monitor user activity
- Manage pricing and promotions
- Analytics and statistics

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👥 Authors

- **Sumit** - Component Library Author

## 📞 Support

For issues, questions, or suggestions, please open an issue on the repository.

---

**Built with ❤️ using React, Node.js, and AI**
