import React from 'react'

const InfoBlock = ({title, children}:{title:string, children:React.ReactNode}) => {
  return (
    <div className="flex flex-col gap-[10px] text-color">
      <h1 className='font-bold capitalize'>{title}</h1>
      {children}
    </div>
  )
}

export default InfoBlock