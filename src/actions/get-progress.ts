import { db } from "@/lib/db";

export const getProgress = async (
    noteId:string,
)=>{
    try {
        const publishedNotes = await db.notesList.findMany({
            where:{
                noteId,
                isPublished:true
            },
            select:{
              id:true
            }
        });

        const publishedNotesIds = publishedNotes.map((notes) => notes.id);

        return publishedNotesIds;
        
    } catch (error) {
        console.log("[GET_PROGRESS]",error)
        return 0;
    }
}