"use client"
import React from 'react'
import Header from '@/components/Header'
import SignUpForm from '@/components/auth/register-form'

const signUp = () => {
  return (
    <div className='md:overflow-hidden overflow-auto h-dvh w-full'>
      <Header Name="Sign Up"></Header>
      <div className="h-full w-full">  
      <SignUpForm />
      </div>
    </div>
  )
}

export default signUp
