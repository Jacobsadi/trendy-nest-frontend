"use client";

import { fetchProducts } from "@/lib/services/products"; // <-- Fetching is imported now
import { Product } from "@/lib/types";
import { useEffect, useState } from "react";
import Cart from "../components/cart";
import Header from "../components/header";
import ProductGrid from "../components/product-grid";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cartItems, setCartItems] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

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

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header
        toggleCart={toggleCart}
        cartItemsCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
      />
      <div className="pt-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 mt-4">Products</h1>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
          </div>
        ) : (
          <ProductGrid products={products} addToCart={addToCart} />
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

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </main>
  );
}
