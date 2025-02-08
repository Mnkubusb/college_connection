import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(
    req : Request,
    { params }: { params: { note:string, noteListId: string } }
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
            }
        })

        if (!noteOwner) {
            return new NextResponse("Unauthorized", { status: 404 });
        }

        const lastChapter = await db.chapters.findFirst({
            where: {
                notesListId: params.noteListId,
            },
            orderBy: {
                position: "desc"
            }
        });

        const newPosition = lastChapter ? lastChapter.position + 1 : 1;

        const newChapter = await db.chapters.create({
            data: {
                title,
                notesListId: params.noteListId,
                position: newPosition
            }
        });

        return NextResponse.json(newChapter);

    } catch (error) {
        console.error("Notes List",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}


