"use client";

import { useCartStore } from "@/lib/services/cartStore"; // ✅ Zustand cart
import { useUser } from "@clerk/nextjs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useRef, useState } from "react";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  const hasCreatedOrder = useRef(false);
  const [clientSecret, setClientSecret] = useState("");
  const [orderId, setOrderId] = useState("");

  const cartItems = useCartStore((state) => state.cartItems); // ✅ Zustand
  const items = cartItems.map((item) => ({
    productId: item.id,
    quantity: item.quantity,
    price: item.price,
  }));
  const total = Math.round(
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  ); // convert to cents
  const { user } = useUser();
  const buyerId = user?.id;
  console.log("the ID===========>", buyerId);
  useEffect(() => {
    const makeOrder = async () => {
      if (hasCreatedOrder.current || cartItems.length === 0) return;
      hasCreatedOrder.current = true; // ✅ prevent re-run

      const response = await fetch("http://localhost:3002/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerId: user?.id,
          total,
          items,
        }),
      });

      const data = await response.json();
      setClientSecret(data.paymentResult.client_secret);
      setOrderId(data.order.id);
    };

    makeOrder();
  }, []); // ✅ only run once on mount

  const options = {
    clientSecret,
    appearance: {
      theme: "night" as const,
    },
  };

  if (!clientSecret) return <div>Loading payment form...</div>;

  return (
    <div className="min-h-screen p-8 bg-gray-900 text-white">
      <h2 className="text-2xl mb-4">Checkout</h2>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm orderId={orderId} />
      </Elements>
    </div>
  );
}
