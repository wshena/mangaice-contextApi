'use client';
import React, { useState, useEffect } from 'react';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { useThemeContext } from '@/app/context/ThemeContext';
import LoadingSpinner from '../LoadingSpinner';
import { getItemsToShow } from '@/app/utils/function';

// Define the type for the ItemComponent prop
interface MultipleItemCarouselProps {
  list: any[];
  ItemComponent: React.ComponentType<any>; // Allow any component with props
  itemProps?: any; // Optional additional props for the item component

  // item count for display
  mobile: number;
  tablet: number;
  notbook: number;
  desktop: number;
  desktopSidebar: number;
  large: number;
}

const MultipleItemCarousel: React.FC<MultipleItemCarouselProps> = ({
  list,
  ItemComponent,
  itemProps,
  mobile,
  tablet,
  notbook,
  desktop,
  desktopSidebar,
  large,
}) => {
  // Get website theme
  const { theme } = useThemeContext();

  // Sidebar click
  const { sidebarClick } = useUtilityContext();

  const [currentIndex, setCurrentIndex] = useState(
    getItemsToShow(sidebarClick, mobile, tablet, notbook, desktop, large, desktopSidebar)
  );
  const [itemsToShow, setItemsToShow] = useState(1); // Default value for SSR
  const [isAnimating, setIsAnimating] = useState(false); // State for animation
  const [touchStartX, setTouchStartX] = useState<number | null>(null); // For detecting swipe start
  const [touchEndX, setTouchEndX] = useState<number | null>(null); // For detecting swipe end

  // Duplicate awal dan akhir elemen untuk infinite loop
  const extendedList = [
    ...list.slice(-itemsToShow),
    ...list,
    ...list.slice(0, itemsToShow),
  ];

  // Update jumlah item saat ukuran layar berubah
  useEffect(() => {
    const handleResize = () => {
      const newItemsToShow = getItemsToShow(
        sidebarClick,
        mobile,
        tablet,
        notbook,
        desktop,
        large,
        desktopSidebar
      );
      setItemsToShow(newItemsToShow);
      setCurrentIndex(newItemsToShow); // Update currentIndex for infinite loop
    };

    // Set initial itemsToShow
    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [sidebarClick]); // Tambahkan sidebarClick sebagai dependency

  // Mengatur index slide saat mengklik dot
  const setSlide = (index: number) => {
    setCurrentIndex(index * itemsToShow + itemsToShow);
  };

  // Reset posisi carousel untuk infinite loop
  const handleTransitionEnd = () => {
    setIsAnimating(false);
    if (currentIndex >= extendedList.length - itemsToShow) {
      setCurrentIndex(itemsToShow);
    } else if (currentIndex < itemsToShow) {
      setCurrentIndex(extendedList.length - itemsToShow * 2);
    }
  };

  // Handle swipe start
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  // Handle swipe move
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
  };

  // Handle swipe end
  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const swipeDistance = touchStartX - touchEndX;
    const minSwipeDistance = 50; // Minimum swipe distance to be considered a swipe

    if (swipeDistance > minSwipeDistance) {
      // Swipe left
      setCurrentIndex(currentIndex + itemsToShow);
      setIsAnimating(true);
    } else if (swipeDistance < -minSwipeDistance) {
      // Swipe right
      setCurrentIndex(currentIndex - itemsToShow);
      setIsAnimating(true);
    }

    // Reset swipe positions
    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <div
      className="relative w-full h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {list ? (
        <>
          {/* Container untuk slide */}
          <div className="overflow-hidden">
            <ul
              className={`h-full flex transition-transform duration-500 ease-in-out ${
                isAnimating ? 'transform' : ''
              }`}
              style={{
                transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
              }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedList.map((item: any, index: number) => (
                <li key={`${item?.id}-${index}`} className="flex-none w-full p-2" style={{ width: `${100 / itemsToShow}%` }}>
                  <ItemComponent manga={item} {...itemProps} />
                </li>
              ))}
            </ul>
          </div>

          {/* Kontrol dot di bawah */}
          <div className="mt-[10px] flex justify-center space-x-2">
            {Array(Math.ceil(list.length / itemsToShow))
              .fill(null) // Menggunakan null untuk mengisi array
              .map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full focus:outline-none ${
                    index === Math.floor((currentIndex - itemsToShow) / itemsToShow)
                      ? theme !== 'dracula' ? 'bg-lightOrange' : 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}
                  onClick={() => setSlide(index)}
                />
              ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full">
          <LoadingSpinner width="30px" height="30px" />
        </div>
      )}
    </div>
  );
};

export default MultipleItemCarousel;
