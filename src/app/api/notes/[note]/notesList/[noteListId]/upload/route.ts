import { NextResponse } from "next/server";



export async function POST( req:Request, { params }: { params: { note: string; noteListId: string } }) {
    try{
        console.log("[upload]")

        const files = await req
        

    }catch(error){
        console.log("[upload]",error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }    
}