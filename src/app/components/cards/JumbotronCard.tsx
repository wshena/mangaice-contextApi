'use client'
import { getCoverArt } from '@/app/utils/const';
import Image from 'next/image';
import React from 'react'
import TagBlock from '../TagBlock';
import { getTitle, sliceParagraph } from '@/app/utils/function';
import { useThemeContext } from '@/app/context/ThemeContext';
import Link from 'next/link';

const JumbotronCard = ({manga}:{manga:any}) => {
  const {theme} = useThemeContext();

  // get filename for cover
  const coverArtRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art')
  const filename = coverArtRel?.attributes.fileName;

  // get manga author
  const authorRel = manga?.relationships?.find((rel:any) => rel.type === 'author');
  const author = authorRel?.attributes?.name;

  return (
    <div className='relative w-full 2xl:w-[100vw] h-[700px] md:h-[500px] text-white bg-center bg-cover' style={{
      backgroundImage: `url('${getCoverArt(manga?.id, filename) || 'https://placehold.co/700x500'}')`
    }}>
      <Link href={`/title/${manga?.id}/${getTitle(manga?.attributes?.title)}`}>
        <section className={`absolute top-0 left-0 w-full h-full text-color ${theme === 'light' ? 'bg-white' : 'bg-black'} bg-opacity-70 flex items-center md:items-end justify-center pb-[20px]`}>
          <div className="container w-[90%] h-[80%] md:flex md:items-center">
            <div className="flex flex-col items-center md:items-start md:flex-row gap-[15px] h-[305px] w-full">
              <Image src={`${getCoverArt(manga?.id, filename) || 'https://placehold.co/215x305'}`} alt={manga?.attributes?.title?.en} width={215} height={305} className='rounded-[10px] w-[215px] h-[305px]'/>

              <div className="flex flex-col h-full items-center md:items-start justify-between">
                <div className="p-[1rem] md:p-0 flex flex-col gap-[10px]">
                  <h1 className='leading-tight font-bold text-[1.2rem] lg:text-[2rem]'>{sliceParagraph(manga.attributes.title.en, 15)}</h1>
                  <div className="mb-[10px] flex flex-wrap items-center gap-[8px]">
                    {manga?.attributes?.tags.map((tag:any) => {
                      return (
                        <div className="" key={tag.id}>
                          <TagBlock link={`/tag/${tag.id}/${getTitle(tag?.attributes.name)}`} tag={getTitle(tag?.attributes.name)}/>
                        </div>
                      )
                    })}
                  </div>
                  {manga?.attributes.description && (
                    <>
                      <p className='hidden lg:inline-block'>{sliceParagraph(manga?.attributes.description?.en, 70)}</p>
                      <p className='hidden md:inline-block lg:hidden text-[.9rem]'>{sliceParagraph(manga?.attributes.description?.en, 50)}</p>
                    </>
                  )}
                </div>
                <h3 className=''>{author}</h3>
              </div>
            </div>
          </div>
        </section>
      </Link>
    </div>
  )
}

export default JumbotronCard