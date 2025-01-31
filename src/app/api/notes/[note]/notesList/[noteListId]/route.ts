    import { currentUser } from "@/lib/auth";
    import { db } from "@/lib/db";
    import { NextResponse } from "next/server";


    export async function DELETE(
        req: Request,
        { params } : {
            params: {
                note: string;
                noteListId: string;
            }
        }
    ){
        try {
            const user = await currentUser();
            if (!user) return new NextResponse("Unauthorized",{status: 401});
            const ownNote = await db.note.findUnique({
                where: {
                    id: params.note,
                    userId: user.id,
                }
            })

            const notesList = await db.notesList.findUnique({
                where: {
                    id: params.noteListId,
                    noteId: params.note,
                }
            })
            if (!notesList) return new NextResponse("Not Found",{status: 404});

            const deletedNotesList = await db.notesList.delete({
                where: {
                    id: params.noteListId,
                    noteId: params.note,
                }
            });

            const publisedNoteInNotes = await db.notesList.findMany({
                where: {
                    noteId: params.note,
                    isPublished: true
                }
            });

            if (publisedNoteInNotes.length === 0){
                await db.note.update({
                    where: {
                        id: params.note,
                    },
                    data: {
                        isPublished: false
                    }
                });
            }

            return NextResponse.json(deletedNotesList);

        } catch (error) {
            console.error(error);
            return new NextResponse("Internal Error",{status: 500})
            
        }
    }

    export async function PATCH(
        req: Request,
        { params } : {
            params: {
                note: string;
                noteListId: string;
            }
        }
    ){
        try{
            const user = await currentUser();
            const  { isPublished , ...values } = await req.json();
            
            if (!user) return new NextResponse("Unauthorized",{status: 401});



            const notesList = await db.notesList.update({
                where: {
                    id: params.noteListId,
                    noteId: params.note,
                },data:{
                    ...values
                }
            });

            return NextResponse.json(notesList);
            
        }catch(error){
            console.error(error);
            return new NextResponse("Internal Error",{status: 500})
        }

    }