import { getFlagImageUrl, getTitle, sliceParagraph } from '@/app/utils/function';
import { GroupIcon } from '@/app/utils/Icon';
import Image from 'next/image';
import React from 'react'
import PublishAt from '../PublishAt';
import { getCoverArtFromMangaId } from '@/app/utils/fetcher';
import { getCoverArt } from '@/app/utils/const';
import Link from 'next/link';

const LatestUpdatesCard = async ({data}:{data:any}) => {
  const mangaData = data?.relationships?.find((rel:any) => rel.type === 'manga');
  const scanlationGroupData = data?.relationships?.find((rel:any) => rel.type === 'scanlation_group');

  // get manga update volume information
  const currentVolume = data?.attributes?.volume;

  // cover art berdasarkan manga id
  const coverArtData = await getCoverArtFromMangaId(mangaData?.id);
  const volumeCovertArt = coverArtData?.find((item:any) => item.attributes.volume === currentVolume) || coverArtData[0];
  const fileName = volumeCovertArt?.attributes?.fileName;

  return (
    <div className='p-[.9rem] rounded-[8px] accent-color text-color flex md:items-center gap-[10px]'>
      {data ? (
        <>
        {/* cover art */}
        <Image src={`${getCoverArt(mangaData?.id, fileName)}` || 'https://placehold.co/56x80'} width={56} height={80} alt={getTitle(mangaData?.attributes?.title)} className='w-[56px] h-[80px] rounded-[5px]' />

        {/* chapter data and manga title */}
        <div className="w-full flex flex-col gap-[7px]">
          {/* title */}
          <Link href={`/title/${mangaData?.id}/${getTitle(mangaData?.attributes?.title)}`}>
            <h1 className='font-bold text-[1rem] hidden md:inline-block'>{sliceParagraph(getTitle(mangaData?.attributes?.title), 6)}</h1>
            <h1 className='font-bold text-[.8rem] md:text-[1rem] md:hidden'>{sliceParagraph(getTitle(mangaData?.attributes?.title), 6)}</h1>
          </Link>

          <div className="flex flex-items gap-[10px]">
            <Image src={getFlagImageUrl(data?.attributes?.translatedLanguage)} alt={data?.attributes?.translatedLanguage} width={20} height={20} />
            <Link href={`/chapter/${data?.id}`} className='flex items-center gap-[8px] text-[.8rem] md:text-[.9rem]'>
              {data?.attributes?.chapter && <span>Ch.{data?.attributes.chapter}</span>}
              {data?.attributes?.title && (
                <>
                  <span className='hidden md:inline-block'>{sliceParagraph(data?.attributes?.title, 8)}</span>
                  <span className='inline-block md:hidden'>{sliceParagraph(data?.attributes?.title, 3)}</span>
                </>
              )}
            </Link>
          </div>
          <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center gap-[5px] text-[.8rem]">
              <GroupIcon size={20} className='text-color' />
              <span>{scanlationGroupData?.attributes?.name ? scanlationGroupData?.attributes?.name : 'Unknown'}</span>
            </div>
            <PublishAt publishAt={data?.attributes.publishAt} />
          </div>
        </div>
        </>
      ) : ('')}
    </div>
  )
}

export default LatestUpdatesCard