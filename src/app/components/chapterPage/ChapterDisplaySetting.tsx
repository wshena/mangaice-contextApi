'use client';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { ChapterDisplay } from '@/app/utils/const';
import React, { useEffect, useState } from 'react'

const ChapterDisplaySetting = () => {
  const {ChapterDisplaySetting, setChapterDisplaySetting} = useUtilityContext();

  const [displaySetting, setDisplaySetting] = useState('Long Strip');
  const handleDisplaySetting = (setting:string) => setDisplaySetting(setting);

  useEffect(() => {
    setChapterDisplaySetting(displaySetting);
  }, [displaySetting]);

  return (
    <div className="border-t border-t-lightGray pt-[.9rem]">
      <ul className="flex flex-col gap-[10px]">
        {ChapterDisplay.map((setting:string) => {
          return (
            <li key={setting}>
              <button 
                onClick={() => handleDisplaySetting(setting)}
                className={`rounded-[5px] text-center w-full p-[.5rem] bg-secondary ${displaySetting === setting ? 'opacity-100' : 'opacity-70'}`}>{setting}</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChapterDisplaySetting