'use client';
import React, { createContext, useContext, useState } from 'react';

interface ReadingProgressContextType {
  progress: number[];
  setProgress: React.Dispatch<React.SetStateAction<number[]>>;
}

const ReadingProgressContext = createContext<ReadingProgressContextType | undefined>(undefined);

export const ReadingProgressProvider = ({ children }: { children: React.ReactNode }) => {
  const [progress, setProgress] = useState<number[]>([]); // Array untuk menyimpan progress tiap gambar
  
  return (
    <ReadingProgressContext.Provider value={{ progress, setProgress }}>
      {children}
    </ReadingProgressContext.Provider>
  );
};

export const useReadingProgress = () => {
  const context = useContext(ReadingProgressContext);
  if (!context) {
    throw new Error('useReadingProgress harus digunakan di dalam ReadingProgressProvider');
  }
  return context;
};
