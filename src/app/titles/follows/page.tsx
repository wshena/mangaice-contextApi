'use client'
import Link from 'next/link'
import PageWrapper from '@/app/components/PageWrapper'
import { useLibrary } from '@/app/context/LibraryContext'
import MediumCard from '@/app/components/cards/MediumCard'
import { useAuthContext } from '@/app/context/AuthContext'
import { ArrowLeftIcon, TrashIcon } from '@/app/utils/Icon'

const page = () => {
  const {user, isAuthenticated} = useAuthContext();
  const {clearLibrary} = useLibrary();

  const handleClearAll = () => {
    if (confirm('Remove manga from library?') === true) {
      clearLibrary();
    } else {
      return 
    }
  }

  return (
    <PageWrapper>
      <section className='container pt-[81px] text-color'>
        <div className="component-container">          
          {isAuthenticated ? (
            <div className="flex flex-col gap-[20px]">
              <div className="flex items-center gap-[10px]">
                <Link href={'/'} ><ArrowLeftIcon size={25} className='text-color' /></Link>
                <h1 className='text-font capitalize text-[1.3rem] md:text-[2rem]'>your manga collection</h1>
              </div>

              {user?.library && user?.library?.length > 0 ? (
                <div className="flex flex-col gap-[10px]">
                  <div className="w-full flex items-end justify-end">
                    <button role='button' onClick={handleClearAll} className='flex items-center gap-[8px] p-[.7rem] rounded-[5px] text-color capitalize bg-lightGray hover:scale-105'>
                      <TrashIcon size={20} className='text-color' />
                      <span>Clear all</span>
                    </button>
                  </div>
                  <ul className='flex items-center flex-wrap gap-[10px]'>
                    {user?.library?.map((manga:any) => {
                      return (
                        <li key={manga?.id}>
                          <MediumCard manga={manga} />
                        </li>
                      )
                    })}
                  </ul>
                </div>
              ) : (
                <h1 className="text-center text-[1.5rem]">Your library is empty</h1>
              )}
            </div>
          ) : (
            <div className="flex items-center flex-col gap-[15px]">
              <h1 className='text-[1.4rem]'>You need to sign in to use this page</h1>
              <div className="flex items-center gap-[20px]">
                <Link href='/auth/register' className='p-[.7rem] rounded-[5px] bg-lightOrange'>Register</Link>
                <Link href='/auth/login' className='p-[.7rem] rounded-[5px] bg-lighterGray'>Login</Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </PageWrapper>
  )
}

export default page