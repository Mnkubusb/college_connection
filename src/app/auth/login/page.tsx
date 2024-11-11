import { LoginForm } from '@/components/auth/login-form'
import React from 'react'
import Header from '@/components/Header'
const Login = () => {
  return (
    <div >
      <Header Name='Login'></Header>
      <div className="flex flex-col px-1 relative h-[82vh] sm:h-full w-full">
        <LoginForm  />
      </div>
    </div>
  )
}

export default Login
