"use client"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { ExtendedUser } from "../../../next-auth";
import ProfilePic from "../ui/profilePic";

interface UserProps {
    user?: ExtendedUser
}

const ProfilePage = ({ user }: UserProps) => {
    return (
        <div
            className={clsx(
                " md:flex h-full min-h-[50vh] p-4 flex-col lg:col-span-2 bg-background items-center border-x absolute sm:relative sm:w-full w-[97%]",
            )}
        >
            <div className="w-full">
                <div className="div">
                    <Image
                        src={"/gratisography-foliage-face-1036x780.jpg"}
                        width={1036}
                        height={780}
                        alt="thumbnail"
                        className=" w-full sm:h-[250px] h-[150px] rounded-t-md object-cover object-center"
                    ></Image>
                </div>
                <div className="flex flex-col relative sm:p-4 p-3 sm:bottom-40 bottom-24">
                    <ProfilePic user={user} />
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-center mb-4 mt-4">
                            <h3 className="sm:text-2xl text-xl font-sans font-bold ">
                                {user?.name}
                            </h3>
                            <div
                                className="h-6 sm:text-md text-md rounded-xl font-sans text-gray-400 font-medium w-max"
                            >
                                {"Software Engineer"}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge>Batch 23</Badge>    
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
                        {JSON.stringify(user)}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>
                </div>
            </div>
        </div>

    );
}


export default ProfilePage;