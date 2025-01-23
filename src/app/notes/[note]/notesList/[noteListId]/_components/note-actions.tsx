"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface NotesListActionsProps {
    disabled: boolean;
    noteListId: string;
    noteId: string;
    isPublished: boolean;
}


const NotesListActions = ({
    disabled,
    noteListId,
    noteId,
    isPublished
}: NotesListActionsProps) => {
    
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);


    const onClick = async () => {
        try {
            setIsLoading(true);
            if(isPublished){
                await axios.patch(`/api/notes/${noteId}/notesList/${noteListId}/unpublish`,);
                toast.success("Note unpublished successfully");
                router.refresh();
            }else{
                await axios.patch(`/api/notes/${noteId}/notesList/${noteListId}/publish`);
                toast.success("Note published successfully");
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to publish note");
        }finally{
            setIsLoading(false);
        }
    }
    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/notes/${noteId}/notesList/${noteListId}`);
            toast.success("Note deleted successfully");
            router.push(`/notes/${noteId}`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete note");
        }finally{
            setIsLoading(false);
        }
    }


    return (
        <div className="flex items-center gap-x-2">
            <Button disabled={disabled || isLoading} onClick={onClick} variant={"outline"} size={"sm"} >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModal onConfirm={onDelete} >
                <Button size={"sm"} disabled={isLoading}>
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModal>
        </div>
    );
}

export default NotesListActions;