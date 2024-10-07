'use client'
import Image from 'next/image';
import { useEffect } from 'react'
import TagBlock from '../TagBlock';
import MangaChapter from './MangaChapter';
import MangaBasicInfo from './MangaBasicInfo';
import LoadingSpinner from '../LoadingSpinner';
import { getCoverArt } from '@/app/utils/const';
import { useLibrary } from '@/app/context/LibraryContext';
import { useAuthContext } from '@/app/context/AuthContext';
import { useThemeContext } from '@/app/context/ThemeContext';
import MangaDescriptionMobile from './MangaDescriptionMobile';
import { getTitle, sliceParagraph } from '@/app/utils/function';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { HeartIcon, StarIcon, TrashIcon } from '@/app/utils/Icon';

export const MangaDetail = ({manga, rating}:{manga:any, rating:any}) => {
  const {theme} = useThemeContext();
  const {saveMangaData} = useUtilityContext();
  const {isAuthenticated} = useAuthContext();
  const {addToLibrary, library, removeFromLibrary} = useLibrary();

  // manga id
  const mangaId = manga && manga?.id;

  // get cover art
  const coverArtRel = manga?.relationships?.find((rel:any) => rel.type === 'cover_art');
  const fileName = coverArtRel?.attributes?.fileName;

  // get author
  const author = manga?.relationships?.filter((rel:any) => rel.type === 'author');  

  // japanes alt title
  const jaTitleObject = manga?.attributes?.altTitles.find((title:any) => title.ja !== undefined);
  const jaTitle = jaTitleObject ? jaTitleObject.ja : null;

  // save manga data to global context
  useEffect(() => {
    saveMangaData(manga)
  }, [manga, saveMangaData])

  // add manga to library
  const handleAddToLibrary = () => {
    if (isAuthenticated && manga) {
      addToLibrary(manga);

			alert('success add manga to your library');
    } else {
      alert('you must login to add this manga to your library');
    }
  };

  return (
    <>
      {manga? (
        <section className="">
          <div className="w-full h-full text-color">
            <div className={`w-full h-[300px] ${theme !== 'light' ? 'bg-black' : 'bg-white'} bg-opacity-60`}>
              <div className="container h-full flex flex-col items-center md:items-start md:flex-row overflow-y-visible gap-[20px] pt-[90px] px-[20px] lg:px-[30px]">
                <Image src={getCoverArt(manga?.id, fileName)} alt={getTitle(manga?.attributes?.title)} width={200} height={291} className='rounded-[5px] w-[200px] h-[291px]' />

                <div className="h-full flex flex-col justify-between">
                  <div className="flex flex-col gap-[10px] lg:gap-0">
                    <h1 className='font-bold text-[1.5rem] md:text-[2rem] tracking-tighter lg:text-[3rem]'>{sliceParagraph(getTitle(manga?.attributes.title), 8)}</h1>
                    {jaTitle && (
                      <h2 className='-mt-[10px] text-[1rem] lg:text-[1.9rem]'>{sliceParagraph(jaTitle, 8)}</h2>
                    )}
                  </div>
                  <h3 className='flex items-center gap-[10px]'>{author.map((item:any) => {
                    return (
                      <span key={item?.id}>{item?.attributes?.name}</span>
                    )
                  })}</h3>
                </div>
              </div>
            </div>
            
            <section className="w-full bg-primary">
              <div className="container component-container flex flex-col gap-[20px] text-color">
                <div className="md:ml-[220px] mt-[300px] md:mt-0 flex flex-col gap-[10px]">
                  <div className="flex items-center gap-[10px]">
                    {/* add to library */}
                    {library?.find((manga) => manga.id === mangaId) ? (
                      <button onClick={() => {
                        removeFromLibrary(mangaId)
                        alert('success remove from library')
                      }} className="flex items-center gap-[8px] p-[.7rem] rounded-[5px] text-color capitalize bg-lightGray hover:scale-105">
                        <TrashIcon size={20} className='text-color' />
                        <span>remove from library</span>
                      </button>
                    ): (
                      <button onClick={handleAddToLibrary} className={`capitalize px-[1rem] text-[1.1rem] py-[.8rem] rounded-[5px] ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} hover:opacity-80`}>add to library</button>
                    )}
                  </div>

                  <div className="flex flex-col gap-[10px]">
                    <ul className="flex flex-wrap items-center gap-[10px]">
                      {manga?.attributes?.tags.map((tag:any) => {
                        return (
                          <li key={tag?.id}>
                            <TagBlock link={`/tag/${tag?.id}/${tag?.attributes?.name.en}`} tag={tag?.attributes?.name?.en} />
                          </li>
                        )
                      })}
                    </ul>
                    <div className="flex flex-col md:flex-row md:items-center gap-[10px]">
                      <h3 className={`flex items-center gap-[5px] text-[1rem] ${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'}`}>
                        <StarIcon size={20} className='' />
                        <span>{Math.floor(rating?.statistics[manga?.id]?.rating?.average)}</span>
                      </h3>
                      <h3 className={`flex items-center gap-[5px] text-[1rem] text-color`}>
                        <HeartIcon size={20} className='' />
                        <span>{rating?.statistics[manga?.id]?.follows}</span>
                      </h3>
                      <h3 className='font-bold uppercase text-[.9rem]'>
                        Publication: <span>{manga?.attributes?.year ? manga?.attributes?.year : ' ?'} </span>, {manga?.attributes?.status}
                      </h3>
                    </div>
                  </div>
                </div>
                
                <MangaDescriptionMobile paragraph={manga?.attributes?.description} />
                <p className='hidden md:inline-block text-[.9rem] lg:text-[1rem] text-justify border-b border-b-lightGray pb-[10px]'>{getTitle(manga?.attributes?.description)}</p>
                
                <div className="flex flex-col lg:flex-row lg:justify-between gap-[20px]">
                  <MangaBasicInfo manga={manga} />
                  <div className="w-[100%] lg:w-[80%]">
                    <MangaChapter mangaId={manga?.id} />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </section>
      ) : (
        <section className='w-full h-[100vh] bg-primary'>
          <div className="w-full h-full flex items-center justify-center">
            <LoadingSpinner width='50' height='50' />
          </div>
        </section>
      )}
    </>
  )
}
