'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../PageWrapper';
import ChapterHeader from './ChapterHeader';
import ChapterMenu from './ChapterMenu';
import { useUtilityContext } from '@/app/context/UtilityContext';
import ChapterPageImage from './ChapterPageImage';
import ChapterFooter from './ChapterFooter';
import { useHistory } from '@/app/context/HistoryContext';

interface Props {
  chapterData:any;
}

const ChapterPage = ({chapterData}:Props) => {
  const { chapterArray, saveNextChapter } = useUtilityContext();
  const {addToHistory} = useHistory();

  // save chapter data ke history
  useEffect(() => {
    if (chapterData){
      addToHistory(chapterData);
    }
  }, [chapterData])

  // Initialize chapter feed data from global context or localStorage
  const [chapterFeedData, setChapterFeedData] = useState<any>([]);
  useEffect(() => {
    const storedChapterFeed = JSON.parse(localStorage.getItem('chapterFeed') ?? '[]');
    setChapterFeedData(chapterArray.length > 0 ? chapterArray : storedChapterFeed);
  }, [chapterArray]);
  
  // Filter and sort chapters by the same translated language
  const translationLanguage = chapterData?.attributes?.translatedLanguage;
  const updateChapterFeedArray = chapterFeedData
  .filter((chapter: any) => chapter?.attributes?.translatedLanguage === translationLanguage)
  .sort((a: any, b: any) => parseFloat(a.attributes.chapter) - parseFloat(b.attributes.chapter));
  
  // Determine next and previous chapters
  const [nextChapter, setNextChapter] = useState<any>(null);
  const [prevChapter, setPrevChapter] = useState<any>(null);
  useEffect(() => {
    if (chapterData?.id && updateChapterFeedArray.length > 0) {
      const currentIndex = updateChapterFeedArray.findIndex((item: any) => item.id === chapterData.id);
      
      setPrevChapter(currentIndex > 0 ? updateChapterFeedArray[currentIndex - 1] : null);
      setNextChapter(currentIndex < updateChapterFeedArray.length - 1 ? updateChapterFeedArray[currentIndex + 1] : null);
      saveNextChapter(currentIndex < updateChapterFeedArray.length - 1 ? updateChapterFeedArray[currentIndex + 1] : null)
    }
  }, [chapterData, updateChapterFeedArray]);

  return (
    <PageWrapper>
      <section className='relative container pt-[81px]'>
        <div className="component-container text-color">
          <ChapterHeader chapterData={chapterData} />
          <ChapterMenu chapterData={chapterData} feedArray={updateChapterFeedArray} nextChapter={nextChapter} prevChapter={prevChapter} />
        </div>
          <ChapterPageImage chapterId={chapterData?.id} />
      </section>
      <ChapterFooter chapterData={chapterData} />
    </PageWrapper>
  )
}

export default ChapterPage