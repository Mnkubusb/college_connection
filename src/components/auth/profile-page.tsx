"use client"
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";
import { ExtendedUser } from "../../../next-auth";
import ProfilePic from "../ui/profilePic";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { SingleImageDropzone } from "../ui/imageUpload";
import { Button } from "../ui/button";

interface UserProps {
    user?: ExtendedUser
}

const ProfilePage = ({ user }: UserProps) => {
    
    const [isEditing, setIsEditing] = useState(false);
    const [file, setFile] = useState<File | undefined>(undefined);
    const [progress, setProgress] = useState<
    'PENDING' | 'COMPLETE' | 'ERROR' | number
  >('PENDING');
    const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
    const { edgestore } = useEdgeStore();
    


    const handleClick = () => {
        setIsEditing(!isEditing);
    }

    return (
        <div
            className={clsx(
                " md:flex h-full min-h-[50vh] p-3 flex-col lg:col-span-2 bg-background items-center border-x absolute sm:relative sm:w-full w-[100%]",
            )}
            >   
            <div className="w-full">
                <div className="div">
                    <div className="rounded-full bg-black w-8 h-8 absolute top-6 right-6 flex justify-center items-center">
                      <Pencil className="relative w-6 h-7 p-1 rounded-full cursor-pointer" size={20} onClick={handleClick}/>
                    </div>
                    <Image
                        src={"/picjumbo-premium-fall-pictures.jpg"}
                        width={1036}
                        height={780}
                        alt="thumbnail"
                        className=" w-full sm:h-[250px] h-[150px] rounded-t-md object-cover object-center"
                    ></Image>
                </div>
                <div className="flex flex-col relative sm:p-4 p-3 sm:bottom-40 bottom-20">
                    {isEditing?< SingleImageDropzone 
                    width={200} 
                    height={200} 
                    value={file}
                    disabled={progress !== 'PENDING'}
                    dropzoneOptions={{
                        maxSize: 1024 * 1024 * 1, // 1 MB
                      }}
                    onChange={(file) => { setFile(file);}

                    }  />:<ProfilePic user={user} />}
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-center mb-4 mt-4">
                            <h3 className="sm:text-2xl text-xl font-sans font-bold ">
                                {user?.name}
                            </h3>
                            <div
                                className="h-6 sm:text-md text-md rounded-xl font-sans text-gray-400 font-medium w-max"
                            >
                                {"Software Engineer"}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Badge>Batch 23</Badge>    
                        </div>
                    </div>
                </div>
            </div>
            <div className="wrap relative sm:bottom-36 bottom-24">
                <div className="text-2xl font-josefin font-bold px-4 relative">
                    <div>
                        History
                    </div>
                    {isEditing && <Button className="absolute right-4 -top-1 transform -translate-y-1/2" onClick={ async() => {
                        if(file){
                            const res = await edgestore.profilePics.upload({file: file});
                            setImageUrl(res.url);
                            console.log(res);
                        }
                    }}>Save Changes</Button>}
                </div>
                <div className="line w-full h-[1px] bg-slate-700 relative"></div>
                <div className="content">
                    <p className="sm:text-lg text-md font-josefin font-light relative pt-2 text-wrap">
                        {JSON.stringify(user)}
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Recusandae, mollitia animi unde accusamus minus voluptate, tempore repellendus praesentium labore eius voluptatem quo! Modi architecto autem est dicta adipisci eaque placeat voluptatibus, laborum velit fuga rerum culpa laudantium inventore veniam. Nemo eaque temporibus animi. Et, necessitatibus.
                    </p>
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;