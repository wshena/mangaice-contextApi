// Server-side imports
import BestRatingManga from "./components/homePage/BestRatingManga";
import JumbotronCarousel from "./components/carousel/JumbotronCarousel";
import LatestMangaUpdate from "./components/homePage/LatestMangaUpdate";
import PopularTodayManga from "./components/homePage/PopularTodayManga";
import RecentlyAddManga from "./components/homePage/RecentlyAddManga";
import PageWrapper from "./components/PageWrapper";
import { getAllMangaWithLimit, getBestRatingmanga, getLatestMangaUpdate, getPopularMangaToday, getRecentlyAddManga } from "./utils/fetcher";
import { getMondayOfPreviousWeek } from "./utils/function";

// Client component import
import MobileTabsContent from "./components/MobileTabsContent";

export default async function Home() {
  	// get the date for one week before
	const date = getMondayOfPreviousWeek();

  // get current year
  const currentYear = new Date().getFullYear();

  const mangaList = await getAllMangaWithLimit(10);
  const latestMangaUpdate = await getLatestMangaUpdate(date, 12, 0);
  const recentlyAddManga = await getRecentlyAddManga(currentYear, date, 12, 0);
  const bestRatingManga = await getBestRatingmanga(10, 0);
  const popularTodayManga = await getPopularMangaToday(currentYear, date, 15, 0);

  return (
      <PageWrapper>
        <JumbotronCarousel data={mangaList.data} />

        {/* Mobile Tabs - Render MobileTabsContent, client-side component */}
        <div className="block md:hidden">
          <MobileTabsContent
            latestMangaUpdate={<LatestMangaUpdate data={latestMangaUpdate} />}
            popularTodayManga={<PopularTodayManga data={popularTodayManga} />}
            bestRatingManga={<BestRatingManga data={bestRatingManga} />}
            recentlyAddManga={<RecentlyAddManga data={recentlyAddManga} />}
          />
        </div>

        {/* Desktop View - All Components Rendered */}
        <div className="hidden md:block">
          <LatestMangaUpdate data={latestMangaUpdate} />
          <PopularTodayManga data={popularTodayManga} />
          <BestRatingManga data={bestRatingManga} />
          <RecentlyAddManga data={recentlyAddManga} />
        </div>
      </PageWrapper>
  );
}
