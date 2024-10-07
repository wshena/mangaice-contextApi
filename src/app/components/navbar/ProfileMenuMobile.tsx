'use client'
import { useThemeContext } from '@/app/context/ThemeContext';
import { useUtilityContext } from '@/app/context/UtilityContext'
import { CloseIcon, ProfileIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import ThemeMenu from './ThemeMenu';
import { useAuthContext } from '@/app/context/AuthContext';

const ProfileMenuMobile = () => {
  const {profileClick, handleOffProfileClick} = useUtilityContext();
  const {theme} = useThemeContext();
  const {user, isAuthenticated, logout} = useAuthContext();

  // handle theme button click
  const [isThemeClick, setIsThemeClick] = useState(false);
  const handleOnThemeClick = () => setIsThemeClick(true);
  const handleOffThemeClick = () => setIsThemeClick(false);

  return (
    <div className={`z-40 fixed top-0 ${profileClick ? 'left-0' : 'left-[500px]'} w-full h-[100vh] bg-primary text-color p-[1.5rem] block md:hidden transition-all duration-300 ease-in-out`}>
      {isThemeClick ? (
        <ThemeMenu handleOff={handleOffThemeClick} />
      ) : (
        <>
        <button onClick={handleOffProfileClick}>
          <CloseIcon size={25} className='text-color' />
        </button>
        
        <div className="mt-[20px] flex flex-col gap-[15px]">
          {/* Profile Section */}
          <Link href={'/my/profile'} className='bg-secondary-hover p-4 rounded-md flex items-center justify-center flex-col gap-2'>
            <ProfileIcon size={25} className='text-color' />
            {user?.username ? (
              <span>{user.username}</span>
            ) : (
              <span>username</span>
            )}
          </Link>
    
          <span className='block w-full h-[1px] bg-white'></span>
    
          {/* Settings and Theme Button */}
          <div className="flex items-center justify-between">
			<Link href={'/settings'} className='hover:underline'>Settings</Link>
            <button onClick={(e: any) => {
              e.stopPropagation();
              handleOnThemeClick();
            }} className="hover:underline">Theme</button>
          </div>
    
          <span className='block w-full h-[1px] bg-white'></span>
    
          {/* Sign In and Register Buttons */}
          {isAuthenticated ? (
            <div className="w-full">
              <button onClick={logout} className={`w-full p-[.7rem] rounded-[5px] text-center ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`}>Log out</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href={'/auth/login'} className={`p-3 rounded text-color text-center hover:opacity-70 ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`}>Log In</Link>
              <Link href={'/auth/register'} className='p-3 rounded text-color text-center bg-secondary-hover'>Register</Link>
            </div>
          )}
        </div>
        </>
      )}
    </div>
  )
}

export default ProfileMenuMobile
