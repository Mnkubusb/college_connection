
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        console.log("Inside Notes Route");
        const user = await currentUser();
        const{ title }= await req.json();
        if(!user) return new NextResponse("Unauthorized", { status: 401 });

        const note = await db.note.create({
            data: {
                userId: user?.id as string,
                title
            }
        })
        return NextResponse.json(note)
    } catch (error) {
        console.log( "Notes", error);
        return new NextResponse("Internal Server Error", { status: 500 });        
    }

}