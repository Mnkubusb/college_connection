import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { DropdownMenu , DropdownMenuContent,  } from "../ui/dropdown-menu";


interface EditModalProps {
    children: React.ReactNode;
    onEdit: () => void
}


export const EditModal = () => {

}