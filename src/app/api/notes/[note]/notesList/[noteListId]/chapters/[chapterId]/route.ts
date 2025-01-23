import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
    req: Request,
    { params } : {
        params: {
            note: string;
            noteListId: string;
            chapterId: string;
        }
    }
){
    try{
        const user = await currentUser();
        const  { isPublished , ...values } = await req.json();
        
        if (!user) return new NextResponse("Unauthorized",{status: 401});



        const chapters = await db.chapters.update({
            where: {
                id: params.chapterId,
                notesListId: params.noteListId,
            },data:{
                ...values
            }
        });

        return NextResponse.json(chapters);
        
    }catch(error){
        console.error(error);
        return new NextResponse("Internal Error",{status: 500})
    }

}