import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request ,
    { params }: { params: { note: string } }
){
    try {
        const user = await currentUser();
        if (!user) return new NextResponse("Unauthorized", { status: 401 });

        const note = await db.note.findUnique({
            where: {
                id: params.note,
            }
        });

        if(!note) return new NextResponse("Forbidden", { status: 403 });


        const deletedNote = await db.note.delete({
            where: {
                id: params.note
            }
        })

        return NextResponse.json(deletedNote)
    } catch (error) {
        console.log("Note DELETE",error)
        return  new NextResponse("Internal server error", { status: 500 })
    }
}

export async function PATCH(
    req:Request ,
    { params }: { params: { note: string } }
) {
    try {
        const user = await currentUser();
        const { note } = params;
        const values = await req.json();

        // if (!user) return new NextResponse("Unauthorized", { status: 401 });
        
        const notes = await db.note.update({
            where: {
                id: note,
            },
            data: {
                ...values
            }
        }) 
        
        return NextResponse.json(notes)
    } catch (error) {
        console.log("[note]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}