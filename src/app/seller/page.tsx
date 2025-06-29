"use client";

import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";

import { fetchOrders } from "@/lib/services/orders";
import { fetchProducts } from "@/lib/services/products";
import { CategoryChart } from "./components/CategoryChart";
import { MetricCard } from "./components/MetricCard";
import { RecentOrders } from "./components/RecentOrders";
import { RevenueChart } from "./components/RevenueChart";
import { SalesChart } from "./components/SalesChart";
import { TopProducts } from "./components/TopProducts";
import Header from "./products/components/Header";

// Helper to group products by category
function groupProductsByCategory(products: any[]) {
  const categoryMap: Record<string, number> = {};

  for (const product of products) {
    const category = product.category;
    categoryMap[category] = (categoryMap[category] || 0) + 1;
  }

  return Object.entries(categoryMap).map(([name, value]) => ({
    name,
    value,
  }));
}

const iconMap = {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
};

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 4500 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 5500 },
  { name: "Jul", sales: 7000 },
];

const topProducts = [
  {
    id: "PRD001",
    name: "Wireless Headphones",
    image: "/placeholder.svg?height=80&width=80&text=🎧",
    sales: 42,
    revenue: 5459.58,
    stock: 18,
  },
  {
    id: "PRD002",
    name: "Smart Watch",
    image: "/placeholder.svg?height=80&width=80&text=⌚",
    sales: 38,
    revenue: 7599.62,
    stock: 12,
  },
];
type Metric = {
  title: string;
  value: string;
  change: number;
  changeValue: string;
  icon: keyof typeof iconMap; // ✅ strict typing
  iconColor: string;
  isPositive: boolean;
};

export default function SellerDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]); // ✅ store real products
  const [selectedPeriod, setSelectedPeriod] = useState("7days");
  const [metricsData, setMetricsData] = useState<Metric[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    async function loadData() {
      const [orders, productData] = await Promise.all([
        fetchOrders(),
        fetchProducts(),
      ]);
      const simpleRecentOrders = orders.slice(0, 2).map((order: any) => {
        console.log("===============================================", order);
        const total =
          typeof order.total === "string"
            ? parseFloat(order.total.replace(/[^0-9.]/g, ""))
            : order.total;

        return {
          id: order.id,
          orderNumber: order.orderNumber,
          customer: order.orderNumber || "Unknoefefwn",

          // 👈 show last 6 chars for uniqueness
          date: order.createdAt,
          status: order.status || "UNKNOWN",
          total,
          items: Array.isArray(order.items) ? order.items.length : 0,
        };
      });

      setRecentOrders(simpleRecentOrders);

      setRecentOrders(simpleRecentOrders);
      setProducts(productData);

      // --- Date setup for comparisons ---
      const now = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(now.getDate() - 7);

      const recentOrders = orders.filter(
        (order: any) => new Date(order.createdAt) >= sevenDaysAgo
      );
      const previousOrders = orders.filter(
        (order: any) => new Date(order.createdAt) < sevenDaysAgo
      );

      // --- Total Revenue ---
      const totalRevenue = orders.reduce((sum: number, order: any) => {
        const rawTotal =
          typeof order.total === "string"
            ? order.total.replace(/[^0-9.]/g, "") // remove $ and commas
            : order.total;
        const total = parseFloat(rawTotal);
        return !isNaN(total) ? sum + total : sum;
      }, 0);

      // --- Total Orders & Change ---
      const totalOrders = recentOrders.length;
      const previousOrderCount = previousOrders.length || 1; // avoid divide by zero
      const orderChange =
        ((totalOrders - previousOrderCount) / previousOrderCount) * 100;

      // --- Unique Buyers / New Customers ---
      const recentBuyerIds = new Set(recentOrders.map((o: any) => o.buyerId));
      const previousBuyerIds = new Set(
        previousOrders.map((o: any) => o.buyerId)
      );
      const newBuyers = Array.from(recentBuyerIds).filter(
        (id) => !previousBuyerIds.has(id)
      );
      const newCustomerChange =
        (newBuyers.length / (previousBuyerIds.size || 1)) * 100;

      // --- Conversion Rate (optional) ---
      const totalVisitors = 1000; // you can pull from analytics
      const conversionRate = (totalOrders / totalVisitors) * 100;

      const dynamicMetrics = [
        {
          title: "Total Revenue",
          value: `$${totalRevenue.toFixed(2)}`,
          change: 12.5, // Static or dynamic logic can go here
          changeValue: `$${totalRevenue.toFixed(2)}`,
          icon: "DollarSign" as keyof typeof iconMap,
          iconColor: "bg-orange-500/20 text-orange-500",
          isPositive: totalRevenue >= 0,
        },
        {
          title: "Total Orders",
          value: totalOrders.toString(),
          change: parseFloat(orderChange.toFixed(1)),
          changeValue: `${totalOrders - previousOrderCount}`,
          icon: "ShoppingBag" as keyof typeof iconMap,
          iconColor: "bg-blue-500/20 text-blue-500",
          isPositive: orderChange >= 0,
        },
        {
          title: "New Customers",
          value: newBuyers.length.toString(),
          change: parseFloat(newCustomerChange.toFixed(1)),
          changeValue: newBuyers.length.toString(),
          icon: "Users" as keyof typeof iconMap,
          iconColor: "bg-purple-500/20 text-purple-500",
          isPositive: newCustomerChange >= 0,
        },
        {
          title: "Conversion Rate",
          value: `${conversionRate.toFixed(2)}%`,
          change: 0, // or calculated from previous visitor data
          changeValue: "0%", // placeholder
          icon: "TrendingUp" as keyof typeof iconMap,
          iconColor: "bg-red-500/20 text-red-500",
          isPositive: conversionRate >= 0,
        },
      ];

      setMetricsData(dynamicMetrics);
      setIsLoading(false);
    }

    loadData();
  }, []);

  const handlePeriodChange = (period: string) => {
    setSelectedPeriod(period);
    console.log("Period changed to:", period);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const categoryData = groupProductsByCategory(products); // ✅ now dynamic

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="p-4 py-44 pt-24 px-8 pb-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData.length > 0 &&
            metricsData.map((metric, index) => {
              const IconComponent = iconMap[metric.icon];
              return (
                <MetricCard
                  key={index}
                  title={metric.title}
                  value={metric.value}
                  change={metric.change}
                  changeValue={metric.changeValue}
                  icon={IconComponent}
                  iconColor={metric.iconColor}
                  isPositive={metric.isPositive}
                />
              );
            })}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <SalesChart data={salesData} />
          <CategoryChart products={products} />{" "}
          {/* ✅ now takes real products */}
        </div>

        {/* Recent Orders and Top Products */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <RecentOrders orders={recentOrders} />

          <TopProducts products={topProducts} />
        </div>

        {/* Revenue Trends */}
        <RevenueChart data={salesData} />
      </div>
    </div>
  );
}
