import { RawOrder } from "@/lib/types"; // Import RawOrder
import { useUser } from "@clerk/nextjs";

interface Props {
  orders: RawOrder[]; // Expect RawOrder[] as prop
}

export default function OrderHistoryTable({ orders }: Props) {
  const { user } = useUser();
  const emailadd = user?.emailAddresses[0]?.emailAddress ?? "N/A";
  function getStatusColor(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500 text-black";
      case "SHIPPED":
        return "bg-blue-500 text-white";
      case "DELIVERED":
        return "bg-green-600 text-white";
      case "CANCELLED":
        return "bg-red-600 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  }

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <table className="w-full">
        <thead>
          <tr className="border-t border-b border-gray-700 bg-gray-800">
            <th className="p-4 text-left text-gray-400">Order ID</th>
            <th className="p-4 text-left text-gray-400">Date</th>
            <th className="p-4 text-left text-gray-400">Items</th>
            <th className="p-4 text-left text-gray-400">Total</th>
            <th className="p-4 text-left text-gray-400">Status</th>
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
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="p-4 font-medium">
                  {order.orderNumber || "N/A"}
                </td>
                {/* Use order.id */}
                <td className="p-4">{createdAt}</td>
                <td className="p-4">{itemCount}</td>
                <td className="p-4">{order.total}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
