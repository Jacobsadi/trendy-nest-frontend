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
  customer: string;
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
    customer: "Gail C. Anderson",
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
    customer: "Jung S. Ayala",
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
    customer: "David A. Arnold",
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
      return data.map((o) => ({
        id: o.id,
        createdAt: new Date(o.createdAt).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        customer: o.buyerId,
        priority: "Normal",
        total: `$${Number(o.total).toFixed(2)}`,
        paymentStatus: o.status === "PENDING" ? "Unpaid" : "Paid",
        items: o.items?.length ?? 0,
        deliveryNumber: "-",
        orderStatus: o.status,
      }));
    }
  } catch {
    // fallback silently
  }
  return MOCK_ORDERS;
}

export function buildStats(rows: OrderRow[]) {
  return rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.orderStatus] = (acc[r.orderStatus] || 0) + 1;
    return acc;
  }, {});
}
