import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req:Request ,
    { params } : { params: { note: string; } }
) {
    try {
        const user = await currentUser();
        if(!user) return new NextResponse("Unauthorized",{status: 401});

        const note = await db.note.findUnique({
            where: {
                id: params.note,
            },include: {
                notesList: true
            }
        })

        // if(!note) return new NextResponse("Forbidden", { status: 403 });

        // const hasPublishedNote = note?.notesList.some(noteList => noteList.isPublished)

        // if(!note?.title || !note.imageUrl || !note.categoryId || !hasPublishedNote) {
        //     return new NextResponse("Mising Required Fields", { status: 400 });
        // }

        const publishedNotes = await db.note.update({
            where: {
                id: params.note,
            },
            data: {
                isPublished: true
            }
        })
        return NextResponse.json(publishedNotes)

    } catch (error) {
        console.log("Note Publish error",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}