'use client'
import { getCoverArt } from '@/app/utils/const';
import { getTitle, sliceParagraph } from '@/app/utils/function'
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const SmallCard = ({manga}:{manga:any}) => {
  const coverArtRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art');
  const fileName = coverArtRel?.attributes?.fileName;

  return (
    <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`} className='block w-[128px] flex flex-col gap-[8px] text-color'>
      <Image src={`${getCoverArt(manga?.id, fileName)}` || 'https://placehold.co/128x180'} alt={getTitle(manga?.attributes?.title)} width={128} height={180} className='w-[128px] h-[180px] rounded-[5px]' />
      <h1 className='h-full text-[.9rem]'>{sliceParagraph(getTitle(manga?.attributes?.title), 3)}</h1>
    </Link>
  )
}

export default SmallCard
