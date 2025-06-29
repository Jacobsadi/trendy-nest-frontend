// "use client";

// import { useCartStore } from "@/lib/services/cartStore";
// import { fetchOrdersByBuyer } from "@/lib/services/orders";
// import { RawOrder } from "@/lib/types"; // Import RawOrder
// import { useUser } from "@clerk/nextjs";
// import { Suspense, useEffect, useState } from "react";
// import Header from "../components/header";
// import OrderHistoryTable from "./components/order-history-table";
// import OrderTableSkeleton from "./components/order-table-skeleton";

// export default function BuyerOrderHistoryPage() {
//   const cartItems = useCartStore((state) => state.cartItems);
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const toggleCart = () => setIsCartOpen(!isCartOpen);
//   const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const { user } = useUser();
//   const [rawOrders, setRawOrders] = useState<RawOrder[]>([]); // Store RawOrder
//   const [loading, setLoading] = useState(true);
//   console.log("ORDERS DATA ============================> ", rawOrders);

//   useEffect(() => {
//     if (user?.id) {
//       setLoading(true);
//       fetchOrdersByBuyer(user.id)
//         .then((data) => {
//           setRawOrders(data);
//           setLoading(false);
//         })
//         .catch((error) => {
//           console.error("Error fetching buyer orders:", error);
//           setLoading(false);
//           // Handle error appropriately, e.g., setError state
//         });
//     }
//   }, [user?.id]);

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
//       <main className="pt-24 px-8 pb-8">
//         <h1 className="text-2xl font-bold mb-8">Your Order History</h1>
//         <Suspense fallback={<OrderTableSkeleton />}>
//           <OrderHistoryTable orders={rawOrders} />{" "}
//           {/* Pass RawOrder[] to the table */}
//         </Suspense>
//       </main>
//     </div>
//   );
// }
"use client";

import { useCartStore } from "@/lib/services/cartStore";
import { fetchOrdersByBuyer } from "@/lib/services/orders";
import type { RawOrder } from "@/lib/types";
import { useUser } from "@clerk/nextjs";
import { Suspense, useEffect, useMemo, useState } from "react";
import Header from "../components/header";
import OrderFilters, {
  type OrderFilters as FilterType,
} from "./components/order-filters";
import OrderHistoryTable from "./components/order-history-table";
import OrderTableSkeleton from "./components/order-table-skeleton";

export default function BuyerOrderHistoryPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user } = useUser();
  const [rawOrders, setRawOrders] = useState<RawOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // Filter state
  const [filters, setFilters] = useState<FilterType>({
    status: "all",
    dateRange: {
      from: "",
      to: "",
    },
    minAmount: "",
    maxAmount: "",
    searchTerm: "",
    sortBy: "createdAt",
    sortOrder: "desc",
  });

  useEffect(() => {
    if (user?.id) {
      setLoading(true);
      fetchOrdersByBuyer(user.id)
        .then((data) => {
          setRawOrders(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching buyer orders:", error);
          setLoading(false);
        });
    }
  }, [user?.id]);

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...rawOrders];

    // Apply status filter
    if (filters.status !== "all") {
      filtered = filtered.filter((order) => order.status === filters.status);
    }

    // Apply search filter
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber?.toLowerCase().includes(searchLower) ||
          order.id.toLowerCase().includes(searchLower)
      );
    }

    // Apply date range filter
    if (filters.dateRange.from) {
      const fromDate = new Date(filters.dateRange.from);
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= fromDate
      );
    }
    if (filters.dateRange.to) {
      const toDate = new Date(filters.dateRange.to);
      toDate.setHours(23, 59, 59, 999); // Include the entire day
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) <= toDate
      );
    }

    // Apply amount range filter
    if (filters.minAmount) {
      const minAmount = Number.parseFloat(filters.minAmount);
      filtered = filtered.filter(
        (order) => Number.parseFloat(order.total) >= minAmount
      );
    }
    if (filters.maxAmount) {
      const maxAmount = Number.parseFloat(filters.maxAmount);
      filtered = filtered.filter(
        (order) => Number.parseFloat(order.total) <= maxAmount
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      switch (filters.sortBy) {
        case "createdAt":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        case "total":
          aValue = Number.parseFloat(a.total);
          bValue = Number.parseFloat(b.total);
          break;
        case "orderNumber":
          aValue = a.orderNumber || a.id;
          bValue = b.orderNumber || b.id;
          break;
        case "status":
          aValue = a.status;
          bValue = b.status;
          break;
        default:
          aValue = a.createdAt;
          bValue = b.createdAt;
      }

      if (aValue < bValue) return filters.sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return filters.sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [rawOrders, filters]);

  const handleFiltersChange = (newFilters: FilterType) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      status: "all",
      dateRange: {
        from: "",
        to: "",
      },
      minAmount: "",
      maxAmount: "",
      searchTerm: "",
      sortBy: "createdAt",
      sortOrder: "desc",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
      <main className="pt-24 px-4 md:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Your Order History</h1>
            <p className="text-gray-400">
              Track and manage all your orders in one place
            </p>
          </div>

          {loading ? (
            <OrderTableSkeleton />
          ) : (
            <div className="space-y-6">
              <OrderFilters
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                orderCount={filteredAndSortedOrders.length}
              />
              <Suspense fallback={<OrderTableSkeleton />}>
                <OrderHistoryTable orders={filteredAndSortedOrders} />
              </Suspense>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
