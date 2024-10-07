'use client';

import { SidebarNavigation } from '@/app/utils/const';
import { useThemeContext } from '@/app/context/ThemeContext';
import { useUtilityContext } from '@/app/context/UtilityContext';
import { CloseIcon, MangadexIcon } from '@/app/utils/Icon';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Sidebar = () => {
  const currentRoute = usePathname();
  const { sidebarClick, handleSidebarClick } = useUtilityContext();
  const { theme } = useThemeContext();

  return (
    <aside
      className={`z-40 ${
        sidebarClick ? 'left-0' : '-left-[270px]'
      } fixed top-0 w-[270px] h-[100vh] overflow-y-auto transition-all duration-300 ease-in-out bg-secondary text-color`}
    >
      <section className="h-[700px] xl:h-full p-[20px] flex flex-col justify-between">
        <div className="flex flex-col">
          {/* logo and close button */}
          <div className="flex items-center justify-between mb-[20px]">
            <Link href={'/'} className="flex items-center gap-[8px]">
              <Image src={MangadexIcon} width={40} height={35} alt="mangaice" />
              <h1 className={`text-color font-bold text-[1.3rem]`}>Mangaice</h1>
            </Link>

            <button onClick={handleSidebarClick}>
              <CloseIcon size={25} className='text-color' />
            </button>
          </div>

          {/* sidebar navigation */}
          <div className="flex flex-col gap-[10px]">
            {SidebarNavigation.map((item: any) => {
              return (
                <div key={item.link}>
                  {item.link === 'Home' ? (
                    <Link
                      href={'/'}
                      className={`${
                        currentRoute === '/' ? (theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple') : 'bg-none accent-color-hover'
                      } block w-full p-[.5rem] rounded-[5px] font-bold mb-[8px] text-color text-[15px]`}
                    >
                      {item.link}
                    </Link>
                  ) : (
                    <h1 className={`font-bold mb-[8px] text-color text-[15px]`}>{item.link}</h1>
                  )}
                  <ul className="flex flex-col gap-[10px]">
                    {item.sublinks.map((item: any) => (
                      <li key={item.label} className={`ml-[10px] text-color`}>
                        <Link href={item.link} className={`${item?.link == currentRoute ? (theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple') : 'bg-none'} text-[13px] block w-full p-[.5rem] sidebar-link rounded-[5px]`}>
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <p className={`text-center text-${theme}-text`}>Mangaice 2024</p>
      </section>
    </aside>
  );
};

export default Sidebar;