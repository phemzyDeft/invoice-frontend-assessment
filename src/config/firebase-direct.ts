import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Direct Firebase configuration (as shown in Firebase console)
const firebaseConfig = {
  apiKey: "AIzaSyBVniDOYafvpJyq8UTwx4LfTy0gBI6uJdk",
  authDomain: "invoice-app-21370.firebaseapp.com",
  projectId: "invoice-app-21370",
  storageBucket: "invoice-app-21370.firebasestorage.app",
  messagingSenderId: "265658450363",
  appId: "1:265658450363:web:737de594f1434c189d449e",
  measurementId: "G-45EVDT14FC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Google Auth Provider
export const googleProvider = new GoogleAuthProvider();

console.log('Firebase initialized with direct config');
console.log('Auth instance:', auth);
console.log('Project ID:', firebaseConfig.projectId);

export default app;
