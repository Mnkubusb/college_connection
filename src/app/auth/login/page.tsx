import { LoginForm } from '@/components/auth/login-form'
import React from 'react'
import Header from '@/components/Header'
const Login = () => {
  return (
    <div className='h-dvh w-full'>
      <Header Name='Login'></Header>
      <div className="flex flex-col px-3 h-full w-full">
        <LoginForm  />
      </div>
    </div>
  )
}

export default Login
