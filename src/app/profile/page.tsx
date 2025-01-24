"use server"
import React from 'react'
import Header from '@/components/Header'
import ProfilePage from '@/components/auth/profile-page'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { getProfileByName } from '@/lib/profile'
const Profile = async () => {

  const user = await currentUser()

  const profile = await db.profile.findMany({})

  return (
    <div className='sm:overflow-hidden h-full w-full'>
      <Header Name="Profile"></Header>
      <div className='h-full w-full mt-[53px]'>
        <ProfilePage profile={profile} user={user}/>
      </div>
    </div>
  )
};

export default Profile
