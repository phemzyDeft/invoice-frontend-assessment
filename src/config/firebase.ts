import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBVniDOYafvpJyq8UTwx4LfTy0gBI6uJdk",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "invoice-app-21370.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "invoice-app-21370",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "invoice-app-21370.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "265658450363",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:265658450363:web:737de594f1434c189d449e",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-45EVDT14FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Debug: Log Firebase config (remove in production)
console.log('Firebase Config:', {
  apiKey: firebaseConfig.apiKey.substring(0, 10) + '...',
  authDomain: firebaseConfig.authDomain,
  projectId: firebaseConfig.projectId,
  fullConfig: firebaseConfig // Add this to see the full config
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

// Verify auth is properly initialized
console.log('Auth instance:', auth);

export default app;
