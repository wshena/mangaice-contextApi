import { getCoverArt } from '@/app/utils/const';
import { getMangaRating } from '@/app/utils/fetcher';
import { getTitle, sliceParagraph } from '@/app/utils/function';
import { HeartIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import React from 'react'

interface Props {
  manga: any;
}

const RectangleCard = async ({manga}:Props) => {
  const coverRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art');
  const fileName = coverRel?.attributes?.fileName;

  // manga rating
  const ratingData = await getMangaRating(manga?.id);

  // manga genre
  const genre = manga?.attributes?.tags?.find((tag:any) => tag.attributes?.group === 'genre');

  return (
    <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`} className={`block relative w-[210px] h-[210px] bg-cover ${!fileName && 'bg-secondary'} hover:scale-105 transition-all duration-300 ease-in-out`} style={{
      backgroundImage: fileName && `url('${getCoverArt(manga?.id, fileName)}')`
    }}>
      <div className={`w-full h-full absolute top-0 left-0 bg-black bg-opacity-40 p-[1rem] text-white flex flex-col justify-between`}>
        <h3 className='font-bold decoration-solid text-[.9rem] text-right'>{getTitle(genre?.attributes?.name)}</h3>

        <div className="flex flex-col gap-[5px]">
          <h1 className='font-bold text-[1rem]'>{sliceParagraph(getTitle(manga?.attributes?.title), 6)}</h1>
          <h3 className='flex items-center gap-[5px] text-[1rem]'>
            <HeartIcon size={20} className='text-white' />
            <span>{ratingData?.statistics[manga?.id]?.follows}</span>
          </h3>
        </div>
      </div>
    </Link>
  )
}

export default RectangleCard