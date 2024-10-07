import { MangaDetail } from '@/app/components/mangaDetail/MangaDetail';
import PageWrapper from '@/app/components/PageWrapper';
import { getCoverArt } from '@/app/utils/const';
import { getMangaDataFromId, getMangaRating } from '@/app/utils/fetcher';
import { getTitle } from '@/app/utils/function';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const mangaId = params.id;
  const fetchMangaData = await getMangaDataFromId(mangaId);
  const mangaData = fetchMangaData?.data;

  return {
    title: `${getTitle(mangaData?.attributes?.title)} - Mangaice`,
    description: "Get best quality manga on Mangaice",
  };
}

const Page = async ({ params }: any) => {
  const mangaId = params.id;
  const fetchMangaData = await getMangaDataFromId(mangaId);
  const mangaData = fetchMangaData?.data;

  const rating = await getMangaRating(mangaId);

  // get cover art
  const coverArtRel = mangaData?.relationships?.find((rel: any) => rel.type === 'cover_art');
  const fileName = coverArtRel?.attributes?.fileName;

  return (
    <PageWrapper>
      <div className="h-full w-full bg-cover bg-center" style={{ backgroundImage: `url('${getCoverArt(mangaData?.id, fileName)}')` }}>
        <MangaDetail manga={mangaData} rating={rating} />
      </div>
    </PageWrapper>
  );
};

export default Page;
