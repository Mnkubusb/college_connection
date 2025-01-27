import Image from "next/image"
import Link from "next/link"
import { BookOpen } from "lucide-react"
import { IconBadge } from "@/components/ui/icon-badge"

interface NoteCardProps{
    id:string
    title:string
    imageUrl: string
    noteId: string
    notesLength: number 
    category?: string | undefined 
}

export const NoteListCard =( { id, title , imageUrl , notesLength , category ,noteId }:NoteCardProps )=>{
    return(
        <Link href={`/noteaccess/${noteId}/notesList/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full shadow-large">
                <div className="relative aspect-video w-full rounded-t-md overflow-hidden border-b">
                    <Image alt={title} src={imageUrl} quality={50} fill className="object-cover"/>
                </div>
                <div className="flex flex-col pt-2 px-3">
                    <div className="text-lg md:text-base font-medium group-hover:text-primary-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 dark:text-sky-400 text-white bg-sky-700/55 rounded-full px-2">
                            <IconBadge icon={BookOpen} size="sm" variant={"default"} />
                            <span>
                                {notesLength} {notesLength === 1? "Chapter":"Chapters"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}