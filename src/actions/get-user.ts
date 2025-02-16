import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

interface GetUsers{
   name?:string | undefined;
}

export const getUsers = async ({
    name
}:GetUsers )=>{
    try {

        const CurrentUser = await currentUser();
        const users = await db.user.findMany({
            where:{
                name,
                emailVerified :{
                    not: null
                },
                NOT:{
                    id : CurrentUser?.id
                }
            },orderBy:{
                coins:"desc"
            }
        })
        
        return users;

    } catch (error) {
        console.log("[GET_USER]", error)
        return null;
    }
}

