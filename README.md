# Invoice Management Application

A modern, responsive invoice management application built with React, TypeScript, and Tailwind CSS.

## Features

### Dashboard
- **Dashboard Cards**: Display total paid, overdue, draft, and unpaid invoices with counts and amounts
- **Invoice Actions**: Quick access to create new invoices, change settings, and manage customers
- **Recent Invoices**: List of recent invoices grouped by date with status indicators
- **Recent Activities**: Timeline of recent invoice-related activities

### Invoice Details
- **Complete Invoice View**: Detailed invoice information including sender, customer, items, and payment details
- **Status Management**: Visual status indicators (PAID, OVERDUE, DRAFT, PENDING PAYMENT, PARTIAL PAYMENT)
- **Activity Timeline**: Chronological log of all invoice activities
- **Payment Information**: Bank details and payment instructions
- **Reminder Settings**: Configurable payment reminder preferences

### Responsive Design
- **Mobile-First**: Optimized for mobile devices with responsive sidebar and navigation
- **Desktop Experience**: Full-featured desktop interface with sidebar navigation
- **Touch-Friendly**: Mobile-optimized buttons and interactions

## Technology Stack

- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Mock API** - Simulated backend with realistic data

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ActivityList.tsx
│   ├── DashboardCards.tsx
│   ├── Error.tsx
│   ├── Header.tsx
│   ├── InvoiceActions.tsx
│   ├── InvoiceDetails.tsx
│   ├── InvoiceList.tsx
│   ├── Layout.tsx
│   └── Loader.tsx
├── pages/              # Page-level components
│   ├── Dashboard.tsx
│   └── InvoiceDetailsPage.tsx
├── services/           # API and data services
│   └── api.ts
├── types/              # TypeScript type definitions
│   └── index.ts
├── App.tsx             # Main application component
└── main.tsx           # Application entry point
```

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## API Endpoints (Mock)

The application includes a mock API service that simulates real backend functionality:

- `GET /api/invoices` - Fetch all invoices
- `GET /api/invoices/:id` - Fetch invoice by ID
- `GET /api/dashboard/stats` - Fetch dashboard statistics
- `GET /api/activities` - Fetch recent activities
- `PUT /api/invoices/:id/status` - Update invoice status
- `POST /api/invoices` - Create new invoice

## Features Implemented

✅ **Responsive Design** - Mobile and desktop optimized
✅ **Loading States** - Spinner animations during data fetching
✅ **Error Handling** - User-friendly error messages with retry functionality
✅ **Type Safety** - Full TypeScript implementation
✅ **Clean Architecture** - Well-organized component structure
✅ **Mock Backend** - Realistic data simulation
✅ **Navigation** - React Router implementation
✅ **Modern UI** - Clean, professional design matching provided mockups

## Design Compliance

The application faithfully implements the provided designs:
- **Homepage**: Dashboard with cards, actions, recent invoices, and activities
- **Invoice Details**: Comprehensive invoice view with all sections and activity timeline
- **Responsive Behavior**: Mobile-first approach with desktop enhancements
- **Visual Elements**: Status badges, action buttons, and layout matching the designs

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development

The project uses modern development practices:
- **ESLint** for code linting
- **TypeScript** for type checking
- **Vite** for fast development and building
- **Tailwind CSS** for styling