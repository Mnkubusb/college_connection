"use server"
import Header from "@/components/Header";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChapterListDisplay } from "./_components/chapters-to-display";


const NoteListIdPage = async ({ params }: {
    params: {
        note: string,
        noteListId: string
    }
}) => {

    const noteList = await db.notesList.findUnique({
        where: {
            id: params.noteListId,
            noteId: params.note,
        }, include: {
            chapters: {
                orderBy: {
                    position: "asc"
                }
            }
        }
    });

    if (!noteList) {
        redirect(`/noteaccess/${params.note}`)
    }

    return (
        <div className='h-dvh w-full'>
            <Header Name={noteList?.title as string}></Header>
            <div className='h-full w-full'>
                <ChapterListDisplay items={noteList} />
            </div>
        </div>
    );
}

export default NoteListIdPage;