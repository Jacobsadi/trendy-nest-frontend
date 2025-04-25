// src/app/seller/orders/components/utils.ts

export interface RawOrder {
  id: string;
  buyerId: string;
  total: string;
  status: string;
  createdAt: string;
  items?: any[];
}

export interface OrderRow {
  id: string;
  createdAt: string;
  customer: string; // now formatted address
  priority: string;
  total: string;
  paymentStatus: "Paid" | "Unpaid";
  items: number;
  deliveryNumber: string;
  orderStatus: string;
}

const MOCK_ORDERS: OrderRow[] = [
  {
    id: "#583488/80",
    createdAt: "Apr 23, 2024",
    customer: "123 Elm St, Algiers, Algeria",
    priority: "Normal",
    total: "$1,230.00",
    paymentStatus: "Unpaid",
    items: 4,
    deliveryNumber: "-",
    orderStatus: "Draft",
  },
  {
    id: "#456754/80",
    createdAt: "Apr 20, 2024",
    customer: "55 Sunset Blvd, Tokyo, Japan",
    priority: "Normal",
    total: "$987.00",
    paymentStatus: "Paid",
    items: 2,
    deliveryNumber: "-",
    orderStatus: "Packaging",
  },
  {
    id: "#578246/80",
    createdAt: "Apr 19, 2024",
    customer: "99 King Rd, Berlin, Germany",
    priority: "High",
    total: "$1,478.00",
    paymentStatus: "Paid",
    items: 5,
    deliveryNumber: "#D-57837678",
    orderStatus: "Completed",
  },
];

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
              customer: formattedAddress, // ⬅ replaces buyerId
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
