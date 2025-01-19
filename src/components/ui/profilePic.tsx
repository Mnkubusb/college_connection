
import { User } from "lucide-react";
import Image from "next/image";

type profilePicProps = {
  image: string;
  className?: string;
}


const ProfilePic = ({ image, className }: profilePicProps) => {


  return (
    <div className="w-[120px] h-[120px] sm:w-[200px] sm:h-[200px] bg-[#e0e0e0;] shadow-[0px_39px_100px_20px_rgba(0,_0,_0,_0.7)] rounded-full object-cover object-center" >
      {image && <Image src={image as string} alt="" width={200} height={200} className={className + "object-fill object-center rounded-full sm:w-[200px] sm:h-[200px] w-[120px] h-[120px] sm:p-[5px] p-1"} /> || <User className="w-full h-full p-4 sm:p-7 rounded-full bg-gray-600" />}
    </div>
  )
}

export default ProfilePic


