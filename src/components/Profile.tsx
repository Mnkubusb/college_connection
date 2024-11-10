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
    <div className="w-[100%] h-[70px] flex items-center pl-4">
      <Avatar>
        <AvatarImage src={profilePic} alt={Name} />
        <AvatarFallback>{Fallback}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-3 items-start">
        <h3 className='font-josefin font-bold '>{Name}</h3>
        <div className="flex gap-2">
            <div className="h-[18px] text-xs rounded-xl font-sans font-bold text-gray-400 pb-1">
              {Skills}
            </div>
        </div>
      </div>
    </div>
  );
}

export default Profile
