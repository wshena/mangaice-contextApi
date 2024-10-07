'use client'
import { useFilterContext } from '@/app/context/FilterContext';
import { Publication } from '@/app/utils/const';
import { sliceParagraph } from '@/app/utils/function';
import { UpDownAngleIcon } from '@/app/utils/Icon';
import React, { useEffect, useState } from 'react';

const PublicationStatus = () => {
  const {setPublicationStatus, resetButtonClick} = useFilterContext();

  const [click, setClick] = useState(false); // Untuk mengontrol dropdown
  const [publication, setPublication] = useState<string[]>([]); // State untuk menyimpan opsi yang dipilih

  const handleSelection = (item: string) => {
    if (publication.includes(item.toLowerCase())) {
      // Jika item sudah ada di array, hapus dari array
      setPublication(publication.filter((i) => i !== item.toLowerCase()));
    } else {
      // Jika item belum ada, tambahkan ke array
      setPublication([...publication, item.toLowerCase()]);
    }
  };

  useEffect(() => {
    setPublicationStatus(publication)
  }, [publication])

  // handle resetbutton
  useEffect(() => {
    if (resetButtonClick)
      setPublication([])
  }, [resetButtonClick])

  return (
    <div className="w-full lg:w-fit flex flex-col gap-[10px] h-full">
      <h3 className='text-gray-500'>Publication Status</h3>
      <div className="w-full lg:w-[290px] relative">
        <button
          onClick={() => setClick(!click)}
          className='flex items-center justify-between w-full p-[.5rem] rounded-[5px] bg-secondary'
        >
          <span className='capitalize'>
            {publication.length > 0 ? sliceParagraph(publication.join(', '), 3) : 'Any'}
          </span>
          <UpDownAngleIcon />
        </button>
        
        {/* Dropdown */}
        <div className={`w-full absolute left-0 top-[50px] ${click ? 'block' : 'hidden'} transition-all duration-300 ease-in-out flex flex-col rounded-[5px] bg-secondary z-20`}>
          {Publication.map((item) => (
            <button
              key={item}
              onClick={() => handleSelection(item.toLowerCase())}
              className={`text-start capitalize flex items-center justify-between hover:bg-lightGray p-[.3rem] ${
                publication.includes(item.toLowerCase()) ? 'text-lightOrange' : ''
              }`}
            >
              <span>{item}</span>
              
              {/* Indicator: Show a dot or radio button if selected */}
              <span className="w-[10px] h-[10px] rounded-full" 
                    style={{ backgroundColor: publication.includes(item.toLowerCase()) ? 'orange' : 'transparent' }}>
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PublicationStatus;
