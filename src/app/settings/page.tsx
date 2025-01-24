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
    <div className='h-full w-full'>
      <Header Name="Settings"></Header>
      <div className='h-full w-full'>
        <SettingsPage user={user} profile={profile}  />
      </div>
    </div>
  )
}

export default Settings
