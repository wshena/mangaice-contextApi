'use client'
import React, { useEffect, useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import Link from 'next/link'
import { ArrowLeftIcon, ContentFilterCheckIcon, ContentFilterUncheckIcon } from '../utils/Icon'
import { ChapterDisplay, Contentrating, SettingOptions, Themes } from '../utils/const'
import { useThemeContext } from '../context/ThemeContext'
import { useUtilityContext } from '../context/UtilityContext'
import { useAuthContext } from '../context/AuthContext'

const page = () => {
  const {theme} = useThemeContext();

  const [options, setOptions] = useState('all');
  const handleOption = (option:string) => setOptions(option);
  
  return (
    <PageWrapper>
      <section className="container pt-[81px]">
        <div className="component-container text-color flex flex-col gap-[20px]">
          <div className="flex items-center gap-[10px]">
            <Link href={'/'} ><ArrowLeftIcon size={25} className='text-color' /></Link>
            <h1 className='text-font capitalize text-[1.3rem] md:text-[2rem]'>user settings</h1>
          </div>

          {/* user settings */}
          <div className="flex flex-col gap-[20px] md:gap-0 md:flex-row">
            <aside className='md:pr-[1rem] md:border-r md:border-r-lightGray'>
              <ul className="flex flex-row overflow-x-auto md:overflow-x-hidden md:flex-col gap-[10px]">
                {SettingOptions.map((item:any) => {
                  return (
                    <li key={item}>
                      <button 
                      onClick={() => handleOption(item)}
                      className={`capitalize w-[100px] md:w-[158px] text-[1rem] py-[.5rem] bg-secondary-hover rounded-[5px] ${options === item ? `${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}` : 'bg-transparent'}`}>{item}</button>
                    </li>
                  )
                })}
              </ul>
            </aside>

            <div className="w-full md:pl-[1rem]">
              <Setting option={options} />
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}

const Setting = ({option}:{option:string}) => {
  const Options = (option:string) => {
    switch (option) {
      case 'display':
        return <DisplayOptions />;
      case 'blocks':
        return <BlocksOptions />;
      case 'profile':
        return <ProfileOptions />;
      case 'other':
        return <OtherOptions />;
      default:
        return <DefaultOptions />;
    }
  }

  return (
    <>
      {Options(option)}
    </>
  )
}

const DefaultOptions = () => {
  return (
    <div>
      <DisplayOptions />
      <BlocksOptions />
      <ProfileOptions />
      <OtherOptions />
    </div>
  )
};

const DisplayOptions = () => {
  const {theme, setTheme} = useThemeContext();
  const {ChapterDisplaySetting, setChapterDisplaySetting, dataSaver, setDataSaver} = useUtilityContext();
  
  return (
    <div className="flex flex-col gap-[15px]">
      {/* theme selection */}
      <div className="py-[10px] border-t border-t-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>Theme</h1>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between">
          <h2 className='text-[.9rem]'>the theme of this site.</h2>
          <select
            name="chapter"
            id="chapter"
            value={theme}
            onChange={(e:any) => {setTheme(e.target.value)}}
            className='text-color bg-secondary p-[.5rem] rounded-[5px] w-full md:w-[300px]'>
            {Themes.map((item: string) => (
              <option
                key={item}
                value={item}
                className={`bg-secondary hover:bg-lightGray p-[.5rem]`}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* chapter page display settings */}
      <div className="py-[10px] border-t border-t-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>Chapter Page Display</h1>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between">
          <h2 className='text-[.9rem]'>change the display settings for chapter page.</h2>
          <select
            name="chapter"
            id="chapter"
            value={ChapterDisplaySetting}
            onChange={(e:any) => {setChapterDisplaySetting(e.target.value)}}
            className='text-color bg-secondary p-[.5rem] rounded-[5px] w-full md:w-[300px]'>
            {ChapterDisplay.map((item: string) => (
              <option
                key={item}
                value={item}
                className={`bg-secondary hover:bg-lightGray p-[.5rem]`}>{item}</option>
            ))}
          </select>
        </div>
      </div>

      {/* data saver or data for get chapter page image */}
      <div className="py-[10px] border-y border-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>Data Saver</h1>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between">
          <h2 className='text-[.9rem]'>Reduce data usage by viewing lower quality versions of chapters.</h2>
          <div className="flex items-center gap-[8px]">
            <button onClick={() => {
              setDataSaver(!dataSaver);
            }}>
              <div className="flex items-center gap-2">
                <span className="text-sm">Off</span>
                <div
                  className={`relative w-12 h-6 cursor-pointer rounded-full 
                  ${dataSaver ? `${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}` : 'bg-gray-600'}`}
                >
                  <div
                    className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-gray-300 transition-all duration-300
                    ${dataSaver ? 'translate-x-6' : 'translate-x-0 bg-gray-500'}`}
                  />
                </div>
                <span className="text-sm">On</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const BlocksOptions = () => {
  const [content, setContent] = useState<string[]>([]); // State untuk menyimpan opsi yang dipilih

  const handleSelection = (item: string) => {
    if (content.includes(item)) {
      // Jika item sudah ada di array, hapus dari array
      setContent(content.filter((i) => i !== item));
    } else {
      // Jika item belum ada, tambahkan ke array
      setContent([...content, item]);
    }
  };

  return (
    <div className="py-[10px] border-y border-lightGray flex flex-col gap-[10px]">
      <h1 className='text-[1.2rem]'>Content Filter</h1>
      <div className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between">
        <h2 className='text-[.9rem]'>Choose how this site displays explicit material.</h2>
        <ul className="flex flex-col gap-[10px]">
        {Contentrating.map((item) => (
            <button
              key={item}
              onClick={() => handleSelection(item.toLowerCase())}
              className={`text-start capitalize flex gap-[8px]`}
            >
              {/* Indicator: Show a dot or radio button if selected */}
              {content.includes(item.toLowerCase()) ? (
                <ContentFilterCheckIcon />
              ) : (
                <ContentFilterUncheckIcon />
              )}
              <span>{item}</span>
            </button>
          ))}
        </ul>
      </div>
    </div>
  )
};

const ProfileOptions = () => {
  const {isAuthenticated} = useAuthContext();
  const { user, updateUser } = useAuthContext();
  const {theme} = useThemeContext();

  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [newPassword, setNewPassword] = useState(user?.password || '');

  // Sync newUsername and newPassword with the updated user state
  useEffect(() => {
    if (user) {
      setNewUsername(user.username);
      setNewPassword(user.password);
    }
  }, [user]);

  // Change handler for both username and password
  const handleChangeProfile = () => {
    updateUser(newUsername, newPassword);
  };

  return (
    <>
    {isAuthenticated ? (
      <div className="py-[10px] border-y border-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>Profile</h1>
        <div className="mt-[30px] flex flex-col gap-[10px]">
          {/* Username input form */}
          <div className="flex items-center justify-between">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              name="username"
              id="username"
              value={newUsername}
              autoComplete='off'
              onChange={(e: any) => setNewUsername(e.target.value)}
              className='bg-transparent focus:outline-none border-b border-b-lightGray w-[65%] md:w-[75%]'
            />
          </div>
          {/* Password input form */}
          <div className="flex items-center justify-between">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              name="password"
              id="password"
              value={newPassword}
              autoComplete='off'
              onChange={(e: any) => setNewPassword(e.target.value)}
              className='bg-transparent focus:outline-none border-b border-b-lightGray w-[65%] md:w-[75%]'
            />
          </div>
        </div>
        <div className="mt-[20px] w-full flex items-center md:justify-end">
          <button
            onClick={() => {
              if (confirm('Change Profile?')) {
                handleChangeProfile();
              }
            }}
            className={`p-[.8rem] w-full md:w-[300px] rounded-[5px] font-bold ${theme !== 'dracula' ? 'bg-lightOrange' : 'bg-lightPurple'}`}
          >
            Change Profile
          </button>
        </div>
      </div>
    ) : (
      <div className="py-[10px] border-y border-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>Account</h1>
        <div className="flex items-center justify-between">
          <h2 className='text-[.9rem]'>Log in to see your account settings.</h2>
          <Link href={'/auth/login'} className='block bg-secondary rounded-[5px] text-center w-[300px] py-[1rem] text-[1rem]'>Log In</Link>
        </div>
      </div>
    )}
    </>
  )
};

const OtherOptions = () => {
  const {setTheme} = useThemeContext();
  const {setChapterDisplaySetting, setDataSaver} = useUtilityContext();

  return (
    <div className="flex flex-col gap-[15px]">
      <div className="py-[10px] border-t border-t-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>View the Suspicious Activity Article</h1>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between">
          <h2 className='text-[.9rem]'>Need a refresher on how to deal with suspicious activity, or just want to see the pretty pictures again? Go ahead.</h2>
          <button className='bg-secondary rounded-[5px] text-center w-full md:w-[300px] py-[1rem] text-[1rem]'>
            View article
          </button>
        </div>
      </div>

      <div className="py-[10px] border-y border-lightGray flex flex-col gap-[10px]">
        <h1 className='text-[1.2rem]'>Reset Settings</h1>
        <div className="flex flex-col md:flex-row gap-[15px] md:gap-0 md:items-center md:justify-between">
          <h2 className='text-[.9rem]'>Resets all of your settings to their defaults.</h2>
          <button onClick={() => {
            if (confirm('reset all settings?')) {
              setTheme('dark');
              setChapterDisplaySetting('Long Strip');
              setDataSaver(true);
            }

            return
          }} className='bg-secondary rounded-[5px] text-center w-full md:w-[300px] py-[1rem] text-[1rem]'>
            Reset
          </button>
        </div>
      </div>
    </div>
  )
};

export default page