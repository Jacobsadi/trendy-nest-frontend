// src/app/seller/orders/components/utils.ts

import { Buyer, BuyerAddress, EnrichedOrder, RawOrder } from "@/lib/types";
// import { MOCK_RAW_ORDERS, MOCK_BUYERS } from "@/lib/mockData"; // If using mocks
const ORDERS_API =
  process.env.NEXT_PUBLIC_ORDERS_API || "http://localhost:3002/orders";
const USERS_API =
  process.env.NEXT_PUBLIC_USERS_API || "http://localhost:3004/users";
export async function fetchOrders(): Promise<RawOrder[]> {
  try {
    const res = await fetch(ORDERS_API, { cache: "no-store" });

    if (!res.ok) {
      console.error(
        "Failed to fetch orders: Bad response from server",
        res.status
      );
      return []; // Or return MOCK_RAW_ORDERS
    }
    const data: RawOrder[] = await res.json();
    return data;
  } catch (err) {
    console.error("Failed to fetch orders:", err);
    return []; // Or return MOCK_RAW_ORDERS
  }
}

// This function will be called in orders-dashboard.tsx to enrich orders
export async function fetchBuyerData(buyerId: string): Promise<Buyer | null> {
  if (!buyerId) return null;
  try {
    const res = await fetch(`${USERS_API}/${buyerId}`, { cache: "no-store" });
    if (!res.ok) {
      console.error(`Failed to fetch buyer ${buyerId}:`, res.status);
      return null;
    }
    return (await res.json()) as Buyer;
  } catch (error) {
    console.error(`Error fetching buyer ${buyerId}:`, error);
    return null;
  }
}

export function formatBuyerAddress(address: BuyerAddress | undefined): string {
  if (!address) return "Unknown Address";
  // Customize formatting as needed
  return `${address.line1}, ${address.city}, ${address.state} ${address.zipCode}, ${address.country}`;
}

export function buildStats(rows: EnrichedOrder[]): Record<string, number> {
  return rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});
}
