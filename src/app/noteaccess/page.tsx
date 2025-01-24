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
    <div className='h-full w-full overflow-y-auto scroll scroll-smooth'>
      <Header Name="Notes"></Header>
      <div>
        <div className="flex sm:mx-3 px-3 sm:p-6 sm:border-x flex-col">
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
