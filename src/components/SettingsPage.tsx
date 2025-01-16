"use client"
import { Badge } from "@/components/ui/badge";

import { FaGithub, FaInstagram, FaLinkedin, FaRegStar, FaTwitter } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { Profile } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { ExtendedUser } from "../../next-auth";
import { Button } from "./ui/button";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import ProfilePic from "./ui/profilePic";



interface UserProps {
    user?: ExtendedUser,
    profile?: Profile[]
}

const SettingsPage = ({ user, profile }: UserProps) => {

    const  router = useRouter();
    const userProfile = profile?.find((profile) => profile.userId === user?.id);

    return (
        <div className="md:flex h-full min-h-[84vh] sm:mx-3 border flex-col lg:col-span-2 bg-background absolute sm:relative sm:w-full w-[100%]">
            <div className="w-full sm:overflow-hidden overflow-auto h-full overflow-x-hidden">
                <div className="div">
                    <div className="flex justify-center items-center sm:h-[150px] h-[120px] sm:w-full relative">
                        <div className="bg-gradient-to-r from-slate-900 to-slate-700 w-full h-full" >
                            <AnimatedGridPattern />
                        </div>
                    </div>
                </div>
                <div className="flex sm:flex-row flex-col sm:px-10 sm:pt-10 px-7 sm:bottom-[7rem] bottom-14 relative gap-6">
                    <ProfilePic image={user?.image as string} className="w-[120px] h-[120px]" />
                    <div className="flex flex-col sm:mt-4 gap-3 w-3/4">
                        <div className="flex flex-col sm:justify-center sm:mb-4 sm:mt-20 gap-1 sm:gap-0 w-full">
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                                <div className="flex flex-col">
                                    <h3 className="text-3xl font-sans font-bold">
                                        {userProfile?.name}
                                    </h3>
                                    <div className="div">
                                        <h4 className="sm:text-md texts-sm font-sans font-light sm:flex text-wrap w-72">
                                            {user?.email}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="wrap relative bottom-14 p-5 flex flex-col gap-2 items-center justify-center sm:-top-16">
                    <div className="font-josefin sm:px-10 relative w-full">
                        <div className="font-bold ">
                            Personal info
                        </div>
                        <div>

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


export default SettingsPage;