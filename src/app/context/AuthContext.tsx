'use client';
import bcrypt from 'bcryptjs';  // Import bcrypt for password hashing
import React, { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  username: string;
  password: string;
  token: string;
  library: any[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  signUp: (username: string, password: string) => boolean;
  logout: () => void;
  updateUser: (newUsername?: string, newPassword?: string) => boolean;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  
    // RATE LIMITING - Track login attempts
  const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
  const MAX_ATTEMPTS = 5;
  
  const checkRateLimit = (): boolean => {
    const loginAttempts = JSON.parse(localStorage.getItem('loginAttempts') || '[]');
    const now = Date.now();
    const recentAttempts = loginAttempts.filter((time: number) => now - time < RATE_LIMIT_WINDOW);

    if (recentAttempts.length >= MAX_ATTEMPTS) {
      return false; // Block login
    }

    localStorage.setItem('loginAttempts', JSON.stringify([...recentAttempts, now]));
    return true;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    if (storedUser && storedToken) {
      const userData: User = JSON.parse(storedUser);
      setUser(userData);
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
  	if (!username || username.trim() === '') {
      console.error('Username cannot be empty');
      return false;
    }
    
    if (!checkRateLimit()) {
      console.log('Too many login attempts. Please try again later.');
      return false;
    }
    
    const storedUser = localStorage.getItem(username);
    if (storedUser) {
      const userData: User = JSON.parse(storedUser);
      const passwordMatch = bcrypt.compareSync(password, userData.password); // Compare hashed password
      if (passwordMatch) {
        setUser(userData);
        setToken(userData.token);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(userData)); // Save to key 'user'
        localStorage.setItem('token', userData.token);
        return true;
      }
    }
    return false;
  };

  const signUp = (username: string, password: string): boolean => {
    const storedUser = localStorage.getItem(username);
    if (!storedUser) {
      const salt = bcrypt.genSaltSync(10); // Generate salt
      const hashedPassword = bcrypt.hashSync(password, salt); // Hash password

      const userData = {
        username,
        password: hashedPassword,  // Store hashed password
        token: 'dummy-token', // Replace with a real token
        library: [],
      };

      localStorage.setItem('user', JSON.stringify(userData)); // Save to key 'user'
      localStorage.setItem(username, JSON.stringify(userData)); // Save user under their username
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    router.push('/');
  };

  const updateUser = (newUsername?: string, newPassword?: string): boolean => {
    if (user) {
      const oldUsername = user.username;
      const updatedUser = {
        ...user,
        username: newUsername || user.username,
        password: newPassword ? bcrypt.hashSync(newPassword, bcrypt.genSaltSync(10)) : user.password, // Rehash if password updated
      };

      setUser(updatedUser);
      localStorage.removeItem(oldUsername); // Remove old username data
      localStorage.setItem(updatedUser.username, JSON.stringify(updatedUser)); // Save updated user data
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        signUp,
        logout,
        updateUser,
        setUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
