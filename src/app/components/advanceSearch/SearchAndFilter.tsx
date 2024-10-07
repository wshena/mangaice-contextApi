'use client'
import { useThemeContext } from '@/app/context/ThemeContext'
import { AngleDownIcon, AngleUpIcon, CloseIcon, SearchIcon } from '@/app/utils/Icon'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import Filters from './Filters'
import { useFilterContext } from '@/app/context/FilterContext'
import { getContentRatingFilter, getDemographic, getExcludedTags, getIncludedTags, getOrderFilter, getPublicationStatus } from '@/app/utils/function'

const SearchAndFilter = () => {
  const {theme} = useThemeContext();
  const router = useRouter();

  // toggle on off filter button
  const [filter, setFilter] = useState(false);
  const handleFilter = () => setFilter(!filter);

  // titile input from user
  const [title, setTitle] = useState('');
  const clearTitle = () => setTitle('');

  // get filter from global variable
  const {order, contentRating, publicationStatus, publicationDemographic, includedTagsFilter, excludedTagsFilter, resetAllFilters, handleResetButtonClick} = useFilterContext();

  return (
    <div className="flex flex-col gap-[10px]">
      <div className="flex flex-col md:flex-row gap-[10px] md:gap-0 md:items-center md:justify-between">
        {/* title search form */}
        <form className='md:w-[80%] lg:w-[85%] p-[.5rem] rounded-[3px] bg-secondary md-blur flex items-center gap-[20px]'>
          <SearchIcon size={20} className='text-color' />
          <input type="text" name="title" id="title" placeholder='Search' autoComplete='off' className='w-full focus:outline-none bg-transparent text-color font-bold' value={title} onChange={(e: any) => setTitle(e.target.value)} />

          {/* if there are input, show clear button */}
          {title && (
            <button className={`p-[.1rem] rounded-[3px] ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`} onClick={clearTitle}> <CloseIcon size={20} className='text-color' /> </button>
          )}
        </form>

        <button onClick={handleFilter} className={`lg:w-[14%] p-[.5rem] rounded-[5px] flex items-center justify-center ${filter ? 'bg-lightOrange' : 'bg-secondary'}`}>
          {filter ? (
            <>
              <AngleUpIcon size={20} className='text-color' />
              <span className="ml-[10px] capitalize text-[.9rem]">hide filter</span>
            </>
          ) : (
            <>
              <AngleDownIcon size={20} className='text-color' />
              <span className="ml-[10px] capitalize text-[.9rem]">show filter</span>
            </>
          )}
        </button>

      </div>

      {/* filter */}
      <Filters show={filter} />

      <div className="w-full flex md:items-end md:justify-end">
        <div className="flex flex-col md:flex-row md:items-center gap-[10px] w-full md:w-fit">
          {/* reset button */}
          <button onClick={() => {
            handleResetButtonClick();
            resetAllFilters();
          }} className='p-[.8rem] rounded-[5px] bg-red-500 text-red-900 font-bold'>Reset Filters</button>

          {/* get random manga button */}
          <button onClick={() => {
            router.push('/titles/random')
          }} className='p-[.8rem] rounded-[5px] bg-secondary'>Give me some</button>

          {/* search button */}
          <button 
            type="submit" 
            className={`p-[.8rem] rounded-[5px] flex items-center gap-[20px] font-bold ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`} 
            onClick={() => {
              const query = `titles?q=${title.toLowerCase()}`
                + (order !== 'none' ? `&${getOrderFilter(order)}` : '')
                + (contentRating.length > 0 ? getContentRatingFilter(contentRating) : '')
                + (publicationStatus.length > 0 ? getPublicationStatus(publicationStatus) : '')
                + (publicationDemographic.length > 0 ? getDemographic(publicationDemographic) : '')
                + (includedTagsFilter.length > 0 ? getIncludedTags(includedTagsFilter) : '')
                + (excludedTagsFilter.length > 0 ? getExcludedTags(excludedTagsFilter) : '')

              if (query !== undefined) {
                router.push(query);
              } else {
                router.push('/titles')
              }
            }}
          >
            <SearchIcon size={20} className='text-color' />
            <span>Search</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SearchAndFilter