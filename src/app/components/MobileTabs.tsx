import React from 'react'
import SectionWrapper from './SectionWrapper';

const MobileTabs = ({ currentTab, setCurrentTab }:any) => {
  const tabs = ['latest', 'popular', 'best rating', 'recently'];

  return (
    <SectionWrapper>
      <ul className='text-color w-full items-center flex gap-[10px]'>
        {tabs.map((t:string) => {
          return (
            <li key={t}>
              <button 
                onClick={() => setCurrentTab(t)} 
                className={`${t === currentTab && 'font-bold border-b'} text-[.9rem] capitalize`}
              >
                {t}
              </button>
            </li>
          )
        })}
      </ul>
    </SectionWrapper>
  )
}

export default MobileTabs;