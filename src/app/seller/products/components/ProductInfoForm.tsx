"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  selectedSize: string;
  setSelectedSize: (size: string) => void;
  selectedColors: string[];
  setSelectedColors: (colors: string[]) => void;
}

const formColors = [
  "lightblue",
  "orange",
  "white",
  "coral",
  "green",
  "red",
  "turquoise",
  "gray",
];

export default function ProductInfoForm({
  selectedSize,
  setSelectedSize,
  selectedColors,
  setSelectedColors,
}: Props) {
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

  return (
    <div>
      <h3 className="text-gray-300 mb-4">Product Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">
            Product Name
          </label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Item Name"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">
            Product Categories
          </label>
          <Select>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="home">Home & Living</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Brand</label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Brand Name"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Weight</label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="In gm or kg"
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Gender</label>
          <Select>
            <SelectTrigger className="bg-gray-800 border-gray-700">
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700">
              <SelectItem value="men">Men</SelectItem>
              <SelectItem value="women">Women</SelectItem>
              <SelectItem value="unisex">Unisex</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div>
          <label className="text-gray-400 text-sm block mb-2">Size :</label>
          <div className="flex gap-2">
            {["XS", "S", "M", "XL", "XXL", "3XL"].map((size) => (
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
        </div>

        <div>
          <label className="text-gray-400 text-sm block mb-2">Colors :</label>
          <div className="flex flex-wrap gap-2">
            {formColors.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full ${
                  selectedColors.includes(color) ? "ring-2 ring-white" : ""
                }`}
                style={{ backgroundColor: color === "white" ? "#fff" : color }}
                onClick={() => handleColorSelect(color)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-gray-400 text-sm block mb-2">Description</label>
        <Textarea
          className="bg-gray-800 border-gray-700 min-h-[100px]"
          placeholder="Short description about the product"
        />
      </div>
    </div>
  );
}
