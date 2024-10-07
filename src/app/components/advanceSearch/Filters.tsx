'use client'
import React, { useState } from 'react'
import SortBy from './SortBy'
import ContentRating from './ContentRating'
import PublicationStatus from './PublicationStatus'
import DemographicFilter from './DemographicFilter'
import TagsFilter from './TagsFilter'

const Filters = ({ show }: { show: boolean }) => {

  return (
    <section className={`w-full ${show ? 'h-fit' : 'h-0'} transition-all duration-300 ease-in-out`}>
      <div className={`w-full ${show ? 'h-full block' : 'h-0 hidden'} transition-all duration-300 ease-in-out flex flex-wrap gap-[20px]`}>
        <SortBy />
        <ContentRating />
        <PublicationStatus />
        <DemographicFilter />
        <TagsFilter />
      </div>
    </section>
  )
}

export default Filters

