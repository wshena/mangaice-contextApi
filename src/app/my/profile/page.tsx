'use client'
import BigLatestUpdateCard from '@/app/components/cards/BigLatestUpdateCard';
import MediumCard from '@/app/components/cards/MediumCard';
import PageWrapper from '@/app/components/PageWrapper'
import ProfileSettings from '@/app/components/ProfileSettings';
import { useAuthContext } from '@/app/context/AuthContext'
import { useHistory } from '@/app/context/HistoryContext';
import { useLibrary } from '@/app/context/LibraryContext';
import { useThemeContext } from '@/app/context/ThemeContext';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { ProfileIcon, SettingsIcon, TrashIcon } from '@/app/utils/Icon';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const page = () => {
  const {user, isAuthenticated} = useAuthContext();
  const {theme} = useThemeContext();
  const {mangaHistory, clearAllHistory} = useHistory();
  const {clearLibrary} = useLibrary();
  const {handleOnProfileSettingClick} = useUtilityContext();

  const [history, setHistory] = useState<any>();
  const [userData, setUserData] = useState<any>()

  useEffect(() => {
    setUserData(user)
  }, [user])

  const handleClearAll = () => {
    if (confirm('Remove manga from library?') === true) {
      clearLibrary();
    } else {
      return 
    }
  }

  const handleClearAllHistory = () => {
    if (confirm('Remove all history?') === true) {
      clearAllHistory();
    } else {
      return 
    }
  }

  useEffect(() => {
    setHistory(mangaHistory ? mangaHistory : JSON.parse(localStorage.getItem('mangaHistory') ?? '[]'));
  }, [mangaHistory])

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

  // set tab
  const [tab, setTab] = useState('library');
  const handleTab = (label:string) => {
    setTab(label)
  }

  return (
    <PageWrapper>
      <section className='container pt-[81px] text-color'>
        <ProfileSettings />
        <div className="component-container">
          {isAuthenticated ? (
            <div className='flex flex-col gap-[30px]'>
              {/* profile setting button */}
              <div className="w-full flex justify-end">
                <button onClick={handleOnProfileSettingClick} className='p-[.4rem] rounded-full hover:bg-lightGray'>
                  <SettingsIcon size={40} className='text-color' />
                </button>
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-[20px] md:gap-0">
                <div className="flex items-center gap-[15px]">
                  <div className="p-[1rem] border-[5px] border-white rounded-full">
                    <ProfileIcon size={100} className='text-color lg:block hidden' />
                    <ProfileIcon size={80} className='text-color hidden md:block lg:hidden' />
                    <ProfileIcon size={30} className='text-color md:hidden' />
                  </div>
                  <h1 className='text-[1.5rem] md:text-[2rem] font-bold'>{userData?.username}</h1>
                </div>

                <div className="flex flex-col items-center gap-[10px] pb-[5px] border-b border-b-white">
                  <span className='text-[1.5rem]'>{userData?.library && userData?.library?.length}</span>
                  <h3>Favorite Manga</h3>
                </div>
              </div>

              {/* library or history tab */}
              <div className="w-full flex items-center justify-center pb-[10px] border-b">
                <div className="w-full lg:w-[20%] flex items-center justify-evenly">
                  <button onClick={() => handleTab('library')} className={`text-[1.5rem] ${tab === 'library' && 'font-bold'}`}>Library</button>
                  <span className={`block w-[1px] h-[70px] ${theme === 'light' ? 'bg-black' : 'bg-white'}`}></span>
                  <button onClick={() => handleTab('history')} className={`text-[1.5rem] ${tab === 'history' && 'font-bold'}`}>History</button>
                </div>
              </div>

              {/* content according to tab value */}
              {tab === 'library' ? (
                <>
                {userData?.library && userData?.library?.length > 0 ? (
                  <div className="flex flex-col gap-[10px]">
                    <div className="w-full flex items-end justify-end">
                      <button onClick={handleClearAll} className='flex items-center gap-[8px] p-[.7rem] rounded-[5px] text-color capitalize bg-lightGray hover:scale-105'>
                        <TrashIcon size={20} className='text-color' />
                        <span>Clear all</span>
                      </button>
                    </div>
                    <ul className='flex items-center flex-wrap gap-[10px]'>
                      {userData?.library?.map((manga:any) => {
                        return (
                          <li key={manga?.id}>
                            <MediumCard manga={manga} />
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ) : (
                  <h1 className="text-center text-[1.5rem]">Your library is empty</h1>
                )}
                </>
              ) : (
                <>
                  {history && history.length > 0 ? (            
                      <div className="flex flex-col gap-[10px]">
                        <div className="w-full flex items-end justify-end">
                          <button onClick={handleClearAllHistory} className='flex items-center gap-[8px] p-[.7rem] rounded-[5px] text-color capitalize bg-lightGray hover:scale-105'>
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
                </>
              )}
            </div>
          ) : (
            <div className="flex items-center flex-col gap-[15px]">
              <h1 className='text-[1.4rem]'>You need to sign in to use this page</h1>
              <div className="flex items-center gap-[20px]">
                <Link href='/auth/register' className='p-[.7rem] rounded-[5px] bg-lightOrange'>Register</Link>
                <Link href='/auth/login' className='p-[.7rem] rounded-[5px] bg-lighterGray'>Login</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default page