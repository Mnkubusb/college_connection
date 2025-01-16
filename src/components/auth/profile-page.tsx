"use client"
import { Badge } from "@/components/ui/badge";
import { ExtendedUser } from "../../../next-auth";
import ProfilePic from "../ui/profilePic";
import { Button } from "../ui/button";
import { FaGithub, FaInstagram, FaLinkedin, FaRegStar, FaTwitter } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { Profile } from "@prisma/client";


interface UserProps {
    user?: ExtendedUser,
    profile?: Profile[]
}

const ProfilePage = ({ user, profile }: UserProps) => {

    const userProfile = profile?.find((profile) => profile.userId === user?.id);

    return (
        <div className="md:flex h-full min-h-[84vh] sm:mx-3 flex-col lg:col-span-2 bg-background absolute sm:relative sm:w-full w-[100%]">
            <div className="w-full sm:overflow-hidden overflow-auto h-full overflow-x-hidden">
                <div className="div">
                    <div className="flex justify-center items-center sm:h-[200px] h-[150px] sm:w-full relative ">
                        <BackgroundGradientAnimation interactive>
                        </BackgroundGradientAnimation>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:px-10 sm:pt-10 px-7 sm:bottom-[7rem] bottom-14 relative gap-6">
                    <ProfilePic image={user?.image as string} className="w-1/4" />
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
                                <div className="sm:flex gap-1 hidden">
                                    <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 items-center justify-center">
                                        <FaInstagram className="text-medium " />
                                    </Button>
                                    <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 ">
                                        <FaLinkedin className="text-medium " />
                                    </Button>
                                    <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 ">
                                        <FaGithub className="text-medium " />
                                    </Button>
                                    <Button variant={"outline"} className="rounded-full bg-black p-[6px] border-2 border-white h-8 ">
                                        <RiTwitterXFill className="text-medium " />
                                    </Button>
                                </div>
                            </div>
                            <div className="flex gap-1 items-end justify-between sm:relative sm:-top-2 mt-2 sm:mt-0">
                                <div className="flex gap-1 items-end">
                                    <Button variant="outline" className=" rounded-[10px] bg-white border-2 text-black h-8 border-white">
                                        <span>Message</span>
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
                                    {userProfile?.skills.map((skill , index) => (
                                        <Badge key={index} variant={"outline"} className="mr-2 bg-zinc-600/20 rounded-full h-8 px-4 flex gap-1 justify-center items-center " ><FaRegStar />{skill}</Badge>
                                    ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap relative sm:bottom-36 bottom-14 p-5 flex flex-col gap-2 items-center justify-center">
                    <div className="text-2xl font-josefin font-bold sm:px-10 relative w-full">
                        <div>
                            My Story
                        </div>
                    </div>
                    <div className="h-[1px] sm:w-[95%] w-full bg-slate-600"></div>
                    <div className="content flex sm:px-10">
                        <p className="sm:text-lg text-md font-josefin font-light relative pt-2 text-wrap">
                           {userProfile?.bio}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;