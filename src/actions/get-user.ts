import { db } from "@/lib/db";

type GetUsers = {
   name?:string | undefined;
}

export const getUsers = async ({
    name
}:GetUsers )=>{
    try {
        const users = await db.user.findMany({
            where:{
                name,
                emailVerified :{
                    not: null
                }
            },orderBy:{
                createdAt:"desc"
            }
        })

        return users;
        
    } catch (error) {
        console.log("[GET_USER]", error)
        return null;
    }
}

