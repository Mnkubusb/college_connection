"use client"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Chapters, NotesList } from "@prisma/client"
import { File } from "lucide-react"
import { useState } from "react"
import { IoClose } from "react-icons/io5"
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

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
    const docs = [
        { uri: items.chapters[isActive].fileUrl as string  }
    ]
    
    return (
        <div className="w-full h-full flex">
            <div className="md:basis-[30%] md:ml-3 border-x w-full">
                <div className="flex flex-col gap-y-2">
                    {chapters.map((chapter, index) => (
                        <div key={chapter.id} className="w-full h-16 border-y flex justify-start items-center px-4 hover:bg-slate-800 cursor-pointer gap-x-2"
                            onClick={() => handleResize(index)}>
                            <File size={20} />
                            <span className="text-lg mt-1">
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
                <object data={chapters[isActive].fileUrl as string + "#toolbar=0" } className="w-full h-full" type="text/html"></object>
                {/* <DocViewer
                    documents={docs}
                    pluginRenderers={DocViewerRenderers}
                    /> */}
            </div>
        </div>
    )
}
