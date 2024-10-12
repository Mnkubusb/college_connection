import React from 'react'
import { Avatar , AvatarFallback , AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'

const Profile = (
    {profilePic,Name,Skills}:{
        profilePic:string,
        Name:string,
        Skills:string
    }
) => {
  return (
    <div className="w-[100%] h-[70px] flex items-center pl-4 border rounded-lg">
      <Avatar>
        <AvatarImage src={profilePic} />
        <AvatarFallback>MS</AvatarFallback>
      </Avatar>
      <div className="flex flex-col ml-3 items-start">
        <h3 className='font-sans font-bold '>{Name}</h3>
        <div className="flex gap-2">
            <Badge variant={"outline"} className="h-5 rounded-xl">
              {Skills}
            </Badge>
        </div>
      </div>
    </div>
  );
}

export default Profile
