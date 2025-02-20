"use client"

import { NotesList } from "@prisma/client";
import { useEffect, useState } from "react";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "@hello-pangea/dnd"
import { cn } from "@/lib/utils";
import { Grip, Pencil } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotesListProps {
    items: NotesList[];
    onReorder: (updateData: { id: string, position: number }[]) => void;
    onEdit: (id: string) => void;

}

export const NotesListPage = ({ items, onReorder, onEdit }: NotesListProps) => {

    const [isMounted, setIsMounted] = useState(false);
    const [notes, setNotes] = useState(items);

    useEffect(() => {
        setIsMounted(true);
    }, [])

    useEffect(() => {
        setNotes(items);
    }, [items])

    const onDragEnd = (result: DropResult) => {
        if(!result.destination) return;

        const items = Array.from(notes);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);


        const startIndex = Math.min(result.source.index, result.destination.index);
        const endIndex = Math.max(result.source.index, result.destination.index);

        const updatedNotes = items.slice(startIndex, endIndex + 1);
        setNotes(items);
        
        const bulkupdateData = updatedNotes.map((note) => ({
            id: note.id,
            position: items.findIndex((item)=> item.id === note.id)
        })); 

        onReorder(bulkupdateData);
    }

    if (!isMounted) return null;


    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="notes" >
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                        {notes.map((note, index) => (
                            <Draggable key={note.id} draggableId={note.id} index={index}>
                                {(provided) => (
                                    <div className={cn("flex items-center gap-x-2 dark:bg-slate-950 border rounded-md mb-4 text-sm",
                                        note.isPublished && " border-sky-300"
                                    )}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                    >
                                        <div className={cn(
                                            "px-2 py-3 border-r border-r-slate-900 hover:bg-slate-700 rounded-l-md transition",
                                            note.isPublished && "border-r-sky-300"
                                        )}
                                            {...provided.dragHandleProps}
                                        >
                                            <Grip className="h-5 w-5 " />
                                        </div>
                                        {note.title}
                                        <div className="flex gap-x-2 pr-2 items-center ml-auto">
                                            <Badge color="black" className="text-xs rounded-full">
                                                {note.isPublished ? "Published" : "Draft"}
                                            </Badge>
                                            <Pencil
                                                onClick={() => onEdit(note.id)}
                                                className="h-4 w-4 cursor-pointer transition hover:text-sky-200" />
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

