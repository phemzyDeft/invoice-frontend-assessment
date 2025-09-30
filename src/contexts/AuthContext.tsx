import React, { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase-direct';
import { authService, type AuthUser } from '../services/AuthService';
import { useToast } from './ToastContext';

/**
 * Authentication context interface
 * Provides authentication state and methods throughout the application
 */
interface AuthContextType {
  /** Current authenticated user or null */
  user: AuthUser | null;
  /** Loading state for authentication operations */
  loading: boolean;
  /** Login with email and password */
  login: (email: string, password: string) => Promise<void>;
  /** Register new user with email, password, and display name */
  register: (email: string, password: string, displayName: string) => Promise<void>;
  /** Sign in with Google */
  googleSignIn: () => Promise<void>;
  /** Logout current user */
  logout: () => Promise<void>;
}

/**
 * Authentication Context
 * 
 * Manages authentication state and provides authentication methods
 * throughout the application using React Context API.
 * 
 * Features:
 * - Firebase Authentication integration
 * - Toast notifications for auth actions
 * - Persistent authentication state
 * - Error handling with user feedback
 */
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: User | null) => {
      if (firebaseUser) {
        setUser(authService.convertToAuthUser(firebaseUser));
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setLoading(true);
    try {
      await authService.login(email, password);
      showSuccess('Successfully logged in!');
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      setLoading(false);
      showError(error.message || 'Login failed. Please try again.');
      throw error;
    }
  };

  const register = async (email: string, password: string, displayName: string): Promise<void> => {
    setLoading(true);
    try {
      await authService.register(email, password, displayName);
      showSuccess('Account created successfully!');
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      setLoading(false);
      showError(error.message || 'Registration failed. Please try again.');
      throw error;
    }
  };

  const googleSignIn = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.googleSignIn();
      showSuccess('Successfully signed in with Google!');
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      setLoading(false);
      showError(error.message || 'Google sign-in failed. Please try again.');
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await authService.logout();
      showSuccess('Successfully logged out!');
      // User state will be updated by onAuthStateChanged
    } catch (error: any) {
      setLoading(false);
      showError(error.message || 'Logout failed. Please try again.');
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    login,
    register,
    googleSignIn,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
