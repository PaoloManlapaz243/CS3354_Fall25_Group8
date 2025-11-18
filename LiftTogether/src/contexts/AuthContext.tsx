import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (email: string, password: string, username: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock database for demonstration
const mockUsers: Array<{ email: string; password: string; username: string }> = [
  { email: 'PreviousUser@gmail.com', password: 'GeorgeWashington1', username: 'PreviousUser' }
];

// Email validation
const validateEmail = (email: string): { valid: boolean; error?: string } => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    return { valid: false, error: 'Please ensure you have entered a valid email' };
  }
  
  return { valid: true };
};

// Password validation
const validatePassword = (password: string): { valid: boolean; error?: string } => {
  if (!/[A-Z]/.test(password)) {
    return { valid: false, error: 'Please include a capital letter in your password' };
  }
  
  if (!/[0-9]/.test(password)) {
    return { valid: false, error: 'Please include a number in your password' };
  }
  
  if (password.length < 12) {
    return { valid: false, error: 'Please make sure your password is at least 12 characters long' };
  }
  
  return { valid: true };
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<{ success: boolean; error?: string }> => {
    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    // Check if user exists in mock database
    const foundUser = mockUsers.find(u => u.email === email);
    
    if (!foundUser) {
      return { success: false, error: 'Click here to create an account' };
    }

    if (foundUser.password !== password) {
      return { success: false, error: 'Incorrect password' };
    }

    // Login successful
    setUser({
      id: Math.random().toString(),
      email: foundUser.email,
      username: foundUser.username
    });

    return { success: true };
  };

  const register = async (email: string, password: string, username: string): Promise<{ success: boolean; error?: string }> => {
    // Validate email format
    const emailValidation = validateEmail(email);
    if (!emailValidation.valid) {
      return { success: false, error: emailValidation.error };
    }

    // Check if email already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      return { success: false, error: 'Email already in use' };
    }

    // Validate password format
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.valid) {
      return { success: false, error: passwordValidation.error };
    }

    // Register new user
    mockUsers.push({ email, password, username });
    
    setUser({
      id: Math.random().toString(),
      email,
      username
    });

    return { success: true };
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
