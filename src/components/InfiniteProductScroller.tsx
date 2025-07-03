"use client";

import { Button } from "@/components/ui/button";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function InfiniteProductScroller({
  products,
  addToCart,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  products: Product[];
  addToCart: (product: Product) => void;
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const children = Array.from(scrollerRef.current.children);
      children.forEach((child) => {
        scrollerRef.current?.appendChild(child.cloneNode(true));
      });

      containerRef.current.style.setProperty(
        "--animation-direction",
        direction === "left" ? "forwards" : "reverse"
      );

      const duration =
        speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";
      containerRef.current.style.setProperty("--animation-duration", duration);

      setStart(true);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-10 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {products.map((product) => (
          <li
            key={product.id}
            className="relative w-[300px] shrink-0 rounded-lg border border-gray-700 bg-gray-800 text-white flex flex-col overflow-hidden"
          >
            <div className="relative h-48 w-full">
              <Image
                src={
                  product.images?.[0] || "/placeholder.svg?height=256&width=256"
                }
                alt={product.title}
                fill
                className="object-cover"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-1 bg-white/10 rounded-full z-10"
              >
                <Heart
                  className={`w-5 h-5 ${
                    favorites[product.id]
                      ? "fill-red-500 text-red-500"
                      : "text-white"
                  }`}
                />
              </button>
              <a
                href={`/buyer/products/details/${product.id}`}
                className="absolute inset-0 z-0"
                aria-label={`View ${product.title}`}
              />
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-md font-semibold mb-1 line-clamp-1">
                {product.title}
              </h3>
              <p className="text-sm text-gray-400 mb-2 line-clamp-2">
                {product.description}
              </p>
              <div className="text-lg font-bold mb-2">
                ${product.price.toFixed(2)}
              </div>
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  addToCart(product);
                }}
                className="bg-gray-700 hover:bg-gray-600 text-white mt-auto"
              >
                Add to Cart
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
