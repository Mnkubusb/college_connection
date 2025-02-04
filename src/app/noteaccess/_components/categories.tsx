"use client"

import { Category } from "@prisma/client"
import { CategoryItem } from "./catergory-item";

const IconBadge = [ "Bs1CircleFill" , "Bs2CircleFill" , "Bs3CircleFill" , "Bs4CircleFill" , "Bs5CircleFill" , "Bs6CircleFill", "Bs7CircleFill","Bs8CircleFill" ];
interface CategoriesProps{
    items: Category[];
}
export const Catergories = ( { items }:CategoriesProps  ) =>{
    return (
        <div className="flex items-center gap-x-2 pb-2 sm:overflow-hidden overflow-x-auto scroll scroll-smooth h-max w-full">
            {items.map((item , index)=>(
                <CategoryItem 
                  key={item.id}
                  label={item.name}
                  value={item.id}
                />
            ))}
        </div>
    )
}