'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { getFlagImageUrl, sliceParagraph } from '../utils/function'
import { GroupIcon, ProfileIcon } from '../utils/Icon'
import PublishAt from './PublishAt'
import { useThemeContext } from '../context/ThemeContext'

interface ChapterItemProps {
  chapter:any;
  scanlationGroupName:any;
  userName: any;
}

interface ShowMoreLatestUpdateCardProps {
  data:any;
  scanlationGroupData:any;
  userData: any;
}

const ChapterItem = ({ chapter, scanlationGroupName, userName }:ChapterItemProps) => (
  <li className='w-full'>
    <Link href={`/chapter/${chapter?.id}`} className="block w-full flex flex-col gap-[7px] border-b border-b-lightGray p-[10px] bg-secondary-hover">
      <div className="flex flex-col md:flex-row gap-[10px] md:gap-0 md:items-center justify-between">
        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[5px]">
            <Image src={getFlagImageUrl(chapter?.attributes?.translatedLanguage)} alt={chapter?.attributes?.translatedLanguage} width={20} height={20} />
            <h2 className='flex items-center gap-[8px] text-[.8rem] md:text-[.9rem]'>
              {chapter?.attributes?.chapter && <span>Ch.{chapter?.attributes.chapter}</span>}
              {chapter?.attributes?.title && (
                <>
                  <span className='hidden md:inline-block'>{sliceParagraph(chapter?.attributes?.title, 8)}</span>
                  <span className='inline-block md:hidden'>{sliceParagraph(chapter?.attributes?.title, 1)}</span>
                </>
              )}
            </h2>
          </div>
          <div className="flex items-center gap-[5px] text-[.8rem]">
            <GroupIcon size={20} className='text-color' />
            <span>{scanlationGroupName || 'Unknown'}</span>
          </div>
        </div>

        <div className="flex flex-col gap-[10px]">
          <div className="flex items-center gap-[5px] text-[.8rem]">
            <ProfileIcon size={20} className='text-color' />
            <span>{userName || 'Unknown'}</span>
          </div>
          <PublishAt publishAt={chapter?.attributes.publishAt} />
        </div>
      </div>
    </Link>
  </li>
);

const ShowMoreLatestUpdateCard = ({ data, scanlationGroupData, userData }:ShowMoreLatestUpdateCardProps) => {
  const { theme } = useThemeContext();
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(!show);

  const scanlationGroupName = scanlationGroupData?.attributes?.name;
  const userName = userData?.attributes?.username;

  const chaptersToDisplay = show ? data : data?.slice(0, 3);

  return (
    <div className="flex flex-col gap-[15px]">
      <ul className='w-full flex flex-col gap-[10px]'>
        {chaptersToDisplay?.map((chapter:any) => (
          <ChapterItem
            key={chapter.id}
            chapter={chapter}
            scanlationGroupName={scanlationGroupName}
            userName={userName}
          />
        ))}
      </ul>
      {data.length > 3 && (
        <div className="w-full flex items-center justify-center">
          <button onClick={handleShow} className={`${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'}`}>
            {show ? 'Show Less' : 'Show More'}
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowMoreLatestUpdateCard;
