'use client'
import { useFilterContext } from '@/app/context/FilterContext';
import { getAllTags } from '@/app/utils/fetcher';
import { getTitle } from '@/app/utils/function';
import { UpDownAngleIcon } from '@/app/utils/Icon';
import React, { useEffect, useState } from 'react';

const TagsFilter = () => {
  const {setIncludedTagsFilter, setExcludedTagsFilter, resetButtonClick} = useFilterContext();
  const [allTags, setAllTags] = useState<any>([]);
  const [includeTags, setIncludeTags] = useState<{id: string, title: string}[]>([]);
  const [excludeTags, setExcludeTags] = useState<{id: string, title: string}[]>([]);
  const [click, setClick] = useState(false);

  useEffect(() => {
    setIncludedTagsFilter(includeTags);
    setExcludedTagsFilter(excludeTags);
  }, [includeTags, excludeTags])

  // handle resetbutton
  useEffect(() => {
    if (resetButtonClick) {
      setIncludeTags([]);
      setExcludeTags([]);
    }
  }, [resetButtonClick])

  useEffect(() => {
    const fetchAllTags = async () => {
      try {
        const response = await getAllTags();
        setAllTags(response?.data);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchAllTags();
  }, []);

  const format = allTags?.filter((item: any) => item?.attributes?.group === 'format');
  const genre = allTags?.filter((item: any) => item?.attributes?.group === 'genre');
  const theme = allTags?.filter((item: any) => item?.attributes?.group === 'theme');
  const content = allTags?.filter((item: any) => item?.attributes?.group === 'content');

  const toggleTag = (tag: any) => {
    const tagData = {
      id: tag.id,
      title: getTitle(tag?.attributes?.name),
    };

    if (includeTags.some((t) => t.id === tagData.id)) {
      // Jika tag sudah termasuk, pindahkan ke exclude
      setIncludeTags(includeTags.filter((t) => t.id !== tagData.id));
      setExcludeTags([...excludeTags, tagData]);
    } else if (excludeTags.some((t) => t.id === tagData.id)) {
      // Jika tag sudah dikecualikan, keluarkan dari exclude
      setExcludeTags(excludeTags.filter((t) => t.id !== tagData.id));
    } else {
      // Jika tag belum ada di kedua state, masukkan ke include
      setIncludeTags([...includeTags, tagData]);
    }
  };

  return (
    <div className="w-full lg:w-fit flex flex-col gap-[10px] h-full">
      <div className="flex items-center gap-[10px]">
        <h3 className='text-gray-500'>Filter Tags</h3>
        {includeTags.length > 0 && (
          <h4 className='text-green-600'>+{includeTags.length}</h4>
        )}
        {excludeTags.length > 0 && (
          <h4 className='text-red-600'>-{excludeTags.length}</h4>
        )}
      </div>
      <div className="w-full lg:w-[290px] relative">
        <button onClick={() => setClick(!click)} className='flex items-center justify-between w-full p-[.5rem] rounded-[5px] bg-secondary'>
          <span className='capitalize'>any Tags</span>
          <UpDownAngleIcon />
        </button>

        {/* Option select */}
        <div className={`absolute left-0 top-[50px] ${click ? 'h-[400px] block' : 'h-0 hidden'} w-full transition-all duration-300 ease-in-out flex flex-col gap-[15px] rounded-[5px] bg-secondary p-[.5rem] lg:w-[650px] z-20 overflow-y-auto`}>
          <p className=''>
            <i>Click on any tag once to include it. Click on it again to exclude it. Click once more to clear it.</i>
          </p>

          {/* reset button */}
          <div className="w-full flex justify-end">
            <button onClick={() => {
              setIncludeTags([]);
              setExcludeTags([]);
            }} className='px-[1.3rem] py-[.6rem] rounded-[5px] bg-red-500 text-red-900 font-bold'>Reset</button>
          </div>

          {/* tags options */}
          <Tags label='Format' tagsArray={format} toggleTag={toggleTag} includeTags={includeTags} excludeTags={excludeTags} />
          <Tags label='Genre' tagsArray={genre} toggleTag={toggleTag} includeTags={includeTags} excludeTags={excludeTags} />
          <Tags label='Theme' tagsArray={theme} toggleTag={toggleTag} includeTags={includeTags} excludeTags={excludeTags} />
          <Tags label='Content' tagsArray={content} toggleTag={toggleTag} includeTags={includeTags} excludeTags={excludeTags} />
        </div>
      </div>
    </div>
  );
};

const Tags = ({ label, tagsArray, toggleTag, includeTags, excludeTags }: any) => {
  return (
    <div className="w-full flex flex-col gap-[10px]">
      <div className="flex items-center gap-[5px]">
        <h2 className='text-[1.3rem] capitalize'>{label}</h2>
        <span className="block w-full h-[1px] bg-gray-800"></span>
      </div>
      <ul className="flex flex-wrap gap-[7px]">
        {tagsArray?.map((item: any) => {
          const tagTitle = getTitle(item?.attributes?.name);
          const isIncluded = includeTags.some((t:any) => t.id === item.id);
          const isExcluded = excludeTags.some((t:any) => t.id === item.id);

          return (
            <li key={item?.id}>
              <button
                className={`text-white p-[.4rem] rounded-[5px] text-[.7rem] ${
                  isIncluded ? 'bg-green-600' : isExcluded ? 'bg-red-600' : 'bg-gray-700'
                }`}
                onClick={() => toggleTag(item)}
              >
                {tagTitle}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TagsFilter;
