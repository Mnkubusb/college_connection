"use client"
import { Search } from "lucide-react"
import { Input } from "./ui/input"
import  qs from "query-string"
import { useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce";
import { useSearchParams , useRouter , usePathname } from "next/navigation";


export const SearchInput = ( { placeholder }: { placeholder?: string } ) => {
    
    const [ value, setValue ] = useState("");
    const debouncedValue = useDebounce(value);

    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const currentCategoryId = searchParams.get("categoryId");

    useEffect(() => {
        const url = qs.stringifyUrl({
            url: pathname,
            query :{
                categoryId:currentCategoryId,
                title:debouncedValue,
            }
        },{skipEmptyString:true, skipNull:true})
        router.push(url)
    }, [debouncedValue, currentCategoryId, router, pathname])
    

    return (
        <div className="relative ">
            <Search className="h-4 w-4 absolute top-3 left-3 text-slate-600" />
            <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="w-full md:w-[500px] pl-9 h-10 bg-transparent rounded-full focus-visible:ring-slate-600 "
                placeholder={ placeholder || "Search..."}
            />
        </div>
    )
}