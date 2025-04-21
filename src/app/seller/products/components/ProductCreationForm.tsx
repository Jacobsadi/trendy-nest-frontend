"use client";

import { useState } from "react";
import Header from "./Header";
import ProductInfoForm from "./ProductInfoForm";
import ProductPhotoUpload from "./ProductPhotoUpload";
import ProductPreview from "./ProductPreview";

export default function ProductCreationForm() {
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColors, setSelectedColors] = useState<string[]>([
    "lightblue",
    "white",
  ]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]); // ← NEW

  return (
    <div className="min-h-screen pt-20">
      <Header />

      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductPreview
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          imageUrls={previewUrls} // ← ✅ pass here
        />
        <div className="md:col-span-2 space-y-20">
          <ProductPhotoUpload
            previewUrls={previewUrls}
            setPreviewUrls={setPreviewUrls} // ← ✅ pass here
          />
          <ProductInfoForm
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColors={selectedColors}
            setSelectedColors={setSelectedColors}
          />
        </div>
      </div>
    </div>
  );
}
