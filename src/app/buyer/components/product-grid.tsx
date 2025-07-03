"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  sellerId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
}

interface ProductGridProps {
  products: Product[];
  addToCart: (product: Product) => void;
}

export default function ProductGrid({ products, addToCart }: ProductGridProps) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 flex flex-col"
          variants={itemVariants}
          whileHover={{
            y: -5,
            transition: { duration: 0.2 },
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
          }}
        >
          <div className="relative h-64 w-full">
            <Image
              src={
                product.images?.[0] || "/placeholder.svg?height=256&width=256"
              }
              alt={product.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <motion.button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-2 right-2 p-2 rounded-full bg-white/10 backdrop-blur-sm z-10"
              whileTap={{ scale: 0.9 }}
              whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
            >
              <Heart
                className={`w-5 h-5 ${
                  favorites[product.id]
                    ? "fill-red-500 text-red-500"
                    : "text-white"
                }`}
              />
            </motion.button>
            <a
              href={`/buyer/products/details/${product.id}`}
              className="absolute inset-0 z-0"
              aria-label={`View details for ${product.title}`}
            />
          </div>

          <div className="p-4 flex-grow flex flex-col">
            <a href={`/buyer/products/details/${product.id}`} className="group">
              <motion.h3
                className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-blue-400"
                whileHover={{ color: "rgb(96, 165, 250)" }}
              >
                {product.title}
              </motion.h3>
            </a>

            <div className="flex items-center mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-4 h-4 ${
                      star <= 4 ? "text-yellow-400" : "text-gray-500"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-1 text-sm text-gray-400">
                  4.0 (12 Reviews)
                </span>
              </div>
            </div>

            <p className="text-sm text-gray-400 mb-3 line-clamp-2">
              {product.description}
            </p>

            <div className="mt-auto">
              <motion.div
                className="flex items-center gap-2 mb-3"
                initial={{ opacity: 0.9 }}
                whileHover={{ scale: 1.03 }}
              >
                <span className="text-xl font-bold">
                  ${product.price.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${(product.price * 1.3).toFixed(2)}
                </span>
                <motion.span
                  className="text-xs bg-green-900/30 text-green-400 px-2 py-0.5 rounded"
                  whileHover={{ backgroundColor: "rgba(22, 163, 74, 0.4)" }}
                >
                  30% Off
                </motion.span>
              </motion.div>

              <div className="flex gap-2">
                <motion.div whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-md border-gray-700 text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    ...
                  </Button>
                </motion.div>
                <motion.div
                  className="flex-1"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      addToCart(product);
                    }}
                  >
                    Add To Cart
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
