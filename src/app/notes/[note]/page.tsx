"use server"
import { db } from '@/lib/db';
import Header from '@/components/Header'
import { currentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { IconBadge } from '@/components/ui/icon-badge';
import { LayoutDashboard, ListCheck } from 'lucide-react';
import { TitleForm } from './_components/title-form';
import { ImageForm } from './_components/image-form';
import { NotesListForm } from './_components/noteslist-form';
import { SemesterForm } from './_components/semester-form';
import { Banner } from '@/components/banner';
import Actions from './_components/actions';


const Note = async ({ params }: { params: { note: string } }) => {


  const note = await db.note.findUnique({
    where: {
      id: params.note,
    },
    include: {
      notesList: {
        orderBy: {
          position: 'asc'
        }
      }
    }
  })

  const categories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  if (!note) return redirect('/notes');

  const requiredFields = [
    note.title,
    note.imageUrl,
    note.categoryId,
    note.notesList.some(note => note.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isCompleted = requiredFields.every(Boolean);

  return (
    <div className='relative h-[90vh] sm:overflow-hidden sm:h-full sm:w-full'>
      <Header Name={note.title}></Header>
      {!note.isPublished && (
        <Banner
          label='This note is not published yet and will not be visible to other users.'
          variant='warning'
        />
      )}
      <div className='flex relative h-[80vh] sm:h-full md:h-[86vh] sm:w-full '>
        <div className="md:flex sm:max-h-full max-h-[calc(92vh-70px)] sm:mx-3 border-x flex-col lg:col-span-2 bg-background overflow-auto scroll scroll-smooth absolute sm:relative sm:w-full w-[100%] p-6">
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-medium'>
                Note Setup
              </h1>
              <span>
                Complete all Fields {completionText}
              </span>
            </div>
          <Actions 
           disabled={!isCompleted}
           noteId={note.id}
           isPublished={note.isPublished}
           />
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mt-10'>
            <div>
              <div className='flex items-center gap-x-2'>
                <IconBadge icon={LayoutDashboard} variant={'default'} size={'lg'}></IconBadge>
                <h2 className='text-xl font-medium'>
                  Customise your Note
                </h2>
              </div>
              <TitleForm
                initialData={note}
                noteId={note.id}
              />
              <ImageForm
                initialData={note}
                noteId={note.id}
              />
              <SemesterForm
                initialData={note}
                noteId={note.id}
                options={categories.map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              />
            </div>
            <div className='space-y-6'>
              <div>
                <div className='flex items-center gap-x-2'>
                  <IconBadge icon={ListCheck} variant={'default'} size={'lg'}></IconBadge>
                  <h2 className='text-xl font-medium'>
                    Notes List
                  </h2>
                </div>
                <NotesListForm
                  initialData={note}
                  noteId={note.id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Note
