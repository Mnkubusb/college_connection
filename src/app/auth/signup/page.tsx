"use client"
import React from 'react'
import Header from '@/components/Header'
import SignUpForm from '@/components/auth/register-form'

const signUp = () => {
  return (
    <div className='overflow-hidden h-full w-full'>
      <Header Name="Sign Up"></Header>
      <div className="h-full w-full">  
      <SignUpForm />
      </div>
    </div>
  )
}

export default signUp
