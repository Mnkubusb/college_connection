"use client"

import { UploadDropzone } from "@/utils/uploadthing";
import { X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string | undefined;
}

const FileUpload = ( { onChange, value }: FileUploadProps ) => {

  // const fileType = value?.split('.').pop();

  // if(value && fileType !== "pdf") {
  //   return (
  //     <div className="relative h-full w-full flex items-center justify-center">
  //       <Image className="object-cover" fill src={value} alt="Upload" />
  //       <button onClick={() => onChange("")} className="bg-rose-500 text-white p-2 rounded-full absolute top-2 right-2" type="button">
  //         <X className="h-4 w-4" />
  //       </button>
  //     </div>
  //   )
  // }


  return (
    <div className="w-full h-full">
      <UploadDropzone 
          className="p-3 border border-dashed border-gray-400 rounded-lg hover:border-gray-600"
          endpoint={"profileImage"}
          onClientUploadComplete={(res) => {
            onChange(res?.[0].url);  
            console.log("Upload complete:", res);
          }}
          onUploadError={(error: Error) => {
            console.log("Upload failed:", error);
          }}
          />
    </div>
  )
}

export default FileUpload
