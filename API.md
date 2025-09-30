# API Documentation

## Overview

This application uses a mock API service for demonstration purposes. In a production environment, this would be replaced with a real REST API or GraphQL endpoint.

## Mock API Service (`src/services/api.ts`)

### Types

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

interface DashboardStats {
  totalPaid: number;
  totalOverdue: number;
  totalDraft: number;
  totalUnpaid: number;
}

interface Invoice {
  id: string;
  invoiceNumber: string;
  customer: Customer;
  sender: Sender;
  issueDate: string;
  dueDate: string;
  currency: string;
  items: InvoiceItem[];
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  totalAmount: number;
  status: 'PAID' | 'OVERDUE' | 'DRAFT' | 'PENDING PAYMENT' | 'PARTIAL PAYMENT';
  reminders: Reminder[];
  paymentInfo: PaymentInfo;
  note: string;
  createdAt: string;
}

interface Activity {
  id: string;
  description: string;
  timestamp: string;
  amount?: number;
  details?: string;
}
```

### Methods

#### `getDashboardStats(): Promise<ApiResponse<DashboardStats>>`
Returns dashboard statistics including totals for different invoice statuses.

**Response:**
```typescript
{
  success: true,
  data: {
    totalPaid: 125000,
    totalOverdue: 15000,
    totalDraft: 8500,
    totalUnpaid: 32000
  }
}
```

#### `getInvoices(): Promise<ApiResponse<Invoice[]>>`
Returns a list of all invoices.

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "inv-001",
      invoiceNumber: "INV-2024-001",
      customer: { /* customer data */ },
      // ... other invoice properties
    }
  ]
}
```

#### `getInvoiceById(id: string): Promise<ApiResponse<Invoice>>`
Returns a specific invoice by ID.

**Parameters:**
- `id` (string): The invoice ID

**Response:**
```typescript
{
  success: true,
  data: {
    id: "inv-001",
    invoiceNumber: "INV-2024-001",
    // ... invoice data
  }
}
```

#### `getRecentActivities(): Promise<ApiResponse<Activity[]>>`
Returns recent activities for the dashboard.

**Response:**
```typescript
{
  success: true,
  data: [
    {
      id: "act-001",
      description: "Invoice INV-2024-001 was paid",
      timestamp: "2024-01-15T10:30:00Z",
      amount: 2500,
      details: "Payment received via bank transfer"
    }
  ]
}
```

## Firebase Authentication Service (`src/services/AuthService.ts`)

### Types

```typescript
interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}
```

### Methods

#### `register(email: string, password: string, displayName: string): Promise<UserCredential>`
Registers a new user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password
- `displayName` (string): User's display name

**Returns:** Firebase UserCredential object

#### `login(email: string, password: string): Promise<UserCredential>`
Signs in an existing user with email and password.

**Parameters:**
- `email` (string): User's email address
- `password` (string): User's password

**Returns:** Firebase UserCredential object

#### `googleSignIn(): Promise<UserCredential>`
Signs in a user using Google authentication.

**Returns:** Firebase UserCredential object

#### `logout(): Promise<void>`
Signs out the current user.

#### `convertToAuthUser(user: User): AuthUser`
Converts Firebase User object to application AuthUser interface.

**Parameters:**
- `user` (User): Firebase User object

**Returns:** AuthUser object

### Error Handling

The AuthService includes comprehensive error handling with user-friendly messages:

- **auth/email-already-in-use**: "This email is already registered"
- **auth/invalid-email**: "Please enter a valid email address"
- **auth/weak-password**: "Password should be at least 6 characters"
- **auth/user-not-found**: "No account found with this email"
- **auth/wrong-password**: "Incorrect password"
- **auth/too-many-requests**: "Too many failed attempts. Please try again later"

## Context APIs

### AuthContext

Provides authentication state and methods throughout the application.

```typescript
interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  googleSignIn: () => Promise<void>;
  logout: () => Promise<void>;
}
```

**Usage:**
```typescript
import { useAuth } from '../contexts/AuthContext';

const { user, login, logout, loading } = useAuth();
```

### ToastContext

Provides toast notification functionality.

```typescript
interface ToastContextType {
  showToast: (message: string, type: ToastProps['type'], duration?: number) => void;
  showSuccess: (message: string) => void;
  showError: (message: string) => void;
  showInfo: (message: string) => void;
  showWarning: (message: string) => void;
}
```

**Usage:**
```typescript
import { useToast } from '../contexts/ToastContext';

const { showSuccess, showError } = useToast();

// Show success message
showSuccess('Operation completed successfully!');

// Show error message
showError('Something went wrong!');
```

## Component APIs

### Button Component

```typescript
interface ButtonProps {
  onClick?: () => void;
  text?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}
```

**Usage:**
```typescript
<Button 
  size="lg" 
  text="Click Me" 
  onClick={() => console.log('clicked')}
  className="custom-class"
/>
```

### Spinner Component

```typescript
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
}
```

**Usage:**
```typescript
<Spinner size="lg" color="primary" />
```

### Loader Component

```typescript
interface LoaderProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white';
  className?: string;
  message?: string;
}
```

**Usage:**
```typescript
<Loader size="md" message="Loading data..." />
```

## Error Handling

### API Errors

All API methods return a consistent response format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}
```

**Success Response:**
```typescript
{
  success: true,
  data: { /* actual data */ }
}
```

**Error Response:**
```typescript
{
  success: false,
  data: null,
  message: "Error description"
}
```

### Authentication Errors

Authentication errors are handled by the AuthService and converted to user-friendly messages. The AuthContext automatically shows toast notifications for all authentication actions.

### Component Error States

Components include comprehensive error handling:

- **Loading States**: Show spinners while data is being fetched
- **Error States**: Display error messages with retry functionality
- **Empty States**: Handle cases where no data is available
- **Fallback UI**: Graceful degradation when components fail

## Testing APIs

### Component Testing

All components include comprehensive test coverage:

```typescript
// Example test structure
describe('ComponentName', () => {
  it('renders with default props', () => {
    render(<ComponentName />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const mockFn = vi.fn();
    render(<ComponentName onClick={mockFn} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
```

### Integration Testing

Integration tests cover complete user flows:

```typescript
describe('Login Integration', () => {
  it('handles successful login', async () => {
    renderWithProviders(<Login />);
    // Test complete login flow
  });
});
```

## Future API Enhancements

### Real API Integration

To integrate with a real API, replace the mock service with:

1. **REST API Client** (using fetch or axios)
2. **GraphQL Client** (using Apollo or Relay)
3. **Real-time Updates** (using WebSockets or Server-Sent Events)

### Additional Endpoints

Consider adding these endpoints for a complete invoice management system:

- `POST /api/invoices` - Create new invoice
- `PUT /api/invoices/:id` - Update invoice
- `DELETE /api/invoices/:id` - Delete invoice
- `POST /api/invoices/:id/send` - Send invoice to customer
- `POST /api/invoices/:id/reminder` - Send payment reminder
- `GET /api/customers` - Get customer list
- `POST /api/customers` - Create new customer

### Data Validation

Implement comprehensive data validation:

- **Client-side**: Form validation with libraries like Yup or Zod
- **Server-side**: API validation and sanitization
- **Type Safety**: Runtime type checking for API responses
