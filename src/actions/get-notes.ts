
import { db } from "@/lib/db";



type GetNotes = {
    title?: string
    categoryId?: string
}

export const getNotes = async ({
    title,
    categoryId
}:GetNotes)=>{

    try {
        const notes = await db.note.findMany({
            where:{
                isPublished:true,
                title:{
                    contains:title
                },
                categoryId
            },
            include:{
                category:true,
                notesList:{
                    where:{
                        isPublished:true,
                    },
                    select:{
                        id: true, 
                    }
                }
            },
            orderBy:{
                createdAt: "desc"
            }
        });

        return notes;
    } catch (error) {
        console.log("[GET_NOTES]", error)
        return [];
    }
}