// import { mockProducts } from "@/lib/mockData";
// import { fetchProducts } from "@/lib/services/products";

// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import Link from "next/link";
// import ProductRowClient from "./product-row-client";

// export default async function ProductsTable() {
//   const fetchedProducts = await fetchProducts();
//   const products = fetchedProducts.length > 0 ? fetchedProducts : mockProducts;

//   return (
//     <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
//       <div className="p-4 flex justify-between items-center">
//         <h2 className="text-lg font-semibold">All Product List</h2>
//         <div className="flex gap-4">
//           <Link href="/seller/products/new">
//             <Button className="bg-orange-500 hover:bg-orange-600 text-white">
//               Add Product
//             </Button>
//           </Link>
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
//       </div>

//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead>
//             <tr className="border-t border-b border-gray-700 bg-gray-800">
//               <th className="p-4 text-left">{/* <Checkbox /> */}</th>
//               <th className="p-4 text-left text-gray-400">Product Name</th>
//               <th className="p-4 text-left text-gray-400">Price</th>
//               <th className="p-4 text-left text-gray-400">Stock</th>
//               <th className="p-4 text-left text-gray-400">Category</th>
//               <th className="p-4 text-left text-gray-400">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((product: any) => (
//               <ProductRowClient key={product.id} product={product} />
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockProducts } from "@/lib/mockData";
import { fetchProducts } from "@/lib/services/products";
import type { Product } from "@/lib/types";
import { Download, Filter, Grid, Plus } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import ProductRowClient from "./product-row-client";

export default function ProductsTableClientWrapper() {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [stockFilter, setStockFilter] = useState("all");

  useEffect(() => {
    async function load() {
      const fetched = await fetchProducts();
      setProducts(fetched.length > 0 ? fetched : mockProducts);
    }
    load();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" ||
        product.category.toLowerCase() === categoryFilter;

      const matchesStock =
        stockFilter === "all" ||
        (stockFilter === "inStock" && product.quantity > 10) ||
        (stockFilter === "lowStock" &&
          product.quantity > 0 &&
          product.quantity <= 10) ||
        (stockFilter === "outOfStock" && product.quantity === 0);

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, stockFilter]);

  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.quantity < 10).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Products
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {totalProducts}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Grid className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Low Stock Items
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {lowStockProducts}
                </p>
              </div>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Filter className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total Inventory Value
                </p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  ${totalValue.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                <Download className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 shadow-sm">
        <CardHeader className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Product Inventory
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                Manage and track your product catalog
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search */}
              <div className="relative">
                {/* <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search products..."
                  className="pl-10 w-full sm:w-64 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                /> */}
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full sm:w-40 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="makeup">Makeup</SelectItem>
                  <SelectItem value="skincare">Skincare</SelectItem>
                  <SelectItem value="haircare">Haircare</SelectItem>
                  <SelectItem value="beauty tools">Beauty Tools</SelectItem>
                  <SelectItem value="fragrance">Fragrance</SelectItem>
                </SelectContent>
              </Select>

              {/* Stock Filter */}
              <Select value={stockFilter} onValueChange={setStockFilter}>
                <SelectTrigger className="w-full sm:w-32 bg-slate-50 dark:bg-slate-700 border-slate-200 dark:border-slate-600">
                  <SelectValue placeholder="Stock" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Stock</SelectItem>
                  <SelectItem value="inStock">In Stock</SelectItem>
                  <SelectItem value="lowStock">Low Stock</SelectItem>
                  <SelectItem value="outOfStock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>

              {/* Add Product Button */}
              <Link href="/seller/products/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-sm w-full sm:w-auto">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </Link>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50">
                  <th className="p-4 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-slate-300 dark:border-slate-600"
                    />
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                    Product
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                    Price
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                    Stock
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                    Category
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                    Status
                  </th>
                  <th className="p-4 text-left text-sm font-medium text-slate-600 dark:text-slate-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                {filteredProducts.map((product) => (
                  <ProductRowClient key={product.id} product={product} />
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
