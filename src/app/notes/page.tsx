"use server"
import Header from "@/components/Header";
import NotesPage from "@/components/notesPage";

const Notes = () => {


  return (
    <div className='relative h-[90vh] sm:overflow-hidden sm:h-full sm:w-full'>
    <Header Name="Notes"></Header>
    <div className='flex relative h-[80vh] sm:h-full sm:w-full'>
      <NotesPage />
    </div>
  </div>
)};

export default Notes;
