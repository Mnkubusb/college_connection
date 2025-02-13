"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle } from "../ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { FileUpload } from "../ui/file-upload";
import { getSignedURL, updateDb } from "@/actions/s3-upload";

interface EditModalProps {
    children: React.ReactNode;
    noteListId: string;
    noteId : string;
}

export const EditModal = ({ children, noteListId , noteId }: EditModalProps & {}) => {

    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen , setIsOpen ] = useState(false);

    const onUpload = async () => {
        if (!files.length) {
            toast.error("No files selected");
            return;
        }

        setIsLoading(true);

        try {
            await Promise.all(files.map(async (file) => {
                const computeSHA256 = async (file : File) => {
                    const buffer = Buffer.from(await file.arrayBuffer());
                    const hash = await crypto.subtle.digest("sha-256", buffer);
                    return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
                }

                const checksum = await computeSHA256(file);
                const signedUrl = await getSignedURL(file.type, file.name , file.size, checksum);
                if(signedUrl.error){
                    toast.error(signedUrl.error);   
                }
                if(!signedUrl.success){return}
                const url = signedUrl.success.url;
                console.log(url);   
                const response = await fetch( url, {
                    method: "PUT",
                    body: file,
                    headers: {
                        "Content-Type": file.type,
                    }
                });

                if (!response.ok) {
                    throw new Error(`Failed to upload ${file.name}` , { cause: response });
                }
                await updateDb({ name: file.name, notesListId: noteListId, signedUrl: url });
                
            }));
            toast.success("Files uploaded successfully");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            console.error("Error uploading files", error);
            toast.error("Error uploading files");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
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