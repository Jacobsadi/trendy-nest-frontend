"use client";

import Header from "@/app/seller/products/components/Header";
import { fetchOrdersByBuyer } from "@/lib/services/orders";
import { OrderRow } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { Suspense, useEffect, useState } from "react";
import OrderHistoryTable from "./components/order-history-table";
import OrderTableSkeleton from "./components/order-table-skeleton";

export default function BuyerOrderHistoryPage() {
  const { user } = useUser();
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  console.log("ORDERS DATA ============================> ", orders);
  useEffect(() => {
    if (user?.id) {
      fetchOrdersByBuyer(user.id).then((data) => {
        setOrders(data);
        setLoading(false);
      });
    }
  }, [user?.id]);

  return (
    // <div className="min-h-screen bg-gray-900 text-white p-8 pt-24">
    //   <h1 className="text-2xl font-bold mb-8">Your Order History</h1>
    //   {loading ? <p>Loading...</p> : <OrderHistoryTable orders={orders} />}

    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-24 px-8 pb-8">
        <h1 className="text-2xl font-bold mb-8">Your Order History</h1>
        <Suspense fallback={<OrderTableSkeleton />}>
          <OrderHistoryTable orders={orders} />
        </Suspense>
      </main>
    </div>

    // </div>
  );
}
