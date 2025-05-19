"use client";

import { useEffect, useState } from "react";

import Cart from "@/app/buyer/components/cart";
import Header from "@/app/buyer/components/header";
import ProductGrid from "@/app/buyer/components/product-grid";
import Hero from "@/components/hero";
import { useCartStore } from "@/lib/services/cartStore";
import { fetchProducts } from "@/lib/services/products";
import { Product } from "@/lib/types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const addToCart = useCartStore((state) => state.addToCart);
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await fetchProducts(); // ✅ use the utility
        setProducts(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <div className=" py-7">
        <Hero />
        <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
        <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto mt-16 ">
          <h1 className="text-2xl font-bold mb-6 mt-4">Products</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <ProductGrid
              products={products}
              addToCart={(product: any) => addToCart(product, 1)} // ✅ default quantity
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

        <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </div>
    </main>
  );
}
