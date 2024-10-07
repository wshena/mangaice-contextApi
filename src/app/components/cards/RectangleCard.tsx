import { getCoverArt } from '@/app/utils/const';
import { getMangaRating } from '@/app/utils/fetcher';
import { generateRandomColor, getTitle, sliceParagraph } from '@/app/utils/function';
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

  // random color for background
  const randomColor = generateRandomColor();

  return (
    <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`} className={`block relative w-[210px] h-[210px] bg-cover ${!fileName && 'bg-secondary'}`} style={{
      backgroundImage: fileName && `url('${getCoverArt(manga?.id, fileName)}')`
    }}>
      <div className={`w-full h-full absolute top-0 left-0 bg-black bg-opacity-40 p-[1rem] text-white flex flex-col justify-between hover:bg-black transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col gap-[10px]">
          <h1 className='font-bold text-[1rem]'>{sliceParagraph(getTitle(manga?.attributes?.title), 6)}</h1>
          <h3 className='flex items-center gap-[5px] text-[1rem]'>
            <HeartIcon size={20} className='text-white' />
            <span>{ratingData?.statistics[manga?.id]?.follows}</span>
          </h3>
        </div>

        <h3 className='font-bold decoration-solid text-[.9rem]'>{getTitle(genre?.attributes?.name)}</h3>
      </div>
    </Link>
  )
}

export default RectangleCard