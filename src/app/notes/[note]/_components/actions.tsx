"use client";

import { ConfirmModal } from "@/components/modals/confirm-modal";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";


interface ActionsProps {
    disabled: boolean;
    noteId: string;
    isPublished: boolean;
}


const Actions = ({
    disabled,
    noteId,
    isPublished
}: ActionsProps) => {
    
    const confetti = useConfettiStore();
    const router = useRouter();
    const [isLoading , setIsLoading] = useState(false);


    const onClick = async () => {
        try {
            setIsLoading(true);
            if(isPublished){
                await axios.patch(`/api/notes/${noteId}/unpublish`,);
                toast.success("Notes unpublished successfully");
                router.refresh();
            }else{
                await axios.patch(`/api/notes/${noteId}/publish`);
                toast.success("Notes published successfully");
                confetti.onOpen();
                router.refresh();
            }
        } catch (error) {
            toast.error("Failed to publish notes");
        }finally{
            setIsLoading(false);
        }
    }
    const onDelete = async () => {
        try {
            setIsLoading(true);
            await axios.delete(`/api/notes/${noteId}`);
            toast.success("Notes deleted successfully");
            router.push(`/notes`);
        } catch (error) {
            console.log(error);
            toast.error("Failed to delete notes");
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

export default Actions;