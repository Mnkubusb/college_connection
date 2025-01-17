
import { User } from "lucide-react";
import { use, useEffect, useState } from "react";


type profilePicProps = {
  image: string;
  className?: string;
}


const ProfilePic = ({ image, className }: profilePicProps) => {


  return (
    <div className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] bg-[#e0e0e0;] shadow-threed object-center object-cover sm:p-[4px] p-[4px] rounded-full " >
      {image && <img src={image as string} alt="" className={className + " rounded-full w-full h-full"} /> || <User className="w-full h-full p-4 sm:p-7 rounded-full bg-gray-600" />}
    </div>
  )
}

export default ProfilePic


