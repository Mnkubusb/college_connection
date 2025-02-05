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
            }
        })

        if(!note) return new NextResponse("Not Found", { status: 404 });

        const unpublishedNotes = await db.note.update({
            where: {
                id: params.note,
            },
            data: {
                isPublished: false,
            }
        })
        return NextResponse.json(unpublishedNotes)

    } catch (error) {
        console.log("Note UnPublish error",error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}