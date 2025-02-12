"use client";
import { BlocksIcon, GlobeIcon, LucideIcon, MailOpen, Plus, SearchCheckIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface ProfileCardProps {
    name: string;
    designation: string;
    imageUrl: string;
    className?: string
    href?: string
    hrefName?: string
}

const ProfileCard = ({ name, designation, imageUrl, className, href, hrefName }: ProfileCardProps) => {
    return (
        <div className={"flex flex-col justify-center py-8 items-center " + className} >
            <div className="w-16 h-16 rounded-full overflow-hidden hover:border-2  hover:border-primary" >
                <Image src={imageUrl} alt={name} width={100} height={100} className="w-full h-full object-cover" />
            </div>
            <div className="text-center mt-4 flex flex-col justify-center items-center" >
                <h3 className="text-lg font-medium font-geist" >{name}</h3>
                <div className="flex gap-1 justify-center items-center">
                    <p className="text-sm text-muted-foreground font-geist">{designation}</p>
                    <a href={href} className=" font-geist text-sm mt-[2px] hover:underline">
                        {hrefName}
                    </a>
                </div>
            </div>
        </div>
    )
}




interface FeatureCardProps {
    title: string;
    description: string;
    icon: LucideIcon;
    className?: string
}

const FeatureCard = ({ title, description, icon: Icon, className }: FeatureCardProps) => {
    return (
        <div className={"flex flex-col sm:px-10 px-5 sm:py-16 py-6 justify-center items-center sm:justify-start sm:items-start " + className}>
            <Icon className="size-10 my-5" />
            <div className="sm:text-2xl text-base font-semibold text-center sm:text-left text-neutral-500 font-geist">
                <span className="text-white">{title}</span>
                {description}
            </div>
        </div>
    )
}

const AboutPage = () => {
    return (
        <div className="flex mx-auto flex-col justify-center w-full h-full">
            <div className="md:w-[98%] lg:w-3/4 w-full px-4 mx-auto h-full">
                <div className="border sm:py-28 sm:px-44 box-border relative w-full h-max px-6 py-20">
                    <Plus size={32} strokeWidth={0.5} className="absolute -top-4 -left-4" />
                    <h1 className="sm:text-6xl text-4xl font-geist font-semibold text-center text-wrap">
                        College Connections helps you connect with your college
                    </h1>
                    <p className="sm:text-xl text-base font-geist font-medium text-center mt-8 text-neutral-600">
                        We&apos;re here to help you with any <span className="text-white">questions</span> or
                        <span className="text-white ml-1">concerns</span> you may have.
                    </p>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-2 sm:grid-rows-1 grid-rows-3 mx-auto border border-t-0 relative">
                    <div className="sm:hidden absolute z-0 block col-span-1 row-span-3 border-r border-t-0 h-full w-1/2" />
                    <FeatureCard title="Connect. " description="with classmates, seniors, and juniors through personalized profiles and social media links." icon={BlocksIcon} className="sm:col-span-1 col-span-2 relative z-10" />
                    <FeatureCard title="Access. " description="a semester-wise repository of subject notes, PYQs, and study materials for easy learning.." icon={GlobeIcon} className="sm:border-x sm:col-span-1 col-span-2 relative z-10" />
                    <FeatureCard title="Find. " description="students and academic materials quickly using advanced search and filtering options." icon={SearchCheckIcon} className="sm:col-span-1 col-span-2 relative z-10" />
                </div>
                <div className="h-5 border border-t-0 w-full" />
                <div className="grid grid-cols-3 sm:grid-cols-2 grid-rows-1 mx-auto border border-t-0 relative">
                    <Plus size={32} strokeWidth={0.5} className="absolute -bottom-4 -left-4 z-20" />
                    <div className="sm:hidden absolute z-0 block col-span-1 row-span-3 border-r border-t-0 h-full w-1/2" />
                    <div className="sm:col-span-1 hidden sm:block border-r w-1/3 absolute h-full z-0 col-span-2" />
                    <div className="sm:col-span-1 hidden sm:block border-r w-2/3 h-full z-0 absolute col-span-2" />
                    <h1 className="sm:text-4xl text-2xl sm:mt-32 sm:my-16 mt-20 my-8 font-semibold font-geist col-span-3 row-span-1 text-center relative z-10"> Meet out Team.</h1>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-2 grid-rows-1 mx-auto border border-t-0 relative">
                    <ProfileCard name="Ishant Sinha" designation="CEO and Founder" imageUrl="/Ishant.jpeg" className="sm:col-span-1 row-span-1 col-span-2 border" hrefName="College Connections" href="" />
                    <ProfileCard name="Manik Chand Sahu" designation="CTO and Developer" imageUrl="/Manik.jpeg" className="sm:col-span-1 row-span-1 col-span-2 border" hrefName="College Connections" href="https://github.com/Mnkubusb" />
                    <ProfileCard name="Harsh Garewal" designation="CFO of" imageUrl="/Harsh.jpg" className="sm:col-span-1 row-span-1 col-span-2 border" hrefName="College Connections" href="https://github.com" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-2 grid-rows-1 mx-auto border border-t-0 relative">
                    <Plus size={32} strokeWidth={0.5} className="absolute -bottom-4 -left-4 z-20" />
                    <div className="sm:hidden absolute z-0 block col-span-1 row-span-3 border-r border-t-0 h-full w-1/2" />
                    <div className="sm:col-span-1 hidden sm:block border-r w-1/3 absolute h-full z-0 col-span-2" />
                    <div className="sm:col-span-1 hidden sm:block border-r w-2/3 h-full z-0 absolute col-span-2" />
                    <div className="sm:mt-32 sm:my-16 mt-20 my-8 col-span-3 row-span-1 text-center relative z-10 ">
                        <h1 className="sm:text-4xl text-2xl font-semibold font-geist">Backed by incredible Heroes.</h1>
                        <p className="font-geist text-sm">Upload notes and stand a chance to list your name here</p>
                    </div>
                </div>
                <div className="grid sm:grid-cols-3 grid-cols-2 grid-rows-3 mx-auto border border-t-0 relative">
                    <ProfileCard name="Samriddhi Chepe" designation="" imageUrl="/Sam.jpeg" className="sm:col-span-1 row-span-1 col-span-2 border" />
                    <ProfileCard name="Shristi Mishra" designation="" imageUrl="/Shristi.jpeg" className="sm:col-span-1 row-span-1 col-span-2 border" />
                    <ProfileCard name="Rishabh Sinha" designation="" imageUrl="/rishu.jpg" className="sm:col-span-1 row-span-1 col-span-2 border" />
                    <ProfileCard name="Deepika Gupta" designation="" imageUrl="/simple_futuristic_city_by_donotbeatme_din4ch2.jpg" className="sm:col-span-1 row-span-1 col-span-2 border"  />
                    <ProfileCard name="GunGun Galpat" designation="" imageUrl="/4veT.gif" className="sm:col-span-1 row-span-1 col-span-2 border" />
                    <ProfileCard name="Rastogi" designation="" imageUrl="/dbz-gif.gif" className="sm:col-span-1 row-span-1 col-span-2 border" />
                    <ProfileCard name="Rastogi" designation="" imageUrl="/dokkan-battle-top.gif" className="sm:col-span-1 row-span-1 col-span-2 border" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-2 grid-rows-1 mx-auto border border-t-0 relative">
                    <Plus size={32} strokeWidth={0.5} className="absolute -top-4 -right-4 z-20" />
                    <div className="sm:hidden absolute z-0 block col-span-1 row-span-3 border-r border-t-0 h-full w-1/2" />
                    <div className="sm:col-span-1 hidden sm:block border-r w-1/3 absolute h-full z-0 col-span-2" />
                    <div className="sm:col-span-1 hidden sm:block border-r w-2/3 h-full z-0 absolute col-span-2" />
                    <div className=" sm:mt-32 sm:my-32 my-8 flex justify-between col-span-3 row-span-1 text-left px-20 relative z-10">
                        <h1 className="sm:text-4xl text-2xl font-semibold font-geist">
                        Join us and make the college better.
                        </h1> 
                        <Button variant={"outline"} className="bg-white rounded-full text-black font-geist font-medium text-md hover:bg-white/80 hover:text-black flex justify-center items-center
                        gap-2" size={"lg"} >
                            <MailOpen size={14} />
                            View Open Positions
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutPage;