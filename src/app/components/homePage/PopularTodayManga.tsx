import React from 'react'
import SectionWrapper from '../SectionWrapper'
import RectangleCard from '../cards/RectangleCard';
import LoadingSpinner from '../LoadingSpinner';

const PopularTodayManga = ({data}:{data:any}) => {
  const mangaList = data?.data;

  return (
    <>
    {data ? (
      <SectionWrapper>
        <h1 className='text-color font-bold text-[1rem] md:text-[2rem]'>Popular Today</h1>
        <ul className={`flex flex-col items-center md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-[10px]`}>
          {mangaList?.map((manga:any) => {
            return (
              <li key={manga?.id}>
                <RectangleCard manga={manga} />
              </li>
            )
          })}
        </ul>
      </SectionWrapper>
    ) : (
      <section className='container flex items-center jusitfy-center'>
        <LoadingSpinner width='50' height='50' />
      </section>
    )}
    </>
  )
}

export default PopularTodayManga