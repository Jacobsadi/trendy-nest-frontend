import { Suspense } from "react";
import Header from "../products/components/Header";
import OrdersDashboard from "./components/orders-dashboard";
import OrdersDashboardSkeleton from "./components/orders-dashboard-skeleton";

export default function OrdersPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-24 px-8 pb-8">
        <Suspense fallback={<OrdersDashboardSkeleton />}>
          <OrdersDashboard />
        </Suspense>
      </main>
    </div>
  );
}
