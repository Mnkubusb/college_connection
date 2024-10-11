import React from "react";
import Dark from "@/components/ui/Dark";

const Header = ({ Name }: { Name: string }) => {
  return (
    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4 justify-between">
      <h1 className="text-2xl font-josefin font-bold mt-2">{Name}</h1>
      <Dark/>
    </header>
  );
};

export default Header;
