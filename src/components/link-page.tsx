"use client";
import ProfileView from "@/components/Profile";
import { useState } from "react";
import clsx from "clsx";
import { CloseButton, MantineProvider } from '@mantine/core';
import Embed from "react-embed";




const LinkPage = () => {

    const [isActive, setisActive] = useState(0);
    const [isMobileView, setisMobileView] = useState(false);

    const links = [
        {
            name: "Kausalam",
            href: "https://kaushalam.vercel.app/",
            imageUrl: "/kausalam.svg"
        },
        {
            name: "GPL",
            href: "https://www.instagram.com/official_gpl_cricketpage/",
            imageUrl: "/354513479_292961923070804_3769259266573348385_n-removebg-preview.png"
        },
        {
            name: "CSVTU ,Bhilai",
            href: "https://csvtu.digivarsity.online/",
            imageUrl: "t-logo.png"
        },
        {
            name: "GEC ,Bilaspur",
            href: "https://gecbsp.ac.in/?page_id=6278",
            imageUrl: "/gecbwobg.png"
        },
       
    ]


    const handleClick = (index: number) => {
        setisMobileView(true);
        setisActive(index);
    };

    return (
        <MantineProvider>
            <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 z-50 sm:z-0 border-r sm:mx-3 w-full h-full">
                <div className="w-full h-full sm:h-[calc(100vh-60px)] border-x flex flex-col overflow-auto scroll scroll-smooth items-center py-2 gap-2 pb-16 sm:pb-0">
                    {links.map((link, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-2 cursor-pointer justify-center w-full px-2 dark:hover:bg-gray-800 hover:bg-gray-200 shadow-large dark:shadow-slate-100"
                            onClick={() => {
                                handleClick(index);
                            }}>
                            <ProfileView
                                profilePic={link.imageUrl}
                                Name={link?.name as string}
                                Fallback={link.name?.slice(0, 2) as string}
                                Skills={link.href as string}
                            />
                        </div>
                    ))}
                </div>
                <div className={clsx(
                    " lg:flex border-r flex-grow lg:overflow-y-hidden overflow-y-auto flex-col lg:col-span-2 bg-background absolute lg:relative w-full h-[calc(100vh-70px)] sm:h-full",
                    isMobileView ? " flex" : "hidden"
                )}>
                    <div className="w-full overflow-auto lg:overflow-hidden scroll sm:max-h-[100vh] max-h-[80vh] scroll-smooth">
                        <div className="w-full">
                            <CloseButton
                                className="z-50 absolute right-4 top-4 w-8 h-8 bg-slate-500 dark:bg-black rounded-full hover:bg-slate-500 lg:hidden flex justify-center items-center"
                                onClick={() => {
                                    setisMobileView(false);
                                }} />
                        </div>
                    </div>
                    <div className="size-full overflow-auto scroll scroll-smooth">
                        <embed src={links[isActive].href} style={{ width: "100%", height: "100%" }} className="size-full scroll scroll-smooth"></embed>
                    </div>
                </div>
            </main>
        </MantineProvider>
    );
}

export default LinkPage;

