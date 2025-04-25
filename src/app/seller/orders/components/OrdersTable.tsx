// src/app/seller/orders/components/OrdersTable.tsx

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { OrderRow as OrderRowType } from "./utils";

function OrderRow({ order }: { order: OrderRowType }) {
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-750">
      <td className="p-4 font-medium text-blue-400">{order.id}</td>
      <td className="p-4">{order.createdAt}</td>
      <td className="p-4 text-orange-400">{order.customer}</td>
      <td className="p-4">
        <span className={order.priority === "High" ? "text-red-400" : ""}>
          {order.priority}
        </span>
      </td>
      <td className="p-4">{order.total}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-md text-sm ${
            order.paymentStatus === "Paid"
              ? "bg-green-500/20 text-green-500"
              : "bg-yellow-500/20 text-yellow-500"
          }`}
        >
          {order.paymentStatus}
        </span>
      </td>
      <td className="p-4">{order.items}</td>
      <td className="p-4">{order.deliveryNumber}</td>
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-md text-sm border ${
            order.orderStatus === "Draft"
              ? "border-gray-500 text-gray-300"
              : order.orderStatus === "Packaging" ||
                order.orderStatus === "Shipped"
              ? "border-yellow-500 text-yellow-500"
              : order.orderStatus === "Completed" ||
                order.orderStatus === "Delivered"
              ? "border-green-500 text-green-500"
              : "border-red-500 text-red-500"
          }`}
        >
          {order.orderStatus}
        </span>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-orange-400 hover:text-orange-300"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function OrdersTable({ orders }: { orders: OrderRowType[] }) {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700">
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">All Order List</h2>
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
      <div className="overflow-auto max-h-[calc(100vh-350px)]">
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-800 z-10">
            <tr className="border-t border-b border-gray-700">
              <th className="p-4 text-left text-gray-400">Customer Email</th>
              <th className="p-4 text-left text-gray-400">Created at</th>
              <th className="p-4 text-left text-gray-400">Customer Address</th>
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
            {orders.map((o, index = 0) => (
              <OrderRow key={index + 1} order={o} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
