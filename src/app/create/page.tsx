"use client";

import Header from "@/components/Header";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";

import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

const formSchema = z.object({
    title: z.string().min(1, {
        message: "Title is required"
    }),
});



const CreateNote = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            const response = await axios.post("/api/notes", values);
            router.push(`/notes/${response.data.id}`);
            toast.success("Note created successfully");
        }catch(error){
            toast.error("Something went wrong");
        }
    };


    return (
        <div className='h-dvh sm:overflow-hidden w-full'>
            <Header Name="College Connections"></Header>
            <div className='h-full w-full'>
                <div className="md:flex h-full min-h-[80vh] sm:mx-3 border flex-col lg:col-span-2 bg-background absolute justify-center items-center sm:relative sm:w-full w-[100%] p-6">
                    <div >
                        <div>
                            <h1 className="text-2xl">Name your Note</h1>
                            <p className="text-muted-foreground text-sm">
                                What do you want to call this note? Don&apos;t worry, you can change this later
                            </p>
                        </div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 mt-5">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Notes Title</FormLabel>
                                            <FormControl>
                                                <Input placeholder="e.g Subject Notes" {...field} disabled={isSubmitting} />
                                            </FormControl>
                                            <FormDescription>
                                                The title of your note
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                <div className="flex items-center justify-end gap-x-2">
                                    <Link href={"/notes"}>
                                      <Button type="button" variant={"outline"}>Cancel</Button>
                                    </Link>
                                    <Button type="submit" variant={"secondary"} disabled={!isValid || isSubmitting}>
                                        Create
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateNote;