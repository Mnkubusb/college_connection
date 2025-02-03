"use server"
import React from 'react'
import Header from '@/components/Header'
import SettingsPage from '@/components/SettingsPage'
import { currentUser } from '@/lib/auth'
import { db } from '@/lib/db'
const Settings = async () => {

  const user = await currentUser()

  const profile = await db.profile.findMany({})

  return (
    <div className='h-dvh w-full'>
      <Header Name="Profile Settings"></Header>
      <div className='h-full mt-[53px] sm:mt-0 sm:mx-3 sm:border-x overflow-auto overflow-x-hidden scroll scroll-smooth'>
        <SettingsPage user={user} profile={profile} />
      </div>
    </div>
  )
}

export default Settings
