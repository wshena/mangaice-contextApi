'use client'
import { getChapterPageImage } from '@/app/utils/const';
import { getChapterImage } from '@/app/utils/fetcher';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import LoadingSpinner from '../LoadingSpinner';
import { ReadingProgressProvider, useReadingProgress } from '@/app/context/ReadingProgressContext';
import ProgressBar from '../ProgressBar';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { useThemeContext } from '@/app/context/ThemeContext';

const PageImage = ({ hash, image, index }: { hash: string; image: string; index: number }) => {
  const { progress, setProgress } = useReadingProgress();
  const { handlechapterMenuClick, ChapterDisplaySetting, dataSaver } = useUtilityContext();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // State to handle errors
  const imageRef = useRef<HTMLDivElement | null>(null); // Reference to image container div

  const handleLoad = () => {
    setLoading(false);
    setError(false); // Reset error state on successful load
  };

  const handleError = () => {
    setLoading(false);
    setError(true); // Set error state if image fails to load
  };

  const handleRetry = () => {
    setLoading(true); // Reset loading state when retrying
    setError(false); // Reset error state before retry
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Jika gambar terlihat dan belum ada di progress, tambahkan
            if (!progress.includes(index)) {
              setProgress((prevProgress) => [...prevProgress, index]);
            }
          }
        });
      },
      {
        root: null, // default is viewport
        rootMargin: '0px',
        threshold: 0.1, // Trigger jika 10% dari gambar terlihat
      }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current); // Observe the image container
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Stop observing when component unmounts
      }
    };
  }, [index, progress, setProgress]);

  return (
    <>
      <div
        id={`page-image-${index}`}
        ref={imageRef}
        className={`${ChapterDisplaySetting === 'Wide Strip' ? 'w-[265px]' : 'w-full'} md:w-[650px] h-full hover:cursor-pointer`}
        onClick={handlechapterMenuClick}
      >
        {error ? (
          // Show retry button if error occurred
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-red-500">Failed to load image</p>
            <button
              className="bg-lightOrange p-2 rounded-md hover:scale-105 transition-transform"
              onClick={handleRetry}
            >
              Retry
            </button>
          </div>
        ) : (
          <Image
            src={getChapterPageImage(hash, image, dataSaver)}
            width={650}
            height={950}
            className={`${ChapterDisplaySetting === 'Wide Strip' ? 'w-[265px]' : 'w-full'} md:w-[650px] h-full`}
            alt={`page ${index + 1}`}
            onLoad={handleLoad}
            onError={handleError} // Handle image load error
          />
        )}

        {loading && !error && (
          <div className="flex justify-center items-center h-[300px]">
            <LoadingSpinner width='100' height='100' />
          </div>
        )}
      </div>
    </>
  );
};

const ChapterPageImage = ({ chapterId }: { chapterId: string }) => {
  const { ChapterDisplaySetting } = useUtilityContext();
  const {theme} = useThemeContext();

  const [loading, setLoading] = useState(true);
  
  // for single page display setting
  const [chapterImage, setChapterImage] = useState<any>(null);
  const ImagePageArray = chapterImage?.chapter?.dataSaver?.map((url:any) => url);
  const [pageIndex, setPageIndex] = useState(0)

  const fetch = async (chapterId: string) => {
    try {
      const response = await getChapterImage(chapterId);
      setChapterImage(response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    }
  };

  useEffect(() => {
    fetch(chapterId);
  }, [chapterId]);

  const chapterHash = chapterImage?.chapter?.hash;
  const totalImages = chapterImage?.chapter?.dataSaver?.length || 0;

  return (
    <ReadingProgressProvider>
      {/* Progress bar */}
      <ProgressBar totalImages={totalImages} />
        
      {/* Images */}
      {loading ? (
        <div className='w-full flex items-center justify-center h-[100vh]'>
          <LoadingSpinner width='100' height='100' />
        </div>
      ) : (
        <>
        {ChapterDisplaySetting === 'Single Page' ? (
          <div className='h-full'>
            <div className="flex items-center justify-center w-full h-full">
              <PageImage hash={chapterHash} image={ImagePageArray[pageIndex]} index={0} />
            </div>

            <div className="flex items-center justify-center">
              <ul className="mt-[15px] flex overflow-x-auto items-center justify-between">
                {ImagePageArray?.map((_:any, idx:number) => {
                  return (
                    <li key={idx}>
                      <button 
                      onClick={() => {
                        setPageIndex(idx)
                      }}
                      className={`${pageIndex === idx ? `${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}` : 'bg-lightGray'} text-color px-[.7rem] md:px-[1rem] py-[.4rem] text-center w-full text-[.7rem] md:text-[1rem]`}>{idx + 1}</button>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        ) : (
          <ul className={`
            flex
            ${ChapterDisplaySetting === 'Long Strip' && 'flex-col w-full items-center'}
            ${ChapterDisplaySetting === 'Wide Strip' && 'flex-row overflow-x-auto h-full snap-x snap-mandatory'}
          `}
            style={{scrollBehavior: 'smooth'}}
          >
            {chapterImage?.chapter?.dataSaver?.map((image: any, index: number) => (
              <li key={index} className='snap-center'>
                <PageImage hash={chapterHash} image={image} index={index} />
              </li>
            ))}
          </ul>
        )}
        </>
      )}
    </ReadingProgressProvider>
  );
};

export default ChapterPageImage;
