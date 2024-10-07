'use client';
import React from 'react';
import { UtilityProvider } from '@/app/context/UtilityContext';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import HistoryProvider from '../context/HistoryContext';
import LibraryProvider from '../context/LibraryContext';
import { FilterProvider } from '../context/FilterContext';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LibraryProvider>
          <UtilityProvider>
            <HistoryProvider>
              <FilterProvider>
                {children}
              </FilterProvider>
            </HistoryProvider>
          </UtilityProvider>
        </LibraryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
