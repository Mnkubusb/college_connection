import Header from "@/components/Header";
import { IconBadge } from "@/components/ui/icon-badge";
import { db } from "@/lib/db";
import { ArrowLeft, LayoutDashboard, ListCheck } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { NoteTitleForm } from "./_components/note-title-form";
import { NoteImageForm } from "./_components/note-image-form";
import { ChaptersListForm } from "./_components/chapterslist-form";
import { Banner } from "@/components/banner";
import NotesListActions from "./_components/note-actions";

const NotesListEditPage = async ({
    params,
}: {
    params: {
        note: string;
        noteListId: string;
    }
}) => {

    const notesList = await db.notesList.findUnique({
        where: {
            id: params.noteListId,
            noteId: params.note,
        }, include: {
            chapters: true
        }
    })

    if (!notesList) return redirect("/notes");

    const requiredFeilds = [
        notesList.title,
        notesList.imageUrl,
    ]

    const totalFields = requiredFeilds.length;
    const completedFields = requiredFeilds.filter(Boolean).length;

    const completionFields = `(${completedFields}/${totalFields})`;

    const isCompleted = requiredFeilds.every(Boolean);

    return (
        <>
            <div className='h-full w-full overflow-auto scroll scroll-smooth overflow-x-hidden'>
                <Header Name="Notes"></Header>
                {!notesList.isPublished && (
                    <Banner label="This note is not published yet" variant="warning" />
                )}
                <div className='h-full first:w-full'>
                    <div className="flex h-full sm:mx-3 border-x flex-col w-full p-6">
                        <div className="flex justify-between items-center">
                            <div className="w-full">
                                <Link href={`/notes/${params.note}`}
                                    className="items-center flex transition mb-6 text-sm hover:opacity-75"
                                >
                                    <ArrowLeft className="h-4 w-4 mr-2" />
                                    Back to Note Setup

                                </Link>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-y-2">
                                        <h1 className="text-2xl font-medium">
                                            Notes Edit
                                        </h1>
                                        <span className="text-sm text-muted-foreground">
                                            Complete all Fields {completionFields}
                                        </span>
                                    </div>
                                    <NotesListActions
                                        disabled={!isCompleted}
                                        noteId={params.note}
                                        noteListId={params.noteListId}
                                        isPublished={notesList.isPublished}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-x-2 ">
                                        <IconBadge icon={LayoutDashboard} size={"lg"} />
                                        <h2 className="text-xl">
                                            Customize your Notes
                                        </h2>
                                    </div>
                                    <NoteTitleForm initialData={notesList} noteId={params.note} noteListId={params.noteListId} />
                                    <NoteImageForm initialData={notesList} noteId={params.note} noteListId={params.noteListId} />
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex items-center gap-x-2 ">
                                        <IconBadge icon={ListCheck} size={"lg"} />
                                        <h2 className="text-xl">
                                            Chapters List
                                        </h2>
                                    </div>
                                    <ChaptersListForm initialData={notesList} noteId={params.note} noteListId={params.noteListId} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NotesListEditPage;