'use client'
import { useThemeContext } from '@/app/context/ThemeContext';
import { getCoverArt } from '@/app/utils/const';
import { getTitle, sliceParagraph } from '@/app/utils/function';
import Link from 'next/link';
import React from 'react'

const WideCard = ({manga}:{manga:any}) => {
  const {theme} = useThemeContext();

  // cover art
  const coverArtRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art');
  const fileName = coverArtRel?.attributes?.fileName;

  // genre
  const genre = manga?.attributes?.tags?.find((tag:any) => tag.attributes?.group === 'genre');

  return (
    <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`} className={`block relative lg:w-[450px] xl:w-[400px] 2xl:w-[430px] h-[210px] bg-cover ${!fileName && 'bg-secondary'}`} style={{
      backgroundImage: fileName ? `url('${getCoverArt(manga?.id, fileName)}')` : ''
    }}>
      <div className={`absolute w-full h-full top-0 left-0 ${theme === 'light' ? 'bg-white  hover:bg-lightOrange' : 'bg-black hover:bg-lightOrange'} ${theme === 'dracula' && 'hover:bg-lightPurple'} bg-opacity-50 text-color p-[1rem] flex flex-col justify-between transition-all duration-300 ease-in-out`}>
        <div className="flex flex-col gap-[5px]">
          <h1 className='text-[1rem] font-bold'>{sliceParagraph(getTitle(manga?.attributes?.title), 10)}</h1>
          <p className='text-[.9rem] hidden lg:inline-block'>{sliceParagraph(manga?.attributes?.description?.en, 40)}</p>
          <p className='text-[.9rem] lg:hidden'>{sliceParagraph(manga?.attributes?.description?.en, 20)}</p>
        </div>

        <h3 className='text-[.8rem] decoration-solid'>{genre?.attributes?.name?.en}</h3>
      </div>
    </Link>
  )
}

export default WideCard