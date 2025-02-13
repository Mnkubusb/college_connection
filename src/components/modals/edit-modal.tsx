"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle } from "../ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { upload } from "@/actions/upload";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FileUpload } from "../ui/file-upload";
import axios from "axios";

interface EditModalProps {
    children: React.ReactNode;
    noteListId: string;
    noteId : string;
}

export const EditModal = ({ children, noteListId , noteId }: EditModalProps & {}) => {

    const router = useRouter();
    const [Files, setFiles] = useState<File[]>();
    // const [isPending, startTransition] = useTransition();
    const [ isLoading , setIsLoading ] = useState(false)



    const onUpload = async () => {
        if (!Files || Files.length === 0) {
            toast.error("Please select files to upload")
        }
        const formData = new FormData();
        Files?.forEach((file) => formData.append("files", file));

        try {
            setIsLoading(true)
            const result = await axios.post(`/api/notes/${noteId}/notesList/${noteListId}/upload`, formData, { headers: { "Content-Type": "multipart/form-data" } });
            if (result.status === 200) {
                toast.success("Chapters uploaded successfully");
                router.refresh();
            }
            if(result.status === 413){
                toast.error("File size is too large")
                router.refresh();
            }
            
        } catch (error) {
            console.log(error , "Something went wrong");
            toast.error("Something went wrong");
        }finally{
            setIsLoading(false)
        }

        // startTransition(() => {
        //     upload(noteListId, formData).then((data) => {
        //         if (data?.error) {
        //             toast.error(data.error)
        //         }
        //         if (data?.success) {
        //             toast.success(data.success)
        //             router.refresh();
        //         }
        //     })
        // })
    }
    return (
        <Dialog >
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:w-[80vw]">
                <DialogHeader>
                    <DialogTitle>Edit Chapters</DialogTitle>
                    <DialogDescription>
                        Make changes to your chapters here. Click save when you&apos;re done
                    </DialogDescription>
                </DialogHeader>
                    <FileUpload onChange={(files) => setFiles(files)} />
                <DialogFooter>
                    <Button disabled={isLoading} onClick={onUpload} >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}