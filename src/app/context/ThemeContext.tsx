'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context type
type ThemeContextType = {
  theme: string;
  setTheme: (newTheme: string) => void;
  toggleTheme: () => void;
};

// Create the ThemeContext
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Hook to use the theme context
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark'; // Retrieve theme from localStorage or default to 'dark'
    }
    return 'dark';
  });

  const toggleTheme = () => {
    // Cycle through the themes
    const themes = ['light', 'dark', 'slate', 'dracula'];
    const currentThemeIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentThemeIndex + 1) % themes.length];
    setTheme(nextTheme);
    localStorage.setItem('theme', nextTheme); // Save theme to localStorage
  };

  useEffect(() => {
    // Apply the theme to the document
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
