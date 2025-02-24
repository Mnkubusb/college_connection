"use server"
import Header from "@/components/Header"
import { db } from "@/lib/db"
import { Catergories } from "./_components/categories"
import { SearchInput } from "@/components/search-input"
import { getNotes } from "@/actions/get-notes"
import { NotestoDisplay } from "@/components/notes-list"
import ChatModal from "@/components/modals/chat-modal"
import { Button } from "@/components/ui/button"
import { BotIcon } from "lucide-react"

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
    <div className='h-dvh w-full'>
      <Header Name="Notes"></Header>
      <div className="flex sm:mx-3 px-1 sm:p-6 sm:border-x h-[calc(100dvh-8rem)] sm:h-full flex-col md:overflow-auto overflow-hidden">
        <div className="py-3 px-2 sm:px-0 md:hidden block h-max">
          <SearchInput />
        </div>
        <div className="relative h-full overflow-auto scroll scroll-smooth px-2 sm:px-0 mb-5">
        <Catergories items={categories} />
        <NotestoDisplay items={notes} />
        </div>
        <ChatModal>
          <Button className="absolute md:bottom-7 bottom-[75px] md:right-7 right-2 rounded-t-full rounded-l-full" variant="default" >
            <BotIcon className="mr-2" />
            <span>Have a Doubt?</span>
          </Button>
        </ChatModal>
      </div>
    </div>
  )
}

export default NoteAccess
