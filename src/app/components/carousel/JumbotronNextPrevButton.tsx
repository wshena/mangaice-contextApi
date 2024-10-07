import { AngleLeftIcon, AngleRightIcon } from '@/app/utils/Icon';
import React from 'react'

const JumbotronNextPrevButton = ({
	prev,
	next,
	index,
}: {
	prev: () => void;
	next: () => void;
	index: number;
}) => {
  return (
    <div className="flex items-center gap-[1rem] absolute bottom-[10px] right-[30%] md:bottom-[30px] md:right-[80px] 2xl:right-[570px] justify-center text-color">
			<span className="font-bold">No. {index + 1}</span>
			<button
				className="transition-all duration-300 ease-in-out p-[.2rem] rounded-full hover:bg-black"
				onClick={prev}
			>
				<AngleLeftIcon size={30} className='text-color' />
			</button>
			<button
				className="transition-all duration-300 ease-in-out p-[.2rem] rounded-full hover:bg-black"
				onClick={next}
			>
				<AngleRightIcon size={30} className='text-color' />
			</button>
		</div>
  )
}

export default JumbotronNextPrevButton