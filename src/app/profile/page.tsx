"use server"
import React from 'react'
import Header from '@/components/Header'
import ProfilePage from '@/components/auth/profile-page'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'
const Profile = async () => {

  const user = await currentUser()

  const profile = await db.profile.findMany({})

  revalidatePath("/profile");

  return (
    <div className='sm:overflow-hidden h-dvh w-full overflow-auto scroll scroll-smooth'>
      <Header Name="Profile"></Header>
      <div className='h-full w-full'>
        <ProfilePage profile={profile} user={user}/>
      </div>
    </div>
  )
};

export default Profile
