'use client'
import { useFilterContext } from '@/app/context/FilterContext';
import { Sortby } from '@/app/utils/const';
import { UpDownAngleIcon } from '@/app/utils/Icon';
import React, { useEffect, useState } from 'react'

const SortBy = () => {
  const {setOrder, resetButtonClick} = useFilterContext();
  const [click, setClick] = useState(false);
  const [sortBy, setSortBy] = useState('none');

  useEffect(() => {
    setOrder(sortBy);
  }, [sortBy])

  // handle reset button
  useEffect(() => {
    if (resetButtonClick)
      setSortBy('none')
  }, [resetButtonClick])

  return (
    <div className="flex w-full lg:w-fit flex-col gap-[10px] h-full">
      <h3 className='text-gray-500'>Sort by</h3>
      <div className="w-full lg:w-[290px] relative">
        <button onClick={() => setClick(!click)} className='flex items-center justify-between w-full p-[.5rem] rounded-[5px] bg-secondary'>
          <span className='capitalize'>{sortBy}</span>
          <UpDownAngleIcon />
        </button>
        <div className={`w-full absolute left-0 top-[50px] ${click ? 'h-fit block' : 'h-0 hidden'} transition-all duration-300 ease-in-out flex flex-col rounded-[5px] bg-secondary z-20`}>
          {Sortby.map((item) => {
            return (
              <button
                key={item}
                onClick={() => {
                  setSortBy(item);
                  setClick(false)
                }}  // Corrected: wrap setValue in a function
                className={`text-start capitalize hover:bg-lightGray p-[.3rem] ${item === sortBy && 'text-lightOrange'}`}>
                {item}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SortBy