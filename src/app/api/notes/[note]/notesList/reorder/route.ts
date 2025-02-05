"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }:{ params :{ note :string } }
){
    try {
        
        const { list } = await req.json()

        const NoteOwner = await db.note.findUnique({
            where:{
                id:params.note,
            }
        })

        if(!NoteOwner ) return new NextResponse( "Unauthorized", { status: 401 })

        for(const item of list){
            await db.notesList.update({
                where:{
                    id:item.id
                },data:{
                    position: item.position
                }
            })
        }    

        return new NextResponse( "Success", { status: 200 })

    } catch (error) {
        console.log(error)
        return new NextResponse( "Internal Server Error", { status: 500 })
    }
}