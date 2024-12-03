
import { User } from "lucide-react";
import { ExtendedUser } from "../../../next-auth";
import { Avatar, MantineProvider } from "@mantine/core";


type profilePicProps = {
    user?: ExtendedUser;
    className?: string;
}


const ProfilePic = ( {user,className}: profilePicProps) => {
  return (
    <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] object-cover object-center bg-background p-[5px] rounded-full " >
        {user?.image? <img src={user?.image as string} alt=""  className={ className + " rounded-full w-full h-full" } />: <User className="w-full h-full p-4 sm:p-5 rounded-full bg-white/25"/>}
    </div>
  )
}

export default ProfilePic

 
