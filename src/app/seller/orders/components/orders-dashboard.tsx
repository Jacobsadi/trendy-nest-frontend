// import { CheckCircle, Clock, Package, XCircle } from "lucide-react";
// import React from "react";
// import OrdersTable from "./OrdersTable";
// import { buildStats, fetchOrders } from "./utils";

// const STATUS_CONFIG = [
//   { key: "PENDING", icon: <Clock className="h-6 w-6 text-orange-500" /> },
//   { key: "SHIPPED", icon: <Package className="h-6 w-6 text-orange-500" /> },
//   {
//     key: "DELIVERED",
//     icon: <CheckCircle className="h-6 w-6 text-green-500" />,
//   },
//   { key: "CANCELLED", icon: <XCircle className="h-6 w-6 text-red-500" /> },
// ];

// function StatCard({
//   title,
//   value,
//   icon,
// }: {
//   title: string;
//   value: number;
//   icon: React.ReactNode;
// }) {
//   return (
//     <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
//       <div className="flex justify-between items-start">
//         <div>
//           <h3 className="text-gray-400 font-medium mb-2">{title}</h3>
//           <p className="text-3xl font-bold">{value}</p>
//         </div>
//         <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
//           {icon}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default async function OrdersDashboard() {
//   const orders = await fetchOrders();
//   const stats = buildStats(orders);

//   return (
//     <div className="space-y-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {STATUS_CONFIG.map(({ key, icon }) => (
//           <StatCard key={key} title={key} value={stats[key] || 0} icon={icon} />
//         ))}
//       </div>
//       <OrdersTable orders={orders} />
//     </div>
//   );
// }
// src/app/seller/orders/components/orders-dashboard.tsx
// src/app/seller/orders/components/orders-dashboard.tsx

import { EnrichedOrder, RawOrder } from "@/lib/types";
import { CheckCircle, Clock, Package, XCircle } from "lucide-react";
import React from "react";
import OrdersTable from "./OrdersTable";
import {
  buildStats,
  fetchBuyerData,
  fetchOrders,
  formatBuyerAddress,
} from "./utils";

const STATUS_CONFIG = [
  { key: "PENDING", icon: <Clock className="h-6 w-6 text-orange-500" /> },
  { key: "SHIPPED", icon: <Package className="h-6 w-6 text-orange-500" /> },
  {
    key: "DELIVERED",
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
  },
  { key: "CANCELLED", icon: <XCircle className="h-6 w-6 text-red-500" /> },
];

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 font-medium mb-2">{title}</h3>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="bg-gray-700/50 p-3 rounded-lg border border-gray-600">
          {icon}
        </div>
      </div>
    </div>
  );
}

async function enrichOrdersWithBuyerData(
  orders: RawOrder[]
): Promise<EnrichedOrder[]> {
  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
      const buyerData = await fetchBuyerData(order.buyerId);

      return {
        ...order,
        buyerEmail: buyerData?.email || "N/A",
        buyerAddress: buyerData
          ? formatBuyerAddress(buyerData.addresses)
          : "Unknown Address",
      };
    })
  );

  return enrichedOrders;
}

export default async function OrdersDashboard() {
  const rawOrders: RawOrder[] = await fetchOrders();

  rawOrders.forEach((order) => {
    console.log(`Order #${order.orderNumber}:`, order.items);
  });

  const enrichedOrders: EnrichedOrder[] =
    await enrichOrdersWithBuyerData(rawOrders);
  const stats = buildStats(enrichedOrders); // Use enriched orders for stats

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATUS_CONFIG.map(({ key, icon }) => (
          <StatCard key={key} title={key} value={stats[key] || 0} icon={icon} />
        ))}
      </div>
      <OrdersTable orders={enrichedOrders} />
    </div>
  );
}
