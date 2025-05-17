// import { OrderRow, RawOrder } from "@/lib/types";
// import { MOCK_ORDERS } from "../mockData";
// export async function fetchOrders(): Promise<OrderRow[]> {
//   try {
//     const res = await fetch("http://localhost:3002/orders");
//     if (!res.ok) throw new Error("Bad response");

//     const data: RawOrder[] = await res.json();
//     if (Array.isArray(data) && data.length) {
//       const enrichedOrders = await Promise.all(
//         data.map(async (order) => {
//           try {
//             const buyerRes = await fetch(
//               `http://localhost:3004/users/${order.buyerId}`
//             );
//             const buyerData = await buyerRes.json();

//             console.log("BUYER DATA ===================> ", buyerData);

//             const address = buyerData?.addresses?.home;
//             const formattedAddress = address
//               ? `${address.street}, ${address.city}, ${address.country}`
//               : "Unknown Address";

//             return {
//               id: buyerData.email,
//               createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               }),
//               customer: formattedAddress, // ⬅ replaces buyerId
//               priority: "Normal",
//               total: `$${Number(order.total).toFixed(2)}`,
//               paymentStatus: (order.status === "PENDING"
//                 ? "Unpaid"
//                 : "Paid") as "Paid" | "Unpaid",

//               items: order.items?.length ?? 0,
//               deliveryNumber: "-",
//               orderStatus: order.status,
//             };
//           } catch {
//             // fallback if buyer fetch fails
//             return {
//               id: order.id,
//               createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
//                 month: "short",
//                 day: "numeric",
//                 year: "numeric",
//               }),
//               customer: "Unknown Address",
//               priority: "Normal",
//               total: `$${Number(order.total).toFixed(2)}`,
//               paymentStatus: (order.status === "PENDING"
//                 ? "Unpaid"
//                 : "Paid") as "Paid" | "Unpaid",

//               items: order.items?.length ?? 0,
//               deliveryNumber: "-",
//               orderStatus: order.status,
//             };
//           }
//         })
//       );

//       return enrichedOrders;
//     }
//   } catch (err) {
//     console.error("Failed to fetch orders or buyers:", err);
//   }

//   return MOCK_ORDERS;
// }

// export function buildStats(rows: OrderRow[]) {
//   return rows.reduce<Record<string, number>>((acc, r) => {
//     acc[r.orderStatus] = (acc[r.orderStatus] || 0) + 1;
//     return acc;
//   }, {});
// }
import { OrderRow, RawOrder } from "@/lib/types";
import { MOCK_ORDERS } from "../mockData";

// 🔁 Shared formatter logic
function mapOrderToRow(
  order: RawOrder,
  buyerEmail = "Unknown",
  address = "Unknown Address"
): OrderRow {
  const paymentStatus: OrderRow["paymentStatus"] =
    order.status === "PENDING" ? "Unpaid" : "Paid";

  return {
    id: buyerEmail || order.id,
    createdAt: new Date(order.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    customer: address,
    priority: "Normal",
    total: `$${Number(order.total).toFixed(2)}`,
    paymentStatus,
    items: order.items?.length ?? 0,
    deliveryNumber: "-",
    orderStatus: order.status,
  };
}

// 🔁 All Orders (Admin or Seller View)
export async function fetchOrders(): Promise<OrderRow[]> {
  try {
    const res = await fetch("http://localhost:3002/orders");
    if (!res.ok) throw new Error("Bad response");

    const data: RawOrder[] = await res.json();
    if (Array.isArray(data) && data.length) {
      const enrichedOrders: OrderRow[] = await Promise.all(
        data.map(async (order) => {
          try {
            const buyerRes = await fetch(
              `http://localhost:3004/users/${order.buyerId}`
            );
            const buyerData = await buyerRes.json();
            const address = buyerData?.addresses?.home
              ? `${buyerData.addresses.home.street}, ${buyerData.addresses.home.city}, ${buyerData.addresses.home.country}`
              : "Unknown Address";

            return mapOrderToRow(order, buyerData.email, address);
          } catch {
            return mapOrderToRow(order);
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

export async function fetchOrdersByBuyer(buyerId: string) {
  try {
    // const res = await fetch(`http://localhost:3002/orders/buyer/${buyerId}`);
    const res = await fetch("http://localhost:3002/orders/buyer/buyer-123");
    if (!res.ok) throw new Error("Bad response");

    const data = await res.json();
    return data; // plain JSON
  } catch (err) {
    console.error("Failed to fetch buyer's orders:", err);
    return MOCK_ORDERS;
  }
}

// 📊 Stats by status
export function buildStats(rows: OrderRow[]) {
  return rows.reduce<Record<string, number>>((acc, r) => {
    acc[r.orderStatus] = (acc[r.orderStatus] || 0) + 1;
    return acc;
  }, {});
}

// 🔁 Orders by Buyer (for /buyer/history)
// export async function fetchOrdersByBuyer(buyerId: string): Promise<OrderRow[]> {
//   try {
//     const res = await fetch(`http://localhost:3002/orders/buyer/${buyerId}`);
//     if (!res.ok) throw new Error("Bad response");

//     const data: RawOrder[] = await res.json();

//     const enrichedOrders: OrderRow[] = await Promise.all(
//       data.map(async (order) => {
//         try {
//           const buyerRes = await fetch(
//             `http://localhost:3004/users/${order.buyerId}`
//           );
//           const buyerData = await buyerRes.json();

//           const address = buyerData?.addresses?.home
//             ? `${buyerData.addresses.home.street}, ${buyerData.addresses.home.city}, ${buyerData.addresses.home.country}`
//             : "Unknown Address";

//           return mapOrderToRow(order, buyerData.email, address);
//         } catch {
//           return mapOrderToRow(order);
//         }
//       })
//     );

//     return enrichedOrders;
//   } catch (err) {
//     console.error("Failed to fetch buyer's orders:", err);
//     return MOCK_ORDERS;
//   }
// }
