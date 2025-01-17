import React from 'react'

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
    <div className="relative h-[100px] w-[100px]">
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-primary-600 blur-sm animate-spin ">
        <div className="relative h-full w-full rounded-full border-8 bg-black border-primary-500">
        </div>
      </div>
      <div className="relative h-full w-full rounded-full border-2 border-primary-500"></div>
    </div>
  </div>
  )
};

export default Loading
