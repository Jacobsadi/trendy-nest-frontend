"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const paymentIntent = searchParams.get("payment_intent");

  useEffect(() => {
    // Optional: confirm order status in backend if needed
    console.log("Order completed:", { orderId, paymentIntent });
  }, [orderId, paymentIntent]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold mb-4">🎉 Payment Successful!</h1>
      <p className="mb-2">Thank you for your purchase.</p>
      <p className="text-sm text-gray-400">
        Order ID: <span className="text-green-400">{orderId}</span>
      </p>
      <p className="text-sm text-gray-400">
        Payment Intent: <span className="text-blue-400">{paymentIntent}</span>
      </p>
    </div>
  );
}
