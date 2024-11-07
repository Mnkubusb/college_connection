"use client"
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle  } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "../../routes";
import { useSearchParams } from "next/navigation";
interface showSocialProps {
    className?: string;
}

const ShowSocial = ({className}:showSocialProps) => {

    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl")

    const onClick = (provider: "google" | "github") => {
        signIn(provider ,{
            callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT
        });
    }

    return ( 
        <div className={`flex justify-between items-center  gap-4 `+ className} >
          <Button 
           onClick={() => onClick("github")}
           variant={"shine"}
           type="submit"
           className=" h-10 sm:w-44 w-32 gap-2 justify-start"
          >
            <FaGithub className="h-4 w-4 text-neutral-800 dark:text-neutral-300 " />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm mt-[2px] ">
              GitHub
            </span>
          </Button>
          <Button
            onClick={() => onClick("google")} 
            variant={"shine"}
            className="sm:w-44 w-32 h-10 gap-2 justify-start"
            type="submit"
          >
            <FcGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
            <span className="text-neutral-700 dark:text-neutral-300 text-sm mt-[2px]">
              Google
            </span>
          </Button>
        </div>
     );
}


 

export default ShowSocial;