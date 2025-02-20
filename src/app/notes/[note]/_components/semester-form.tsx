"use client"
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

import { toast } from "react-hot-toast";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Note } from "@prisma/client";
import { Combobox , ComboboxOptions } from "@/components/ui/Combobox";



interface SemesterFormProps {
    initialData: Note;
    noteId: string
    options:ComboboxOptions[]
}

const formSchema = z.object({
    categoryId: z.string().min(1)
});



export const SemesterForm = ({ initialData, noteId , options}: SemesterFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            categoryId: initialData.categoryId as string,
        }
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

    const selectedOption = options.find((option) => option.value === initialData.categoryId);

    return (
        <div className="mt-6 border dark:bg-slate-950 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Select Semester
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing? (
                        <>Cancel</>
                    ): (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Semester
                        </>
                    )}
                </Button>
            </div>
            { !isEditing && (
               <p className={cn("text-sm mt-2", !initialData.categoryId && "italic text-muted-foreground")} >{ selectedOption?.label || "No Semester selected"}</p>   
            )}
            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                       <Combobox 
                                          placeholder="Select a Semester"
                                          selected={field.value}
                                          disalbed={isSubmitting}
                                          options={options}
                                          onChange={(option)=> field.onChange(option.value)}
                                       />
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