'use client'
import { getMangaFromTitle } from '@/app/utils/fetcher';
import { ArrowRightIcon, CloseIcon, SearchIcon } from '@/app/utils/Icon'
import React, { useEffect, useState } from 'react'
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';
import SearchCard from '../cards/SearchCard';

const MobileSearchForm = () => {
  const [click, setClick] = useState(false);
  const handleOnClick = () => setClick(true);
  const handleOffClick = () => setClick(false);

  const [mangaData, setMangaData] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedTitle, setDebouncedTitle] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 300);

    return () => clearTimeout(handler);
  }, [title]);

  // get manga data from user input
  useEffect(() => {
    const fetchData = async () => {
      if (debouncedTitle.trim() === '') {
        setMangaData(null);
        return;
      }

      setIsLoading(true);
      try {
        const response = await getMangaFromTitle(debouncedTitle.toLowerCase(), 5, 0);
        setMangaData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [debouncedTitle]);

  // Disable scrolling when click is true
  useEffect(() => {
    if (click) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'auto'; // Re-enable scrolling
    }

    // Cleanup: Ensure scrolling is re-enabled when the component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [click]);

  const clearSearch = () => setTitle('');

  return (
    <>
    <section className={`absolute w-full top-0 left-0 ${click ? 'block' : 'hidden'} `}>
      <div className="relative w-full h-screen bg-black bg-opacity-40">
        <div className={`absolute ${click ? 'top-0' : '-top-[300px]'} left-0 p-[.7rem] bg-primary text-color w-full flex flex-col gap-[15px] transition-all duration-300 ease-in-out`}>
          {/* search from */}
          <div className="flex items-center justify-between">
            <form action="" name='search-form' id='search-form' onClick={(e:any) => e.preventDefault()} className='rounded-[10px] bg-secondary md-blur flex items-center justify-between py-[.2rem] px-[.5rem] transition-all duration-300 ease-in-out'>
              <input
                id='title'
                name='title'
                type="text"
                autoComplete="off"
                className="focus:outline-none bg-transparent text-color font-bold"
                placeholder="Search"
                value={title}
                onChange={(e: any) => {
                  e.preventDefault();
                  setTitle(e.target.value)
                }}
              />
              {title ? (
                <button
                  onClick={(e: any) => {
                    e.preventDefault();
                    clearSearch();
                  }}
                >
                  <CloseIcon size={15} className="text-color" />
                </button>
              ) : (
                <SearchIcon size={15} className="text-color" />
              )}
            </form>
            <button onClick={handleOffClick}> <CloseIcon size={25} className='text-color' /> </button>
          </div>

          {/* result component */}
          <div
            className={`${mangaData?.data?.length > 3 ? 'h-[624px]' : 'h-fit'} overflow-y-auto bg-primary rounded-[10px] text-color`}>
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner width="100" height="100" />
              </div>
            ) : mangaData?.data?.length > 0 ? (
              <div className="flex flex-col gap-[15px]">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold capitalize text-[1rem]">Manga</h1>
                  <Link href={`/titles?q=${debouncedTitle}`}>
                    <ArrowRightIcon size={20} className="text-color" />
                  </Link>
                </div>
                <ul className="flex flex-col gap-[10px]">
                  {mangaData.data.map((manga: any) => (
                    <li key={manga.id}>
                      <SearchCard manga={manga} />
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="w-full flex items-center justify-center">
                <span>No results found</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>

    <button onClick={handleOnClick} className='p-[.6rem] rounded-full accent-color-hover block md:hidden'>
      <SearchIcon size={20} className='text-color' />
    </button>
    </>
  )
}

export default MobileSearchForm