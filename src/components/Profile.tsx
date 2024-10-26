import React from 'react'
import { Avatar , AvatarFallback , AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Profile = (
    {profilePic,Name,Skills,Fallback}:{
        profilePic:string,
        Name:string,
        Skills:string,
        Fallback:string
    }
) => {
  return (
    <div className="w-[100%] h-[70px] flex items-center pl-4 border-y">
      <Avatar>
        <AvatarImage src={profilePic} alt={Name} />
        <AvatarFallback>{Fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-3 items-start">
        <h3 className=' font-sans font-bold '>{Name}</h3>
        <div className="flex gap-2">
            <Badge variant={"outline"} className="h-[18px] text-xs rounded-xl font-sans font-bold text-gray-400 px-2 pb-1" >
              {Skills}
            </Badge>
        </div>
      </div>
    </div>
  );
}

export default Profile
