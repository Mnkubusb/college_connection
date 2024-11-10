"use client";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import { CloseButton, MantineProvider } from '@mantine/core';
import { User } from "@prisma/client";

interface UserProps {
    users: User[],
}



const Dashboard = (({users}:UserProps) => {

    const ref = useRef(null);
    const [isActive, setisActive] = useState(0);
    const [isMobileView, setisMobileView] = useState(false);



    const handleClick = (index: number) => {
        setisMobileView(true);
        setisActive(index);
    }

    //   const Users = [
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic: "https://avatars.githubusercontent.com/u/65947443?v=4",
    //       Name: "Manik Chand Sahu",
    //       Skill: "Web Developer",
    //       Fallback: "MS",
    //       Thumbnail: "/gratisography-foliage-face-1036x780.jpg"
    //     },
    //     {
    //       profilePic:
    //         "https://media.licdn.com/dms/image/v2/D4D03AQH1UjifWu1yjw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706550302752?e=1733961600&v=beta&t=_U_2DpE14wGgv7U3rNh0HK-yWMljWeZJF9R4BhXsCLk",
    //       Name: "Ishant Sinha",
    //       Skill: "UI designer",
    //       Fallback: "IS",
    //       Thumbnail: "/beach-view-with-silhouettes-coconut-trees-shades-blue_621174-1719.avif"
    //     },
    //     {
    //       profilePic:
    //         "https://media.licdn.com/dms/image/v2/D4D03AQG0Bm2yrjdsqA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709900024433?e=1733961600&v=beta&t=oahkGhR5kVAztjFpvKKceRCA-Ky4Fe1vvMBq8TtNl2g",
    //       Name: "Harsh Garewal",
    //       Skill: "Data Analyst",
    //       Fallback: "HG",
    //       Thumbnail: "/japanese-temple-hill_23-2148660096.avif"
    //     },
    //   ];

    return (
        <MantineProvider>
            <div className="flex flex-col">
                <Header Name="College Connections"></Header>
                <main className="grid flex-1 gap-2 px-4 md:grid-cols-2 lg:grid-cols-3 overflow-hidden ">
                    <div className="relative flex-col items-start flex overflow-auto">
                        <div className=" w-full sm:h-[92vh] h-[80vh] border-x flex flex-col items-center py-2 gap-2 overflow-auto scroll-smooth
          scroll ">
                            {users.map((user, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col gap-2 cursor-pointer justify-center w-full px-2 hover:bg-gray-600"
                                    onClick={() => {
                                        handleClick(index);
                                    }}
                                >
                                    <Profile
                                        profilePic={user.image as string || "/picjumbo-premium-fall-pictures.jpg"}
                                        Name={user.name as string}
                                        Fallback={user.name?.slice(0, 2) as string}
                                        Skills = {user.email as string}
                                        />

                                    </div>
                            ))}
                        </div>
                    </div>
                    <div
                        ref={ref}
                        className={clsx(
                            " md:flex h-full min-h-[50vh] flex-col p-4 lg:col-span-2 z-30 bg-background items-center border-x absolute sm:relative sm:w-full w-[97%]",
                            isMobileView ? " flex" : "hidden"
                        )}
                    >
                        <div className="border-x rounded-t-md">
                            <div className="w-full">
                                <CloseButton
                                    className="cursor-pointer z-50 absolute right-4 top-4 w-8 h-8 bg-black rounded-full hover:bg-slate-500 sm:hidden flex justify-center items-center"
                                    onClick={() => {
                                        setisMobileView(false);
                                    }} />
                                <div>
                                    <Image
                                        src={users[isActive].image as string || "/picjumbo-premium-fall-pictures.jpg"}
                                        width={1036}
                                        height={780}
                                        alt="thumbnail"
                                        className=" w-full sm:h-[250px] h-[150px] rounded-t-md object-cover object-center border-1"
                                    ></Image>
                                </div>
                                <div className="flex flex-col relative sm:p-4 px-4 sm:bottom-40 bottom-24">
                                    <Image
                                        color="default"
                                        aria-setsize={170}
                                        alt=""
                                        width={180}
                                        height={180}
                                        src={users[isActive].image ||"/beach-view-with-silhouettes-coconut-trees-shades-blue_621174-1719.avif" }
                                        className=" sm:w-[180px] sm:h-[180px] w-[100px] h-[100px] rounded-full p-[5px] bg-background"
                                    ></Image>
                                    <div className="flex justify-between items-center">
                                        <div className="flex flex-col justify-center mb-4 mt-4">
                                            <h3 className="sm:text-2xl text-xl font-sans font-bold ">
                                                {users[isActive].name as string}
                                            </h3>
                                            <div
                                                className="h-6 sm:text-md text-md rounded-xl text-gray-400 font-sans w-max"
                                            >
                                                {users[isActive].email}
                                            </div>
                                        </div>
                                        <div className="px-4 justify-center">
                                            <Badge variant="default">Batch 23</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="wrap relative sm:bottom-36 bottom-24">
                                <div className="text-2xl font-josefin font-bold px-4 relative">
                                    History
                                </div>
                                <div className="line w-full h-[1px] bg-slate-700 relative"></div>
                                <div className="content">
                                    <p className="sm:text-lg text-md font-josefin font-light px-4 relative pt-2">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
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