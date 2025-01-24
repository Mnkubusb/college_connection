"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Chapters, NotesList } from "@prisma/client"
import { Close } from "@radix-ui/react-popover"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import { set } from "zod"

type NotesWithProgressWithCategory = NotesList & {
    chapters: Chapters[]
}
interface NotesListProps{
    items: NotesWithProgressWithCategory
}
export const ChapterListDisplay = ( { items }:NotesListProps ) => {
    const [isMobileView, setisMobileView] = useState(false);
    const [isActive, setisActive] = useState(0);

    const handleResize = (index: number) => {
        setisMobileView(true);
        setisActive(index);
    }

    const chapters = items.chapters

    return (
        <div className="w-full h-full flex">
            <div className="md:basis-[30%] md:ml-3 border-x w-full">
                <div className="flex flex-col gap-y-2">
                {chapters.map((chapter, index) => (
                    <div key={chapter.id} className="w-full h-16 border-y flex justify-start items-center px-4 hover:bg-slate-800 cursor-pointer" 
                    onClick={() => handleResize(index)}>
                        {chapter.title}
                    </div>
                ))}
                </div>
            </div>
            <div className={cn("md:basis-[70%] md:mr-3 border-x block w-full lg:relative absolute h-full", isMobileView ? "block" : "hidden" )}>
                <Button onClick={() => setisMobileView(false)} className="absolute top-3 right-3 z-[100] rounded-full bg-black" variant={"outline"} size={"icon"}>
                    <IoClose size={20}/>
                </Button>
                <iframe src={chapters[isActive].fileUrl as string} className="w-full h-full" ></iframe>
            </div>
        </div>
    )
}
