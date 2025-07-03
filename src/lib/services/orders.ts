import { RawOrder } from "@/lib/types";
import { MOCK_ORDERS } from "../mockData";
import { getUserById } from "./users";

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
const ORDERS_API =
  process.env.NEXT_PUBLIC_ORDERS_API || "http://localhost:3002/orders";

function mapRawOrderToOrderRow(
  order: RawOrder,
  buyerEmail = "Unknown",
  address = "Unknown Address"
): OrderRow {
  const paymentStatus: OrderRow["paymentStatus"] =
    order.status === "PENDING" ? "Unpaid" : "Paid";

  return {
    id: order.id || "N/A", // Added fallback for potential undefined id
    createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    customer: address,
    priority: order.orderNumber,
    total: `$${Number(order.total).toFixed(2)}`,
    paymentStatus,
    items: order.items?.length ?? 0,
    deliveryNumber: "-",
    orderStatus: order.status,
  };
}

export async function fetchOrders(): Promise<OrderRow[]> {
  try {
    const res = await fetch(ORDERS_API);
    if (!res.ok) throw new Error("Bad response");

    const data: RawOrder[] = await res.json();

    if (Array.isArray(data) && data.length) {
      const enrichedOrders: OrderRow[] = await Promise.all(
        data.map(async (order) => {
          try {
            const buyer = await getUserById(order.buyerId);
            const buyerData = await buyer.json();

            const address = buyerData?.addresses?.home
              ? `${buyerData.addresses.home.street}, ${buyerData.addresses.home.city}, ${buyerData.addresses.home.country}`
              : "Unknown Address";

            return mapRawOrderToOrderRow(order, buyerData.email, address);
          } catch (error) {
            console.warn(`Failed to fetch user ${order.buyerId}:`, error);
            return mapRawOrderToOrderRow(order);
          }
        })
      );

      return enrichedOrders;
    }
  } catch (err) {
    console.error("Failed to fetch orders:", err);
  }

  return MOCK_ORDERS.map((mockOrder) =>
    mapRawOrderToOrderRow(mockOrder as RawOrder)
  );
}
export async function fetchOrdersByBuyer(buyerId: string) {
  try {
    const res = await fetch(`${ORDERS_API}/buyer/${buyerId}`);
    if (!res.ok) throw new Error("Bad response");

    const data: RawOrder[] = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch buyer's orders:", err);
    return MOCK_ORDERS.map((mockOrder) => mockOrder as RawOrder);
  }
}
export async function updateOrder(orderId: string, data: Record<string, any>) {
  try {
    const response = await fetch(`${ORDERS_API}/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update order ${orderId}`);
    }

    return await response.json(); // Optionally return updated order
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  }
}
export function buildStats(rows: OrderRow[]) {
  return rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.orderStatus] = (acc[r.orderStatus] || 0) + 1;
    return acc;
  }, {});
}
export async function fetchOrderById(
  orderId: string
): Promise<RawOrder & { buyerEmail: string; buyerAddress: string }> {
  try {
    const res = await fetch(`${ORDERS_API}/${orderId}`);
    if (!res.ok) throw new Error("Bad response");

    const order: RawOrder = await res.json();

    try {
      const buyerRes = await getUserById(order.buyerId);
      const buyerData = await buyerRes.json();

      const buyerAddress = buyerData?.addresses?.home
        ? `${buyerData.addresses.home.street}, ${buyerData.addresses.home.city}, ${buyerData.addresses.home.country}`
        : "Unknown Address";

      return {
        ...order,
        buyerEmail: buyerData?.email || "Unknown",
        buyerAddress,
      };
    } catch (error) {
      console.warn(`Failed to fetch user for order ${orderId}:`, error);
      return {
        ...order,
        buyerEmail: "Unknown",
        buyerAddress: "Unknown Address",
      };
    }
  } catch (err) {
    console.error(`Failed to fetch order ${orderId}:`, err);
    throw err;
  }
}
export async function deleteOrder(orderId: string) {
  try {
    const response = await fetch(`${ORDERS_API}/${orderId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete order ${orderId}`);
    }

    return true;
  } catch (error) {
    console.error("Error deleting order:", error);
    throw error;
  }
}
