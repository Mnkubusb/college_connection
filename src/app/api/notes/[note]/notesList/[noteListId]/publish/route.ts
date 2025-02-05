import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH( req: Request, { params }: { params: { note: string; noteListId: string } }) {
    try{

        const ownNote = await db.note.findUnique({
            where: {
                id: params.note,
            }
        });
        // if(!ownNote) return new NextResponse("Forbidden",{status: 403});

        const notesList = await db.notesList.findUnique({
            where: {
                id: params.noteListId,
                noteId: params.note
            }
        });
        if(!notesList) return new NextResponse("Not Found",{status: 404});

        const publishedNote = await db.notesList.update({
            where: {
                id: params.noteListId,
                noteId: params.note
            },data:{
                isPublished: true
            }
        })

        return NextResponse.json(publishedNote);

    }catch(error){
        console.error(error);
        return new NextResponse("Internal Error",{status: 500})
    }
}