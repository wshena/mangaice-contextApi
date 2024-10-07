'use client'
import { useUtilityContext } from '@/app/context/UtilityContext';
import { ProfileIcon } from '@/app/utils/Icon'
import React, { useEffect } from 'react'

const ProfileButton = () => {
  const {profileClick, handleOnProfileClick} = useUtilityContext();

  // Disable scrolling when click is true
  useEffect(() => {
    if (profileClick) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'auto'; // Re-enable scrolling
    }

    // Cleanup: Ensure scrolling is re-enabled when the component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [profileClick]);

  return (
    <button onClick={handleOnProfileClick} className='p-[.5rem] rounded-full profile-color'>
      <ProfileIcon size={25} className='text-color' />
    </button>
  )
}

export default ProfileButton