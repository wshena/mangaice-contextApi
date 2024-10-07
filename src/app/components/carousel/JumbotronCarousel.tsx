'use client'
import React, { useEffect, useState } from 'react'
import JumbotronCard from '../cards/JumbotronCard'
import JumbotronNextPrevButton from './JumbotronNextPrevButton';

const JumbotronCarousel = ({data}:{data:any}) => {
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

	// next and prev button for the carousel
	const nextSlide = () => {
		if (currentIndex === data?.length - 1) setCurrentIndex(0);
		else setCurrentIndex(currentIndex + 1);
	};
	const prevSlide = () => {
		if (currentIndex === 0) setCurrentIndex(data?.length - 1);
		else setCurrentIndex(currentIndex - 1);
	};

	// check if data is available, if data then loading = false
	useEffect(() => {
		if (data) setLoading(false);
	}, [data]);

	// Automatically advance to the next slide every 15 seconds
	useEffect(() => {
		const interval = setInterval(() => {
			nextSlide();
		}, 15000);

		return () => {
			clearInterval(interval);
		};
	}, [currentIndex]);

  return (
    <section className="w-full overflow-hidden relative">
      {loading ? (
        <div className="w-full h-[700px] md:h-[500px] bg-darkGray animate-pulse"></div>
      ) : (
        <div className="relative">
          <ul className={`flex transition-transform duration-500 ease-out`} style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}>
            {data.map((manga:any) => {
              return (
                <li className="w-full flex-shrink-0" key={manga?.id}>
                  <JumbotronCard manga={manga}/>
                </li>
              )
            })}
          </ul>

          <JumbotronNextPrevButton
						next={nextSlide}
						prev={prevSlide}
						index={currentIndex}
					/>
        </div>
      )}
    </section>
  )
}

export default JumbotronCarousel