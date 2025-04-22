import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface Props {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
  imageUrls: string[];
  title: string;
  description: string;
  price: string;
  onCreate: () => void;
  onCancel: () => void;
}

const previewColors = ["lightblue", "orange", "white", "red"];

export default function ProductPreview({
  selectedSize,
  setSelectedSize,
  selectedColors,
  setSelectedColors,
  imageUrls,
  title,
  price,
  description,
  onCreate,
  onCancel,
}: Props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSizeSelect = (size: string) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

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

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      {/* Image Preview with Carousel */}
      <div className="bg-amber-200 rounded-lg p-6 flex justify-center mb-6">
        <div className="relative w-full aspect-[3/4] max-w-xs">
          {imageUrls.length > 0 ? (
            <>
              <Image
                src={imageUrls[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                fill
                className="object-contain rounded-lg"
              />
              {imageUrls.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 px-2 py-1 text-white text-lg rounded hover:bg-black"
                  >
                    ‹
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 px-2 py-1 text-white text-lg rounded hover:bg-black"
                  >
                    ›
                  </button>
                </>
              )}
            </>
          ) : (
            <Image
              src="/placeholder.svg?height=256&width=192"
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
        {description && <p className="text-sm text-gray-400">{description}</p>}

        <div>
          <p className="text-gray-400 text-sm mb-1">Price :</p>
          <div className="flex items-center gap-2">
            <span className="text-gray-400 line-through">$100</span>
            <span className="text-white font-medium">
              {price ? `$${parseFloat(price).toFixed(2)}` : "$0.00"}
            </span>
            <span className="text-green-500 text-xs">(20% Off)</span>
          </div>
        </div>

        {/* <div>
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
        </div> */}

        {/* <div>
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
        </div> */}

        <div className="flex gap-3 mt-6">
          <Button
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white"
            onClick={onCreate}
          >
            Create Product
          </Button>
          <Button
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}
