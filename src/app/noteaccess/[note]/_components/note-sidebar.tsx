import { Note, NotesList } from "@prisma/client"
import { SideBarItem } from "./note-sidebar-item"

interface NoteSidebarProps{
    notes : Note & {
        notesList: (NotesList)[]
    }
}

export const NoteSidebar = ( { notes }:NoteSidebarProps ) =>{
    return(
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="flex flex-col w-full gap-y-4 mt-4">
                {notes.notesList.map((note)=>(
                    <SideBarItem 
                        key={note.id}
                        id={note.id}
                        label={note.title}
                        imageUrl={note.imageUrl}
                        noteId={notes.id}
                    />
                ))}
            </div>
        </div>
    )

}


