import React from 'react'
import Header from '@/components/Header'
import ContactPage from '@/components/contact-page'
const Contact = () => {
  return (
    <div className="w-full h-full">
      <Header Name="College Connections"></Header>
      <main className="overflow-auto p-2 sm:mx-3 sm:border-x border-none mx-0">
        <ContactPage  />
      </main>
    </div>
  )
}

export default Contact
