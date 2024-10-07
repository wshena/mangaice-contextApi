'use client'
import { useThemeContext } from '@/app/context/ThemeContext';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { getCoverArt } from '@/app/utils/const';
import { getTitle, sliceParagraph } from '@/app/utils/function'
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const MediumCard = ({manga}:{manga:any}) => {
  const {sidebarClick} = useUtilityContext();
  const {theme} = useThemeContext();

  // get cover art
  const coverArtRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art');
  const fileName = coverArtRel?.attributes?.fileName;

  return (
    <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`} className={`relative rounded-[5px] ${sidebarClick ? 'w-[125px] h-[185px] md:w-[230px] lg:w-[180px] xl:w-[190px] md:h-[311px] 2xl:w-[250px] 2xl:h-[380px]' : 'w-[125px] h-[185px] md:w-[230px] lg:w-[229px] xl:w-[250px] md:h-[380px]'} flex items-end transition-all duration-300 ease-in-out`}>
      <Image loading='lazy' src={getCoverArt(manga?.id, fileName)} alt={getTitle(manga?.attributes?.title)} className={`absolute top-0 left-0 ${sidebarClick ? 'w-[125px] h-[185px] md:w-[230px] lg:w-[180px] xl:w-[190px] md:h-[311px] 2xl:w-[250px] 2xl:h-[380px]' : 'w-[125px] h-[185px] md:w-[230px] lg:w-[229px] xl:w-[250px] md:h-[380px]'}`} width={180} height={311}/>

      <h1 className={`z-20 w-full text-[.8rem] md:text-[1rem] p-[.5rem] md:p-[.8rem] text-color ${theme === 'light' ? 'bg-white' : 'bg-black'} bg-opacity-40 text-color`}>
        <span>{sliceParagraph(getTitle(manga?.attributes?.title), 5)}</span>
      </h1>
    </Link>
  )
}

export default MediumCard
