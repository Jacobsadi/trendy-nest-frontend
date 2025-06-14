"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image: string;
  sales: number;
  revenue: number;
  stock: number;
}

interface TopProductsProps {
  products: Product[];
}

export function TopProducts({ products }: TopProductsProps) {
  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Top Products</CardTitle>
          <CardDescription className="text-gray-400">
            Best selling items
          </CardDescription>
        </div>
        <Button
          variant="outline"
          className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
        >
          View All
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600"
            >
              <div className="relative h-12 w-12 flex-shrink-0">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="ml-4 flex-grow">
                <h3 className="font-medium text-white">{product.name}</h3>
                <div className="flex items-center text-xs text-gray-400">
                  <span>{product.sales} sold</span>
                  <span className="mx-2">•</span>
                  <span>${product.revenue.toFixed(2)}</span>
                </div>
              </div>
              <Link href={`/seller/products/${product.id}`}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-400 hover:text-white"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
