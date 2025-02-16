
import { User } from "lucide-react";
import Image from "next/image";
import { Badge } from "./badge";

type profilePicProps = {
  image: string;
  className?: string;
}


const ProfilePic = ({ image, className }: profilePicProps) => {


  return (
    <div className="w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] bg-[#e0e0e0] shadow-[0px_29px_100px_10px_rgba(0,_0,_0,_0.5)] rounded-full aspect-square relative" >
      {image && <Image src={image as string} alt="" width={200} height={200} className={className + "object-cover object-center rounded-full lg:w-[200px] lg:h-[200px] w-[150px] h-[150px] lg:p-[5px] p-1"} /> || <User className="w-full h-full p-4 lg:p-7 rounded-full bg-gray-600" />}
      {/* <Badge className="absolute md:bottom-0 md:right-12 right- bottom-0 md:py-2 md:px-3  py-1 px-2 gap-2 rounded-full flex justify-center items-center border-white bg-[#020202]" variant={"outline"}>
        <Image src="/shazam.gif" width={50} height={50} alt="shazam" className="w-4 h-4" />
        <span className="flex justify-center items-center gap-1">
        {dailyCoins} Day Streak
        </span>
      </Badge> */}
    </div>
  )
}

export default ProfilePic


