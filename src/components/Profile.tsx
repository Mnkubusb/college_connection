"use client"
import React, { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button';
import { Trash } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const ProfileView = (
  { profilePic, Name, Skills, Fallback, isAdmin, email, Coins }: {
    profilePic: string,
    email?: string,
    Name: string,
    Skills: string,
    Fallback: string
    isAdmin?: boolean
    Coins?: number
  }
) => {

  if (Coins === undefined) Coins = 0
  const isCoin = Coins >= 3 ? true : false
  const isKing = Coins >= 9000 ? true : false

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/delete/${email}`);
      toast.success("User deleted successfully");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete notes");
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <div className="w-[100%] h-[70px] flex items-center justify-between px-4">
      <div className='flex items-center'>
        <Avatar>
          <AvatarImage src={profilePic} alt={Name} />
          <AvatarFallback>{Fallback}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col ml-3 items-start">
          <h3 className='font-josefin font-bold '>{Name}</h3>
          <div className="flex gap-2">
            <div className="h-[18px] text-xs rounded-xl font-sans font-bold text-gray-400 pb-1 flex justify-center items-center gap-1">
              {Skills}
              <div className={cn('flex gap-2', Coins >= 1 ? "flex" : "hidden")}>
                <span className='flex justify-center items-center'>
                  •
                </span>
                <span>
                  {Coins}
                </span>
                <span className={cn(" justify-center items-center h-4 w-4", isCoin ? "flex" : "hidden")}>
                  <Image src="/fire.gif" alt="fire" width={20} height={20} />
                </span>
                <span>
                  <Image src="/crown.png" alt="fire" width={20} height={20} className={cn(" justify-center items-center h-4 w-4", isKing ? "flex" : "hidden")} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isAdmin && (
          <Button disabled={isLoading} variant={"outline"} size={"icon"} className='rounded-lg'
            onClick={handleDelete}
          >
            <Trash size={15} />
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProfileView
