"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown, ChevronUp, Search } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data for order history
const orderHistory = [
  {
    id: "ORD-2024-0123",
    date: "25 April, 2024",
    status: "Delivered",
    total: 737.0,
    items: [
      {
        id: "1",
        name: "Men Black Slim Fit T-shirt",
        color: "Dark",
        size: "M",
        price: 80.0,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "2",
        name: "Dark Green Cargo Pent",
        color: "Dark Green",
        size: "M",
        price: 330.0,
        quantity: 3,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-2024-0097",
    date: "12 April, 2024",
    status: "Delivered",
    total: 450.5,
    items: [
      {
        id: "3",
        name: "Wireless Headphones",
        color: "Black",
        size: "One Size",
        price: 199.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "4",
        name: "Running Shoes",
        color: "Blue",
        size: "42",
        price: 120.0,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "5",
        name: "Sports Water Bottle",
        color: "Red",
        size: "500ml",
        price: 15.5,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
  {
    id: "ORD-2024-0056",
    date: "28 March, 2024",
    status: "Delivered",
    total: 899.99,
    items: [
      {
        id: "6",
        name: "Smart Watch",
        color: "Silver",
        size: "44mm",
        price: 299.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "7",
        name: "Laptop Backpack",
        color: "Navy Blue",
        size: "Standard",
        price: 89.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "8",
        name: "Wireless Earbuds",
        color: "White",
        size: "One Size",
        price: 129.99,
        quantity: 1,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "9",
        name: "Portable Power Bank",
        color: "Black",
        size: "20000mAh",
        price: 49.99,
        quantity: 2,
        image: "/placeholder.svg?height=80&width=80",
      },
    ],
  },
];

export default function HistoryPage() {
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>(
    {}
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const toggleOrderExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  // Filter orders based on status and search query
  const filteredOrders = orderHistory.filter((order) => {
    const matchesStatus =
      filterStatus === "all" ||
      order.status.toLowerCase() === filterStatus.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Order History</h1>

        {/* Filters and Search */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 bg-[#1a1f2e] border-gray-700 text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-full md:w-48">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="bg-[#1a1f2e] border-gray-700 text-white">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-[#1a1f2e] border-gray-700 text-white">
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-[#1a1f2e] rounded-lg p-8 text-center">
              <p className="text-gray-400">
                No orders found matching your criteria.
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-[#1a1f2e] rounded-lg overflow-hidden"
              >
                {/* Order Header */}
                <div
                  className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer"
                  onClick={() => toggleOrderExpand(order.id)}
                >
                  <div className="flex flex-col mb-3 md:mb-0">
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-medium">{order.id}</span>
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-900/30 text-green-400"
                            : order.status === "Processing"
                            ? "bg-blue-900/30 text-blue-400"
                            : order.status === "Shipped"
                            ? "bg-purple-900/30 text-purple-400"
                            : "bg-red-900/30 text-red-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <span className="text-sm text-gray-400">{order.date}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium">
                      ${order.total.toFixed(2)}
                    </span>
                    {expandedOrders[order.id] ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {/* Order Details (Expanded) */}
                {expandedOrders[order.id] && (
                  <div className="border-t border-gray-700">
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-gray-400 mb-3">
                        Order Items
                      </h3>
                      <div className="space-y-4">
                        {order.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-4"
                          >
                            <div className="relative h-16 w-16 bg-gray-800 rounded overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{item.name}</h4>
                              <div className="text-sm text-gray-400">
                                <span>Color: {item.color}</span>
                                <span className="mx-2">•</span>
                                <span>Size: {item.size}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                ${item.price.toFixed(2)}
                              </div>
                              <div className="text-sm text-gray-400">
                                Qty: {item.quantity}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-[#141824] p-4 border-t border-gray-700">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Subtotal</span>
                        <span>${order.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Shipping</span>
                        <span>$0.00</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-400">Tax</span>
                        <span>${(order.total * 0.05).toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between font-medium pt-2 border-t border-gray-700">
                        <span>Total</span>
                        <span>${(order.total * 1.05).toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="p-4 flex flex-wrap gap-3 border-t border-gray-700">
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-700"
                      >
                        View Invoice
                      </Button>
                      <Button
                        variant="outline"
                        className="border-gray-700 text-white hover:bg-gray-700"
                      >
                        Track Order
                      </Button>
                      <Button className="bg-[#f15a29] hover:bg-[#d94e20] text-white ml-auto">
                        Buy Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
