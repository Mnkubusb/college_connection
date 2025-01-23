import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogDescription, DialogTitle } from "../ui/dialog";
import { Chapters } from "@prisma/client";
import { Button } from "../ui/button";
import { HardDriveUploadIcon } from "lucide-react";
import { useFileUpload } from "@chakra-ui/react";


interface EditModalProps {
    children: React.ReactNode;
    items: Chapters
}


export const EditModal = ({ children, items }: EditModalProps & {}) => {


    return (
        <Dialog>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Chapters</DialogTitle>
                    <DialogDescription>
                        Make changes to your chapters here. Click save when you&pos;re done
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}