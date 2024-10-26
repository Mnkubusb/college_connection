import React from 'react'
import Header from '@/components/Header'
const Settings = () => {
  return (
    <div className="flex flex-col">
      <Header Name="Settings"></Header>
      <main className="grid flex-1 gap-4 overflow-auto p-2  md:grid-cols-2 lg:grid-cols-3">
        <div
          className="relative flex-col items-start gap-8 flex"
          x-chunk="dashboard-03-chunk-0"
        >
          <div className=" sm:w-[80%] w-full h-[100%] border"></div>
        </div>
        <div className="relative md:flex h-full min-h-[50vh] hidden flex-col rounded-xl p-4 lg:col-span-2"></div>
      </main>
    </div>
  )
}

export default Settings
