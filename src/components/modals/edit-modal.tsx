"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle } from "../ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { upload } from "@/actions/upload";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FileUpload } from "../ui/file-upload";

interface EditModalProps {
    children: React.ReactNode;
    noteListId: string;
}

export const EditModal = ({ children, noteListId }: EditModalProps & {}) => {

    const router = useRouter();
    const [Files, setFiles] = useState<File[]>();
    const [isPending, startTransition] = useTransition();



    const onUpload = async () => {
        if (!Files || Files.length === 0) {
            toast.error("Please select files to upload")
        }
        const formData = new FormData();
        Files?.forEach((file) => formData.append("files", file));
        startTransition(() => {
            upload(noteListId, formData).then((data) => {
                if (data?.error) {
                    toast.error(data.error)
                }
                if (data?.success) {
                    toast.success(data.success)
                    router.refresh();
                }
            })
        })
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
                    <Button disabled={isPending} onClick={onUpload} >
                        {isPending && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}