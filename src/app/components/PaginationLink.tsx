'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useThemeContext } from '../context/ThemeContext';
import { LeftArrowIcon, RightArrowIcon } from '../utils/Icon';

function Content({ total, currentPage, onPageChange, theme }: any) {
  const pages = [];
  for (let i = 1; i <= total; i++) {
    if (i === 1 || i === total || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i);
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      pages.push('...');
    }
  }

  const handlePageChange = (page: any) => {
    if (page !== '...') {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-1 mt-4">
      <button
        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
        disabled={currentPage <= 1}
        className={`p-[.4rem] rounded-full ${currentPage > 1 ? 'accent-color-hover' : 'cursor-not-allowed'}`}
      >
        <LeftArrowIcon size={18} className='text-color' />
      </button>

      {pages.map((page, index) =>
        page === '...' ? (
          <span key={`${index} + ${page}`} className="px-3 py-1 text-gray-500">...</span>
        ) : (
          <button
            key={`${index} + ${page}`}
            onClick={() => handlePageChange(page as number)}
            className={`px-3 py-1 rounded-md ${
              page === currentPage
                ? `${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'} text-white`
                : 'text-color bg-secondary-hover'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => handlePageChange(currentPage < total ? currentPage + 1 : total)}
        disabled={currentPage >= total}
        className={`p-[.4rem] rounded-full ${currentPage < total ? 'accent-color-hover' : 'cursor-not-allowed'}`}
      >
        <RightArrowIcon size={18} className='text-color' />
      </button>
    </div>
  );
}

interface Props {
  totalItem: any;
  link: string;
  limit?: any;
}

const PaginationLink = ({ totalItem, link, limit }: Props) => {
  const {theme} = useThemeContext();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;

  // Hitung jumlah halaman yang diperlukan
  const totalPages = Math.ceil(totalItem / limit);

  const handlePageChange = (page: number) => {
    router.push(`/${link}${page === 1 ? '' : `page=${page}`}`)
  };

  return (
    <>
    {limit ? (
      <Content total={totalPages} currentPage={currentPage} onPageChange={handlePageChange} theme={theme} />
    ) : (
      <Content total={totalItem} currentPage={currentPage} onPageChange={handlePageChange} theme={theme} />
    )}
    </>
  );
};

export default PaginationLink;
