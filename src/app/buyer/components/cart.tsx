"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/services/cartStore"; // ✅ Zustand store import
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Cart({ isOpen, onClose }: CartProps) {
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const updateQuantity = useCartStore((state) => state.updateQuantity);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + tax;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="fixed inset-0 bg-black/50" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-gray-800 border-l border-gray-700 h-full overflow-auto flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Your Cart</h2>
            <span className="bg-gray-700 text-xs px-2 py-0.5 rounded-full">
              {cartItems.reduce((acc, item) => acc + item.quantity, 0)} items
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-grow overflow-auto">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-600 mb-4" />
              <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
              <p className="text-gray-400 mb-4">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button onClick={onClose}>Continue Shopping</Button>
            </div>
          ) : (
            <div className="divide-y divide-gray-700">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 flex gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 bg-gray-700 rounded-md overflow-hidden">
                    <Image
                      src={
                        item.images?.[0] ||
                        "/placeholder.svg?height=80&width=80"
                      }
                      alt={item.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between">
                      <h3 className="font-medium line-clamp-1">{item.title}</h3>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-400 mb-2 line-clamp-1">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-gray-700 rounded-md">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 rounded-none"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <span className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-700 p-4">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
            <Link href="/buyer/checkout" passHref>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
