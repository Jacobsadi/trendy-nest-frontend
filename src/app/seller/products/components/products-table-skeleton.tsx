import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsTableSkeleton() {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Product List</h2>
        <div className="flex gap-4">
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            Add Product
          </Button>
          <Skeleton className="h-10 w-[180px] bg-gray-700" />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-gray-700 bg-gray-800">
              <th className="p-4 text-left">
                <Checkbox />
              </th>
              <th className="p-4 text-left text-gray-400">
                Product Name & Size
              </th>
              <th className="p-4 text-left text-gray-400">Price</th>
              <th className="p-4 text-left text-gray-400">Stock</th>
              <th className="p-4 text-left text-gray-400">Category</th>
              <th className="p-4 text-left text-gray-400">Rating</th>
              <th className="p-4 text-left text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="border-b border-gray-700">
                <td className="p-4">
                  <Checkbox />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-16 h-16 rounded-md bg-gray-700" />
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-32 bg-gray-700" />
                      <Skeleton className="h-4 w-24 bg-gray-700" />
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <Skeleton className="h-5 w-16 bg-gray-700" />
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-24 bg-gray-700" />
                    <Skeleton className="h-4 w-16 bg-gray-700" />
                  </div>
                </td>
                <td className="p-4">
                  <Skeleton className="h-5 w-20 bg-gray-700" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-5 w-28 bg-gray-700" />
                  </div>
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
  );
}
