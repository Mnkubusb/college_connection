import Image from "next/image"
import Link from "next/link"
import { IconBadge } from "./ui/icon-badge"
import { BookOpen } from "lucide-react"

interface NoteCardProps{
    id:string
    title:string
    imageUrl: string
    notesLength: number 
    category: string | undefined 
}

export const NoteCard =( { id, title , imageUrl , notesLength , category }:NoteCardProps )=>{
    return(
        <Link href={`/noteaccess/${id}`}>
            <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg h-full">
                <div className="relative aspect-video w-full rounded-t-md overflow-hidden border-b">
                    <Image alt={title} src={imageUrl} fill className="object-cover"/>
                </div>
                <div className="flex flex-col pt-2 px-3">
                    <div className="text-lg md:text-base font-medium group-hover:text-primary-700 transition line-clamp-2">
                        {title}
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {category}
                    </p>
                    <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
                        <div className="flex items-center gap-x-1 text-sky-400 bg-sky-700/55 rounded-full px-2">
                            <IconBadge icon={BookOpen} size="sm" variant={"default"} />
                            <span>
                                {notesLength} {notesLength === 1? "Note":"Notes"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}