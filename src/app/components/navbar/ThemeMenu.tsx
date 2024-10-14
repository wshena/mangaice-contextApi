'use client'
import { useThemeContext } from '@/app/context/ThemeContext';
import { Themes } from '@/app/utils/const';
import { ArrowLeftIcon, CheckIcon } from '@/app/utils/Icon';
import React from 'react'

const ThemeMenu = ({ handleOff }: { handleOff: () => void }) => {
  const { theme, setTheme } = useThemeContext();

  return (
    <div className="p-4 bg-primary rounded-md">
      {/* Header with Back Button */}
      <div className="flex items-center gap-2 mb-4">
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleOff();
        }}
        className='p-2 rounded bg-secondary-hover flex items-center justify-center'
      >
        <ArrowLeftIcon size={20} className='text-color' />
      </button>

        <span className='font-bold text-color text-lg'>Select Theme</span>
      </div>

      {/* Theme List */}
      <ul className="space-y-2">
        {Themes.map((t) => {
          return (
            <li
              key={t}
              className={`flex items-center justify-between p-3 rounded cursor-pointer hover:bg-neutral transition-colors ${
                theme === t ? 'bg-neutral' : ''
              }`}
              onClick={(e:any) => {
                e.stopPropagation();
                e.preventDefault();
                setTheme(t)
              }}
            >
              <span className={`text-color capitalize ${theme === t ? 'font-semibold' : ''}`}>{t}</span>
              {theme === t ? (
                <CheckIcon className={`${(theme !== 'dracula') ? 'text-lightOrange' : 'text-lightPurple'}`} size={18} />
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ThemeMenu