import Link from "next/link";
import React from "react";
import Header from "@/components/Header";

const Notes = () => {

   const Notes = [
    {
      icons:"",
      Name:"Subject Notes"
    },
    {
      icons:"",
      Name:"CT Questions"
    },
    {
      icons:"",
      Name:"End Sem PYQs"
    },
    {
      icons:"",
      Name:"Cheat Codes"
    },
    {
      icons:"",
      Name:"Lab Manuals"
    },

   ]

  return (
    <div>
      <Header Name="StudyMaterials"></Header>
      <main className="grid flex-1 gap-2 z-50 sm:z-0 overflow-auto md:grid-cols-2 lg:grid-cols-3 h-[82vh] sm:h-full relative">
        <div className="flex-col items-start flex ">
          <div className=" w-full h-[82vh] sm:h-full border-x flex flex-col items-center gap-2  p-2 pt-5"> 
            {Notes.map((note) => (
              <div key={note.Name} className="note w-full h-[70px] flex items-center justify-center border-y shadow-md hover:bg-gray-600 cursor-pointer" >
                <Link href={"/notes/[note]"} as={`/notes/${note.Name}`}>
                <h3>
                  {note.Name}
                </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className="relative md:flex h-full min-h-[50vh] hidden flex-col px-4 lg:col-span-2 border-x">

        </div>
      </main>
    </div>
  )
};

export default Notes;
