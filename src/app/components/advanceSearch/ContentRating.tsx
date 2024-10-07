'use client'
import { useFilterContext } from '@/app/context/FilterContext';
import { Contentrating } from '@/app/utils/const';
import { UpDownAngleIcon } from '@/app/utils/Icon';
import React, { useEffect, useState } from 'react';

const ContentRating = () => {
  // save content rating to global variable
  const {setContentRating, resetButtonClick} = useFilterContext();

  const [click, setClick] = useState(false); // Untuk mengontrol dropdown
  const [content, setContent] = useState<string[]>([]); // State untuk menyimpan opsi yang dipilih

  const handleSelection = (item: string) => {
    if (content.includes(item)) {
      // Jika item sudah ada di array, hapus dari array
      setContent(content.filter((i) => i !== item));
    } else {
      // Jika item belum ada, tambahkan ke array
      setContent([...content, item]);
    }
  };

  useEffect(() => {
    setContentRating(content);
  }, [content])

  // handle resetbutton
  useEffect(() => {
    if (resetButtonClick)
      setContent([])
  }, [resetButtonClick])

  return (
    <div className="w-full lg:w-fit flex flex-col gap-[10px] h-full">
      <h3 className='text-gray-500'>Content Rating</h3>
      <div className="w-full lg:w-[290px] relative">
        <button
          onClick={() => setClick(!click)}
          className='flex items-center justify-between w-full p-[.5rem] rounded-[5px] bg-secondary'
        >
          <span className='capitalize'>
            {content.length > 0 ? content.join(', ') : 'Any'}
          </span>
          <UpDownAngleIcon />
        </button>
        
        {/* Dropdown */}
        <div className={`w-full absolute left-0 top-[50px] ${click ? 'block' : 'hidden'} transition-all duration-300 ease-in-out flex flex-col rounded-[5px] bg-secondary z-20`}>
          {Contentrating.map((item) => (
            <button
              key={item}
              onClick={() => handleSelection(item.toLowerCase())}
              className={`text-start capitalize flex items-center justify-between hover:bg-lightGray p-[.3rem] ${
                content.includes(item.toLowerCase()) ? 'text-lightOrange' : ''
              }`}
            >
              <span>{item}</span>
              
              {/* Indicator: Show a dot or radio button if selected */}
              <span className="w-[10px] h-[10px] rounded-full" 
                    style={{ backgroundColor: content.includes(item.toLowerCase()) ? 'orange' : 'transparent' }}>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentRating;
