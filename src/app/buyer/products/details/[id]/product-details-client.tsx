"use client";

import Cart from "@/app/buyer/components/cart";
import Header from "@/app/buyer/components/header";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/services/cartStore";
import type { Product } from "@/lib/types";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Heart,
  Minus,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// You can keep your fallback here if needed
const mockProductData: Product = {
  id: "default",
  title: "Mock Wireless Mouse",
  description: "Default fallback description...",
  price: 10,
  quantity: 10,
  sellerId: "",
  images: ["/placeholder.svg?height=600&width=600"],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  category: "mock",
};

export default function ProductDetailsClient({
  product,
  error,
}: {
  product: Product | null;
  error: boolean;
}) {
  const finalProduct = product ?? mockProductData;

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("dark");
  const [selectedSize, setSelectedSize] = useState("m");
  const [isFavorite, setIsFavorite] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const discountedPrice = finalProduct.price;
  const originalPrice = (finalProduct.price * 1.3).toFixed(2);
  const discountPercentage = "30%";
  const shortDescription = finalProduct.description.split(".")[0] + ".";
  const incrementQuantity = () => {
    if (product && quantity < product.quantity) {
      setQuantity(quantity + 1);
    }
  };
  const prevImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const buyNow = () => {
    if (!product) return; // ✅ Ensure product exists
    addToCart(product, quantity); // ✅ Correct usage
    console.log("Buy now:", { ...product, quantity });
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };
  const nextImage = () => {
    if (!product) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % product.images.length
    );
  };
  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  const selectImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Error state with no product
  if (error && !product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header
          toggleCart={toggleCart}
          cartItemsCount={cartItems.reduce(
            (acc: any, item: any) => acc + item.quantity,
            0
          )}
        />
        <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-red-900/20 border border-red-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Failed to load product</h2>
            <p className="mb-4">
              We couldn't load the product details. Please try again later.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // No product found
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header
          toggleCart={toggleCart}
          cartItemsCount={cartItems.reduce(
            (acc: any, item: any) => acc + item.quantity,
            0
          )}
        />
        <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="bg-gray-800 p-6 rounded-lg text-center">
            <h2 className="text-xl font-bold mb-2">Product Not Found</h2>
            <p className="mb-4">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => (window.location.href = "/")}>
              Browse Products
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header
        toggleCart={toggleCart}
        cartItemsCount={cartItems.reduce(
          (acc: any, item: any) => acc + item.quantity,
          0
        )}
      />

      {/* Increased padding to prevent header overlap */}
      <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        {error && (
          <div className="bg-yellow-900/20 border border-yellow-800 p-3 rounded-lg mb-6">
            <p className="text-yellow-400 text-sm">
              There was an issue loading the latest product data. Showing cached
              information.
            </p>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="bg-gray-800 rounded-lg overflow-hidden relative group">
              <div className="relative aspect-square">
                <Image
                  src={
                    product.images[currentImageIndex] ||
                    "/placeholder.svg?height=600&width=600"
                  }
                  alt={product.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Image navigation buttons */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {/* Image counter */}
              {product.images.length > 1 && (
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">
                  {currentImageIndex + 1} / {product.images.length}
                </div>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="relative">
                <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      className={`relative flex-shrink-0 w-20 h-20 bg-gray-800 rounded-lg overflow-hidden border-2
                        ${
                          currentImageIndex === index
                            ? "border-green-500"
                            : "border-transparent hover:border-gray-600"
                        }`}
                      onClick={() => selectImage(index)}
                    >
                      <Image
                        src={image || "/placeholder.svg?height=100&width=100"}
                        alt={`Product thumbnail ${index + 1}`}
                        fill
                        className="object-contain"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="inline-block bg-green-500 text-black text-xs font-medium px-2.5 py-1 rounded mb-2">
                New Arrival
              </div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <div className="flex items-center mt-2">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-5 h-5 ${
                        star <= 4.5 ? "text-yellow-400" : "text-gray-500"
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-400">
                    4.5 (55 Review)
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-blue-400">
                  ${discountedPrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-400 line-through">
                  ${originalPrice}
                </span>
                <span className="text-sm text-red-400">
                  ({discountPercentage}Off)
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Colors &gt;{" "}
                    {selectedColor.charAt(0).toUpperCase() +
                      selectedColor.slice(1)}
                  </span>
                  <span className="text-sm font-medium">
                    Size &gt; {selectedSize.toUpperCase()}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div className="flex flex-wrap gap-2">
                    {["blue", "orange", "white", "green"].map((color) => (
                      <button
                        key={color}
                        className={`w-8 h-8 rounded-full ${
                          color === "blue"
                            ? "bg-blue-500"
                            : color === "orange"
                            ? "bg-orange-500"
                            : color === "white"
                            ? "bg-gray-200"
                            : "bg-green-500"
                        } ${
                          selectedColor === color
                            ? "ring-2 ring-offset-2 ring-offset-gray-900 ring-white"
                            : ""
                        }`}
                        onClick={() => setSelectedColor(color)}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["s", "m", "xl", "xxl"].map((size) => (
                      <button
                        key={size}
                        className={`min-w-[40px] h-8 px-2 rounded-md text-sm font-medium ${
                          selectedSize === size
                            ? "bg-gray-700 text-white"
                            : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <span className="text-sm font-medium">Quantity :</span>
                <div className="flex items-center mt-2">
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-l-md border border-gray-700"
                    onClick={decrementQuantity}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-700">
                    {quantity}
                  </div>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-r-md border border-gray-700"
                    onClick={incrementQuantity}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">In Stock</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">Free delivery available</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" />
                  <span className="text-sm">
                    Sales 10% Off Use Code: CODE123
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Description :</h3>
                <div className="text-sm text-gray-400">
                  {showFullDescription ? product.description : shortDescription}
                </div>
                <button
                  className="text-sm text-orange-400 mt-2 hover:text-orange-300 transition-colors"
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "Show less" : "Read more"}
                </button>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  className="flex-1 bg-orange-500 hover:bg-orange-600"
                  onClick={() => {
                    if (product) addToCart(product, quantity);
                  }}
                >
                  Add To Cart
                </Button>

                <Button className="flex-1" variant="outline" onClick={buyNow}>
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className={isFavorite ? "text-red-500" : ""}
                  onClick={() => setIsFavorite(!isFavorite)}
                >
                  <Heart
                    className={`w-5 h-5 ${isFavorite ? "fill-red-500" : ""}`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
