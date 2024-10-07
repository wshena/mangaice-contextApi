'use client'
import { useThemeContext } from '@/app/context/ThemeContext'
import { useUtilityContext } from '@/app/context/UtilityContext'
import { getTitle } from '@/app/utils/function'
import { AngleLeftIcon, GroupIcon } from '@/app/utils/Icon'
import Link from 'next/link'
import React, { useEffect } from 'react'

const ChapterHeader = ({chapterData}:any) => {
  const {theme} = useThemeContext();
  const {handlechapterMenuClick, saveChapterData} = useUtilityContext();

  useEffect(() => {
    saveChapterData(chapterData)
  }, [chapterData])

  // chapter attributes
  const mangaRelationData = chapterData?.relationships?.find((rel:any) => rel.type === 'manga');
  const scanlationGroupRelationData = chapterData?.relationships?.filter((rel:any) => rel.type === 'scanlation_group');
  const chapterTitle = chapterData?.attributes?.title;
  const chapterVolume = chapterData?.attributes?.volume;
  const chapter = chapterData?.attributes?.chapter;

  return (
    <section className='w-full flex flex-col gap-[10px] pb-[10px] border-b border-b-lightGray text-color'>
      <h1 className='flex items-center gap-[5px] text-[1rem]'>
        {chapter && <span>Chapter {chapter}</span>}
        {chapterTitle && <span>- {chapterTitle}</span>}
      </h1>

      <Link href={`/title/${mangaRelationData?.id}/${getTitle(mangaRelationData?.attributes?.title)}`} className={`${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'} text-[1rem]`}>{getTitle(mangaRelationData?.attributes?.title)}</Link>

      <div className="flex flex-col md:flex-row items-center gap-[10px]">
        <div className="w-full md:w-[50%] flex items-center justify-center gap-[10px] bg-secondary rounded-[5px] py-[.3rem]">
          <div className="flex items-center gap-[10px]">
            <h3>Ch.{chapter ? chapter : 'Unknown'}</h3>
            <h3>Vol.{chapterVolume ? chapterVolume : 'Unknown'}</h3>
          </div>
        </div>
        <button onClick={handlechapterMenuClick} className="w-full md:w-[50%] bg-secondary flex items-center justify-center rounded-[5px] py-[.3rem]">
          <h3 className='flex items-center gap-[5px]'>
            <span>Menu</span>
            <AngleLeftIcon size={20} className='text-color' />
          </h3>
        </button>
      </div>

      <ul className='flex items-center gap-[10px]'>
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
    </section>
  )
}

export default ChapterHeader