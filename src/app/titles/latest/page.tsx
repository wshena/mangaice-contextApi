import BigLatestUpdateCard from '@/app/components/cards/BigLatestUpdateCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PageWrapper from '@/app/components/PageWrapper'
import PaginationLink from '@/app/components/PaginationLink';
import { getLatestMangaUpdate } from '@/app/utils/fetcher';
import { getMondayOfPreviousWeek } from '@/app/utils/function';
import { ArrowLeftIcon } from '@/app/utils/Icon';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: "Latest Updated Manga - Mangaice",
  description: "Get best quality manga on Mangaice",
};

interface PageProps {
  searchParams: {
    page?: string;
  };
}

const page = async ({ searchParams }: PageProps) => {
  // get the date for one week before and get current year
	const date = getMondayOfPreviousWeek();

  // Determine the current page, default to 1
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 35;
   const offset = (currentPage - 1) * limit;

  const latestMangaUpdate = await getLatestMangaUpdate(date, limit, offset);
  const groupedByMangaId = latestMangaUpdate?.data?.reduce((acc:any, current:any) => {
    // Temukan relationship yang memiliki type "manga"
    const mangaRelationship = current.relationships.find((rel:any) => rel.type === "manga");

    if (mangaRelationship) {
        const mangaId = mangaRelationship.id;

        // Jika belum ada entri untuk mangaId ini, buat array baru
        if (!acc[mangaId]) {
            acc[mangaId] = [];
        }

        // Tambahkan current object ke array yang sesuai
        acc[mangaId].push(current);
    }

    return acc;
  }, {});

  // total item di array chapter yang sudah di sortir sesuai manga id
  const totalItems = Object.values(groupedByMangaId).reduce((sum, currentArray:any) => sum + currentArray.length, 0);
  
  return (
    <PageWrapper>
      <section className='container pt-[81px] text-color'>
        <div className="component-container">
          {latestMangaUpdate ? (
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <Link href={'/'} ><ArrowLeftIcon size={25} className='text-color' /></Link>
                <h1 className='text-font capitalize text-[1.3rem] md:text-[2rem]'>latest updated manga</h1>
              </div>

              <ul className='flex flex-col gap-[15px]'>
                {Object.keys(groupedByMangaId).map(mangaId => {
                  const chapter = groupedByMangaId[mangaId];
                  return (
                    <li key={mangaId}>
                      <BigLatestUpdateCard data={chapter} />
                    </li>
                  );
                })}
              </ul>
  
              <PaginationLink link='titles/latest?' totalItem={totalItems} />
            </div>  
          ) : (
            <div className="w-full h-[100vh] flex items-center justify-center">
              <LoadingSpinner width='100' height='100' />
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default page