"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Order {
  id: string;
  orderNumber: string;
  customer: string;
  date: string;
  status: string;
  total: number;
  items: number;
}

interface RecentOrdersProps {
  orders: Order[];
}

export function RecentOrders({ orders }: RecentOrdersProps) {
  const getStatusColor = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/40";
      case "processing":
        return "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40";
      case "shipped":
        return "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/40";
      case "delivered":
        return "bg-green-900/30 text-green-400 hover:bg-green-900/40";
      case "cancelled":
        return "bg-red-900/30 text-red-400 hover:bg-red-900/40";
      default:
        return "bg-gray-900/30 text-gray-400 hover:bg-gray-900/40";
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-white">Recent Orders</CardTitle>
          <CardDescription className="text-gray-400">
            Latest customer purchases
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
          {orders.map((order, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600"
            >
              <div>
                <h3 className="font-medium text-white">{order.orderNumber}</h3>
                <p className="text-sm text-gray-400">{order.customer}</p>
                <p className="text-xs text-gray-500">
                  {new Date(order.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="text-center">
                <p className="text-white font-medium">
                  ${order.total.toFixed(2)}
                </p>
                <p className="text-xs text-gray-400">{order.items} items</p>
              </div>
              <div className="flex items-center gap-3">
                <Badge className={getStatusColor(order.status)}>
                  {order.status
                    ? order.status.charAt(0) +
                      order.status.slice(1).toLowerCase()
                    : "Unknown"}
                </Badge>

                <Link href={`/seller/orders/${order.id}`}>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-gray-400 hover:text-white"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
