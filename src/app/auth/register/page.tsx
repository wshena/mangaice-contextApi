'use client'
import PageWrapper from '@/app/components/PageWrapper'
import { useAuthContext } from '@/app/context/AuthContext'
import { useThemeContext } from '@/app/context/ThemeContext'
import { AngleLeftIcon } from '@/app/utils/Icon'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const router = useRouter();

  const {signUp} = useAuthContext();
  const {theme} = useThemeContext();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk kontrol visibilitas password

  const validateForm = () => {
    if (username.trim() === '' || password.trim() === '') {
      setErrorMessage('Please enter username and password');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return
    } else {
      const isSuccess = await signUp(username, password);
      if (isSuccess) {
        router.push('/auth/login');
      } else {
        setErrorMessage('Username already exists');
      }
    };
  };

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <PageWrapper>
      <section className='w-full pt-[81px] lg:py-[40px] h-full lg:h-[100vh] container flex items-center justify-center bg-primary'>
        <form action={''} onSubmit={handleSubmit} className="bg-secondary text-color p-[.7rem] md:p-[1.2rem] w-[90%] md:w-[500px] h-full md:h-[440px] rounded-[10px] flex flex-col justify-between">
          <h1 className='text-center font-bold text-[1rem] md:text-[1.5rem] capitalize'>register your account</h1>
          <div className="flex flex-col gap-[15px]">
            {/* username */}
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="username" className='capitalize text-[.8rem] md:text-[1rem]'>username</label>
              <input type="text" name="username" id="usename" autoComplete='off' className='rounded-[5px] accent-color focus:outline-none focus:rounded-[5px] focus:outline-lightOrange p-[.2rem] rounded-5px] transition-all duration-300 ease-in-out' value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>

            {/* password */}
            <div className="flex flex-col gap-[10px]">
              <label htmlFor="password" className='capitalize text-[.8rem] md:text-[1rem]'>password</label>
              <div className="flex items-center justify-between">
                <input type={passwordVisible ? 'text' : 'password'} name="password" id="password" autoComplete='off' className='w-full rounded-[5px] accent-color focus:outline-none focus:rounded-[5px] focus:outline-lightOrange p-[.2rem] rounded-5px] transition-all duration-300 ease-in-out' value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* Tombol untuk toggle visibilitas password */}
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-[.7rem] font-medium text-color"
                >
                  {passwordVisible ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-[10px] md:mt-0 flex flex-col gap-[15px]">
            <Link href={'/auth/login'} className='text-[.8rem] md:text-[1rem] flex items-center gap-[10px]'>
              <AngleLeftIcon size={20} className='text-lightOrange' />
              <span className='capitalize text-lightOrange'>back to login</span>
            </Link>
            <button type='submit' className={`${theme !== 'dracula' ? 'text-lightOrange' : 'text-lightPurple'} text-[.8rem] md:text-[1rem] block bg-lightOrange capitalize text-center rounded-[5px] py-[.6rem] text-white`}>Register</button>
          </div>

          {errorMessage && 
            <div className='w-full text-center text-red-500 text-[1rem]'>
              <h1>{errorMessage}</h1>
            </div>
          }
        </form>
      </section>
    </PageWrapper>
  )
}

export default page