'use client';
import BigLatestUpdateCard from '@/app/components/cards/BigLatestUpdateCard';
import PageWrapper from '@/app/components/PageWrapper'
import { useHistory } from '@/app/context/HistoryContext';
import { ArrowLeftIcon, TrashIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
  const {mangaHistory, clearAllHistory} = useHistory();
  const [history, setHistory] = useState<any>();

  useEffect(() => {
    setHistory(mangaHistory ? mangaHistory : JSON.parse(localStorage.getItem('mangaHistory') ?? '[]'));
  }, [mangaHistory])

  const handleClearAll = () => {
    if (confirm('Remove all history?') === true) {
      clearAllHistory();
    } else {
      return 
    }
  }

  const groupedByMangaId = history?.reduce((acc:any, current:any) => {
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

  return (
    <PageWrapper>
      <section className="container pt-[81px] text-color">
        <div className="component-container">
          <div className="flex items-center gap-[10px] mb-[20px]">
            <Link href={'/'} ><ArrowLeftIcon size={25} className='text-color' /></Link>
            <h1 className='text-font capitalize text-[1.3rem] md:text-[2rem]'>reading history</h1>
          </div>
          {history && history.length > 0 ? (            
            <div className="flex flex-col gap-[10px]">
              <div className="w-full flex items-end justify-end">
                <button onClick={handleClearAll} className='flex items-center gap-[8px] p-[.7rem] rounded-[5px] text-color capitalize bg-lightGray hover:scale-105'>
                  <TrashIcon size={20} className='text-color' />
                  <span>Clear all</span>
                </button>
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
            </div>  
          ) : (
            <div className="w-full text-center">
              <h1 className='text-[1.5rem]'>Your reading history is empty</h1>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default page