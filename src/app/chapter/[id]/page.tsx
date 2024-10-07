import ChapterPage from '@/app/components/chapterPage/ChapterPage';
import { getChapterFeedFromChapterId, getChapterImage } from '@/app/utils/fetcher';
import { getTitle } from '@/app/utils/function';
import { Metadata } from 'next';
import React from 'react'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const chapterId = params?.id;
  const chapterData = await getChapterFeedFromChapterId(chapterId);
  const mangaRelationData = chapterData?.data?.relationships?.find((rel:any) => rel.type === 'manga');

  return {
    title: `Chapter ${chapterData?.data?.attributes?.chapter} - ${getTitle(mangaRelationData?.attributes?.title)}`,
    description: "Get best quality manga on Mangaice",
  };
}

const page = async ({params}:any) => {
  const chapterId = params?.id;

  // fetch chapter data
  const chapterData = await getChapterFeedFromChapterId(chapterId);

  return (
    <ChapterPage chapterData={chapterData?.data} />
  )
}

export default page