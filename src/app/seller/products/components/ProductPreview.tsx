import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface Props {
  imageUrls: string[];
  title: string;
  description: string;
  price: string;
  quantity: string;
  mode?: "create" | "edit";
  onCreate: (data: any) => Promise<void> | void;
  onCancel: () => void;
  isFormValid: boolean;
  category: string;
}

export default function ProductPreview({
  imageUrls,
  title,
  price,
  quantity,
  description,
  onCreate,
  onCancel,
  mode,
  isFormValid,
  category,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? imageUrls.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === imageUrls.length - 1 ? 0 : prev + 1
    );
  };

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      await onCreate({ title, description, price, quantity, imageUrls });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Image Preview with Carousel */}
      <div className="bg-gray-700 rounded-lg mb-6 overflow-hidden">
        <div className="relative w-full aspect-[3/4] max-h-80 mx-auto">
          {imageUrls.length > 0 ? (
            <>
              <Image
                src={imageUrls[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                fill
                className="object-contain"
              />
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white text-lg px-2 py-1 rounded hover:bg-black"
                  ></button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white text-lg px-2 py-1 rounded hover:bg-black"
                  ></button>
                </>
              )}
            </>
          ) : (
            <Image
              src="/placeholder.svg"
              alt="T-shirt preview"
              fill
              className="object-contain opacity-40"
            />
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium text-gray-300">
          {title || "Product Name"}{" "}
          <span className="text-gray-500 text-sm">(Fashion)</span>
        </h2>
        <p className="text-gray-500 text-sm italic">
          Category: {category || "Uncategorized"}
        </p>
        {description && <p className="text-sm text-gray-400">{description}</p>}
        <div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm mb-1">Quantity :</p>
            <span className="text-white font-medium">
              {quantity ? `${parseFloat(quantity)}` : "0"}
            </span>
          </div>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-gray-400 text-sm mb-1">Price :</p>
            <span className="text-gray-400 line-through">$100</span>
            <span className="text-white font-medium">
              {price ? `$${parseFloat(price).toFixed(2)}` : "$0.00"}
            </span>
            <span className="text-green-500 text-xs">(20% Off)</span>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <Button
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
            onClick={handleCreate}
            disabled={isLoading || !isFormValid}
          >
            {isLoading
              ? "Processing..."
              : mode === "edit"
                ? "Update Product"
                : "Create Product"}
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

{
  /* 
  
  
          <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
          >
             {loading ? "Creating..." : "Create Product"}
            </button>
  <div>
          <p className="text-gray-400 text-sm mb-2">Size :</p>
          <div className="flex gap-2">
            {["S", "M", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  selectedSize === size
                    ? "bg-gray-600 text-white"
                    : "bg-gray-700 text-gray-400"
                }`}
                onClick={() => handleSizeSelect(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div> */
}

{
  /* <div>
          <p className="text-gray-400 text-sm mb-2">Colors :</p>
          <div className="flex gap-2">
            {previewColors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ${
                  selectedColors.includes(color) ? "ring-2 ring-white" : ""
                }`}
                style={{
                  backgroundColor: color === "white" ? "#fff" : color,
                }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div> */
}
