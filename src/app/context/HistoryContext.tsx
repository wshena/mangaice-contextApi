'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';

type HistoryContextType = {
  mangaHistory: any[];
  addToHistory: (chapterData: any) => void;
  removeFromHistory: (chapterId: string) => void;
  clearAllHistory: () => void;
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory must be used within a HistoryProvider');
  }
  return context;
};

const HistoryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mangaHistory, setMangaHistory] = useState<any[]>([]);

  // Load mangaHistory from local storage when the component mounts
  useEffect(() => {
    const storedHistory = localStorage.getItem('mangaHistory');
    if (storedHistory) {
      setMangaHistory(JSON.parse(storedHistory));
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  const addToHistory = (chapterData: any) => {
    setMangaHistory((prevHistory) => {
        // Check if the chapter already exists in history
        const chapterExists = prevHistory.some((chapter) => chapter.id === chapterData.id);
        if (!chapterExists) {
          const updatedHistory = [...prevHistory, chapterData];
          localStorage.setItem('mangaHistory', JSON.stringify(updatedHistory));

          return updatedHistory;
        }
        return prevHistory;
    });
  };


  const removeFromHistory = (chapterId: string) => {
    setMangaHistory((prevHistory) => {
      const updatedHistory = prevHistory.filter((chapter) => chapter.id !== chapterId);
      localStorage.setItem('mangaHistory', JSON.stringify(updatedHistory));
      return updatedHistory;
    });
  };

  const clearAllHistory = () => {
    setMangaHistory([]);
    localStorage.removeItem('mangaHistory');
  };

  return (
    <HistoryContext.Provider value={{ mangaHistory, addToHistory, removeFromHistory, clearAllHistory }}>
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
