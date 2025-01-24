"use client"

import { Category } from "@prisma/client"
import { CategoryItem } from "./catergory-item";


interface CategoriesProps{
    items: Category[];
}
export const Catergories = ( { items }:CategoriesProps  ) =>{
    return (
        <div className="flex items-center gap-x-2 pb-2 sm:overflow-hidden overflow-x-auto scroll scroll-smooth">
            {items.map((item)=>(
                <CategoryItem 
                  key={item.id}
                  label={item.name}
                  value={item.id}
                />
            ))}
        </div>
    )
}