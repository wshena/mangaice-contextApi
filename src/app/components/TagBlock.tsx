import Link from 'next/link'
import React from 'react'

const TagBlock = ({tag,link}:{tag:string, link:string}) => {
  return (
    <Link href={link} className={`px-[.2rem] py-0 ${tag !== 'Gore' && 'Sugestive' && 'bg-secondary'} ${tag === 'Gore' && 'bg-lightRed'} ${tag === 'Sugestive' && 'bg-orange'} rounded-[5px]`}>
      <span className='text-[.7rem]'>
        {tag}
      </span>
    </Link>
  )
}

export default TagBlock