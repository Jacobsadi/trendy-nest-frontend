import { mockProducts } from "@/lib/mockData";
import { fetchProducts } from "@/lib/services/products";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import ProductRowClient from "./product-row-client";

export default async function ProductsTable() {
  const fetchedProducts = await fetchProducts();
  const products = fetchedProducts.length > 0 ? fetchedProducts : mockProducts;

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Product List</h2>
        <div className="flex gap-4">
          <Link href="/seller/products/new">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Add Product
            </Button>
          </Link>
          <Select defaultValue="thisMonth">
            <SelectTrigger className="w-[180px] bg-gray-700 border-gray-600">
              <SelectValue placeholder="Filter by period" />
            </SelectTrigger>
            <SelectContent className="bg-gray-700 border-gray-600">
              <SelectItem value="thisMonth">This Month</SelectItem>
              <SelectItem value="lastMonth">Last Month</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
              <SelectItem value="allTime">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-t border-b border-gray-700 bg-gray-800">
              <th className="p-4 text-left">
                <Checkbox />
              </th>
              <th className="p-4 text-left text-gray-400">Product Name</th>
              <th className="p-4 text-left text-gray-400">Price</th>
              <th className="p-4 text-left text-gray-400">Stock</th>
              <th className="p-4 text-left text-gray-400">Category</th>
              <th className="p-4 text-left text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => (
              <ProductRowClient key={product.id} product={product} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
