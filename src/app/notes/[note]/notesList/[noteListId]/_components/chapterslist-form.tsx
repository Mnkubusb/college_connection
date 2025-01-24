"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "react-hot-toast";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapters, NotesList } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { ChapterListPage } from "./chapters-list";
import { EditModal } from "@/components/modals/edit-modal";



interface ChaptersListFormProps {
    initialData: NotesList & { chapters: Chapters[] };
    noteId: string
    noteListId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title  is required"
    }),
});



export const ChaptersListForm = ({ initialData, noteId, noteListId }: ChaptersListFormProps) => {

    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: " ",
        }
    });

    const toggleEdit = () => {
        setIsCreating((current) => !current);
    }

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/notes/${noteId}/notesList/${noteListId}/chapters`, values);
            toast.success("Chapter updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            toast.error("Failed to update chapter");
        }
    }

    const onReorder = async (updateData: { id: string, position: number }[]) => {
        try {
            setIsUpdating(true);
            await axios.post(`/api/notes/${noteId}/notesList/${noteListId}/chapters/reorder`, {
                list: updateData
            });
            toast.success("Chapters reordered successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to reorder notes");
        } finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {
        router.push(`/notes/${noteId}/notesList/${noteListId}/chapters/${id}`);
    }

    return (
        <div className="mt-6 border bg-slate-950 rounded-md p-4 relative">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Create a Unit
                <EditModal noteListId={noteListId}>
                    <Button variant={"ghost"} onClick={toggleEdit}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add a Chapter/Unit
                    </Button>
                </EditModal>
            </div>
            {/* {isCreating && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="e.g.'Chemistry Notes'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit" variant={"secondary"}>
                                Create
                            </Button>
                        </div>
                    </form> 
                </Form>
            )} */}
                <div className={cn("text-sm mt-2", !initialData.chapters && "text-muted-foreground italic")}>
                    {!initialData.chapters.length && "No Notes"}
                    <ChapterListPage
                        onEdit={onEdit}
                        onReorder={onReorder}
                        items={initialData.chapters || []}
                    />
                </div>
                <p className={cn("text-muted-foreground text-xs mt-4 flex items-center", initialData.chapters && "hidden")}>
                    Drag and drop to reorder
                </p>
        </div>
    )
}