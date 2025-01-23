import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params }: { params: { note: string } }
){
    try {
        
        const user = await currentUser();
        if (!user) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        const { title } = await req.json(); 
        
        const noteOwner = await db.note.findUnique({
            where: {
                id: params.note,
                userId: user.id
            }
        })

        if (!noteOwner) {
            return new NextResponse("Unauthorized", { status: 404 });
        }

        const lastNote = await db.notesList.findFirst({
            where: {
                noteId: params.note,
            },
            orderBy: {
                position: "desc"
            }
        });

        const newPosition = lastNote ? lastNote.position + 1 : 1;

        const newNote = await db.notesList.create({
            data: {
                title,
                userId: user.id as string,
                noteId: params.note,
                position: newPosition
            }
        });

        return NextResponse.json(newNote);

    } catch (error) {
        console.error("Notes List",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}