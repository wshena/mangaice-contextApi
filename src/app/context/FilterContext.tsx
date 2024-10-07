'use client';
import React, { createContext, useContext, useState } from 'react';

interface FilterContextType {
  order:any;
  contentRating:any;
  publicationDemographic:any;
  status:any;
  includeTags:any;
  excludeTags:any;
}

const FilterContext = createContext<any | undefined>(undefined);

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error('useFilterContext must be used within a FilterProvider');
  }
  return context;
};

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [order, setOrder] = useState('');
  const [contentRating, setContentRating] = useState([]);
  const [publicationStatus, setPublicationStatus] = useState([]);
  const [publicationDemographic, setPublicationDemographic] = useState([]);
  const [includedTagsFilter, setIncludedTagsFilter] = useState([]);
  const [excludedTagsFilter, setExcludedTagsFilter] = useState([]);

  const resetAllFilters = () => {
    setOrder('');
    setContentRating([]);
    setPublicationStatus([]);
    setPublicationDemographic([]);
    setIncludedTagsFilter([]);
    setExcludedTagsFilter([]);
  }

  const [resetButtonClick, setResetButtonClick] = useState(false);
  const handleResetButtonClick = () => {
    // Ketika tombol diklik, set langsung ke true
    setResetButtonClick(true);
  
    // Setelah beberapa waktu, set kembali ke false
    setTimeout(() => {
      setResetButtonClick(false);
    }, 1); // 1 ms
  };

  return (
    <FilterContext.Provider
      value={{
        order,
        setOrder,
        contentRating,
        setContentRating,
        publicationStatus,
        setPublicationStatus,
        publicationDemographic,
        setPublicationDemographic,
        includedTagsFilter,
        setIncludedTagsFilter,
        excludedTagsFilter,
        setExcludedTagsFilter,
        resetAllFilters,
        resetButtonClick,
        setResetButtonClick,
        handleResetButtonClick
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
