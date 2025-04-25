"use client";

import { useEffect, useState } from "react";
import Cart from "./components/cart";
import Header from "./components/header";
import ProductGrid from "./components/product-grid";

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
}
const mockProducts: Product[] = [
  {
    id: "3",
    title: "Ultrawide Monitor",
    description: "34-inch curved ultrawide monitor with 144Hz refresh rate",
    price: 349.99,
    quantity: 30,
    sellerId: "a1f5c3d2-4b6e-7f89-0abc-def123456789",
    images: [
      "https://logo-generator-sadi.s3.ap-southeast-2.amazonaws.com/seller-products/1745577609990_toksccyd4ka_p-7.png",
    ],
    createdAt: "2025-04-19T14:45:22.000Z",
    updatedAt: "2025-04-19T14:45:22.000Z",
  },
  {
    id: "4",
    title: "Wireless Earbuds",
    description: "Noise-cancelling wireless earbuds with 24-hour battery life",
    price: 79.99,
    quantity: 200,
    sellerId: "a1f5c3d2-4b6e-7f89-0abc-def123456789",
    images: [
      "https://logo-generator-sadi.s3.ap-southeast-2.amazonaws.com/seller-products/1745577609990_toksccyd4ka_p-7.png",
    ],
    createdAt: "2025-04-18T09:20:45.000Z",
    updatedAt: "2025-04-18T09:20:45.000Z",
  },
  {
    id: "5",
    title: "Gaming Headset",
    description: "Surround sound gaming headset with detachable microphone",
    price: 69.99,
    quantity: 120,
    sellerId: "a1f5c3d2-4b6e-7f89-0abc-def123456789",
    images: [
      "https://logo-generator-sadi.s3.ap-southeast-2.amazonaws.com/seller-products/1745577609990_toksccyd4ka_p-7.png",
    ],
    createdAt: "2025-04-17T16:10:33.000Z",
    updatedAt: "2025-04-17T16:10:33.000Z",
  },
  {
    id: "6",
    title: "Laptop Stand",
    description: "Adjustable aluminum laptop stand with cooling ventilation",
    price: 39.99,
    quantity: 180,
    sellerId: "a1f5c3d2-4b6e-7f89-0abc-def123456789",
    images: [
      "https://logo-generator-sadi.s3.ap-southeast-2.amazonaws.com/seller-products/1745577609990_toksccyd4ka_p-7.png",
    ],
    createdAt: "2025-04-16T11:25:18.000Z",
    updatedAt: "2025-04-16T11:25:18.000Z",
  },
  {
    id: "7",
    title: "Wireless Charger",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices",
    price: 24.99,
    quantity: 250,
    sellerId: "a1f5c3d2-4b6e-7f89-0abc-def123456789",
    images: [
      "https://logo-generator-sadi.s3.ap-southeast-2.amazonaws.com/seller-products/1745577609990_toksccyd4ka_p-7.png",
    ],
    createdAt: "2025-04-15T13:40:55.000Z",
    updatedAt: "2025-04-15T13:40:55.000Z",
  },
  {
    id: "8",
    title: "External SSD",
    description: "1TB portable external SSD with USB-C connection",
    price: 129.99,
    quantity: 60,
    sellerId: "a1f5c3d2-4b6e-7f89-0abc-def123456789",
    images: [
      "https://logo-generator-sadi.s3.ap-southeast-2.amazonaws.com/seller-products/1745577609990_toksccyd4ka_p-7.png",
    ],
    createdAt: "2025-04-14T15:55:40.000Z",
    updatedAt: "2025-04-14T15:55:40.000Z",
  },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cartItems, setCartItems] = useState<
    (Product & { quantity: number })[]
  >([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // If data is an array, use it directly, otherwise wrap the single item in an array
        setProducts(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching products:", error);
        setError(true);
        // Use mock data if fetch fails
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
