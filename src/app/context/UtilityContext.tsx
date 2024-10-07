'use client';
import React, { createContext, useContext, useState } from 'react';

interface UtilityContextType {
  sidebarClick: boolean;
  profileClick: boolean;
  handleSidebarClick: () => void;
  handleOnProfileClick: () => void;
  handleOffProfileClick: () => void;
  manga: any;
  setManga: any;
  saveMangaData: any;
  chapterArray:any;
  setChapterArray:any;
  saveChapterArray: any;
  chapterMenuClick:any;
  setChapterMenuClick:any;
  handlechapterMenuClick: any;
  chapterData:any;
  setChapterData:any;
  saveChapterData:any;
  nextChapter:any;
  setNextChapter:any;
  saveNextChapter:any;
  profileSettingClick: any;
  setProfileSettingClick :any;
  handleOnProfileSettingClick: () => void;
  handleOffProfileSettingClick: () => void;
  ChapterDisplaySetting:any;
  setChapterDisplaySetting:any;
  dataSaver:any;
  setDataSaver:any;
}

const UtilityContext = createContext<UtilityContextType | undefined>(undefined);

export const useUtilityContext = () => {
  const context = useContext(UtilityContext);
  if (!context) {
    throw new Error('useUtilityContext must be used within a UtilityProvider');
  }
  return context;
};

export const UtilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // profile settings click
  const [profileSettingClick, setProfileSettingClick] = useState(false)  
  const handleOnProfileSettingClick = () => setProfileSettingClick(true);
  const handleOffProfileSettingClick = () => setProfileSettingClick(false);
  
  // sidebar click
  const [sidebarClick, setSideBarClick] = useState<boolean>(false);
  const handleSidebarClick = () => {
    setSideBarClick(!sidebarClick);
  };

  // profile menu click
  const [profileClick, setProfileClick] = useState<boolean>(false);
  const handleOnProfileClick = () => {setProfileClick(true)};
  const handleOffProfileClick = () => {setProfileClick(false)};

  // manga detail
  const [manga, setManga] = useState<any>();
  const saveMangaData = (data: any) => {
    setManga(data);
    localStorage.setItem('manga', JSON.stringify(data)); // Save to localStorage
  };

  // chapter data
  const [chapterData, setChapterData] = useState<any>();
  const saveChapterData = (data: any) => {
    setManga(data);
    localStorage.setItem('chapterData', JSON.stringify(data)); // Save to localStorage
  };

  // chapter feed
  const [chapterArray, setChapterArray] = useState([])
  const saveChapterArray = (data:any) => {
    setChapterArray(data);
    localStorage.setItem('chapterFeed', JSON.stringify(data)); // Save to localStorage
  }

  // chapter menu click
  const [chapterMenuClick, setChapterMenuClick] = useState<boolean>(false);
  const handlechapterMenuClick = () => {
    setChapterMenuClick(!chapterMenuClick);
  };

  // next chapter
  const [nextChapter, setNextChapter] = useState<any>();
  const saveNextChapter = (data:any) => {
    setNextChapter(data);
    localStorage.setItem('nextChapter', JSON.stringify(data)); // Save to localStorage
  }

  // chapter page display setting
  const [ChapterDisplaySetting, setChapterDisplaySetting] = useState('Long Strip');

  // data saver or data
  const [dataSaver, setDataSaver] = useState(true);

  return (
    <UtilityContext.Provider
      value={{
        sidebarClick,
        handleSidebarClick,
        profileClick,
        handleOffProfileClick,
        handleOnProfileClick,
        manga,
        setManga,
        saveMangaData,
        chapterArray,
        setChapterArray,
        saveChapterArray,
        chapterMenuClick,
        setChapterMenuClick,
        handlechapterMenuClick,
        chapterData,
        setChapterData,
        saveChapterData,
        nextChapter,
        saveNextChapter,
        setNextChapter,
        profileSettingClick,
        setProfileSettingClick,
        handleOnProfileSettingClick,
        handleOffProfileSettingClick,
        ChapterDisplaySetting, 
        setChapterDisplaySetting,
        dataSaver,
        setDataSaver
      }}
    >
      {children}
    </UtilityContext.Provider>
  );
};
