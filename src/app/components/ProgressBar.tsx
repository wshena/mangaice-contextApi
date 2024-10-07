'use client';
import { useReadingProgress } from "../context/ReadingProgressContext";
import { useThemeContext } from "../context/ThemeContext";
import { useEffect, useState } from 'react';
import { useUtilityContext } from "../context/UtilityContext";

const ProgressBar = ({ totalImages }: { totalImages: number }) => {
  const { progress } = useReadingProgress();
  const {theme} = useThemeContext();
  const { ChapterDisplaySetting } = useUtilityContext();

  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Update progress percentage based on the current scroll position
      const scrolled = (scrollTop / scrollHeight) * 100;
      setProgressPercentage(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`fixed bottom-0 left-0 w-full bg-gray-300 h-2 mt-4 ${ChapterDisplaySetting !== 'Long Strip' && 'hidden'}`}>
      <div
        className={`${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} h-2 transition-all duration-300`}
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
