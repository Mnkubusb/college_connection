"use server"
import Header from "@/components/Header"
import { db } from "@/lib/db"
import { Catergories } from "./_components/categories"
import { SearchInput } from "@/components/search-input"
import { getNotes } from "@/actions/get-notes"
import { NotestoDisplay } from "@/components/notes-list"

interface SearchPageProps {
  searchParams: {
    title: string,
    categoryId: string;
  }
}
const NoteAccess = async ({
  searchParams
}: SearchPageProps) => {
  const categories = await db.category.findMany({
    orderBy: {
      name: "asc"
    }
  })

  const notes = await getNotes({ ...searchParams })

  return (
    <div className='h-dvh w-full '>
      <Header Name="Notes"></Header>
      <div className="flex sm:mx-3 px-1 sm:p-6 sm:border-x h-[calc(100dvh-8rem)] sm:h-full flex-col">
        <div className="py-3 px-2 md:hidden block h-max">
          <SearchInput />
        </div>
        <div className="relative h-full overflow-auto scroll scroll-smooth px-2">
        <Catergories items={categories} />
        <NotestoDisplay items={notes} />
        </div>
      </div>
    </div>
  )
}

export default NoteAccess
