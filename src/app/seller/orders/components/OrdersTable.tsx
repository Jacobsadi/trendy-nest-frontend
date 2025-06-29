"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { deleteOrder, updateOrder } from "@/lib/services/orders";
import { EnrichedOrder } from "@/lib/types"; // Import EnrichedOrder
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function OrderRowDisplay({ order }: { order: EnrichedOrder }) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const totalAmount = `$${Number(order.total).toFixed(2)}`;
  const itemCount = order.items?.length ?? 0;
  const router = useRouter();
  const handleStatusChange = async (newStatus: string) => {
    try {
      // First, update the order status in the backend
      await updateOrder(order.id, { status: newStatus });

      // Then, send an email to the customer
      const res = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: order.buyerEmail,
          orderId: order.orderNumber,
          status: newStatus,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        console.error("Email send failed:", result);
        alert("Order updated, but failed to send email.");
      }

      router.refresh();
    } catch (err) {
      console.error("Failed to update order or send email:", err);
      alert("Something went wrong.");
    }
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this order?");
    if (!confirmed) return;

    try {
      await deleteOrder(order.id);
      router.refresh(); // Refresh the page or fetch data again
    } catch (err) {
      console.error("Failed to delete order:", err);
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDING":
        return "border-yellow-500 text-yellow-500";
      case "SHIPPED":
        return "border-blue-500 text-blue-500";
      case "DELIVERED":
        return "border-green-500 text-green-500";
      case "CANCELLED":
        return "border-red-500 text-red-500";
      default:
        return "border-gray-500 text-gray-300";
    }
  };
  const orderLink = `/seller/orders/${order.id}`;
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-700 ">
      <td className="p-4 font-medium text-blue-400">
        <Link href={orderLink} className="hover:underline">
          {order.orderNumber}
        </Link>
      </td>
      <td className="p-4">
        <Link href={orderLink}>{formattedDate}</Link>
      </td>
      <td className="p-4 text-orange-400">
        <Link href={orderLink}>{order.buyerEmail}</Link>
      </td>
      <td className="p-4">
        <Link href={orderLink}>{order.buyerAddress}</Link>
      </td>
      <td className="p-4">
        <Link href={orderLink}>{totalAmount}</Link>
      </td>
      <td className="p-4">
        <Link href={orderLink}>
          <span className="px-3 py-1 rounded-md text-sm bg-green-500/20 text-green-500">
            Paid
          </span>
        </Link>
      </td>
      <td className="p-4">
        <Link href={orderLink}>
          <span className="px-6 mx-2 py-1 rounded-md text-sm bg-green-500/20 text-green-500">
            {itemCount}
          </span>
        </Link>
      </td>
      {/* status and actions remain unchanged */}
      <td className="p-4">
        <Select defaultValue={order.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px] bg-gray-800 border-gray-600 text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-gray-700 text-white border-gray-600">
            <SelectItem value="PENDING">PENDING</SelectItem>
            <SelectItem value="SHIPPED">SHIPPED</SelectItem>
            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
            <SelectItem value="CANCELLED">CANCELLED</SelectItem>
          </SelectContent>
        </Select>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          {/* Optional: make these buttons navigate too if you want */}

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}

export default function OrdersTable({ orders }: { orders: EnrichedOrder[] }) {
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
              {/* Updated Headers */}
              <th className="p-4 text-left text-gray-400">Order #</th>
              <th className="p-4 text-left text-gray-400">Created At</th>
              <th className="p-4 text-left text-gray-400">Buyer Email</th>
              <th className="p-4 text-left text-gray-400">Buyer Address</th>
              <th className="p-4 text-left text-gray-400">Total</th>
              <th className="p-4 text-left text-gray-400">Payment</th>
              <th className="p-4 text-left text-gray-400">Items</th>
              <th className="p-4 text-left text-gray-400">Status</th>
              <th className="p-4 text-left text-gray-400">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <OrderRowDisplay key={order.id} order={order} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
