
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH( req: Request, { params }: { params: { note: string; noteListId: string } }) {
    try{

        const ownNote = await db.note.findUnique({
            where: {
                id: params.note,
            }
        });
        if(!ownNote) return new NextResponse("Forbidden",{status: 403});


        const unpublishedNote = await db.notesList.update({
            where: {
                id: params.noteListId,
                noteId: params.note
            },data:{
                isPublished: false,
            }
        });

        const publisedNoteInNotes = await db.notesList.findMany({
            where: {
                noteId: params.note,
                isPublished: true
            }
        })

        if(publisedNoteInNotes.length === 0){
            await db.note.update({
                where: {
                    id: params.note
                },data: {
                    isPublished: false
                }
            })
        };

        return NextResponse.json(unpublishedNote);

    }catch(error){
        console.error("unpublishedNote",error);
        return new NextResponse("Internal Error",{status: 500})
    }
}