import { useThemeContext } from '@/app/context/ThemeContext';
import { useUtilityContext } from '@/app/context/UtilityContext'
import { getTitle } from '@/app/utils/function';
import Link from 'next/link';
import React from 'react'

const ChapterFooter = ({chapterData}:{chapterData:any}) => {
  const {nextChapter, ChapterDisplaySetting} = useUtilityContext();
  const {theme} = useThemeContext();

  const mangaRelationData = chapterData?.relationships?.find((rel:any) => rel.type === 'manga');

  return (
    <section className={`w-full text-white ${ChapterDisplaySetting === 'Single Page' && 'hidden'}`}>
      {nextChapter ? (
        <Link
          href={`/chapter/${nextChapter?.id}`}
          className={`block text-center w-full ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} text-white font-bold p-[.8rem]`}
        >
          Next Chapter
        </Link>
      ) : (
        <Link
          href={`/title/${mangaRelationData?.id}/${getTitle(mangaRelationData?.attributes?.title)}`}
          className={`block text-center w-full ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} text-white font-bold p-[.8rem]`}
        >
          Return to Title Page
        </Link>
      )}
    </section>
  )
}

export default ChapterFooter