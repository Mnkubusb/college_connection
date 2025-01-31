import Header from "@/components/Header";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NotesListDisplay } from "./_components/note-to-display";

const NotesListPage = async ( {params}:{params: {note:string}} ) => {
  
    const note = await db.note.findUnique({
      where:{
        id:params.note
      },include:{
        notesList:{
          where:{
            isPublished: true,
          },orderBy:{
            position:"asc"
          },include:{
            chapters: {
              orderBy: {
                position: "asc"
              }
            }
          }
        },
      } 
    });

    if(!note) return redirect("/noteaccess")


    return ( 
      <div className='h-full w-full overflow-auto sm:overflow-hidden scroll scroll-smooth'>
      <Header Name={note.title}></Header>
      <div className="w-full h-full">
        <div className="flex h-full md:h-dvh overflow-auto sm:mx-3 px-3 sm:p-6 sm:border-x flex-col ">
          <NotesListDisplay items={note.notesList} />
        </div>
      </div>
    </div>
     );
}
 
export default NotesListPage;