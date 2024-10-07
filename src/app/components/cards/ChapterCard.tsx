
import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import PublishAt from '../PublishAt';
import { GroupIcon, ProfileIcon } from '@/app/utils/Icon';
import { getFlagImageUrl, sliceParagraph } from '@/app/utils/function';

interface Props {
  chapter:any;
  chapterArray:any;
}

const ChapterCard = ({chapter, chapterArray}:Props) => {
  return (
    <div className='w-full bg-secondary text-color rounded-[5px]'>
      <h1 className='font-bold text-[.8rem] p-[.9rem]'>chapter {chapter}</h1>
      <ul>
        {chapterArray.map((chapter:any) => {
          const scanlationGroup = chapter?.relationships?.find((rel:any) => rel?.type === 'scanlation_group')
          const user = chapter?.relationships?.find((rel:any) => rel?.type === 'user')

          return (
            <li key={chapter?.id}>
              <Link href={`/chapter/${chapter?.id}`} className='block w-full accent-color-hover flex flex-col gap-[10px] md:gap-0 md:flex-row md:items-center md:justify-between px-[1rem] py-[.8rem] border-b border-b-darkGray'>
                <div className="flex flex-col gap-[8px]">
                  <div className="flex items-center gap-[7px]">
                    <Image src={getFlagImageUrl(chapter?.attributes?.translatedLanguage)} width={20} height={20} alt={chapter?.attributes?.translatedLanguage} />
                    <h2 className='font-bold text-[.8rem] hidden md:inline-block'>
                      {chapter?.attributes?.title ? sliceParagraph(chapter?.attributes?.title, 7) : 'Unknown'}
                    </h2>
                    <h2 className='font-bold text-[.8rem] md:hidden'>
                      {chapter?.attributes?.title ? sliceParagraph(chapter?.attributes?.title, 3) : 'Unknown'}
                    </h2>
                  </div>
                  <div className="flex items-center gap-[7px]">
                    <GroupIcon size={20} className='text-color' />
                    <h2 className='font-bold text-[.8rem]'>
                      {scanlationGroup?.attributes?.name ? scanlationGroup?.attributes?.name : 'Unknown'}
                    </h2>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <div className="order-2 md:order-1">
                    <PublishAt publishAt={chapter?.attributes?.publishAt} />
                  </div>
                  <div className="order-1 md:order-2 flex items-center gap-[7px]">
                    <ProfileIcon size={18} className='text-color' />
                    <h2 className='font-bold text-[.8rem] md:w-[127px] overflow-x-hidden'>
                      {user?.attributes?.username ? sliceParagraph(user?.attributes?.username, 1) : 'Unknown'}
                    </h2>
                  </div>
                </div>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ChapterCard