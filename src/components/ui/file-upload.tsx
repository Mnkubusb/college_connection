"use client"
import { UploadDropzone } from "@/utils/uploadthing";
import { Upload } from "lucide-react";
import { Button } from "./button";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string | undefined;
}

const FileUpload = ( { onChange, value }: FileUploadProps ) => {

  const fileType = value?.split(".").pop();

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

  return (
    <div className="w-full h-34 rounded-lg border-2 border-dashed border-primary-500">
      <UploadDropzone
        endpoint="profileImage"
        onClientUploadComplete={(res) => {
          console.log("Upload Success", res);
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => console.log("Upload failed:", error)}
      />
    </div>
  )
}

export default FileUpload
