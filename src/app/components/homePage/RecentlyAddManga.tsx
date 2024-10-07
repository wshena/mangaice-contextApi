import React from 'react';
import SectionWrapper from '../SectionWrapper';
import SectionTitle from '../SectionTitle';
import MultipleItemCarousel from '../carousel/MultipleItemCarousel';
import LoadingSpinner from '../LoadingSpinner';
import SmallCard from '../cards/SmallCard';

const RecentlyAddManga = ({ data }: { data: any }) => {
  const mangalist = data?.data;

  return (
    <>
    {data ? (
      <SectionWrapper>
        {/* section title */}
        <SectionTitle title='Recently Added' link='/titles/recent' />
  
        {/* recently mangas */}
        <MultipleItemCarousel ItemComponent={SmallCard} list={mangalist} mobile={2} tablet={5} notbook={7} desktop={8} desktopSidebar={7} large={8} />
      </SectionWrapper>
    ) : (
      <section className='container flex items-center jusitfy-center'>
        <LoadingSpinner width='50' height='50' />
      </section>
    )}
    </>
  );
};

export default RecentlyAddManga;
