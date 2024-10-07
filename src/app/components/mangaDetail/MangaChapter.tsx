'use client'

import Pagination from '../Pagination';
import LoadingSpinner from '../LoadingSpinner';
import ChapterCard from '../cards/ChapterCard';
import React, { useEffect, useState } from 'react'
import { getMangaChapterFeed } from '@/app/utils/fetcher';
import { useUtilityContext } from '@/app/context/UtilityContext';

const MangaChapter =  ({mangaId}:{mangaId:string}) => {
  const {saveChapterArray} = useUtilityContext();

  const [chapterFeedList, setChapterFeedList] = useState<any>();
  const [order, setOrder] = useState(false);
	const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const handleOrder = () => setOrder(!order);

  const fetchChapters = async (page: number) => {
    setLoading(true);
    const offset = (page - 1) * 20;  // Menghitung offset berdasarkan halaman
    try {
      const response = await getMangaChapterFeed(mangaId, 20, offset, (order ? 'asc' : 'desc'));
      setChapterFeedList(response);
      setLoading(false);
    } catch (error) {
      console.log("error fetching manga" + error);
      setLoading(false);
      throw error;
    }
  };

	useEffect(() => {
    fetchChapters(currentPage);
	}, [mangaId, order, currentPage]);

  useEffect(() => {
    saveChapterArray(chapterFeedList?.data)
  }, [chapterFeedList, saveChapterArray])
  
  const chapterArray = chapterFeedList?.data?.map((chapter:any) => chapter?.id)
  const groupedByChapter = chapterFeedList?.data?.reduce((acc:any, item:any) => {
    const chapter = item.attributes.chapter;
    
    if (!acc[chapter]) {
      acc[chapter] = [];
    }
    
    acc[chapter].push(item);
    
    return acc;
  }, {});


	return (
		<>
			{loading ? (
				<section className="w-full h-full flex items-center justify-center">
					<LoadingSpinner width='100' height='100' />
				</section>
			) : (
				<section className="flex flex-col gap-[20px]">

          {groupedByChapter && Object.entries(groupedByChapter).length > 0 ? (
            <>
            <button onClick={handleOrder} className='text-[.9rem] w-[100px] bg-secondary text-color p-[.4rem] rounded-[5px] capitalize'>{order ? 'ascending' : 'descending'}</button>
            <ul className='flex flex-col gap-[20px]'>
              {Object.keys(groupedByChapter).map((chapterKey, index) => {
                const chapter = groupedByChapter[chapterKey];
                return (
                  <li key={chapterKey}>
                    <ChapterCard chapter={chapterKey} chapterArray={chapter} />
                  </li>
                );
              })}
            </ul>
  
            <Pagination totalItem={Math.ceil(chapterFeedList?.total / 20)} currentPage={currentPage} onPageChange={setCurrentPage} />
            </>
          ) : (
            <h1 className='text-center text-color font-bold capitalize text-[1rem] md:text-[1.5rem]'>no chapter available</h1>
          )}
				</section>
			)}
		</>
	);
}

export default MangaChapter
