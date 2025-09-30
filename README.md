# Invoice Management Application

A modern, responsive invoice management application built with React, TypeScript, and Firebase Authentication. This application provides a comprehensive dashboard for managing invoices, viewing statistics, and tracking activities.

## 🚀 Features

### Authentication
- **Email/Password Authentication** - Secure user registration and login
- **Google Sign-In** - One-click authentication with Google
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Toast Notifications** - Real-time feedback for all authentication actions

### Dashboard
- **Statistics Cards** - Overview of total paid, overdue, draft, and unpaid invoices
- **Invoice Actions** - Quick access to create, manage, and configure invoices
- **Recent Invoices** - Chronologically organized invoice list with status indicators
- **Recent Activities** - Real-time activity feed with user actions and timestamps
- **Modal Details** - Detailed invoice view in a responsive modal overlay

### UI/UX
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Loading States** - Centralized loading components with consistent animations
- **Error Handling** - Comprehensive error states with retry functionality
- **Toast Notifications** - Success, error, warning, and info notifications
- **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

### Development
- **TypeScript** - Full type safety and enhanced developer experience
- **Component Architecture** - Modular, reusable components with clear separation of concerns
- **Testing** - Comprehensive unit and integration tests with Vitest
- **Code Quality** - ESLint configuration and consistent code formatting

## 🛠️ Technology Stack

- **Frontend**: React 19.1.1, TypeScript, Tailwind CSS
- **Authentication**: Firebase Authentication
- **Routing**: React Router DOM
- **Testing**: Vitest, React Testing Library, jsdom
- **Build Tool**: Vite
- **Package Manager**: npm

## 📦 Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (Spinner, Toast, etc.)
│   ├── __tests__/       # Component tests
│   ├── Button.tsx       # Reusable button component
│   ├── Loader.tsx       # Loading state component
│   ├── Login.tsx        # Authentication login form
│   ├── Signup.tsx       # Authentication signup form
│   ├── DashboardCards.tsx
│   ├── InvoiceActions.tsx
│   ├── InvoiceList.tsx
│   ├── InvoiceModal.tsx
│   ├── InvoiceDetails.tsx
│   ├── ActivityList.tsx
│   ├── ActivityItem.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   └── Error.tsx
├── contexts/            # React Context providers
│   ├── AuthContext.tsx  # Authentication state management
│   └── ToastContext.tsx # Toast notification system
├── pages/               # Page-level components
│   ├── Dashboard.tsx    # Main dashboard page
│   └── Auth.tsx         # Authentication page
├── services/            # API and external services
│   ├── api.ts          # Mock API service
│   └── AuthService.ts  # Firebase authentication service
├── types/               # TypeScript type definitions
│   └── index.ts
├── config/              # Configuration files
│   ├── firebase.ts     # Firebase configuration
│   └── firebase-direct.ts
├── test/                # Test setup and utilities
│   └── setup.ts
├── App.tsx              # Main application component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v8 or higher)
- Firebase project with Authentication enabled

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd invoice-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Configuration**
   
   Create a Firebase project and enable Authentication:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication with Email/Password and Google providers
   - Get your Firebase configuration

4. **Environment Variables**
   
   Create a `.env` file in the root directory:
   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm run test

# Run tests once
npm run test:run

# Run tests with UI (requires vitest/ui)
npm run test:ui
```

### Test Coverage
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Complete user flows and interactions
- **Mocking**: Firebase services and external dependencies

## 📱 Responsive Design

The application is built with a mobile-first approach using Tailwind CSS:

- **Mobile**: 320px - 639px
- **Tablet**: 640px - 1023px  
- **Desktop**: 1024px - 1279px
- **Large Desktop**: 1280px+

### Breakpoint Usage
```css
/* Mobile first */
.class { /* base styles */ }

/* Small screens and up */
sm:class { /* 640px+ */ }

/* Medium screens and up */
md:class { /* 768px+ */ }

/* Large screens and up */
lg:class { /* 1024px+ */ }

/* Extra large screens and up */
xl:class { /* 1280px+ */ }
```

## 🎨 Component Architecture

### Design Principles

1. **Single Responsibility** - Each component has one clear purpose
2. **Reusability** - Components are designed to be reused across the application
3. **Composition** - Complex components are built from simpler ones
4. **Props Interface** - Clear, typed interfaces for all component props
5. **Accessibility** - ARIA labels, keyboard navigation, and screen reader support

### Component Types

- **UI Components** (`src/components/ui/`) - Base components like buttons, spinners
- **Feature Components** - Specific functionality like invoice lists, forms
- **Page Components** (`src/pages/`) - Full page layouts
- **Layout Components** - Headers, sidebars, navigation

## 🔧 Development Best Practices

### Code Style
- **TypeScript** - Strict type checking enabled
- **ESLint** - Consistent code formatting and error detection
- **JSDoc** - Comprehensive documentation for all functions and components
- **Naming Conventions** - PascalCase for components, camelCase for functions

### State Management
- **React Context** - Global state for authentication and notifications
- **Local State** - Component-specific state with useState and useEffect
- **Custom Hooks** - Reusable stateful logic

### Error Handling
- **Try-Catch Blocks** - Comprehensive error catching in async operations
- **Error Boundaries** - React error boundaries for component error handling
- **User Feedback** - Toast notifications for all user actions
- **Fallback UI** - Loading states and error states for better UX

## 🔐 Security Considerations

### Authentication
- **Firebase Authentication** - Industry-standard authentication service
- **Protected Routes** - Automatic redirection for unauthenticated users
- **Token Management** - Automatic token refresh and validation
- **Secure Storage** - No sensitive data stored in localStorage

### Data Protection
- **Environment Variables** - Sensitive configuration in .env files
- **API Security** - Proper error handling without exposing sensitive information
- **Input Validation** - Client-side validation for all user inputs

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deployment Options
- **Vercel** - Recommended for React applications
- **Netlify** - Static site hosting with CI/CD
- **Firebase Hosting** - Integrated with Firebase services
- **AWS S3 + CloudFront** - Scalable static hosting

### Environment Configuration
Ensure all environment variables are properly configured in your deployment platform.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🙏 Acknowledgments

- **Firebase** - Authentication and backend services
- **Tailwind CSS** - Utility-first CSS framework
- **React Testing Library** - Testing utilities
- **Vite** - Fast build tool and development server

## 📞 Support

For support, email oluwafemidave.a@gmail.com or create an issue in the repository.

---

**Built with ❤️ using React, TypeScript, and Firebase**
