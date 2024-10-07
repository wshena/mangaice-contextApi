import MediumCard from '@/app/components/cards/MediumCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PageWrapper from '@/app/components/PageWrapper'
import PaginationLink from '@/app/components/PaginationLink';
import { getRecentlyAddManga } from '@/app/utils/fetcher';
import { getMondayOfPreviousWeek } from '@/app/utils/function';
import { ArrowLeftIcon } from '@/app/utils/Icon';
import { Metadata } from 'next';
import Link from 'next/link';
import React from 'react'

export const metadata: Metadata = {
  title: "Recently Added - Mangaice",
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
  const currentYear = new Date().getFullYear();

  // Determine the current page, default to 1
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 35;
  const offset = (currentPage - 1) * limit;

  const recentlyAddManga = await getRecentlyAddManga(currentYear, date, limit, offset);

  return (
    <PageWrapper>
      <section className='container pt-[81px] text-color'>
        <div className="component-container">
          {recentlyAddManga ? (
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <Link href={'/'} ><ArrowLeftIcon size={25} className='text-color' /></Link>
                <h1 className='text-font capitalize text-[1.3rem] md:text-[2rem]'>recently added manga</h1>
              </div>
              <ul className='flex items-center flex-wrap gap-[10px]'>
                {recentlyAddManga?.data?.map((manga:any) => {
                  return (
                    <li key={manga?.id}>
                      <MediumCard manga={manga} />
                    </li>
                  )
                })}
              </ul>
              <PaginationLink link='titles/recent?' totalItem={recentlyAddManga?.total} />
            </div>
          ) : (
            <div className="component-container w-full h-[100vh] flex items-center justify-center">
              <LoadingSpinner width='100' height='100'/>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default page