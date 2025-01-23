"use server"
import Header from "@/components/Header"
import { db } from "@/lib/db"
import { Catergories } from "./_components/categories"
import { SearchInput } from "@/components/search-input"
import { getNotes } from "@/actions/get-notes"
import { NotestoDisplay } from "@/components/notes-list"

interface SearchPageProps{
  searchParams:{
    title:string,
    categoryId:string;
  }
}
const NoteAccess = async ({
  searchParams
}:SearchPageProps) => {

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const notes = await getNotes({...searchParams})

  return (
    <div className='relative h-[90vh] sm:overflow-hidden sm:h-full sm:w-full'>
      <Header Name="Notes"></Header>
      <div className='flex relative h-[80vh] sm:h-full sm:w-full'>
        <div className="md:flex h-full min-h-[80vh] sm:mx-3 px-3 sm:p-6 border-x flex-col lg:col-span-2 bg-background absolute sm:relative sm:w-full w-[100%]">
          <div className="py-3 md:hidden md:mb-0 block">
            <SearchInput />
          </div>
          <Catergories items={categories} />
          <NotestoDisplay items={notes} />
        </div>
      </div>
    </div>
  )
}

export default NoteAccess
