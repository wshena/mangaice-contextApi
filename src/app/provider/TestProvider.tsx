import { ReactNode } from 'react';
import { ThemeProvider } from '@/app/context/ThemeContext';
import { AuthProvider } from '@/app/context/AuthContext';
import { UtilityProvider } from '@/app/context/UtilityContext';
import { FilterProvider } from '@/app/context/FilterContext';
import LibraryProvider from '../context/LibraryContext';
import HistoryProvider from '../context/HistoryContext';

interface Props {
  children: ReactNode;
}

const TestProviders = ({ children }: Props) => {
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

export default TestProviders;
