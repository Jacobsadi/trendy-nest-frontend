// app/home-client.tsx
"use client";

import Hero from "@/components/hero";
import { useCartStore } from "@/lib/services/cartStore";
import type { Product } from "@/lib/types";
import { useState } from "react";
import Cart from "./components/cart";
import Header from "./components/header";
import ProductGrid from "./components/product-grid";
import Testimonials from "./components/testimonials";
import WhyShopWithUs from "./components/why-shop-with-us";

type HomeClientProps = {
  products: Product[];
};

export default function HomeClient({ products }: HomeClientProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />

      <div className="pt-16">
        <Hero />

        <div className="pt-4 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 mt-4">Featured Products</h1>

          <div className="mb-20">
            <ProductGrid
              products={products}
              addToCart={(product: any) => addToCart(product, 1)}
            />
          </div>
        </div>

        <WhyShopWithUs />
        <Testimonials />
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
