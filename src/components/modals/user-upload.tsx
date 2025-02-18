"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle } from "../ui/dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import FileUpload from "../originUi/file-upload";
import { getSignedURL, updateDb } from "@/actions/s3-upload";

interface EditModalProps {
    children: React.ReactNode;
    noteListId: string;
}

export const UserModal = ({ children, noteListId }: EditModalProps & {}) => {

    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const onUpload = async () => {

        if (!file) {
            toast.error("No files selected");
            return;
        }

        setIsLoading(true);

        try {
            const computeSHA256 = async (file: File) => {
                const buffer = Buffer.from(await file.arrayBuffer());
                const hash = await crypto.subtle.digest("sha-256", buffer);
                return Array.from(new Uint8Array(hash)).map((byte) => byte.toString(16).padStart(2, "0")).join("");
            }

            const checksum = await computeSHA256(file);
            const signedUrl = await getSignedURL(file.type, file.name, file.size, checksum);
            if (signedUrl.error) {
                toast.error(signedUrl.error);
            }
            if (!signedUrl.success) { return }
            const url = signedUrl.success.url;
            console.log(url);
            const response = await fetch(url, {
                method: "PUT",
                body: file,
                headers: {
                    "Content-Type": file.type,
                }
            });
            
            if (!response.ok) {
                throw new Error(`Failed to upload ${file.name}`, { cause: response });
            }
            toast.success("Files uploaded successfully");
            await updateDb({ name: file.name, notesListId: noteListId, signedUrl: url })
            .then((data)=>{
                if(data?.error){
                    toast.error(data.error);
                }
                if(data?.success){
                    toast(data?.success, {
                        icon: "🎉",
                        style: {
                            border: '1px solid #713200',
                            padding: '16px',
                            color: '#713200',
                        },
                        iconTheme: {
                            primary: '#713200',
                            secondary: '#FFFAEE',
                        },
                    })
                }
            })
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
                    <DialogTitle>Add your Own Notes</DialogTitle>
                    <DialogDescription className="text-sm dark:text-gray-500 text-gray-700">
                        Add notes and get Aura points also stand a chance to be in our Hall of fame
                    </DialogDescription>
                </DialogHeader>
                <FileUpload onChange={(e) => setFile( e.target.files && e.target.files[0])} className="mt-4" />
                <DialogFooter>
                    <Button disabled={isLoading} onClick={onUpload} >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Upload
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}