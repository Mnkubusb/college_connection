"use client "

import qs from "query-string";
import { cn } from "@/lib/utils"
import { Codesandbox, Grid2X2, LucideIcon } from "lucide-react"
import { usePathname, useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"


interface CategoryItemProps{
    label:string,
    value?: string,
}
export const CategoryItem = ( { label, value }:CategoryItemProps) =>{

    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const currentCategoryId = searchParams.get("categoryId");
    const currentTitle = searchParams.get("title");

    const isSelected = currentCategoryId === value;

    const onClick = () =>{
        const url = qs.stringifyUrl({
            url:pathname,
            query:{
                title: currentTitle,
                categoryId: isSelected ? null : value,
            }
        }, {skipNull:true, skipEmptyString:true })
        router.push(url);
    }

    return(
        <button 
            onClick={onClick}
            className={cn(
                "py-1 px-3 text-sm border border-slate-200 rounded-full flex items-center gap-x-1 hover:border-sky-700",
                isSelected && " border-sky-700 bg-primary-200/20 text-primary-700"
            )}
            type="button"
        >
            <Codesandbox className="h-4 w-4" />
            <div className="truncate">
                {label}
            </div>
        </button>
    )
}