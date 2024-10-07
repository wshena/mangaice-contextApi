'use client'
import { getTitle } from '@/app/utils/function';
import React, { useState } from 'react'

const MangaDescriptionMobile = ({paragraph}:{paragraph:any}) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  return (
    <div className='w-full flex flex-col md:hidden gap-[10px]'>
      <p className={`transition-all duration-300 ease-in-out text-[.9rem] lg:text-[1rem] text-justify pb-[10px] ${show ? 'h-full border-b border-b-lightGray' : 'h-[150px] overflow-y-hidden'}`}>{getTitle(paragraph)}</p>
      <div className="w-full flex items-center justify-center">
        <button onClick={handleShow} >{show ? 'Show Less' : 'Show More'}</button>
      </div>
    </div>
  )
}

export default MangaDescriptionMobile