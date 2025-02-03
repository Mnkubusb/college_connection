"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Chapters, NotesList } from "@prisma/client"
import { File } from "lucide-react"
import { useState } from "react"
import { IoClose } from "react-icons/io5";
import { PDFViewer } from "@/components/PdfViewer"


type NotesWithProgressWithCategory = NotesList & {
    chapters: Chapters[]
}
interface NotesListProps {
    items: NotesWithProgressWithCategory
}
export const ChapterListDisplay = ({ items }: NotesListProps) => {

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
                <div className="flex flex-col gap-y-2 mt-4">
                    {chapters.map((chapter, index) => (
                        <div key={chapter.id} className="flex gap-2 cursor-pointer justify-start w-full px-4 dark:hover:bg-gray-800 hover:bg-gray-400 shadow-large dark:shadow-slate-100 h-16 items-center "
                            onClick={() => handleResize(index)}>
                            <File size={20} />
                            <span className="text-md mt-1">
                                {chapter.title}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className={cn("md:basis-[70%] md:mr-3 border-x block w-full lg:relative absolute h-full", isMobileView ? "block" : "hidden")}>
                <Button onClick={() => setisMobileView(false)} className="absolute top-3 right-3 z-[100] rounded-full bg-black lg:hidden flex justify-center items-center" variant={"outline"} size={"icon"}>
                    <IoClose size={20} />
                </Button>
                <div className="w-full h-full">
                    <PDFViewer url={items.chapters[isActive].fileUrl as string} />
                </div>
                {/* <object data={items.chapters[isActive].fileUrl as string} type="application/pdf" className="w-full h-full">
                    <iframe src={`https://docs.google.com/gview?url=${items.chapters[isActive].fileUrl}&embedded=true`} className="w-full h-full"></iframe>
                </object> */}
            </div>
        </div>
    )
}





