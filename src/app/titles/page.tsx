import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { getMangaFromTitleAndFilter, getRecentlyAddManga } from '../utils/fetcher';
import LoadingSpinner from '../components/LoadingSpinner';
import MediumCard from '../components/cards/MediumCard';
import PaginationLink from '../components/PaginationLink';
import Link from 'next/link';
import { ArrowLeftIcon } from '../utils/Icon';
import { Metadata } from 'next';
import SearchAndFilter from '../components/advanceSearch/SearchAndFilter';
import { getMondayOfPreviousWeek, objectToQueryString } from '../utils/function';

export const metadata: Metadata = {
  title: "Advance Search - Mangaice",
  description: "Get best quality manga on Mangaice",
};

const Page = async ({ searchParams }: any) => {  
  // query from url with title and filters
  const queryString = searchParams !== undefined ? objectToQueryString(searchParams) : '';

  // get the date for one week before and get current year
	const date = getMondayOfPreviousWeek();
  const currentYear = new Date().getFullYear();

  // pagination
  const currentPage = parseInt(searchParams.page || '1', 10);
  const limit = 20;
  const offset = (currentPage - 1) * limit;

  // Fetch manga data from input title
  const searchMangaData = searchParams !== undefined
    ? await getMangaFromTitleAndFilter(queryString, limit, offset)
    : null;

  // fetch recent manga
  const recentlyAddManga = await getRecentlyAddManga(currentYear, date, 35, offset);

  // boolean to determine fetching have a result or not
  const hasSearchResults = searchMangaData?.data?.length > 0;

  return (
    <PageWrapper>
      <section className="container pt-[81px]">
        <div className="component-container text-color flex flex-col gap-[20px]">
          <div className="mb-[20px] flex items-center gap-[10px]">
            <Link href="/" passHref>
              <ArrowLeftIcon size={25} className="text-color" />
            </Link>
            <h1 className="text-font capitalize text-[1.3rem] md:text-[2rem]">Advanced Search</h1>
          </div>

          <SearchAndFilter />

          {/* hasil dari search title */}
          {searchParams !== undefined ? (
            searchMangaData ? (
              hasSearchResults ? (
                <div className="flex flex-col gap-[20px]">
                  <ul className="w-fit flex flex-wrap items-center justify-evenly gap-[10px]">
                    {searchMangaData.data.map((manga: any) => (
                      <li key={manga.id}>
                        <MediumCard manga={manga} />
                      </li>
                    ))}
                  </ul>
                  <PaginationLink
                    link={`titles?${queryString}&`}
                    totalItem={searchMangaData.total}
                    limit={limit}
                  />
                </div>
              ) : (
                <h1 className="text-center capitalize text-[1.5rem]">There is no manga</h1>
              )
            ) : (
              <div className="flex items-center justify-center w-full h-[100vh]">
                <LoadingSpinner width="100" height="100" />
              </div>
            )
          ) : (
            <>
              {recentlyAddManga && (
                <div className="flex flex-col gap-[20px]">
                  <ul className='flex items-center flex-wrap gap-[10px]'>
                    {recentlyAddManga?.data?.map((manga:any) => {
                      return (
                        <li key={manga?.id}>
                          <MediumCard manga={manga} />
                        </li>
                      )
                    })}
                  </ul>
                  <PaginationLink link={`titles?`} totalItem={recentlyAddManga?.total} />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </PageWrapper>
  );
};

export default Page;
