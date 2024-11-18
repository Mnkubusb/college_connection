"use server"
import React from 'react'
import Header from '@/components/Header'
import ProfilePage from '@/components/auth/profile-page'
import { currentUser } from '@/lib/auth'
const Profile = async () => {



  const user = await currentUser();
  return (
    <div className='relative h-[82vh]'>
      <Header Name="Profile"></Header>
      <div className='flex relative h-[82vh] sm:h-full sm:w-full'>
        <ProfilePage user={user} />
      </div>
    </div>
  )
};

export default Profile
