import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
    req:Request, 
    { params }:{ params:{ email:string } }
){
    try {
        const user = await currentUser();
        if(!user) return new NextResponse("Unauthorized", { status: 401 });

        if(user?.role !== "ADMIN") return new NextResponse("Unauthorized", { status: 401 });

        const deletedUser = await db.user.delete({
            where: {
                email: params.email
            }
        });
        return NextResponse.json(deletedUser);
    } catch (error) {
        console.log(error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}