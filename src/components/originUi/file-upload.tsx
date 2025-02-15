import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useId } from "react";

interface FileUploadProps {
    className?: string;
    onChange: (e : React.ChangeEvent<HTMLInputElement>) => void;
}

export default function FileUpload( { className, onChange}: FileUploadProps) {

  const id = useId();
  return (
    <div className={cn("space-y-2 justify-center flex flex-col" , className)}>
      <Label htmlFor={id}>File input</Label>
      <Input id={id} className="file:me-3 pt-1 file:border-0 file:border-e mt-4" type="file" onChange={onChange} />
    </div>
  );
}
