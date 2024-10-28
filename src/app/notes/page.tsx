import React from "react";
import Header from "@/components/Header";
const Notes = () => {
  return (
    <div className="flex flex-col">
      <Header Name="Notes"></Header>
      <main className="grid flex-1 gap-2 overflow-auto px-2 md:grid-cols-2 lg:grid-cols-3">
        <div className="relative flex-col items-start flex ">
          <div className=" w-full h-[100%] border-x flex flex-col items-center gap-2 z-20"> 
             
          </div>
        </div>
        <div className="relative md:flex h-full min-h-[50vh] hidden flex-col px-4 lg:col-span-2 border-x"></div>
      </main>
    </div>
  );
};

export default Notes;
