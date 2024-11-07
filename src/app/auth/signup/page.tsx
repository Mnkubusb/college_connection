"use client"
import React from 'react'
import Header from '@/components/Header'
import SignUpForm from '@/components/auth/register-form'

const signUp = () => {
  return (
    <div className='overflow-hidden'>
      <Header Name="Sign Up"></Header>
      <div className="flex h-[82vh] sm:h-full w-full px-4 relative z-50 ">  
      <SignUpForm />
      </div>
    </div>
  )
}

export default signUp
