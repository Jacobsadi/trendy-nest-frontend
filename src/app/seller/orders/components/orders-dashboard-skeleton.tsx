import { Skeleton } from "@/components/ui/skeleton";

export default function OrdersDashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <StatCardSkeleton key={`row1-${i}`} />
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
        <div className="p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">All Order List</h2>
          <Skeleton className="h-10 w-[180px] bg-gray-700" />
        </div>

        <div className="overflow-auto max-h-[calc(100vh-350px)]">
          <table className="w-full">
            <thead className="sticky top-0 bg-gray-800 z-10">
              <tr className="border-t border-b border-gray-700">
                <th className="p-4 text-left text-gray-400">Order ID</th>
                <th className="p-4 text-left text-gray-400">Created at</th>
                <th className="p-4 text-left text-gray-400">Customer</th>
                <th className="p-4 text-left text-gray-400">Priority</th>
                <th className="p-4 text-left text-gray-400">Total</th>
                <th className="p-4 text-left text-gray-400">Payment Status</th>
                <th className="p-4 text-left text-gray-400">Items</th>
                <th className="p-4 text-left text-gray-400">Delivery Number</th>
                <th className="p-4 text-left text-gray-400">Order Status</th>
                <th className="p-4 text-left text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody>
              {[...Array(5)].map((_, i) => (
                <tr key={i} className="border-b border-gray-700">
                  <td className="p-4">
                    <Skeleton className="h-5 w-24 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-28 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-32 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-16 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-20 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-8 w-16 rounded-md bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-8 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-5 w-28 bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <Skeleton className="h-8 w-24 rounded-md bg-gray-700" />
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <Skeleton className="h-8 w-8 rounded-md bg-gray-700" />
                      <Skeleton className="h-8 w-8 rounded-md bg-gray-700" />
                      <Skeleton className="h-8 w-8 rounded-md bg-gray-700" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCardSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-gray-700" />
          <Skeleton className="h-8 w-16 bg-gray-700" />
        </div>
        <Skeleton className="h-12 w-12 rounded-lg bg-gray-700" />
      </div>
    </div>
  );
}
