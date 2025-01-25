
import { User } from "lucide-react";
import Image from "next/image";

type profilePicProps = {
  image: string;
  className?: string;
}


const ProfilePic = ({ image, className }: profilePicProps) => {


  return (
    <div className="w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] bg-[#e0e0e0;] shadow-[0px_29px_100px_10px_rgba(0,_0,_0,_0.5)] rounded-full aspect-square" >
      {image && <Image src={image as string} alt="" width={200} height={200} className={className + "object-cover object-center rounded-full lg:w-[200px] lg:h-[200px] w-[120px] h-[120px] lg:p-[5px] p-1"} /> || <User className="w-full h-full p-4 lg:p-7 rounded-full bg-gray-600" />}
    </div>
  )
}

export default ProfilePic


