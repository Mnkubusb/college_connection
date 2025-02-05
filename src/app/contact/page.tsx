import React from 'react'
import Header from '@/components/Header'
import ContactPage from '@/components/contact-page'
const Contact = () => {
  return (
    <div className="w-full h-dvh overflow-auto">
      <Header Name="College Connections"></Header>
      <main className="overflow-auto overflow-x-hidden scroll-smooth scroll sm:mx-3 sm:border-x-1 ">
        <ContactPage  />
      </main>
    </div>
  )
}

export default Contact
