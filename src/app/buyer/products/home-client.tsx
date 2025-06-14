"use client";

import Header from "@/app/buyer/components/header";
import { ChatBot } from "@/components/ChatBot";
import { useCartStore } from "@/lib/services/cartStore";
import type { Product } from "@/lib/types";
import { useState } from "react";
import Cart from "../components/cart";
import ProductGrid from "../components/product-grid";

type HomeClientProps = {
  products: Product[];
};

export default function HomeClient({ products }: HomeClientProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />

      <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 mt-4">Products</h1>

        <ProductGrid
          products={products}
          addToCart={(product) => addToCart(product, 1)}
        />
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <ChatBot
        position="bottom-right"
        initialMessage="👋  Welcome to my store, do you need help or guidance with any product?"
        pageContext="user profile"
      />
    </main>
  );
}
