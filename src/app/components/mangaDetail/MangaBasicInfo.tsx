'use client'
import React from 'react'
import InfoBlock from './InfoBlock';
import Link from 'next/link';
import { useThemeContext } from '@/app/context/ThemeContext';
import Image from 'next/image';
import { getFlagImageUrl } from '@/app/utils/function';

const MangaBasicInfo = ({manga}:{manga:any}) => {
  const {theme} = useThemeContext();
  // get author
  const author = manga?.relationships?.filter((rel:any) => rel.type === 'author');  

  // genre
  const genre = manga?.attributes?.tags?.filter((tag:any) => tag.attributes?.group === 'genre');

  // artist
  const artist = manga?.relationships?.filter((rel:any) => rel.type === 'artist');

  // theme
  const mangaTheme = manga?.attributes?.tags?.filter((tag:any) => tag.attributes?.group === 'theme');

  // demographic
  const demographic = manga?.attributes?.publicationDemographic;

  // format
  const format = manga?.attributes?.tags?.filter((tag:any) => tag.attributes?.group === 'format');

  // alt title
  const altTitle = manga?.attributes?.altTitles;

  return (
    <section className="flex flex-col gap-[15px] md:gap-[10px]">
      {/* author */}
      {author && author.length > 0 && (
        <InfoBlock title='Author'>
          <ul className='flex flex-wrap items-center gap-[10px]'>
            {author.map((item:any) => (
              <li key={item?.id}>
                <Link href={`#`} className='p-[.3rem] bg-secondary text-color hover:bg-primary text-[.7rem]'>{item?.attributes?.name}</Link>
              </li>
            ))}
          </ul>
        </InfoBlock>
      )}

      {/* artist */}
      {artist && artist.length > 0 && (
        <InfoBlock title='Artist'>
          <ul className='flex flex-wrap items-center gap-[10px]'>
            {artist.map((item:any) => (
              <li key={item?.id}>
                <Link href={`#`} className='p-[.3rem] bg-secondary text-color hover:bg-primary text-[.7rem]'>{item?.attributes?.name}</Link>
              </li>
            ))}
          </ul>
        </InfoBlock>
      )}

      {/* genre */}
      {genre && genre.length > 0 && (
        <InfoBlock title='genres'>
          <ul className='flex flex-wrap items-center gap-[10px]'>
            {genre.map((item:any) => (
              <li key={item?.id}>
                <Link href={`/tag/${item?.id}/${item?.attributes?.name?.en}`} className='p-[.3rem] bg-secondary text-color hover:bg-primary text-[.7rem]'>{item?.attributes?.name.en}</Link>
              </li>
            ))}
          </ul>
        </InfoBlock>
      )}

      {/* themes */}
      {mangaTheme && mangaTheme.length > 0 && (
        <InfoBlock title='themes'>
          <ul className='flex flex-wrap items-center gap-[10px]'>
            {mangaTheme.map((item:any) => (
              <li key={item?.id}>
              <Link href={`/tag/${item?.id}/${item?.attributes?.name?.en}`} className='p-[.3rem] bg-secondary text-color hover:bg-primary text-[.7rem]'>{item?.attributes?.name.en}</Link>
              </li>
            ))}
          </ul>
        </InfoBlock>
      )}

      {/* demographic */}
      {demographic && (
        <InfoBlock title='demographic'>
          <Link href={`#`} className='w-fit p-[.3rem] bg-secondary text-color hover:bg-primary text-[.7rem]'>{demographic}</Link>
        </InfoBlock>
      )}
                    
      {/* manga format */}
      {format && format.length > 0 && (
        <InfoBlock title='format'>
          <ul className='flex flex-wrap items-center gap-[10px]'>
            {format.map((item:any) => (
              <li key={item?.id}>
                <Link href={`/tag/${item?.id}/${item?.attributes?.name?.en}`} className='p-[.3rem] bg-secondary text-color hover:bg-primary text-[.7rem]'>{item?.attributes?.name?.en}</Link>
              </li>
            ))}
          </ul>
        </InfoBlock>
      )}

      {/* alt title */}
      {altTitle && altTitle.length > 0 && (
        <InfoBlock title='alternative titles'>
          <ul className='flex flex-col gap-[10px]'>
            {altTitle.map((item:any, index:number) => {
              const key = Object.keys(item)[0]; // Get the key dynamically
              return (
                <li key={`${item[key]} - ${index}`} className='flex items-center gap-[10px] md;gap-[5px] border-b border-b-darkGray pb-[5px] text-[.9rem] md:text-[1rem]'>
                  <Image src={getFlagImageUrl(key)} alt={item[key]} width={25} height={25} />
                  <h3>{item[key]}</h3>
                </li>
              )
            })}
          </ul>
        </InfoBlock>
      )}
    </section>
  )
}

export default MangaBasicInfo