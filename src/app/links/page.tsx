import React from 'react'
import Header from '@/components/Header'
import Link from 'next/link'


const Links = () => {
  return (
    <div className="flex flex-col">
    <Header Name="Links"></Header>
    <main className="grid flex-1 gap-2 z-50 sm:z-0 overflow-auto px-2 sm:px-3 md:grid-cols-2 lg:grid-cols-3 h-[82vh] sm:h-full relative">
        <div className="flex-col items-start flex ">
          <div className=" w-full h-[82vh] sm:h-full border-x flex flex-col items-center gap-2  p-2 pt-5"> 
              <div  className="note w-full h-[70px] flex items-center justify-center border-y shadow-md hover:bg-blue-600/20 cursor-pointer" >
                <Link href="/notes">
                <h3>
                </h3>
                </Link>
              </div>
          </div>
        </div>
      </main>
  </div>
  )
}

export default Links
