"use client"
import { UploadDropzone } from "@/utils/uploadthing";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";

interface FileUploadProps {
  endpoint: "profileImage" | "noteImage";
  onChange: (url?: string) => void;
  value?: string | undefined;
}

const FileUpload = ( { endpoint, onChange, value }: FileUploadProps ) => {

  const fileType = value?.split(".").pop();
if(endpoint === "profileImage"){
  if (value && fileType !== "pdf") {
    return (
      <div className="flex items-center justify-center">
        <p className="text">
          {fileType === "pdf" ? "PDF" : "Image"} uploaded successfully.
        </p>
        <Button
          variant="link"
          onClick={() => onChange("")}
          className="text-xs text-primary-500 flex items-center gap-1"
        >
          <Upload size={16} /> Change Profile Picture
        </Button>
      </div>
    );
  }
}

  return (
    <div className="w-full h-34 rounded-lg border-2 border-dashed border-primary-500">
      <UploadDropzone
        endpoint={endpoint}
        onClientUploadComplete={(res ) => {
          console.log("Upload Success", res);
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => 
          console.log("Upload failed:", error,
            toast.error(error.message)
          )}
      />
    </div>
  )
}

export default FileUpload
