import { getCoverArt } from '@/app/utils/const';
import { getTitle, sliceParagraph } from '@/app/utils/function';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

const SearchCard = ({manga}:{manga:any}) => {
  const coverArtRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art');
  const fileName = coverArtRel?.attributes?.fileName;

  return (
    <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`} className='block bg-secondary w-full flex gap-[10px] text-color p-[.5rem] rounded-[5px] accent-color-hover'>
      <Image src={getCoverArt(manga?.id, fileName)} alt={getTitle(manga?.attributes?.title)} width={56} height={80} className='rounded-[5px] w-[56px] h-[80px]' />
      <div className="flex flex-col">
        <h1 className='font-bold text-[1rem]'>{sliceParagraph(getTitle(manga?.attributes?.title), 8)}</h1>
        <h3 className='flex items-center gap-[5px]'>
          <span className='block w-[10px] h-[10px] rounded-full bg-green-600'></span>
          <span className='text-[.8rem]'>{manga?.attributes?.status}</span>
        </h3>
      </div>
    </Link>
  )
}

export default SearchCard