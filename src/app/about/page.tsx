import React from 'react'
import Header from '@/components/Header'
import AboutPage from '@/components/about-page'
const About = () => {
  return (
    <div className="w-full h-dvh overflow-auto overflow-x-hidden scroll-smooth scroll">
      <Header Name="About"></Header>
      <main className="w-vw min-h-full sm:mx-3 sm:border-x sm:pt-32 pt-8 ">
        <AboutPage />
      </main>
    </div>
  )
}

export default About
