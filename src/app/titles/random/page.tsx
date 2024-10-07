import { getRandomMangaData } from '@/app/utils/fetcher';
import { getTitle } from '@/app/utils/function';
import { redirect } from 'next/navigation';

const Page = async () => {
  const fetchRandomManga = await getRandomMangaData();
  const randomManga = fetchRandomManga?.data;

  // Redirect to the specific manga page if data is found
  if (randomManga) {
    redirect(`/title/${randomManga.id}/${encodeURIComponent(getTitle(randomManga?.attributes?.title))}`);
  }

  // If no data is found, return some fallback or error content
  return (
    <div>No manga found. Please try again.</div>
  );
};

export default Page;
