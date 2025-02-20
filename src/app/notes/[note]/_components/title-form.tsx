"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";




interface TitleFormProps {
    initialData: {
        title: string
    }
    noteId: string
}

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),

});



export const TitleForm = ({ initialData, noteId }: TitleFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    });

    const toggleEdit = () => {
        setIsEditing((current) => !current);
    }

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/notes/${noteId}`, values);
            toast.success("Note updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            
        }
    }

    return (
        <div className="mt-6 border dark:bg-slate-950 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Notes Title
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing? (
                        <>Cancel</>
                    ): (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Title
                        </>
                    )}
                </Button>
            </div>
            { !isEditing && (
               <p className="text-sm mt-2">{initialData.title}</p>   
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input disabled={isSubmitting} placeholder="e.g.'Subject Notes'" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button disabled={!isValid || isSubmitting} type="submit" variant={"secondary"}>
                                Save Changes
                            </Button>
                        </div>
                    </form> 
                </Form>
            )}
        </div>
    )
}