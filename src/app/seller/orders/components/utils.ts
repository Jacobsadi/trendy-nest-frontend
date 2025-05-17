// src/app/seller/orders/components/utils.ts

import { MOCK_ORDERS } from "@/lib/mockData";
import { OrderRow, RawOrder } from "@/lib/types";

export async function fetchOrders(): Promise<OrderRow[]> {
  try {
    const res = await fetch("http://localhost:3002/orders");
    if (!res.ok) throw new Error("Bad response");

    const data: RawOrder[] = await res.json();
    if (Array.isArray(data) && data.length) {
      const enrichedOrders = await Promise.all(
        data.map(async (order) => {
          try {
            const buyerRes = await fetch(
              `http://localhost:3004/users/${order.buyerId}`
            );
            const buyerData = await buyerRes.json();

            console.log("BUYER DATA ===================> ", buyerData);

            const address = buyerData?.addresses?.home;
            const formattedAddress = address
              ? `${address.street}, ${address.city}, ${address.country}`
              : "Unknown Address";

            return {
              id: buyerData.email,
              createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              customer: formattedAddress,
              priority: "Normal",
              total: `$${Number(order.total).toFixed(2)}`,
              paymentStatus: (order.status === "PENDING"
                ? "Unpaid"
                : "Paid") as "Paid" | "Unpaid",

              items: order.items?.length ?? 0,
              deliveryNumber: "-",
              orderStatus: order.status,
            };
          } catch {
            // fallback if buyer fetch fails
            return {
              id: order.id,
              createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              customer: "Unknown Address",
              priority: "Normal",
              total: `$${Number(order.total).toFixed(2)}`,
              paymentStatus: (order.status === "PENDING"
                ? "Unpaid"
                : "Paid") as "Paid" | "Unpaid",

              items: order.items?.length ?? 0,
              deliveryNumber: "-",
              orderStatus: order.status,
            };
          }
        })
      );

      return enrichedOrders;
    }
  } catch (err) {
    console.error("Failed to fetch orders or buyers:", err);
  }

  return MOCK_ORDERS;
}

export function buildStats(rows: OrderRow[]) {
  return rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.orderStatus] = (acc[r.orderStatus] || 0) + 1;
    return acc;
  }, {});
}
