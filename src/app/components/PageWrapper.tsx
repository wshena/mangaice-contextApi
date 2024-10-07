'use client';
import React from 'react'
import { useUtilityContext } from '../context/UtilityContext';
import ProfileMenu from './navbar/ProfileMenu';
import ProfileMenuMobile from './navbar/ProfileMenuMobile';

interface Props {
  children: React.ReactNode
}

const PageWrapper = ({children}:Props) => {
  const {sidebarClick, profileClick} = useUtilityContext();

  return (
      <main className="w-full h-full">
        {profileClick && (
          <>
            <ProfileMenu />
            <ProfileMenuMobile />
          </>
        )}
        
        <div className={`w-full h-full ${sidebarClick ? 'xl:pl-[270px] 2xl:p-0' : 'p-0'} transition-all duration-300 ease-in-out`}>
          {children}
        </div>
      </main>
  );
}

export default PageWrapper