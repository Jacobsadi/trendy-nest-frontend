import { uploadToS3Image } from "@/lib/uploadToS3Image";
import { Upload } from "lucide-react";
import { useRef } from "react";

interface Props {
  previewUrls: string[];
  setPreviewUrls: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function ProductPhotoUpload({
  previewUrls,
  setPreviewUrls,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const uploadedUrls: string[] = [];

    for (const file of Array.from(files)) {
      try {
        const imageUrl = await uploadToS3Image(file);
        uploadedUrls.push(imageUrl);
      } catch (error) {
        console.error("Failed to upload file:", file.name, error);
      }
    }

    setPreviewUrls((prev) => [...prev, ...uploadedUrls]);
  };

  return (
    <div>
      <h3 className="text-gray-300 mb-3">Add Product Photos</h3>
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border border-dashed border-gray-600 rounded-lg p-10 flex flex-col items-center justify-center cursor-pointer"
      >
        <Upload className="w-12 h-12 text-orange-500 mb-4" />
        <p className="text-gray-300 mb-1">
          Drop your images here, or{" "}
          <span className="text-orange-500">click to browse</span>
        </p>
        <p className="text-gray-500 text-sm">You can select multiple images</p>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          multiple
          ref={fileInputRef}
          onChange={handleUpload}
        />
      </div>

      {previewUrls.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {previewUrls.map((url, i) => (
            <img
              key={i}
              src={url}
              alt={`Preview ${i + 1}`}
              className="w-full rounded-lg border border-gray-700"
            />
          ))}
        </div>
      )}
    </div>
  );
}
