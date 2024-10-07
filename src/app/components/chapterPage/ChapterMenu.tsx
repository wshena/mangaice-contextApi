'use client'
import { useThemeContext } from '@/app/context/ThemeContext';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { getTitle } from '@/app/utils/function';
import { AngleLeftIcon, AngleRightIcon, BookIcon, CloseIcon, GroupIcon, PageIcon, ProfileIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import ChapterDisplaySetting from './ChapterDisplaySetting';

interface Props {
  chapterData:any;
  nextChapter:any;
  prevChapter:any;
  feedArray:any;
}

const ChapterMenu = ({ chapterData, nextChapter, prevChapter, feedArray }: Props) => {
  const router = useRouter();

  // global context variable
  const { theme } = useThemeContext();
  const { chapterMenuClick, handlechapterMenuClick} = useUtilityContext();

  // Handle chapter selection change
  const handleSelectChange = useCallback((event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue) {
      router.push(selectedValue);
    }
  }, [router]);

  const chapterTitle = chapterData?.attributes?.title
  const mangaRelationData = chapterData?.relationships?.find((rel:any) => rel.type === 'manga');
  const scanlationGroupRelationData = chapterData?.relationships?.filter((rel:any) => rel.type === 'scanlation_group');
  const userRelationData = chapterData?.relationships?.filter((rel:any) => rel.type === 'user');

  return (
    <aside className={`fixed z-40 top-0 ${chapterMenuClick ? 'right-0' : '-right-[800px] md:-right-[500px]'} bg-primary text-color py-[1rem] px-[1.5rem] md:p-[1rem] border-l border-l-lightGray w-full md:w-[350px] h-screen overflow-y-auto transition-all duration-300 ease-in-out flex flex-col gap-[20px]`}>
      <button onClick={handlechapterMenuClick}>
        <CloseIcon size={25} className='text-color' />
      </button>

      <div className="flex flex-col gap-[10px]">
        <Link href={`/title/${mangaRelationData?.id}/${getTitle(mangaRelationData?.attributes?.title)}`} className={`${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'} text-[1.1rem] flex items-center gap-[10px]`}>
          <BookIcon size={25} className={`${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'}`} />
          <span>
            {getTitle(mangaRelationData?.attributes?.title)}
          </span>
        </Link>
        {chapterTitle && <h1 className='text-[1.1rem] flex items-center gap-[10px]'>
          <PageIcon size={25} className='text-color' />
          <span>{chapterTitle}</span>
        </h1>}
      </div>

      <div className="flex items-center gap-[10px]">
        {/* Prev button */}
        <button 
          className={`p-[.5rem] rounded-[5px] bg-secondary ${prevChapter === null && 'hover:cursor-not-allowed opacity-70'}`}
          onClick={() => prevChapter && router.push(`/chapter/${prevChapter.id}`)} 
          disabled={!prevChapter}>
          <AngleLeftIcon size={20} className='text-color'/> 
        </button>

        {/* Chapter selection dropdown */}        
          <select
            name="chapter"
            id="chapter"
            value={`/chapter/${chapterData?.id}`}  // Set the default value to the current chapter
            onChange={handleSelectChange}
            className='text-color bg-secondary p-[.5rem] rounded-[5px] w-full'>
            {feedArray.map((chapter: any) => (
              <option
                key={chapter.id}
                value={`/chapter/${chapter.id}`}
                className={`bg-darkGray hover:bg-lightGray p-[.5rem] ${chapter.id === chapterData?.id ? (theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple') : 'text-color'}`}>
                {chapter?.attributes?.translatedLanguage} - Chapter {chapter?.attributes?.chapter}
              </option>
            ))}
          </select>

        {/* Next button */}
        <button 
          className={`p-[.5rem] rounded-[5px] bg-secondary ${nextChapter === null && 'hover:cursor-not-allowed opacity-70'}`}
          onClick={() => nextChapter && router.push(`/chapter/${nextChapter.id}`)} 
          disabled={!nextChapter}>
          <AngleRightIcon size={20} className='text-color'/> 
        </button>
      </div>

      <div className="flex flex-col gap-[10px]">
        <h1>Uploaded By</h1>
        <ul className='flex flex-col gap-[5px]'>
          {scanlationGroupRelationData?.map((item:any) => {
            return (
              <li key={item?.id}>
                <h2 className='flex items-center gap-[8px]'>
                  <GroupIcon size={20} className='text-color' />
                  <span>{item?.attributes?.name}</span>
                </h2>
              </li>
            )
          })}
        </ul>
        <ul className='flex flex-col gap-[5px]'>
          {userRelationData?.map((item:any) => {
            return (
              <li key={item?.id}>
                <h2 className='flex items-center gap-[8px]'>
                  <ProfileIcon size={20} className='text-color' />
                  <span>{item?.attributes?.username}</span>
                </h2>
              </li>
            )
          })}
        </ul>
      </div>

      {/* chapter display setting */}
      <ChapterDisplaySetting />
    </aside>
  );
};

export default ChapterMenu;
