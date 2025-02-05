"use client"
import React from "react";
import Dark from "@/components/ui/Dark";
import { usePathname } from "next/navigation";
import { SearchInput } from "./search-input";
import Link from "next/link";
import Logo from "../../public/logo_new.svg";
import { Button } from "./ui/button";
import Image from "next/image";

const Header = ({ Name }: { Name: string }) => {

  const pathname = usePathname();
  const isNotesPage = pathname.includes("/noteaccess");

  return (
    <header className="sticky top-0 z-50 flex h-[60px] sm:h-[53px] items-center gap-1 border-b bg-background md:px-4 sm:ml-0">
      <div className="sm:w-[53px] sm:h-[53px] w-[60px] h-[60px] bg-background sm:border-b-0 border-b flex sm:hidden justify-center items-center">
       <Link href={"/"}>
          <Button
            variant="ghost"
            size="logo"
            aria-label="Home"
          >
            <Image
              src={Logo}
              alt="logo"
              className="size-6"
              width={32}
              height={32}
            ></Image>
          </Button>
        </Link>
      </div>
      <h1 className="sm:text-2xl text-xl font-josefin font-bold mt-1">{Name}</h1>
      {isNotesPage && (
        <div className="hidden md:flex justify-center items-center ml-10">
          <SearchInput />
        </div>
      )}
      <div className="ml-auto mr-2">
        <Dark/>
      </div>
    </header>
  );
};

export default Header;
