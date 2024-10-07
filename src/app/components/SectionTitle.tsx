import Link from 'next/link'
import React from 'react'
import { ArrowRightIcon } from '../utils/Icon'

interface Props {
  title:string;
  link:string;
}

const SectionTitle = ({title, link}:Props) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className='text-color font-bold text-[1rem] md:text-[2rem]'>{title}</h1>
      <Link href={link} className='p-[.3rem] rounded-full bg-secondary-hover'>
        <ArrowRightIcon size={25} className='text-color' />
      </Link>
    </div>
  )
}

export default SectionTitle