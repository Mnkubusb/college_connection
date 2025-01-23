import Header from "@/components/Header";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { NoteSidebar } from "./_components/note-sidebar";

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
          }
        },
      } 
    });

    if(!note) return redirect("/noteaccess")


    return ( 
        <div className='relative h-[90vh] sm:overflow-hidden sm:h-full sm:w-full'>
        <Header Name={note.title}></Header>
        <div className='flex relative h-[80vh] sm:h-full sm:w-full'>
          <div className="md:flex h-full min-h-[80vh] sm:mx-3 border-x flex-col bg-background absolute sm:relative sm:w-full w-[100%]">
            <div className="flex h-full w-[500px] flex-col">
              <NoteSidebar notes={note} />
            </div>
          </div>
        </div>
      </div>
     );
}
 
export default NotesListPage;