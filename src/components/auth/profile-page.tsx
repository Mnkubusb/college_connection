"use client"
import { Badge } from "@/components/ui/badge";
import { ExtendedUser } from "../../../next-auth";
import ProfilePic from "../ui/profilePic";
import { Button } from "../ui/button";
import { FaGithub, FaInstagram, FaLinkedin, FaRegStar, FaTwitter } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Profile } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import AnimatedGridPattern from "../ui/animated-grid-pattern";
import Link from "next/link";


interface UserProps {
    user?: ExtendedUser,
    profile?: Profile[]
}

const ProfilePage = ({ user, profile }: UserProps) => {

    const router = useRouter();
    const userProfile = profile?.find((profile) => profile.userId === user?.id);

    return (
        <div className="flex h-full sm:mx-3 sm:border-x flex-col w-full">
            <div className="w-full h-full relative">
                <div className="div">
                    <Button onClick={() => {
                        router.push("/settings")
                    }} variant={"outline"} className="absolute gap-1 top-5 right-3 z-40 cursor-pointer dark:bg-black rounded-full flex justify-center items-center" >
                        <Pencil size={14} />
                        Edit
                    </Button>
                    <div className="flex justify-center items-center sm:h-[200px] h-[150px] sm:w-full relative">
                        <div className="dark:bg-gradient-to-r from-slate-900 to-slate-700 w-full h-full" >
                            <AnimatedGridPattern />
                        </div>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:px-10 sm:pt-10 px-7 sm:bottom-[7rem] bottom-14 relative gap-6">
                    <ProfilePic image={userProfile?.image as string} className="w-1/4" />
                    <div className="flex flex-col sm:mt-4 gap-3 w-3/4">
                        <div className="flex flex-col sm:justify-center sm:mb-4 sm:mt-24 gap-1 sm:gap-0 w-full">
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                                <div className="flex flex-col gap-2">
                                    <h3 className="text-3xl font-sans font-bold">
                                        {userProfile?.name}
                                    </h3>
                                    <div className="div">
                                        <h4 className="sm:text-md texts-sm font-sans font-medium sm:flex text-wrap w-72 ">
                                            {userProfile?.branch}
                                        </h4>
                                        <h4 className="sm:text-md texts-sm font-sans font-light sm:flex text-wrap w-72">
                                            Government Engineering College , Bilaspur
                                        </h4>
                                    </div>
                                </div>
                                <div className="flex gap-1 sm:mt-0 mt-3">
                                    <Button variant={"outline"} className="rounded-full p-[6px] border-2 dark:border-white h-8 items-center justify-center">
                                        <Link href={userProfile?.insta as string || "#"}>
                                            <FaInstagram className="text-medium " />
                                        </Link>
                                    </Button>
                                    <Button variant={"outline"} className="rounded-full dark:bg-black p-[6px] border-2 dark:border-white  h-8 ">
                                        <Link href={userProfile?.linkedin as string || "#"}>
                                            <FaLinkedin className="text-medium " />
                                        </Link>
                                    </Button>
                                    <Button variant={"outline"} className="rounded-full dark:bg-black p-[6px] border-2 dark:border-white h-8 ">
                                        <Link href={userProfile?.github as string || "#"}>
                                            <FaGithub className="text-medium " />
                                        </Link>
                                    </Button>
                                    <Button variant={"outline"} className="rounded-full dark:bg-black p-[6px] border-2 dark:border-white h-8 ">
                                        <Link href={userProfile?.twitter as string || "#"}>
                                            <RiTwitterXFill className="text-medium " />
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-1 items-end justify-between sm:relative sm:-top-2 mt-2 sm:mt-0">
                                <div className="flex gap-1 items-end">
                                    <Button variant="outline" className=" rounded-[10px] dark:bg-white border-2 text-black h-8 dark:border-white dark:hover:bg-gray-900">
                                        <Link href={userProfile?.linkedin ? userProfile?.linkedin as string : userProfile?.insta as string || "#"} target="_blank">
                                            <span>Message</span>
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="rounded-[10px]  border-2 dark:border-white h-8">
                                        <span>Share</span>
                                    </Button>
                                </div>
                                <div className="sm:flex gap-7 hidden ">
                                    <div className="flex-col flex" >
                                        <div className="h-6 sm:text-md text-xs rounded-xl font-sans text-gray-400 font-medium w-max">
                                            I am / Persuing
                                        </div>
                                        <div className="text-xl">
                                            {userProfile?.wannabe}
                                        </div>
                                    </div>
                                    <div className="flex-col flex" >
                                        <div className="h-6 sm:text-md text-xs rounded-xl font-sans text-gray-400 font-medium w-max">
                                            Batch
                                        </div>
                                        <div className="text-xl">
                                            {userProfile?.batch}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-col flex sm:mt-5 mt-3" >
                                <div className="h-6 sm:text-md text-xs rounded-xl font-sans text-gray-400 font-medium w-max">
                                    Skills
                                </div>
                                <div className="text-xl flex flex-wrap gap-2">
                                    {userProfile?.skills.map((skill, index) => (
                                        <Badge key={index} variant={"outline"} className="mr-2 bg-zinc-600/20 rounded-full h-8 px-4 flex gap-1 justify-center items-center " ><FaRegStar />{skill}</Badge>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap relative sm:bottom-36 bottom-14 p-5 flex flex-col gap-2 mb-10">
                    <div className="text-2xl font-josefin font-bold sm:px-10 relative w-full">
                        <div>
                            My Story
                        </div>
                    </div>
                    <div className="h-[1px] sm:w-[95%] w-full bg-slate-600"></div>
                    <div className=" sm:px-10 ">
                        <p className=" w-full sm:text-lg text-md font-josefin font-light relative pt-2 text-wrap flex justify-start items-start">
                            {userProfile?.bio}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;