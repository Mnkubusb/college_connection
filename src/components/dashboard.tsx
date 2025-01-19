"use client";
import Header from "@/components/Header";
import ProfileView from "@/components/Profile";
import { Badge } from "@/components/ui/badge";
import { useState, useRef } from "react";
import clsx from "clsx";
import { CloseButton, MantineProvider } from '@mantine/core';
import { Button } from "@/components/ui/button";
import { Profile, User } from "@prisma/client";
import { FaGithub, FaInstagram, FaLinkedin, FaRegStar } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import ProfilePic from "./ui/profilePic";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import Link from "next/link";


interface UserProps {
    users: User[],
    profiles?: Profile[]
}



const Dashboard = (({ users, profiles }: UserProps) => {


    const ref = useRef(null);
    const [isActive, setisActive] = useState(0);
    const [isMobileView, setisMobileView] = useState(false);
    const userProfiles = profiles?.filter(profile => users.some(user => user.id === profile.userId)) || []


    const handleClick = (index: number) => {
        setisMobileView(true);
        setisActive(index);
    };

    return (
        <MantineProvider>
            <div className="flex flex-col">
                <Header Name="College Connections"></Header>
                <main className="grid flex-1 md:grid-cols-2 lg:grid-cols-3 z-50 sm:z-0 relative sm:mx-3">
                    <div className="relative flex-col items-start flex overflow-auto">
                        <div className=" w-full sm:h-full h-[80vh] border-x flex flex-col items-center py-2 gap-2 overflow-auto scroll-smooth scroll">
                            {userProfiles.map((profile, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 cursor-pointer justify-center w-full px-2 hover:bg-gray-600"
                                    onClick={() => {
                                        handleClick(index);
                                    }}>
                                    <ProfileView
                                        profilePic={profile.image as string}
                                        Name={profile?.name as string}
                                        Fallback={profile.name?.slice(0, 2) as string}
                                        Skills={profile.wannabe as string}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                    <div
                        ref={ref}
                        className={clsx(
                            " md:flex border-r min-h-[80vh] overflow-auto flex-col lg:col-span-2 bg-background absolute sm:relative sm:w-full w-[100%]",
                            isMobileView ? " flex" : "hidden"
                        )}>
                        <div className="w-full overflow-auto scroll h-full">
                            <div className="w-full">
                                <CloseButton
                                    className="cursor-pointer z-50 absolute right-4 top-4 w-8 h-8 bg-slate-500 dark:bg-black rounded-full hover:bg-slate-500 sm:hidden flex justify-center items-center"
                                    onClick={() => {
                                        setisMobileView(false);
                                    }} />
                                <div className="flex justify-center items-center sm:h-[200px] h-[150px] sm:w-full relative ">
                                    <div className="dark:bg-gradient-to-r from-slate-900 to-slate-700 w-full h-full " >
                                        <AnimatedGridPattern />
                                    </div>
                                </div>
                            </div>
                            <div className="flex sm:flex-row flex-col sm:px-10 sm:pt-10 px-7 sm:bottom-[7rem] bottom-14 relative gap-6 w-full">
                                <ProfilePic image={userProfiles[isActive].image as string} />
                                <div className="flex flex-col sm:mt-4 gap-3 sm:w-3/4 w-full" >
                                    <div className="flex flex-col sm:justify-center sm:mb-4 sm:mt-28 gap-1 sm:gap-0">
                                        <div className="flex flex-col sm:flex-row justify-between">
                                            <div className="flex flex-col gap-2">
                                                <h3 className="text-3xl font-sans font-bold">
                                                    {userProfiles[isActive].name}
                                                </h3>
                                                <div className="div">
                                                    <h4 className="sm:text-md texts-sm font-sans font-medium sm:flex text-wrap w-72 ">
                                                        {userProfiles[isActive].branch}
                                                    </h4>
                                                    <h4 className="sm:text-md texts-sm font-sans font-light sm:flex text-wrap w-72">
                                                        Government Engineering College , Bilaspur
                                                    </h4>
                                                </div>
                                            </div>
                                            <div className="sm:flex gap-1 hidden">
                                                <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 items-center justify-center">
                                                <Link href= {userProfiles[isActive].insta as string || "#"}>
                                                    <FaInstagram className="text-medium " />
                                                </Link>
                                                </Button>
                                                <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 ">
                                                <Link href= {userProfiles[isActive].linkedin as string || "#"}>
                                                    <FaLinkedin className="text-medium " />
                                                </Link>
                                                </Button>
                                                <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 ">
                                                <Link href= {userProfiles[isActive].github as string || "#"}>
                                                    <FaGithub className="text-medium " />
                                                </Link>
                                                </Button>
                                                <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 ">
                                                <Link href= {userProfiles[isActive].twitter as string || "#"}>
                                                    <RiTwitterXFill className="text-medium " />
                                                </Link>
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 items-end justify-between sm:relative sm:-top-2 mt-2 sm:mt-0">
                                            <div className="flex gap-1 items-end">
                                                <Button variant="outline" className=" rounded-[10px] bg-white border-2 text-black h-8 border-white">
                                                <Link href= {userProfiles[isActive].linkedin ? userProfiles[isActive].linkedin as string : userProfiles[isActive].insta as string || "#"}>
                                                    <span>Message</span>
                                                </Link>
                                                </Button>
                                                <Button variant="outline" className=" rounded-[10px] bg-black border-2 border-white h-8">
                                                    <span>Share</span>
                                                </Button>
                                            </div>
                                            <div className="sm:flex gap-7 hidden ">
                                                <div className="flex-col flex" >
                                                    <div className="h-6 sm:text-md text-xs rounded-xl font-sans text-gray-400 font-medium w-max">
                                                        I am / Wanna be
                                                    </div>
                                                    <div className="text-xl">
                                                        {userProfiles[isActive].wannabe}
                                                    </div>
                                                </div>
                                                <div className="flex-col flex" >
                                                    <div className="h-6 sm:text-md text-xs rounded-xl font-sans text-gray-400 font-medium w-max">
                                                        Batch
                                                    </div>
                                                    <div className="text-xl">
                                                        {userProfiles[isActive].batch}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex-col flex sm:mt-5 mt-3" >
                                            <div className="h-6 sm:text-md text-xs rounded-xl font-sans text-gray-400 font-medium w-max">
                                                Skills
                                            </div>
                                            <div className="text-xl flex flex-wrap gap-2">
                                                {userProfiles[isActive].skills.map((skill, index) => (
                                                    <Badge key={index} variant={"outline"} className="mr-2 bg-zinc-600/20 rounded-full h-8 px-4 flex gap-1 justify-center items-center "><FaRegStar />{skill.charAt(0).toUpperCase() + skill.slice(1)}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap relative sm:bottom-36 bottom-14 p-5 flex flex-col gap-2">
                                <div className="text-2xl font-josefin font-bold sm:px-10 relative w-full">
                                    <div>
                                        My Story
                                    </div>
                                </div>
                                <div className="h-[1px] sm:w-[95%] w-full bg-slate-600"></div>
                                <div className="content flex sm:px-10">
                                    <p className="sm:text-lg text-md font-josefin font-light relative pt-2 text-wrap">
                                        {userProfiles[isActive].bio || "Nothing to show"}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </MantineProvider>
    );
});

export default Dashboard;