'use client';
import React, { useState } from 'react';
import MobileTabs from './MobileTabs';

const MobileTabsContent = ({ latestMangaUpdate, popularTodayManga, bestRatingManga, recentlyAddManga }:any) => {
  const [currentTab, setCurrentTab] = useState('latest');

  const renderTabContent = () => {
    switch (currentTab) {
      case 'popular':
        return popularTodayManga;
      case 'best rating':
        return bestRatingManga;
      case 'recently':
        return recentlyAddManga;
      case 'latest':
      default:
        return latestMangaUpdate;
    }
  };

  return (
    <div>
      <MobileTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {renderTabContent()}
    </div>
  );
};

export default MobileTabsContent;
