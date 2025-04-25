// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   CheckCircle,
//   Clock,
//   Eye,
//   Package,
//   Pencil,
//   Trash2,
//   XCircle,
// } from "lucide-react";

// async function getOrderStats() {
//   // This would normally fetch from an API
//   return {
//     pending: 608,
//     shipped: 630,
//     delivered: 200,
//     cancelled: 241,
//   };
// }

// async function getOrders() {
//   // This would normally fetch from an API
//   return [
//     {
//       id: "#583488/80",
//       createdAt: "Apr 23, 2024",
//       customer: "Gail C. Anderson",
//       priority: "Normal",
//       total: "$1,230.00",
//       paymentStatus: "Unpaid",
//       items: 4,
//       deliveryNumber: "-",
//       orderStatus: "Draft",
//     },
//     {
//       id: "#456754/80",
//       createdAt: "Apr 20, 2024",
//       customer: "Jung S. Ayala",
//       priority: "Normal",
//       total: "$987.00",
//       paymentStatus: "Paid",
//       items: 2,
//       deliveryNumber: "-",
//       orderStatus: "Packaging",
//     },
//     {
//       id: "#578246/80",
//       createdAt: "Apr 19, 2024",
//       customer: "David A. Arnold",
//       priority: "High",
//       total: "$1,478.00",
//       paymentStatus: "Paid",
//       items: 5,
//       deliveryNumber: "#D-57837678",
//       orderStatus: "Completed",
//     },
//     // Adding more sample orders to demonstrate scrolling
//     {
//       id: "#583489/80",
//       createdAt: "Apr 22, 2024",
//       customer: "Emma Johnson",
//       priority: "High",
//       total: "$2,130.00",
//       paymentStatus: "Paid",
//       items: 7,
//       deliveryNumber: "#D-57837679",
//       orderStatus: "Shipped",
//     },
//     {
//       id: "#583490/80",
//       createdAt: "Apr 21, 2024",
//       customer: "Michael Smith",
//       priority: "Normal",
//       total: "$830.00",
//       paymentStatus: "Paid",
//       items: 3,
//       deliveryNumber: "#D-57837680",
//       orderStatus: "Delivered",
//     },
//     {
//       id: "#583491/80",
//       createdAt: "Apr 20, 2024",
//       customer: "Sarah Williams",
//       priority: "Low",
//       total: "$430.00",
//       paymentStatus: "Unpaid",
//       items: 2,
//       deliveryNumber: "-",
//       orderStatus: "Cancelled",
//     },
//     {
//       id: "#583492/80",
//       createdAt: "Apr 19, 2024",
//       customer: "James Brown",
//       priority: "Normal",
//       total: "$1,530.00",
//       paymentStatus: "Paid",
//       items: 5,
//       deliveryNumber: "#D-57837681",
//       orderStatus: "Shipped",
//     },
//   ];
// }

// export default async function OrdersDashboard() {
//   const stats = await getOrderStats();
//   const orders = await getOrders();

//   return (
//     <div className="space-y-6">
//       {/* Stat cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         <StatCard
//           title="PENDING"
//           value={stats.pending}
//           icon={<Clock className="h-6 w-6 text-orange-500" />}
//         />
//         <StatCard
//           title="SHIPPED"
//           value={stats.shipped}
//           icon={<Package className="h-6 w-6 text-orange-500" />}
//         />
//         <StatCard
//           title="DELIVERED"
//           value={stats.delivered}
//           icon={<CheckCircle className="h-6 w-6 text-orange-500" />}
//         />
//         <StatCard
//           title="CANCELLED"
//           value={stats.cancelled}
//           icon={<XCircle className="h-6 w-6 text-orange-500" />}
//         />
//       </div>

//       {/* Orders table */}
//       <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
//         <div className="p-4 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">All Order List</h2>
//           <Select defaultValue="thisMonth">
//             <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
//               <SelectValue placeholder="Filter by period" />
//             </SelectTrigger>
//             <SelectContent className="bg-gray-700 border-gray-600">
//               <SelectItem value="thisMonth">This Month</SelectItem>
//               <SelectItem value="lastMonth">Last Month</SelectItem>
//               <SelectItem value="thisYear">This Year</SelectItem>
//               <SelectItem value="allTime">All Time</SelectItem>
//             </SelectContent>
//           </Select>
//         </div>

//         <div className="overflow-auto max-h-[calc(100vh-350px)]">
//           <table className="w-full">
//             <thead className="sticky top-0 bg-gray-800 z-10">
//               <tr className="border-t border-b border-gray-700">
//                 <th className="p-4 text-left text-gray-400">Order ID</th>
//                 <th className="p-4 text-left text-gray-400">Created at</th>
//                 <th className="p-4 text-left text-gray-400">Customer</th>
//                 <th className="p-4 text-left text-gray-400">Priority</th>
//                 <th className="p-4 text-left text-gray-400">Total</th>
//                 <th className="p-4 text-left text-gray-400">Payment Status</th>
//                 <th className="p-4 text-left text-gray-400">Items</th>
//                 <th className="p-4 text-left text-gray-400">Delivery Number</th>
//                 <th className="p-4 text-left text-gray-400">Order Status</th>
//                 <th className="p-4 text-left text-gray-400">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order, index) => (
//                 <tr
//                   key={order.id}
//                   className="border-b border-gray-700 hover:bg-gray-750"
//                 >
//                   <td className="p-4 font-medium text-blue-400">{order.id}</td>
//                   <td className="p-4">{order.createdAt}</td>
//                   <td className="p-4 text-orange-400">{order.customer}</td>
//                   <td className="p-4">
//                     <span
//                       className={`${
//                         order.priority === "High" ? "text-red-400" : ""
//                       }`}
//                     >
//                       {order.priority}
//                     </span>
//                   </td>
//                   <td className="p-4">{order.total}</td>
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-md text-sm ${
//                         order.paymentStatus === "Paid"
//                           ? "bg-green-500/20 text-green-500"
//                           : "bg-yellow-500/20 text-yellow-500"
//                       }`}
//                     >
//                       {order.paymentStatus}
//                     </span>
//                   </td>
//                   <td className="p-4">{order.items}</td>
//                   <td className="p-4">{order.deliveryNumber}</td>
//                   <td className="p-4">
//                     <span
//                       className={`px-3 py-1 rounded-md text-sm border ${
//                         order.orderStatus === "Draft"
//                           ? "border-gray-500 text-gray-300"
//                           : order.orderStatus === "Packaging" ||
//                             order.orderStatus === "Shipped"
//                           ? "border-yellow-500 text-yellow-500"
//                           : order.orderStatus === "Completed" ||
//                             order.orderStatus === "Delivered"
//                           ? "border-green-500 text-green-500"
//                           : "border-red-500 text-red-500"
//                       }`}
//                     >
//                       {order.orderStatus}
//                     </span>
//                   </td>
//                   <td className="p-4">
//                     <div className="flex gap-2">
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-gray-400 hover:text-white"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-orange-400 hover:text-orange-300"
//                       >
//                         <Pencil className="h-4 w-4" />
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-red-400 hover:text-red-300"
//                       >
//                         <Trash2 className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StatCard({ title, value, icon }: any) {
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
// src/app/seller/orders/components/OrdersDashboard.tsx

import { CheckCircle, Clock, Package, XCircle } from "lucide-react";
import React from "react";
import OrdersTable from "./OrdersTable";
import { buildStats, fetchOrders } from "./utils";

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

export default async function OrdersDashboard() {
  const orders = await fetchOrders();
  const stats = buildStats(orders);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {STATUS_CONFIG.map(({ key, icon }) => (
          <StatCard key={key} title={key} value={stats[key] || 0} icon={icon} />
        ))}
      </div>
      <OrdersTable orders={orders} />
    </div>
  );
}
