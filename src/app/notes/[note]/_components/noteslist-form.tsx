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
import { Note, NotesList } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { NotesListPage } from "./notes-list";





interface NotesListFormProps {
    initialData: Note & { notesList: NotesList[] },
    noteId: string
}

const formSchema = z.object({
    title:z.string().min(1, {
        message: "Title  is required"
    }),

});



export const NotesListForm = ({ initialData, noteId }: NotesListFormProps) => {

    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            title: " ",
        }
    });

    const toggleEdit = () => {
        setIsCreating((current) => !current);
    }

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/notes/${noteId}/notesList`, values);
            toast.success("Note updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            
        }
    }

    const onReorder = async (updateData: { id: string, position: number }[]) => {
        try {
            setIsUpdating(true);

            await axios.post(`/api/notes/${noteId}/notesList/reorder`, {
                list: updateData
            });
            toast.success("Notes reordered successfully");
            router.refresh();
        } catch (error) {
            toast.error("Failed to reorder notes");
        }finally {
            setIsUpdating(false);
        }
    }

    const onEdit = (id: string) => {    
        router.push(`/notes/${noteId}/notesList/${id}`);
    }

    return (
        <div className="mt-6 border dark:bg-slate-950 rounded-md p-4">
            {isUpdating && (
                <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-md flex items-center justify-center">
                    <Loader2 className="animate-spin h-6 w-6 text-sky-700"/>
                </div>
            )}
            <div className="font-medium flex items-center justify-between">
                Create a Note
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isCreating? (
                        <>Cancel</>
                    ): (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add a Note
                        </>
                    )}
                </Button>
            </div>
            {isCreating && (
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
            )}
            {!isCreating && (
                 <div className={cn("text-sm mt-2", !initialData.notesList && "text-muted-foreground italic" )}>
                    {!initialData.notesList.length && "No Notes"}
                    <NotesListPage 
                       onEdit={onEdit}
                       onReorder={onReorder}
                       items={initialData.notesList || []}
                    />
                 </div>   
            )}
            {!isCreating && (
                <p className="text-muted-foreground text-xs mt-4">
                    Drag and drop to reorder
                </p>
            )}
        </div>
    )
}