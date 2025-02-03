import { Chapters, NotesList } from "@prisma/client"
import { NoteListCard } from "./notelist-Card"

type NotesWithProgressWithCategory = NotesList & {
    chapters: Chapters[]
}
interface NotesListProps{
    items: NotesWithProgressWithCategory[]
}
export const NotesListDisplay = ( { items }:NotesListProps) =>{
    return(
        <div className="my-4 h-full w-full">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item)=>(
                <NoteListCard 
                   key={item.id}
                   noteId={item.noteId}
                   id={item.id}
                   title={item.title}
                   notesLength={item.chapters.length}
                   imageUrl={item.imageUrl!}
                />
            ))}
            </div>
            {items.length === 0 && (
                <div className="text-center tex-sm text-muted-foreground mt-10">
                    No Notes Found
                </div>
            )}
        </div>
    )
}
