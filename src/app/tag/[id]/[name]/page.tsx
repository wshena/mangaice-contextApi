'use client'
import MediumCard from '@/app/components/cards/MediumCard';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import PageWrapper from '@/app/components/PageWrapper';
import Pagination from '@/app/components/Pagination';
import { getAllTags, getMangaFromTag } from '@/app/utils/fetcher';
import { getTitle } from '@/app/utils/function';
import { ArrowLeftIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface PageProps {
  params: {
    id: string;
    name: string;
    page?: string;
  };
}

const Page = ({ params }: PageProps) => {
  const tagId = params.id;
  const tagName = decodeURI(params.name);

  // State to hold manga data, loading, and error states
  const [mangaData, setMangaData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  
  // Determine the current page, default to 1
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;
  const offset = (currentPage - 1) * limit;

  // Fetch manga data
  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        const data = await getMangaFromTag(tagId, limit, offset);
        setMangaData(data);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchMangaData();
  }, [tagId, currentPage, limit, offset]);

  // Loading state
  if (loading) {
    return (
      <PageWrapper>
        <div className="component-container w-full h-[100vh] flex items-center justify-center">
          <LoadingSpinner width="100" height="100" />
        </div>
      </PageWrapper>
    );
  }

  // Error state
  if (error) {
    return (
      <PageWrapper>
        <div className="text-color component-container w-full h-[100vh] flex items-center justify-center">
          <p>Failed to load manga data. Please try again later.</p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="container pt-[81px]">
        <div className="component-container text-color flex flex-col gap-[20px]">
          <div className="mb-[20px] flex items-center gap-[10px]">
            <Link href="/" passHref>
              <ArrowLeftIcon size={25} className="text-color" />
            </Link>
            <h1 className="text-font capitalize text-[1.3rem] md:text-[2rem]">{tagName}</h1>
          </div>

          {/* manga data */}
          <div className="flex flex-col gap-[15px]">
            <ul className="w-fit flex flex-wrap items-center justify-evenly gap-[10px]">
              {mangaData?.data?.map((manga: any) => (
                <li key={manga?.id}>
                  <MediumCard manga={manga} />
                </li>
              ))}
            </ul>
            <Pagination totalItem={Math.ceil(mangaData?.total / 20)} currentPage={currentPage} onPageChange={setCurrentPage} />
          </div>

          {/* All tags */}
          <AllTags tagNameUrl={tagName} />
        </div>
      </section>
    </PageWrapper>
  );
};

// Tags component
const Tags = ({ label, tagUrl, data }: { label: string; tagUrl: string; data: any }) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <h2 className="font-bold text-[1.1rem] capitalize">{label}</h2>
      <ul className="grid grid-cols-2 md:grid-cols-5 gap-[10px]">
        {data.map((item: any) => (
          <li key={item?.id}>
            <Link
              href={`/tag/${item.id}/${getTitle(item?.attributes.name)}`}
              className={`text-[.9rem] ${
                tagUrl === getTitle(item?.attributes?.name) ? 'text-white' : 'text-gray-500'
              } hover:text-white`}
            >
              {getTitle(item?.attributes.name)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

// AllTags component
const AllTags = ({ tagNameUrl }: { tagNameUrl: string }) => {
  const [allTags, setAllTags] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const tags = await getAllTags();
        setAllTags(tags);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchAllTags();
  }, []);

  if (loading) {
    return <LoadingSpinner width="50" height="50" />;
  }

  if (error) {
    return <p>Failed to load tags. Please try again later.</p>;
  }

  const format = allTags?.data.filter((item: any) => item?.attributes?.group === 'format');
  const genre = allTags?.data.filter((item: any) => item?.attributes?.group === 'genre');
  const theme = allTags?.data.filter((item: any) => item?.attributes?.group === 'theme');
  const content = allTags?.data.filter((item: any) => item?.attributes?.group === 'content');

  return (
    <div className="text-color flex flex-col gap-[15px]">
      <h1 className="text-[1.5rem] capitalize">choose the tags that you like</h1>
      <div className="flex flex-col gap-[20px]">
        <Tags label="Theme" data={theme} tagUrl={tagNameUrl} />
        <Tags label="Format" data={format} tagUrl={tagNameUrl} />
        <Tags label="Genre" data={genre} tagUrl={tagNameUrl} />
        <Tags label="Content" data={content} tagUrl={tagNameUrl} />
      </div>
    </div>
  );
};

export default Page;
