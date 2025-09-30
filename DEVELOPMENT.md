# Development Guide

## Development Setup

### Prerequisites
- Node.js 18+ and npm 8+
- Git
- Code editor (VS Code recommended)
- Firebase project with Authentication enabled

### Initial Setup
```bash
# Clone and install
git clone <repository-url>
cd invoice-app
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your Firebase configuration

# Start development server
npm run dev
```

## Code Organization

### File Naming Conventions
- **Components**: PascalCase (`Button.tsx`, `InvoiceList.tsx`)
- **Hooks**: camelCase starting with 'use' (`useAuth.ts`)
- **Services**: camelCase (`authService.ts`, `apiService.ts`)
- **Types**: camelCase (`index.ts`)
- **Tests**: Component name + `.test.tsx` (`Button.test.tsx`)

### Directory Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components
│   ├── __tests__/      # Component tests
│   └── *.tsx           # Feature components
├── contexts/           # React Context providers
├── pages/              # Page-level components
├── services/           # API and external services
├── types/              # TypeScript definitions
├── config/             # Configuration files
└── test/               # Test setup
```

## Component Development

### Component Structure
```typescript
import React from 'react';

/**
 * Component documentation
 */
interface ComponentProps {
  /** Prop documentation */
  propName: string;
  /** Optional prop documentation */
  optionalProp?: boolean;
}

/**
 * Component description
 * 
 * @param {ComponentProps} props - Component props
 * @returns {JSX.Element} Component
 */
const Component: React.FC<ComponentProps> = ({ 
  propName, 
  optionalProp = false 
}) => {
  // Component logic here
  
  return (
    <div>
      {/* Component JSX */}
    </div>
  );
};

export default Component;
```

### Component Guidelines

1. **Single Responsibility**: Each component should have one clear purpose
2. **Props Interface**: Always define TypeScript interfaces for props
3. **Documentation**: Add JSDoc comments for all components and functions
4. **Default Props**: Use default parameters for optional props
5. **Error Boundaries**: Wrap components in error boundaries when appropriate

### State Management

#### Local State
```typescript
const [state, setState] = useState<StateType>(initialValue);
```

#### Context State
```typescript
const { user, login } = useAuth();
const { showSuccess } = useToast();
```

#### Custom Hooks
```typescript
const useCustomHook = () => {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Side effects
  }, []);
  
  return { data, setData };
};
```

## Styling Guidelines

### Tailwind CSS Usage
```typescript
// Responsive classes
<div className="w-full sm:w-1/2 lg:w-1/3">

// Conditional classes
<div className={`base-class ${condition ? 'conditional-class' : ''}`}>

// Component variants
const buttonVariants = {
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-200 text-gray-800'
};
```

### CSS Organization
- Use Tailwind utility classes
- Create component-specific classes only when necessary
- Use CSS variables for theme colors
- Follow mobile-first responsive design

## Testing Guidelines

### Test Structure
```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Component from '../Component';

describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
  });

  it('handles user interactions', () => {
    const mockFn = vi.fn();
    render(<Component onClick={mockFn} />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockFn).toHaveBeenCalled();
  });
});
```

### Testing Best Practices

1. **Test Behavior**: Test what users see and do, not implementation details
2. **Accessibility**: Test with screen readers and keyboard navigation
3. **Error States**: Test error handling and edge cases
4. **Mocking**: Mock external dependencies and APIs
5. **Coverage**: Aim for meaningful test coverage, not just numbers

### Test Types

#### Unit Tests
- Test individual components in isolation
- Mock all external dependencies
- Focus on component behavior and props

#### Integration Tests
- Test component interactions
- Test complete user flows
- Use real context providers when possible

## Error Handling

### Component Error Handling
```typescript
const Component = () => {
  const [error, setError] = useState<string | null>(null);
  
  const handleAction = async () => {
    try {
      await riskyOperation();
    } catch (err) {
      setError(err.message);
    }
  };
  
  if (error) {
    return <ErrorComponent message={error} onRetry={handleAction} />;
  }
  
  return <div>Component content</div>;
};
```

### Global Error Handling
```typescript
// Error boundary for components
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    
    return this.props.children;
  }
}
```

## Performance Optimization

### React Performance
```typescript
// Memoization for expensive calculations
const expensiveValue = useMemo(() => {
  return heavyCalculation(data);
}, [data]);

// Callback memoization
const handleClick = useCallback(() => {
  onAction(id);
}, [id, onAction]);

// Component memoization
const MemoizedComponent = React.memo(Component);
```

### Bundle Optimization
- Use dynamic imports for code splitting
- Lazy load components when possible
- Optimize images and assets
- Use Tree shaking for unused code

## Accessibility Guidelines

### ARIA Labels
```typescript
<button aria-label="Close modal" onClick={onClose}>
  <CloseIcon />
</button>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    onClose();
  }
};
```

### Screen Reader Support
```typescript
<div role="status" aria-live="polite">
  {loading ? 'Loading...' : 'Content loaded'}
</div>
```

## Code Quality

### ESLint Configuration
The project uses ESLint with React and TypeScript rules:

```json
{
  "extends": [
    "@eslint/js/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "@typescript-eslint/no-unused-vars": "error"
  }
}
```

### TypeScript Configuration
```json
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

## Git Workflow

### Branch Naming
- `feature/feature-name` - New features
- `bugfix/bug-description` - Bug fixes
- `hotfix/critical-fix` - Critical fixes
- `refactor/component-name` - Code refactoring

### Commit Messages
```
type(scope): description

feat(auth): add Google sign-in
fix(dashboard): resolve loading state issue
refactor(components): extract reusable button component
docs(readme): update installation instructions
```

### Pull Request Process
1. Create feature branch from `main`
2. Make changes with tests
3. Run linting and tests
4. Create pull request with description
5. Code review and approval
6. Merge to main

## Debugging

### Development Tools
- **React DevTools**: Component inspection
- **Redux DevTools**: State debugging (if using Redux)
- **Network Tab**: API request debugging
- **Console**: Error logging and debugging

### Common Issues

#### Firebase Configuration
```typescript
// Check Firebase config
console.log('Firebase Config:', firebaseConfig);

// Verify auth state
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log('Auth state changed:', user);
  });
  return unsubscribe;
}, []);
```

#### Component Rendering
```typescript
// Debug component props
console.log('Component props:', props);

// Debug state changes
useEffect(() => {
  console.log('State changed:', state);
}, [state]);
```

## Deployment

### Build Process
```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Run tests before deployment
npm run test:run
```

### Environment Variables
Ensure all environment variables are configured in your deployment platform:
- Firebase configuration
- API endpoints
- Feature flags

### Performance Monitoring
- Use React DevTools Profiler
- Monitor bundle size
- Check Core Web Vitals
- Monitor error rates

## Troubleshooting

### Common Problems

#### Firebase Authentication Not Working
1. Check Firebase configuration
2. Verify Authentication is enabled in Firebase Console
3. Check browser console for errors
4. Verify API keys and domains

#### Components Not Rendering
1. Check import paths
2. Verify component exports
3. Check for TypeScript errors
4. Inspect React DevTools

#### Tests Failing
1. Check test setup
2. Verify mocks are working
3. Check async operations
4. Verify test environment

### Getting Help
1. Check existing issues in repository
2. Create detailed bug reports
3. Include error messages and steps to reproduce
4. Provide system information (OS, Node version, etc.)

## Contributing

### Before Contributing
1. Read the codebase
2. Understand the architecture
3. Check existing issues
4. Discuss major changes in issues

### Contribution Guidelines
1. Follow coding standards
2. Add tests for new features
3. Update documentation
4. Ensure all tests pass
5. Follow the PR template

### Code Review Process
1. Automated checks (linting, tests)
2. Peer review
3. Architecture review for major changes
4. Final approval and merge
