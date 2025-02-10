import React from 'react'
import Header from '@/components/Header'
import AboutPage from '@/components/about-page'
const About = () => {
  return (
    <div className="w-full h-dvh">
      <Header Name="About"></Header>
      <main className="overflow-auto overflow-x-hidden scroll-smooth scroll sm:mx-3 sm:border-x-1 ">
        <AboutPage />
      </main>
    </div>
  )
}

export default About
