'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

type LibraryContextType = {
  library: any[];
  addToLibrary: (chapterData: any) => void;
  removeFromLibrary: (chapterId: string) => void;
  clearLibrary: () => void;
};

const HistoryContext = createContext<LibraryContextType | undefined>(undefined);

export const useLibrary = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // get user data
  const { user, setUser } = useAuthContext();

  const [library, setLibrary] = useState<any[]>([]);

  // jika sudah ada data library di user, set data ini ke globalcontext
  useEffect(() => {
    if (user) {
      setLibrary(user.library);
    }
  }, [user]);

  // add manga to user library
  const addToLibrary = (manga: any) => {
    if (!user) return;

    const updatedLibrary = [...library, manga];
    setLibrary(updatedLibrary);

    const updatedUser = { ...user, library: updatedLibrary };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // remove specific manga from user library
  const removeFromLibrary = (mangaId: string) => {
    if (!user) return;

    const updatedLibrary = library.filter(manga => manga.id !== mangaId);
    setLibrary(updatedLibrary);

    const updatedUser = { ...user, library: updatedLibrary };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // clear all manga from user library
  const clearLibrary = () => {
    if (!user) return;

    setLibrary([]);

    const updatedUser = { ...user, library: [] };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };


  return (
    <HistoryContext.Provider value={{ library, addToLibrary, removeFromLibrary, clearLibrary }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default LibraryProvider;
