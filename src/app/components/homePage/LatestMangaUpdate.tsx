import React from 'react'
import SectionTitle from '../SectionTitle';
import LatestUpdatesCard from '../cards/LatestUpdatesCard';
import SectionWrapper from '../SectionWrapper';
import LoadingSpinner from '../LoadingSpinner';

const LatestMangaUpdate = ({data}:{data: any}) => {
  const latestMangaUpdateList = data?.data;

  return (
    <>
    {data ? (
      <SectionWrapper>
        {/* section title */}
        <SectionTitle title='Latest Updates' link='/titles/latest' />

        {/* latest update mangas */}
        <ul className='grid grid-cols-1 lg:grid-cols-2 gap-[15px]'>
          {latestMangaUpdateList.map((item:any) => {
            return (
              <li key={item.id}>
                <LatestUpdatesCard data={item} />
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

export default LatestMangaUpdate