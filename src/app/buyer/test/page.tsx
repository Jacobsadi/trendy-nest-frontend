"use client";

import Hero from "@/components/hero";
import { mockProducts } from "@/lib/mockData";
import { useCartStore } from "@/lib/services/cartStore";
import type { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import Cart from "../components/cart";
import Header from "../components/header";
import ProductCategories from "../components/product-categories";
import ProductGrid from "../components/product-grid";
import Testimonials from "../components/testimonials";
import WhyShopWithUs from "../components/why-shop-with-us";

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
    // Simulate API fetch with mock data
    const fetchProducts = async () => {
      try {
        // In a real app, this would be a fetch call to your API
        // const response = await fetch('/api/products')
        // const data = await response.json()

        // Using mock data directly
        setTimeout(() => {
          setProducts(mockProducts);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
        setProducts(mockProducts); // Fallback to mock data
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />

      <div className="pt-16">
        <Hero />

        <ProductCategories />

        <div className="pt-4 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 mt-4">Featured Products</h1>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="mb-20">
              <ProductGrid
                products={products}
                addToCart={(product: any) => addToCart(product, 1)}
              />
            </div>
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

        <WhyShopWithUs />

        <Testimonials />
      </div>

      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Add a stub ChatBot component */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full p-4 shadow-lg">
          💬
        </button>
      </div>
    </div>
  );
}
