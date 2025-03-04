"use client";
import React from "react";
import clsx from "clsx";
import { LogOut, Settings2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IoLinkOutline, IoGitNetworkOutline } from "react-icons/io5";
import { MdContactPage } from "react-icons/md";
import Logo from "../../public/logo_new.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/get-current-user";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { Separator } from "./ui/separator";

const NoteEditIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M10.2892 21.9614H9.39111C6.14261 21.9614 4.51836 21.9614 3.50918 20.9363C2.5 19.9111 2.5 18.2612 2.5 14.9614V9.96139C2.5 6.66156 2.5 5.01165 3.50918 3.98653C4.51836 2.9614 6.14261 2.9614 9.39111 2.9614H12.3444C15.5929 2.9614 17.4907 3.01658 18.5 4.04171C19.5092 5.06683 19.5 6.66156 19.5 9.96139V11.1478"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9453 2V4M10.9453 2V4M5.94531 2V4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7 15H11M7 10H15"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      opacity="0.93"
      d="M20.7598 14.8785C19.8544 13.8641 19.3112 13.9245 18.7076 14.1056C18.2851 14.166 16.8365 15.8568 16.2329 16.3952C15.2419 17.3743 14.2464 18.3823 14.1807 18.5138C13.9931 18.8188 13.8186 19.3592 13.7341 19.963C13.5771 20.8688 13.3507 21.8885 13.6375 21.9759C13.9242 22.0632 14.7239 21.8954 15.6293 21.7625C16.2329 21.6538 16.6554 21.533 16.9572 21.3519C17.3797 21.0983 18.1644 20.2046 19.5164 18.8761C20.3644 17.9833 21.1823 17.3664 21.4238 16.7626C21.6652 15.8568 21.3031 15.3737 20.7598 14.8785Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
  </svg>
);
const InformationCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width={24}
    height={24}
    color={"#000000"}
    fill={"none"}
    {...props}
  >
    <path
      d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.992 8H12.001"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Aside = () => {

  const user = useCurrentUser();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="relative z-[999] lg:z-[100] flex sm:h-dvh h-[70px] flex-col sm:border-r w-full sm:w-max bg-background">
      <div className="sm:p-2 sm:w-[52px] sm:h-[52px] w-[60px] h-[60px] hidden bg-background sm:border-b-0 border-b sm:flex justify-center items-center">
        <Link href={"/"} className="flex items-center justify-center">
          <Button
            variant="ghost"
            size="logo"
            aria-label="Home"
          >
            <Image
              src={Logo}
              alt="logo"
              className="size-7 sm:size-5"
              width={20}
              height={20}
            ></Image>
          </Button>
        </Link>
      </div>
      <div className="flex sm:flex-col h-[70px] items-center z-50 sm:h-full sm:px-0 bg-background sm:bg-transparent sm:w-max gap-3 w-full px-10 pt-4 sm:pt-0 justify-evenly border-t">
        <nav className="grid sm:gap-1 gap-4 sm:p-2 grid-cols-4 sm:grid-cols-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("rounded-full sm:rounded-lg w-12 sm:w-9 h-12 sm:h-9 ", {
                    "bg-accent": pathname === "/",
                  })}
                  aria-label="Network"
                >
                  <IoGitNetworkOutline className="sm:size-5 size-7" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="sm:flex hidden">
              Network
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/noteaccess">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("rounded-full sm:rounded-lg w-12 h-12 sm:w-9 sm:h-9 flex justify-center items-center", {
                    "bg-accent": pathname === "/noteaccess",
                  })}
                  aria-label="Notes"
                >
                  <NoteEditIcon className="sm:size-5 size-7 fill-white flex justify-center items-center" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="sm:flex hidden">
              Notes
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/links">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("rounded-full w-12 h-12 sm:w-9 sm:h-9 sm:rounded-lg", {
                    "bg-accent": pathname === "/links",
                  })}
                  aria-label="Links"
                >
                  <IoLinkOutline className="sm:size-5 size-7" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="sm:flex hidden">
              Links
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/about">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("sm:rounded-lg rounded-full w-12 h-12 sm:w-9 sm:h-9 ", {
                    "bg-accent": pathname === "/about",
                  })}
                  aria-label="About us"
                >
                  <InformationCircleIcon className="sm:size-4 size-7 fill-white" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="sm:flex hidden">
              About us
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/settings">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("rounded-lg hidden sm:flex w-12 h-12 sm:w-9 sm:h-9", {
                    "bg-accent": pathname === "/settings",
                  })}
                  aria-label="Settings"
                >
                  <Settings2 className="sm:size-5 size-8" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="sm:flex hidden">
              Settings
            </TooltipContent>
          </Tooltip>
        </nav>
        <nav className="sm:mt-auto grid sm:gap-1 sm:p-2 sm:border-t-1">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/contact">
                <Button
                  variant="ghost"
                  size="icon"
                  className={clsx("mt-auto sm:rounded-lg rounded-full sm:flex hidden w-12 h-12 sm:w-9 sm:h-9", {
                    "bg-accent": pathname === "/contact",
                  })}
                  aria-label="contact"
                  onClick={() => router.push("/contact")} >
                  <MdContactPage className="size-5" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5}>
              Contact us
            </TooltipContent>
          </Tooltip>
          <Tooltip >
            <TooltipTrigger asChild>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className={clsx("mt-auto rounded-full w-12 h-12 sm:w-9 sm:h-9 mb-4", {
                      "bg-accent": pathname === "/profile",
                    })}
                    aria-label="Profile" >
                    {
                      user?.image ?
                        <Image width={32} height={32} src={user?.image} alt="" className="rounded-full w-8 h-8" /> :
                        <User className="sm:size-5 size-7" />
                    }
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 z-[1000]">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => router.push("/profile")} className="flex gap-2">
                    <User size={16} />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/settings")} className="flex gap-2">
                    <Settings2 size={16} />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signOut()} className="flex gap-2">
                    <LogOut size={16} />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={5} className="sm:flex hidden">
              Profile
            </TooltipContent>
          </Tooltip>
        </nav>
        </div>
    </aside>
  );
};

export default Aside;
