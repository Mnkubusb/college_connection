import { Category, Note } from "@prisma/client"
import { NoteCard } from "./note-card";

type NotesWithProgressWithCategory = Note & {
    category: Category | null; 
    notesList: { id: string }[];
}

interface NotesListProps{
    items: NotesWithProgressWithCategory[]
}
export const NotestoDisplay = ( { items}:NotesListProps) =>{
    return(
        <div className="mt-4 h-full w-full">
            <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 pb-5">
            {items.map((item)=>(
                <NoteCard 
                   key={item.id}
                   id={item.id}
                   title={item.title}
                   notesLength={item.notesList.length}
                   imageUrl={item.imageUrl!}
                   category={item?.category?.name}
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
