import React from 'react'
import SectionWrapper from '../SectionWrapper'
import WideCard from '../cards/WideCard';
import MultipleItemCarousel from '../carousel/MultipleItemCarousel';
import LoadingSpinner from '../LoadingSpinner';

const BestRatingManga = ({data}:{data:any}) => {
  const mangaList = data?.data;

  return (
    <>
    {data ? (
      <SectionWrapper>
        {/* section title */}
        <h1 className='text-color font-bold text-[1rem] md:text-[2rem]'>Best Rating Manga</h1>

        <MultipleItemCarousel list={mangaList} ItemComponent={WideCard} mobile={1} tablet={2} notbook={2} desktop={3} desktopSidebar={2} large={3}/>
      </SectionWrapper>
    ) : (
      <section className='container flex items-center jusitfy-center'>
        <LoadingSpinner width='50' height='50' />
      </section>
    )}
    </>
  )
}

export default BestRatingManga