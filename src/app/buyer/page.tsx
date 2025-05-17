"use client";

import Header from "@/app/buyer/components/header";
import { useCartStore } from "@/lib/services/cartStore"; // ✅ Zustand store
import { fetchProducts } from "@/lib/services/products";
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import Cart from "./components/cart";
import ProductGrid from "./components/product-grid";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ Zustand cart store usage
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error loading products:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const cartItemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />

      <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 mt-4">Products</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <ProductGrid
            products={products}
            addToCart={(product) => addToCart(product, 1)} // ✅ default quantity
          />
        )}

        {error && (
          <div className="bg-red-900/20 border border-red-800 p-4 rounded-md mb-6">
            <p>
              Failed to fetch products from the server. Showing mock data
              instead.
            </p>
          </div>
        )}
      </div>

      {/* ✅ Zustand-powered Cart (no props needed) */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </main>
  );
}
