import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { AuthProvider } from '../../contexts/AuthContext';
import { ToastProvider } from '../../contexts/ToastContext';

// Mock Firebase
vi.mock('../../config/firebase-direct', () => ({
  auth: {
    currentUser: null
  },
  googleProvider: {}
}));

// Mock Firebase Auth functions
vi.mock('firebase/auth', () => ({
  onAuthStateChanged: vi.fn(() => () => {}),
  signInWithEmailAndPassword: vi.fn(),
  createUserWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
  updateProfile: vi.fn()
}));

// Mock AuthService
vi.mock('../../services/AuthService', () => ({
  authService: {
    login: vi.fn(),
    googleSignIn: vi.fn(),
    convertToAuthUser: vi.fn((user) => ({
      uid: user?.uid || 'test-uid',
      email: user?.email || 'test@example.com',
      displayName: user?.displayName || 'Test User'
    }))
  }
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          {component}
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
};

describe('Login Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders login form', () => {
    renderWithProviders(<Login onSwitchToSignup={() => {}} />);
    
    expect(screen.getByText('Sign in to your account')).toBeInTheDocument();
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /continue with google/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    renderWithProviders(<Login onSwitchToSignup={() => {}} />);
    
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(submitButton);
    
    expect(submitButton).toBeDisabled();
  });

  it('validates required fields', async () => {
    renderWithProviders(<Login onSwitchToSignup={() => {}} />);
    
    const emailInput = screen.getByLabelText('Email address');
    const passwordInput = screen.getByLabelText('Password');
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    fireEvent.click(submitButton);
    
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('switches to signup when link is clicked', () => {
    const mockSwitchToSignup = vi.fn();
    renderWithProviders(<Login onSwitchToSignup={mockSwitchToSignup} />);
    
    const signupLink = screen.getByText('create a new account');
    fireEvent.click(signupLink);
    
    expect(mockSwitchToSignup).toHaveBeenCalledTimes(1);
  });

  it('handles Google sign-in', async () => {
    renderWithProviders(<Login onSwitchToSignup={() => {}} />);
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i });
    fireEvent.click(googleButton);
    
    expect(googleButton).toBeDisabled();
  });

  it('is responsive', () => {
    renderWithProviders(<Login onSwitchToSignup={() => {}} />);
    
    // Check that the form container has responsive classes
    const formContainer = screen.getByText('Sign in to your account').closest('div')?.parentElement;
    expect(formContainer).toHaveClass('max-w-md', 'w-full');
    
    const inputs = screen.getAllByRole('textbox');
    inputs.forEach(input => {
      expect(input).toHaveClass('w-full');
    });
    
    // Check responsive button classes
    const submitButton = screen.getByRole('button', { name: /sign in/i });
    expect(submitButton).toHaveClass('w-full');
  });
});
