import React from 'react'

interface Props {
  children: React.ReactNode;
}

const SectionWrapper = ({children}:Props) => {
  return (
    <section className='container'>
      <div className="component-container flex flex-col gap-[20px]">
        {children}
      </div>
    </section>
  )
}

export default SectionWrapper