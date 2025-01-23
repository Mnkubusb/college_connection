import { Chapters, NotesList } from "@prisma/client"
import { NoteCard } from "@/components/note-card";

type NotesWithProgressWithCategory = NotesList & {
    chapters: Chapters[]
}

interface NotesListProps{
    items: NotesWithProgressWithCategory[]
}
export const NotesListDisplay = ( { items}:NotesListProps) =>{
    return(
        <div className="mt-4">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
            {items.map((item)=>(
                <NoteCard 
                   key={item.id}
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
