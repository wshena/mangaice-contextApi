'use client';
import { getMangaFromTitle } from '@/app/utils/fetcher';
import { ArrowRightIcon, CloseIcon, SearchIcon } from '@/app/utils/Icon';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import Link from 'next/link';
import SearchCard from '../cards/SearchCard';

const SearchForm: React.FC = () => {
  const [mangaData, setMangaData] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedTitle, setDebouncedTitle] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTitle(title);
    }, 300);

    return () => clearTimeout(handler);
  }, [title]);

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

  // Handle click outside to close the dropdown
  useEffect(() => {
    if (isOpen) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (!(e.target as HTMLElement).closest('.search-container')) {
          setIsOpen(false);
        }
      };

      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isOpen]);

  // Disable scrolling when click is true
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'auto'; // Re-enable scrolling
    }

    // Cleanup: Ensure scrolling is re-enabled when the component unmounts
    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [isOpen]);

  const toggleSearch = () => setIsOpen(!isOpen);
  const clearSearch = () => setTitle('');

  return (
    <>
      {isOpen && (
        <div
          onClick={(e: any) => {
            e.preventDefault();
            setIsOpen(false);
          }}
          className="z-40 absolute top-0 left-0 w-full h-[100vh] bg-black bg-opacity-40"
        ></div>
      )}

      <div className={`absolute hidden md:block top-[31px] lg:top-[34px] right-[80px] ${isOpen && 'z-50'} search-container`}>
        <form
          name='search-form'
          id='search-form'
          action=""
          onClick={(e: any) => {
            e.preventDefault();
            toggleSearch();
          }}
          className={`${
            isOpen ? 'w-[650px]' : 'w-[350px]'
          } rounded-[10px] bg-secondary md-blur flex items-center justify-between py-[.4rem] px-[.7rem] transition-all duration-300 ease-in-out`}
        >
          <input
            name='title'
            id='title'
            type="text"
            autoComplete="off"
            className="focus:outline-none bg-transparent text-color font-bold"
            placeholder="Search"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
          />
          {isOpen || title ? (
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

        {isOpen && (
          <div
            className={`mt-[15px] w-[650px] ${
              mangaData?.data?.length > 3 ? 'h-[500px]' : 'h-fit'
            } overflow-y-auto bg-primary p-[.8rem] rounded-[10px] text-color`}
          >
            {isLoading ? (
              <div className="w-full flex items-center justify-center">
                <LoadingSpinner width="100" height="100" />
              </div>
            ) : mangaData?.data?.length > 0 ? (
              <div className="flex flex-col gap-[15px]">
                <div className="flex items-center justify-between">
                  <h1 className="font-bold capitalize text-[1.1rem]">Manga</h1>
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
        )}
      </div>
    </>
  );
};

export default SearchForm;
