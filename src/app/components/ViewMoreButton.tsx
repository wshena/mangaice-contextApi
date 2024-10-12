'use client'
import { useRouter } from 'next/navigation';
import React from 'react'
import { useThemeContext } from '../context/ThemeContext';

const ViewMoreButton = ({link}:{link:string}) => {
  const router = useRouter();
  const {theme} = useThemeContext();

  return (
    <div className="w-full flex items-center justify-center">
      <button onClick={() => {
        router.push(link)
      }} className={`p-[.7rem] rounded-[5px] capitalize text-color ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`}>View More</button>
    </div>
  )
}

export default ViewMoreButton