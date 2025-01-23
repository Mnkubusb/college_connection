"use client"
import React from "react";
import Dark from "@/components/ui/Dark";
import { usePathname } from "next/navigation";
import { SearchInput } from "./search-input";

const Header = ({ Name }: { Name: string }) => {

  const pathname = usePathname();
  const isNotesPage = pathname.includes("/noteaccess")
  return (

    <header className="sticky top-0 z-50 sm:z-0 flex h-[60px] sm:h-[53px] items-center gap-1 border-b bg-background px-4 ml-[53px] sm:ml-0">
      <h1 className="sm:text-2xl text-xl font-josefin font-bold mt-2">{Name}</h1>
      {isNotesPage && (
        <div className="hidden md:flex justify-center items-center ml-10">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto">
        <Dark/>
      </div>
    </header>
  );
};

export default Header;
