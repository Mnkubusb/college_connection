"use client"

import { cn } from "@/lib/utils";
import Image from "next/image";
import { usePathname , useRouter } from "next/navigation"


interface SideBarItemProps {
    label: string,
    id: string,
    imageUrl: string | null,
    noteId: string
}
export const SideBarItem = ({ label, id, imageUrl, noteId }: SideBarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();

    const isActive = pathname?.includes(id);

    const onClick = () => {
        router.push(`/noteaccess/${noteId}/notesList/${id}`)
    }

    return (
        <button onClick={onClick}>
            <div className={cn("flex items-center gap-x-2 h-12 bg-slate-900 hover:bg-slate-700 ", isActive && 
            " bg-slate-600 border-slate-500"
            )}>
                <div className="aspect-square w-12 h-12 ">
                    <Image width={48} height={48} src={imageUrl as string} alt={label}  className="object-cover"/>
                </div>
                <div className={cn("flex items-center", isActive && "text-slate-700")}>
                    {label} 
                </div>
            </div>
        </button>
    )
}