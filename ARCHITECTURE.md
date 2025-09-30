# Application Architecture

## Overview

This invoice management application follows a modern React architecture with clear separation of concerns, type safety, and scalable patterns.

## Architecture Principles

### 1. Component-Based Architecture
- **Reusable Components**: UI components are designed for reusability across the application
- **Composition over Inheritance**: Complex components are built by composing simpler ones
- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: All components have well-defined TypeScript interfaces

### 2. State Management
- **Local State**: Component-specific state using `useState` and `useEffect`
- **Context API**: Global state management for authentication and notifications
- **Custom Hooks**: Reusable stateful logic extraction
- **State Lifting**: Shared state is lifted to common parent components

### 3. Data Flow
- **Unidirectional**: Data flows down through props, events flow up through callbacks
- **Context Providers**: Global state is provided at the application root level
- **Service Layer**: API calls are abstracted into service modules
- **Error Boundaries**: Error handling at component boundaries

## Application Structure

```
src/
├── components/          # UI Components
│   ├── ui/             # Base UI Components
│   │   ├── Spinner.tsx
│   │   ├── Toast.tsx
│   │   └── LoadingOverlay.tsx
│   ├── __tests__/      # Component Tests
│   ├── Button.tsx      # Reusable Button
│   ├── Loader.tsx      # Loading States
│   ├── Error.tsx       # Error Display
│   ├── Login.tsx       # Authentication Forms
│   ├── Signup.tsx
│   ├── Header.tsx      # Layout Components
│   ├── Sidebar.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   ├── DashboardCards.tsx
│   ├── InvoiceActions.tsx
│   ├── InvoiceList.tsx
│   ├── InvoiceModal.tsx
│   ├── InvoiceDetails.tsx
│   ├── ActivityList.tsx
│   └── ActivityItem.tsx
├── contexts/           # React Context Providers
│   ├── AuthContext.tsx # Authentication State
│   └── ToastContext.tsx # Notification System
├── pages/              # Page-Level Components
│   ├── Dashboard.tsx   # Main Dashboard
│   └── Auth.tsx        # Authentication Page
├── services/           # External Services
│   ├── api.ts         # Mock API Service
│   └── AuthService.ts # Firebase Authentication
├── types/              # TypeScript Definitions
│   └── index.ts       # Shared Type Definitions
├── config/             # Configuration
│   ├── firebase.ts    # Firebase Config
│   └── firebase-direct.ts
├── utils/              # Utility Functions
│   └── helpers.ts     # Helper Functions
├── test/               # Test Setup
│   └── setup.ts       # Test Configuration
├── App.tsx             # Root Component
├── main.tsx           # Application Entry Point
└── index.css          # Global Styles
```

## Component Hierarchy

```
App
├── ToastProvider
│   └── AuthProvider
│       └── AppRoutes
│           ├── Auth (Login/Signup)
│           └── ProtectedRoute
│               └── Layout
│                   ├── Header
│                   ├── Sidebar
│                   └── Dashboard
│                       ├── DashboardCards
│                       ├── InvoiceActions
│                       ├── InvoiceList
│                       │   └── InvoiceModal
│                       │       └── InvoiceDetails
│                       └── ActivityList
│                           └── ActivityItem
```

## Data Flow Architecture

### 1. Authentication Flow
```
User Action → AuthService → Firebase → AuthContext → Components
     ↓
Toast Notifications
```

### 2. Dashboard Data Flow
```
Dashboard → API Service → Mock Data → State Update → UI Render
     ↓
Loading States & Error Handling
```

### 3. Modal Data Flow
```
Invoice Click → Modal Open → API Fetch → State Update → Details Render
     ↓
Loading States & Error Handling
```

## State Management Strategy

### 1. Local Component State
```typescript
// Component-specific state
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [data, setData] = useState<DataType | null>(null);
```

### 2. Context State
```typescript
// Global authentication state
const AuthContext = createContext<AuthContextType>();

// Global notification state
const ToastContext = createContext<ToastContextType>();
```

### 3. Custom Hooks
```typescript
// Reusable stateful logic
const useAuth = () => useContext(AuthContext);
const useToast = () => useContext(ToastContext);
```

## Service Layer Architecture

### 1. API Service (`src/services/api.ts`)
- **Mock Data**: Provides realistic mock data for development
- **Consistent Interface**: All methods return `ApiResponse<T>` format
- **Error Handling**: Proper error responses and status codes
- **Type Safety**: Full TypeScript support with proper typing

### 2. Authentication Service (`src/services/AuthService.ts`)
- **Firebase Integration**: Handles all Firebase authentication
- **Error Mapping**: Converts Firebase errors to user-friendly messages
- **User Conversion**: Transforms Firebase User to application AuthUser
- **Provider Support**: Email/password and Google authentication

## Component Design Patterns

### 1. Presentational vs Container Components
```typescript
// Presentational Component (UI only)
const Button: React.FC<ButtonProps> = ({ onClick, text, ...props }) => {
  return <button onClick={onClick} {...props}>{text}</button>;
};

// Container Component (Logic + UI)
const Dashboard: React.FC = () => {
  const [data, setData] = useState(null);
  // ... logic
  return <DashboardUI data={data} />;
};
```

### 2. Compound Components
```typescript
// Modal with multiple related components
const InvoiceModal = {
  Root: ModalRoot,
  Header: ModalHeader,
  Content: ModalContent,
  Footer: ModalFooter
};
```

### 3. Render Props Pattern
```typescript
// Flexible rendering with children function
const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [data, setData] = useState(null);
  return children({ data, setData });
};
```

## Error Handling Strategy

### 1. Component Level
```typescript
// Local error state with fallback UI
const [error, setError] = useState<string | null>(null);

if (error) {
  return <ErrorComponent message={error} onRetry={handleRetry} />;
}
```

### 2. Context Level
```typescript
// Global error handling with toast notifications
const { showError } = useToast();

try {
  await riskyOperation();
} catch (error) {
  showError(error.message);
}
```

### 3. Service Level
```typescript
// Service-level error handling
const fetchData = async () => {
  try {
    const response = await api.getData();
    return { success: true, data: response };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
```

## Performance Optimization Patterns

### 1. Memoization
```typescript
// Component memoization
const MemoizedComponent = React.memo(Component);

// Value memoization
const expensiveValue = useMemo(() => heavyCalculation(data), [data]);

// Callback memoization
const handleClick = useCallback(() => onAction(id), [id, onAction]);
```

### 2. Lazy Loading
```typescript
// Component lazy loading
const LazyComponent = React.lazy(() => import('./LazyComponent'));

// Route-based code splitting
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
```

### 3. Virtual Scrolling
```typescript
// For large lists (future enhancement)
const VirtualizedList = ({ items, renderItem }) => {
  // Implementation for virtual scrolling
};
```

## Testing Architecture

### 1. Test Structure
```
src/components/__tests__/
├── Button.test.tsx           # Unit Tests
├── Spinner.test.tsx
├── Loader.test.tsx
└── Login.integration.test.tsx # Integration Tests
```

### 2. Testing Patterns
```typescript
// Component Testing
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected')).toBeInTheDocument();
  });

  it('handles interactions', () => {
    const mockFn = vi.fn();
    render(<Component onClick={mockFn} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### 3. Mocking Strategy
```typescript
// Service mocking
vi.mock('../services/AuthService', () => ({
  authService: {
    login: vi.fn(),
    register: vi.fn()
  }
}));

// Context mocking
const MockAuthProvider = ({ children }) => (
  <AuthContext.Provider value={mockAuthValue}>
    {children}
  </AuthContext.Provider>
);
```

## Accessibility Architecture

### 1. ARIA Implementation
```typescript
// Semantic HTML with ARIA attributes
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>

<div role="status" aria-live="polite">
  {loading ? 'Loading...' : 'Content loaded'}
</div>
```

### 2. Keyboard Navigation
```typescript
// Keyboard event handling
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') onClose();
  if (e.key === 'Enter') onSubmit();
};
```

### 3. Focus Management
```typescript
// Focus management for modals
useEffect(() => {
  if (isOpen) {
    const firstFocusable = modalRef.current?.querySelector('[tabindex="0"]');
    firstFocusable?.focus();
  }
}, [isOpen]);
```

## Scalability Considerations

### 1. Code Organization
- **Feature-based structure**: Group related components by feature
- **Shared utilities**: Common functions in utils directory
- **Type definitions**: Centralized type definitions
- **Service abstraction**: Clear separation of concerns

### 2. Performance
- **Bundle splitting**: Route-based code splitting
- **Image optimization**: Lazy loading and optimization
- **Caching strategy**: API response caching
- **Virtual scrolling**: For large data sets

### 3. Maintainability
- **Documentation**: Comprehensive JSDoc comments
- **Testing**: High test coverage with meaningful tests
- **Linting**: Consistent code style and error prevention
- **Type safety**: Full TypeScript implementation

## Future Enhancements

### 1. State Management
- **Redux Toolkit**: For complex state management
- **React Query**: For server state management
- **Zustand**: Lightweight state management alternative

### 2. Real-time Features
- **WebSockets**: Real-time updates
- **Server-Sent Events**: Live notifications
- **Firebase Realtime Database**: Real-time data sync

### 3. Advanced Features
- **Offline Support**: Service workers and caching
- **PWA**: Progressive Web App capabilities
- **Internationalization**: Multi-language support
- **Theming**: Dark/light mode support
