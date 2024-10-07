'use client'
import { getTitle, sliceParagraph } from '@/app/utils/function';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'
import { getCoverArtFromMangaId } from '@/app/utils/fetcher';
import { getCoverArt } from '@/app/utils/const';
import Link from 'next/link';
import ShowMoreLatestUpdateCard from '../ShowMoreLatestUpdateCard';

const BigLatestUpdateCard = ({data}:{data:any}) => {
  const mangaData = data[0]?.relationships?.find((rel:any) => rel.type === 'manga');
  const scanlationGroupData = data[0]?.relationships?.find((rel:any) => rel.type === 'scanlation_group');
  const userData = data[0]?.relationships?.find((rel:any) => rel.type === 'user');

  // get manga update volume information
  const currentVolume = data?.attributes?.volume;

  // cover art berdasarkan manga id
  const [coverArtData, setCoverArtData] = useState<any>([]);
  useEffect(() => {
    const fetch = async (id:string) => {
      try {
        const respones = await getCoverArtFromMangaId(id);
        setCoverArtData(respones);
      } catch (error) {
        console.log(error);
      }
    };

    fetch(mangaData?.id);
  }, [mangaData?.id])

  const volumeCovertArt = coverArtData?.find((item:any) => item.attributes.volume === currentVolume) || coverArtData[0];
  const fileName = volumeCovertArt?.attributes?.fileName;

  return (
    <div className='p-[.9rem] rounded-[8px] accent-color text-color flex gap-[10px]'>
      {data ? (
        <>
        {/* cover art */}
        <Image src={`${getCoverArt(mangaData?.id, fileName)}` || 'https://placehold.co/56x80'} width={140} height={200} alt={getTitle(mangaData?.attributes?.title)} className='w-[48px] md:w-[140px] h-[72px] md:h-[200px] rounded-[5px]' />

        {/* chapter data and manga title */}
        <section className='w-full flex flex-col gap-[10px]'>
          {/* title */}
          <Link href={`/title/${mangaData?.id}/${getTitle(mangaData?.attributes?.title)}`}>
            <h1 className='pb-[10px] border-b border-b-lightGray font-bold text-[.8rem] md:text-[1.5rem]'>{sliceParagraph(getTitle(mangaData?.attributes.title), 6)}</h1>
          </Link>

          {/* chapter data */}
          <ShowMoreLatestUpdateCard data={data} scanlationGroupData={scanlationGroupData} userData={userData} />
        </section>
        </>
      ) : ('')}
    </div>
  )
}

export default BigLatestUpdateCard