import React from 'react'
import Header from '@/components/Header'
import LinkPage from '@/components/link-page'


const Links = () => {
  return (
    <div className="h-dvh w-full">
      <Header Name="Links"></Header>
      <div className='h-full w-full'>
        <LinkPage />
      </div>
    </div>
  )
}

export default Links
