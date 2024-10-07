'use client';
import React, { useEffect, useState } from 'react';
import { useUtilityContext } from '../context/UtilityContext';
import { CloseIcon, ProfileIcon } from '../utils/Icon';
import { useAuthContext } from '../context/AuthContext';

const ProfileSettings = () => {
  const { profileSettingClick, handleOffProfileSettingClick } = useUtilityContext();
  const { user, updateUser } = useAuthContext();

  const [message, setMessage] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false); // State untuk kontrol visibilitas password
  const [newUsername, setNewUsername] = useState(user?.username || '');
  const [newPassword, setNewPassword] = useState('');

  // Sync newUsername and newPassword with the updated user state
  useEffect(() => {
    if (user) {
      setNewUsername(user.username);
    }
  }, [user]);

  // Disable scrolling when profile settings modal is open
  useEffect(() => {
    if (profileSettingClick) {
      document.body.style.overflowY = 'hidden'; // Disable scrolling
    } else {
      document.body.style.overflowY = 'auto'; // Re-enable scrolling
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [profileSettingClick]);

  // Change handler for both username and password
  const handleChangeProfile = () => {
    const success = updateUser(newUsername, newPassword);
    setMessage(success ? 'Profile updated successfully!' : 'Failed to update profile.');
  };

  // Fungsi untuk toggle visibilitas password
  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  return (
    <div className={`fixed top-0 left-0 z-40 w-screen h-full bg-black bg-opacity-40 text-color flex items-center justify-center ${profileSettingClick ? 'block' : 'hidden'}`}>
      <section className='w-[100vw] h-[100vh] md:w-[500px] md:h-[500px] p-[1rem] md:p-[2rem] rounded-[5px] bg-primary text-color flex flex-col justify-between'>
        {/* close button */}
        <div className="w-full flex justify-end ">
          <button className='p-[.5rem] rounded-full bg-none hover:bg-lightGray' onClick={handleOffProfileSettingClick}>
            <CloseIcon size={30} className='text-color' />
          </button>
        </div>

        <div className="w-full text-center">
          <h1 className='text-[.9rem] text-red-500'>{message}</h1>
        </div>

        <div className="h-[80%]">
          <div className="flex items-center gap-[10px]">
            <ProfileIcon size={50} className='text-color' />
            <h1 className='text-[2rem]'>{user?.username}</h1>
          </div>

          <div className="mt-[30px] flex flex-col gap-[10px]">
            <h1>Change Profile</h1>
            {/* Username input form */}
            <div className="flex items-center gap-[20px]">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                name="username"
                id="username"
                value={newUsername}
                autoComplete='off'
                onChange={(e: any) => setNewUsername(e.target.value)}
                className='bg-transparent focus:outline-none border-b w-full'
              />
            </div>
            {/* Password input form */}
            <div className="flex items-center gap-[20px]">
              <label htmlFor="password">Password:</label>
              <div className="flex items-center justify-between border-b w-full">
                <input
                  type={passwordVisible ? 'text' : 'password'}
                  name="password"
                  id="password"
                  value={newPassword} // Tetap kosong sampai pengguna memasukkan kata sandi baru
                  autoComplete='off'
                  onChange={(e: any) => setNewPassword(e.target.value)}
                  className='bg-transparent focus:outline-none w-full'
                />
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
        </div>

        <div className="w-full flex justify-end">
          <button
            onClick={() => {
              if (confirm('Change Profile?')) {
                handleChangeProfile();
              }
            }}
            className='p-[.8rem] rounded-[5px] bg-red-500 text-red-900 font-bold'
          >
            Change Profile
          </button>
        </div>
      </section>
    </div>
  );
};

export default ProfileSettings;
