"use server"
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server"

export async function POST(
    req: Request,
    { params }:{ params :{ note :string, noteListId :string } }
){
    try {
        
        const { list } = await req.json()

        for(const item of list){
            await db.chapters.update({
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