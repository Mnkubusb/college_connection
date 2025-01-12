
import { User } from "lucide-react";
import { use, useEffect, useState } from "react";


type profilePicProps = {
    image: string;
    className?: string;
}


const ProfilePic = ( {image, className }: profilePicProps) => {
  

  return (
    <div className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] object-center object-cover bg-gray-100 sm:p-[2px] p-[7px] rounded-full bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 " >
        {image && <img src={image as string} alt=""  className={ className + " rounded-full w-full h-full" } /> || <User className="w-full h-full p-4 sm:p-5 rounded-full bg-gray-600"/>}
    </div>
  )
}

export default ProfilePic

 
