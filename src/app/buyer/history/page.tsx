"use client";

import { useCartStore } from "@/lib/services/cartStore";
import { fetchOrdersByBuyer } from "@/lib/services/orders";
import { RawOrder } from "@/lib/types"; // Import RawOrder
import { useUser } from "@clerk/nextjs";
import { Suspense, useEffect, useState } from "react";
import Header from "../components/header";
import OrderHistoryTable from "./components/order-history-table";
import OrderTableSkeleton from "./components/order-table-skeleton";

export default function BuyerOrderHistoryPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useUser();
  const [rawOrders, setRawOrders] = useState<RawOrder[]>([]); // Store RawOrder
  const [loading, setLoading] = useState(true);
  console.log("ORDERS DATA ============================> ", rawOrders);

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetchOrdersByBuyer(user.id)
        .then((data) => {
          setRawOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching buyer orders:", error);
          setLoading(false);
          // Handle error appropriately, e.g., setError state
        });
    }
  }, [user?.id]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
      <main className="pt-24 px-8 pb-8">
        <h1 className="text-2xl font-bold mb-8">Your Order History</h1>
        <Suspense fallback={<OrderTableSkeleton />}>
          <OrderHistoryTable orders={rawOrders} />{" "}
          {/* Pass RawOrder[] to the table */}
        </Suspense>
      </main>
    </div>
  );
}
