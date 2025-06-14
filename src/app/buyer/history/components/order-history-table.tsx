// import { RawOrder } from "@/lib/types"; // Import RawOrder
// import { useUser } from "@clerk/nextjs";

// interface Props {
//   orders: RawOrder[]; // Expect RawOrder[] as prop
// }

// export default function OrderHistoryTable({ orders }: Props) {
//   const { user } = useUser();
//   const emailadd = user?.emailAddresses[0]?.emailAddress ?? "N/A";
//   function getStatusColor(status: string) {
//     switch (status) {
//       case "PENDING":
//         return "bg-yellow-500 text-black";
//       case "SHIPPED":
//         return "bg-blue-500 text-white";
//       case "DELIVERED":
//         return "bg-green-600 text-white";
//       case "CANCELLED":
//         return "bg-red-600 text-white";
//       default:
//         return "bg-gray-500 text-white";
//     }
//   }

//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
//       <table className="w-full">
//         <thead>
//           <tr className="border-t border-b border-gray-700 bg-gray-800">
//             <th className="p-4 text-left text-gray-400">Order ID</th>
//             <th className="p-4 text-left text-gray-400">Date</th>
//             <th className="p-4 text-left text-gray-400">Items</th>
//             <th className="p-4 text-left text-gray-400">Total</th>
//             <th className="p-4 text-left text-gray-400">Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {orders.map((order) => {
//             const createdAt = new Date(order.createdAt).toLocaleDateString(
//               "en-US",
//               {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               }
//             );

//             const itemCount = order.items?.length ?? 0;

//             return (
//               <tr
//                 key={order.id}
//                 className="border-b border-gray-700 hover:bg-gray-750"
//               >
//                 <td className="p-4 font-medium">
//                   {order.orderNumber || "N/A"}
//                 </td>
//                 {/* Use order.id */}
//                 <td className="p-4">{createdAt}</td>
//                 <td className="p-4">{itemCount}</td>
//                 <td className="p-4">{order.total}</td>
//                 <td className="p-4">
//                   <span
//                     className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
//                       order.status
//                     )}`}
//                   >
//                     {order.status}
//                   </span>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { RawOrder } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { Calendar, DollarSign, Eye, Package } from "lucide-react";
import Link from "next/link";

interface Props {
  orders: RawOrder[];
}

export default function OrderHistoryTable({ orders }: Props) {
  const { user } = useUser();

  function getStatusColor(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/40";
      case "SHIPPED":
        return "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40";
      case "DELIVERED":
        return "bg-green-900/30 text-green-400 hover:bg-green-900/40";
      case "CANCELLED":
        return "bg-red-900/30 text-red-400 hover:bg-red-900/40";
      default:
        return "bg-gray-900/30 text-gray-400 hover:bg-gray-900/40";
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "PENDING":
        return <Calendar className="h-3 w-3" />;
      case "SHIPPED":
        return <Package className="h-3 w-3" />;
      case "DELIVERED":
        return <Package className="h-3 w-3" />;
      case "CANCELLED":
        return <Package className="h-3 w-3" />;
      default:
        return <Package className="h-3 w-3" />;
    }
  }

  if (orders.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg border border-gray-700 p-12 text-center">
        <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-white mb-2">No orders found</h3>
        <p className="text-gray-400 mb-6">
          No orders match your current filters. Try adjusting your search
          criteria.
        </p>
        <Link href="/buyer">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Start Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      {/* Desktop Table View */}
      <div className="hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700 bg-gray-750">
              <th className="p-4 text-left text-gray-400 font-medium">Order</th>
              <th className="p-4 text-left text-gray-400 font-medium">Date</th>
              <th className="p-4 text-left text-gray-400 font-medium">Items</th>
              <th className="p-4 text-left text-gray-400 font-medium">Total</th>
              <th className="p-4 text-left text-gray-400 font-medium">
                Status
              </th>
              <th className="p-4 text-left text-gray-400 font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => {
              const createdAt = new Date(order.createdAt).toLocaleDateString(
                "en-US",
                {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                }
              );

              const itemCount = order.items?.length ?? 0;

              return (
                <tr
                  key={order.id}
                  className="border-b border-gray-700 hover:bg-gray-750 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <div className="font-medium text-white">
                        {order.orderNumber || `#${order.id.slice(-8)}`}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-300">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {createdAt}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-300">
                      <Package className="h-4 w-4 mr-2 text-gray-400" />
                      {itemCount} item{itemCount !== 1 ? "s" : ""}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-gray-300">
                      <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
                      <span className="font-medium">{order.total}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      className={`${getStatusColor(
                        order.status
                      )} flex items-center gap-1 w-fit`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <Link href={`/buyer/orders/${order.id}`}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4 p-4">
        {orders.map((order) => {
          const createdAt = new Date(order.createdAt).toLocaleDateString(
            "en-US",
            {
              month: "short",
              day: "numeric",
              year: "numeric",
            }
          );

          const itemCount = order.items?.length ?? 0;

          return (
            <div
              key={order.id}
              className="bg-gray-750 rounded-lg p-4 border border-gray-600"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-white">
                    {order.orderNumber || `#${order.id.slice(-8)}`}
                  </div>
                  <div className="text-sm text-gray-400">{createdAt}</div>
                </div>
                <Badge
                  className={`${getStatusColor(
                    order.status
                  )} flex items-center gap-1`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-xs text-gray-400 mb-1">Items</div>
                  <div className="text-white">{itemCount}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400 mb-1">Total</div>
                  <div className="text-white font-medium">${order.total}</div>
                </div>
              </div>

              <Link href={`/buyer/orders/${order.id}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
