import React, { useState, ChangeEvent } from "react";

interface AvatarUploadProps {
  onUpload: (file: File | null) => void; // Callback to handle the uploaded file
  initialAvatarUrl?: string; // Optional initial avatar URL
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ onUpload, initialAvatarUrl }) => {
  const [preview, setPreview] = useState<string | undefined>(initialAvatarUrl);
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      // Generate a preview URL
      const previewUrl = URL.createObjectURL(selectedFile);
      setPreview(previewUrl);
      setFile(selectedFile);

      // Pass the file to the parent handler
      onUpload(selectedFile);
    }
  };

  const handleRemove = () => {
    setPreview(undefined);
    setFile(null);
    onUpload(null); // Notify the parent that the avatar has been removed
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-32 h-32">
        {preview ? (
          <img
            src={preview}
            alt="Avatar Preview"
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Upload Avatar</span>
          </div>
        )}
        {preview && (
          <button
            type="button"
            className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
            onClick={handleRemove}
          >
            &times;
          </button>
        )}
      </div>
      <label
        htmlFor="avatar-input"
        className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
      >
        {file ? "Change Avatar" : "Upload Avatar"}
      </label>
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AvatarUpload;
