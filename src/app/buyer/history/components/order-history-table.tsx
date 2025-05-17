import { useUser } from "@clerk/nextjs";

interface Props {
  orders: any[];
}

export default function OrderHistoryTable({ orders }: Props) {
  const { user } = useUser();
  const emailadd = user?.emailAddresses[0]?.emailAddress ?? "N/A";

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

            const total = `$${(order.total / 100).toFixed(2)}`;

            const itemCount = order.items?.length ?? 0;
            const paymentStatus = "Paid";
            // order.status === "PENDING" ? "Unpaid" : "Paid";

            return (
              <tr
                key={order.id}
                className="border-b border-gray-700 hover:bg-gray-750"
              >
                <td className="p-4 font-medium">{emailadd}</td>
                <td className="p-4">{createdAt}</td>
                <td className="p-4">{itemCount}</td>
                <td className="p-4">{total}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-sm font-semibold ${
                      paymentStatus === "Paid"
                        ? "bg-green-600 text-white"
                        : "bg-yellow-600 text-black"
                    }`}
                  >
                    {paymentStatus}
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
