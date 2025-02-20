"use client"
import * as z from "zod";
import { useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FileUpload from "@/components/image-upload";




interface ImageFormProps {
    initialData: {
        imageUrl: string | null
    }
    noteId: string
}

const formSchema = z.object({
    imageUrl: z.string().min(1, {
        message: "Image is required"
    }),
});



export const ImageForm = ({ initialData, noteId }: ImageFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => {
        setIsEditing((current) => !current);
    }


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/notes/${noteId}`, values);
            toast.success("Note updated successfully");
            toggleEdit();
            router.refresh();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-6 border dark:bg-slate-950 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Notes Image
                <Button variant={"ghost"} onClick={toggleEdit}>
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData.imageUrl && (
                        <>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Add Image
                        </>
                    )}
                    {!isEditing && initialData.imageUrl && (
                        <>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData.imageUrl ? (
                    <div className="justify-center flex items-center h-60 bg-slate-900 rounded-md">
                        <ImageIcon className="h-10 w-10 text-gray-400" />
                    </div>
                ) : (
                    <div className="relative aspect-video mt-2">
                        <Image alt="Upload" fill src={initialData.imageUrl} className="w-full h-60 object-cover rounded-md" />
                    </div>
                )
            )}
            {isEditing && (
                <div className="mt-4">
                    <FileUpload endpoint="noteImage" onChange={(url) => {
                        if (url) { onSubmit({ imageUrl: url }) } 
                    }} />
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended
                    </div>
                </div>
            )}
        </div>
    )
}