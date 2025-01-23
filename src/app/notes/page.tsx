"use server"
import Header from "@/components/Header";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import Link from "next/link";

const Notes = async () => {

  const user = await currentUser()
  if (!user) return redirect('/')

  const notes = await db.note.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  });


  return (
    <div className='relative h-[90vh] sm:overflow-hidden sm:h-full sm:w-full'>
      <Header Name="Notes"></Header>
      <div className='flex relative h-[80vh] sm:h-full sm:w-full'>
        <div className="md:flex h-full min-h-[80vh] sm:mx-3 border-x flex-col lg:col-span-2 bg-background absolute sm:relative sm:w-full w-[100%]">
          <div className="flex flex-col h-full">
            <div className="w-[90%] mx-auto"> 
              <DataTable columns={columns} data={notes} />
            </div>
            {user.role === 'ADMIN' && <div className="w-[90%] mx-auto">
              <div className="w-max px-6 h-10 flex items-center justify-center border rounded-lg shadow-md hover:bg-gray-600 cursor-pointer">
                <Link href="/create">
                  <div className="w-full h-full flex items-center justify-center">
                    <h3>Create New Note</h3>
                  </div>
                </Link>
              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  )
};

export default Notes;
