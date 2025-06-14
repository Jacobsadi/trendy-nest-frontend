// "use client";

// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import {
//   ArrowDownRight,
//   ArrowUpRight,
//   ChevronRight,
//   DollarSign,
//   Eye,
//   Package,
//   ShoppingBag,
//   TrendingUp,
//   Users,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import {
//   Bar,
//   BarChart,
//   CartesianGrid,
//   Cell,
//   Line,
//   LineChart,
//   Pie,
//   PieChart,
//   ResponsiveContainer,
//   Tooltip,
//   XAxis,
//   YAxis,
// } from "recharts";

// // Mock data for the dashboard
// const salesData = [
//   { name: "Jan", sales: 4000 },
//   { name: "Feb", sales: 3000 },
//   { name: "Mar", sales: 5000 },
//   { name: "Apr", sales: 4500 },
//   { name: "May", sales: 6000 },
//   { name: "Jun", sales: 5500 },
//   { name: "Jul", sales: 7000 },
// ];

// const categoryData = [
//   { name: "Electronics", value: 40 },
//   { name: "Clothing", value: 25 },
//   { name: "Home", value: 20 },
//   { name: "Other", value: 15 },
// ];

// const COLORS = ["#FF9F43", "#28C76F", "#EA5455", "#7367F0"];

// const recentOrders = [
//   {
//     id: "ORD001",
//     orderNumber: "ORD-2024-001",
//     customer: "John Doe",
//     date: "2024-06-08T10:30:00Z",
//     status: "delivered",
//     total: 129.99,
//     items: 2,
//   },
//   {
//     id: "ORD002",
//     orderNumber: "ORD-2024-002",
//     customer: "Jane Smith",
//     date: "2024-06-07T14:45:00Z",
//     status: "shipped",
//     total: 89.99,
//     items: 1,
//   },
//   {
//     id: "ORD003",
//     orderNumber: "ORD-2024-003",
//     customer: "Mike Johnson",
//     date: "2024-06-07T09:15:00Z",
//     status: "processing",
//     total: 249.99,
//     items: 3,
//   },
//   {
//     id: "ORD004",
//     orderNumber: "ORD-2024-004",
//     customer: "Sarah Williams",
//     date: "2024-06-06T16:20:00Z",
//     status: "delivered",
//     total: 59.99,
//     items: 1,
//   },
// ];

// const topProducts = [
//   {
//     id: "PRD001",
//     name: "Wireless Headphones",
//     image: "/placeholder.svg?height=80&width=80&text=🎧",
//     sales: 42,
//     revenue: 5459.58,
//     stock: 18,
//   },
//   {
//     id: "PRD002",
//     name: "Smart Watch",
//     image: "/placeholder.svg?height=80&width=80&text=⌚",
//     sales: 38,
//     revenue: 7599.62,
//     stock: 12,
//   },
//   {
//     id: "PRD003",
//     name: "Bluetooth Speaker",
//     image: "/placeholder.svg?height=80&width=80&text=🔊",
//     sales: 31,
//     revenue: 2479.69,
//     stock: 24,
//   },
// ];

// export default function SellerDashboard() {
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     // Simulate loading data
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const getStatusColor = (status: string) => {
//     switch (status.toLowerCase()) {
//       case "pending":
//         return "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/40";
//       case "processing":
//         return "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40";
//       case "shipped":
//         return "bg-indigo-900/30 text-indigo-400 hover:bg-indigo-900/40";
//       case "delivered":
//         return "bg-green-900/30 text-green-400 hover:bg-green-900/40";
//       case "cancelled":
//         return "bg-red-900/30 text-red-400 hover:bg-red-900/40";
//       default:
//         return "bg-gray-900/30 text-gray-400 hover:bg-gray-900/40";
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Top Header */}
//       <header className="sticky top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
//         <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between h-16">
//           <h1 className="text-xl font-semibold text-white">Seller Dashboard</h1>
//           <div className="flex items-center space-x-4">
//             <Button
//               variant="outline"
//               className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
//             >
//               <Package className="mr-2 h-4 w-4" /> Add Product
//             </Button>
//           </div>
//         </div>
//       </header>

//       <main className="container mx-auto p-4 md:p-6 pt-6">
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
//           <div>
//             <h1 className="text-3xl font-bold text-white">
//               Analytics Overview
//             </h1>
//             <p className="text-gray-400 mt-1">
//               Welcome back! Here's what's happening with your store today.
//             </p>
//           </div>
//           <div className="mt-4 md:mt-0">
//             <Tabs defaultValue="7days" className="w-full">
//               <TabsList className="bg-gray-800 border border-gray-700">
//                 <TabsTrigger
//                   value="7days"
//                   className="data-[state=active]:bg-gray-700"
//                 >
//                   7 days
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="30days"
//                   className="data-[state=active]:bg-gray-700"
//                 >
//                   30 days
//                 </TabsTrigger>
//                 <TabsTrigger
//                   value="90days"
//                   className="data-[state=active]:bg-gray-700"
//                 >
//                   90 days
//                 </TabsTrigger>
//               </TabsList>
//             </Tabs>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="bg-orange-500/20 p-3 rounded-lg">
//                   <DollarSign className="h-6 w-6 text-orange-500" />
//                 </div>
//                 <Badge className="bg-green-900/30 text-green-400 flex items-center gap-1">
//                   <ArrowUpRight className="h-3 w-3" /> 12.5%
//                 </Badge>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm text-gray-400">Total Revenue</p>
//                 <h3 className="text-2xl font-bold text-white mt-1">
//                   $24,389.50
//                 </h3>
//               </div>
//               <div className="mt-4 flex items-center text-xs text-gray-400">
//                 <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
//                 <span className="text-green-400">$2,145.50</span>
//                 <span className="ml-1">from last period</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="bg-blue-500/20 p-3 rounded-lg">
//                   <ShoppingBag className="h-6 w-6 text-blue-500" />
//                 </div>
//                 <Badge className="bg-green-900/30 text-green-400 flex items-center gap-1">
//                   <ArrowUpRight className="h-3 w-3" /> 8.2%
//                 </Badge>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm text-gray-400">Total Orders</p>
//                 <h3 className="text-2xl font-bold text-white mt-1">182</h3>
//               </div>
//               <div className="mt-4 flex items-center text-xs text-gray-400">
//                 <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
//                 <span className="text-green-400">14</span>
//                 <span className="ml-1">from last period</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="bg-purple-500/20 p-3 rounded-lg">
//                   <Users className="h-6 w-6 text-purple-500" />
//                 </div>
//                 <Badge className="bg-green-900/30 text-green-400 flex items-center gap-1">
//                   <ArrowUpRight className="h-3 w-3" /> 5.3%
//                 </Badge>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm text-gray-400">New Customers</p>
//                 <h3 className="text-2xl font-bold text-white mt-1">48</h3>
//               </div>
//               <div className="mt-4 flex items-center text-xs text-gray-400">
//                 <ArrowUpRight className="h-3 w-3 text-green-400 mr-1" />
//                 <span className="text-green-400">12</span>
//                 <span className="ml-1">from last period</span>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="bg-red-500/20 p-3 rounded-lg">
//                   <TrendingUp className="h-6 w-6 text-red-500" />
//                 </div>
//                 <Badge className="bg-red-900/30 text-red-400 flex items-center gap-1">
//                   <ArrowDownRight className="h-3 w-3" /> 3.1%
//                 </Badge>
//               </div>
//               <div className="mt-4">
//                 <p className="text-sm text-gray-400">Conversion Rate</p>
//                 <h3 className="text-2xl font-bold text-white mt-1">3.42%</h3>
//               </div>
//               <div className="mt-4 flex items-center text-xs text-gray-400">
//                 <ArrowDownRight className="h-3 w-3 text-red-400 mr-1" />
//                 <span className="text-red-400">0.11%</span>
//                 <span className="ml-1">from last period</span>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
//             <CardHeader>
//               <CardTitle className="text-white">Sales Overview</CardTitle>
//               <CardDescription className="text-gray-400">
//                 Monthly sales performance
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="pl-2">
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart
//                     data={salesData}
//                     margin={{
//                       top: 5,
//                       right: 30,
//                       left: 20,
//                       bottom: 5,
//                     }}
//                   >
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                     <XAxis dataKey="name" stroke="#9CA3AF" />
//                     <YAxis stroke="#9CA3AF" />
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         borderColor: "#374151",
//                         color: "#F9FAFB",
//                       }}
//                       itemStyle={{ color: "#F9FAFB" }}
//                       labelStyle={{ color: "#F9FAFB" }}
//                     />
//                     <Bar dataKey="sales" fill="#FF9F43" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader>
//               <CardTitle className="text-white">Sales by Category</CardTitle>
//               <CardDescription className="text-gray-400">
//                 Distribution across categories
//               </CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="h-80 flex items-center justify-center">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={categoryData}
//                       cx="50%"
//                       cy="50%"
//                       labelLine={false}
//                       outerRadius={80}
//                       fill="#8884d8"
//                       dataKey="value"
//                       label={({ name, percent }: any) =>
//                         `${name} ${(percent * 100).toFixed(0)}%`
//                       }
//                     >
//                       {categoryData.map((entry, index) => (
//                         <Cell
//                           key={`cell-${index}`}
//                           fill={COLORS[index % COLORS.length]}
//                         />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       contentStyle={{
//                         backgroundColor: "#1F2937",
//                         borderColor: "#374151",
//                         color: "#F9FAFB",
//                       }}
//                       itemStyle={{ color: "#F9FAFB" }}
//                       labelStyle={{ color: "#F9FAFB" }}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Recent Orders */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <Card className="bg-gray-800 border-gray-700 lg:col-span-2">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle className="text-white">Recent Orders</CardTitle>
//                 <CardDescription className="text-gray-400">
//                   Latest customer purchases
//                 </CardDescription>
//               </div>
//               <Button
//                 variant="outline"
//                 className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
//               >
//                 View All
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentOrders.map((order) => (
//                   <div
//                     key={order.id}
//                     className="flex items-center justify-between p-4 bg-gray-700 rounded-lg border border-gray-600"
//                   >
//                     <div>
//                       <h3 className="font-medium text-white">
//                         {order.orderNumber}
//                       </h3>
//                       <p className="text-sm text-gray-400">{order.customer}</p>
//                       <p className="text-xs text-gray-500">
//                         {new Date(order.date).toLocaleDateString("en-US", {
//                           month: "short",
//                           day: "numeric",
//                           year: "numeric",
//                         })}
//                       </p>
//                     </div>
//                     <div className="text-center">
//                       <p className="text-white font-medium">
//                         ${order.total.toFixed(2)}
//                       </p>
//                       <p className="text-xs text-gray-400">
//                         {order.items} items
//                       </p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <Badge className={getStatusColor(order.status)}>
//                         {order.status.charAt(0).toUpperCase() +
//                           order.status.slice(1)}
//                       </Badge>
//                       <Link href={`/seller/orders/${order.id}`}>
//                         <Button
//                           variant="ghost"
//                           size="icon"
//                           className="h-8 w-8 text-gray-400 hover:text-white"
//                         >
//                           <ChevronRight className="h-4 w-4" />
//                         </Button>
//                       </Link>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>

//           <Card className="bg-gray-800 border-gray-700">
//             <CardHeader className="flex flex-row items-center justify-between">
//               <div>
//                 <CardTitle className="text-white">Top Products</CardTitle>
//                 <CardDescription className="text-gray-400">
//                   Best selling items
//                 </CardDescription>
//               </div>
//               <Button
//                 variant="outline"
//                 className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
//               >
//                 View All
//               </Button>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {topProducts.map((product) => (
//                   <div
//                     key={product.id}
//                     className="flex items-center p-3 bg-gray-700 rounded-lg border border-gray-600"
//                   >
//                     <div className="relative h-12 w-12 flex-shrink-0">
//                       <Image
//                         src={product.image || "/placeholder.svg"}
//                         alt={product.name}
//                         fill
//                         className="object-cover rounded-md"
//                       />
//                     </div>
//                     <div className="ml-4 flex-grow">
//                       <h3 className="font-medium text-white">{product.name}</h3>
//                       <div className="flex items-center text-xs text-gray-400">
//                         <span>{product.sales} sold</span>
//                         <span className="mx-2">•</span>
//                         <span>${product.revenue.toFixed(2)}</span>
//                       </div>
//                     </div>
//                     <Link href={`/seller/products/${product.id}`}>
//                       <Button
//                         variant="ghost"
//                         size="icon"
//                         className="h-8 w-8 text-gray-400 hover:text-white"
//                       >
//                         <Eye className="h-4 w-4" />
//                       </Button>
//                     </Link>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         {/* Revenue Trends */}
//         <Card className="bg-gray-800 border-gray-700 mb-8">
//           <CardHeader>
//             <CardTitle className="text-white">Revenue Trends</CardTitle>
//             <CardDescription className="text-gray-400">
//               Daily revenue for the past week
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="pl-2">
//             <div className="h-80">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={salesData}
//                   margin={{
//                     top: 5,
//                     right: 30,
//                     left: 20,
//                     bottom: 5,
//                   }}
//                 >
//                   <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                   <XAxis dataKey="name" stroke="#9CA3AF" />
//                   <YAxis stroke="#9CA3AF" />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: "#1F2937",
//                       borderColor: "#374151",
//                       color: "#F9FAFB",
//                     }}
//                     itemStyle={{ color: "#F9FAFB" }}
//                     labelStyle={{ color: "#F9FAFB" }}
//                   />
//                   <Line
//                     type="monotone"
//                     dataKey="sales"
//                     stroke="#FF9F43"
//                     strokeWidth={2}
//                     dot={{ r: 4 }}
//                     activeDot={{ r: 6 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </CardContent>
//         </Card>
//       </main>
//     </div>
//   );
// }
// "use client";

// import { DollarSign, ShoppingBag, TrendingUp, Users } from "lucide-react";
// import { useEffect, useState } from "react";
// import { CategoryChart } from "./components/CategoryChart";
// import { MetricCard } from "./components/MetricCard";
// import { RecentOrders } from "./components/RecentOrders";
// import { RevenueChart } from "./components/RevenueChart";
// import { SalesChart } from "./components/SalesChart";
// import { TopProducts } from "./components/TopProducts";
// import Header from "./products/components/Header";

// // Icon mapping for metrics
// const iconMap = {
//   DollarSign,
//   ShoppingBag,
//   Users,
//   TrendingUp,
// };

// // Metrics data
// const metricsData = [
//   {
//     title: "Total Revenue",
//     value: "$24,389.50",
//     change: 12.5,
//     changeValue: "$2,145.50",
//     icon: "DollarSign" as keyof typeof iconMap,
//     iconColor: "bg-orange-500/20 text-orange-500",
//     isPositive: true,
//   },
//   {
//     title: "Total Orders",
//     value: "182",
//     change: 8.2,
//     changeValue: "14",
//     icon: "ShoppingBag" as keyof typeof iconMap,
//     iconColor: "bg-blue-500/20 text-blue-500",
//     isPositive: true,
//   },
//   {
//     title: "New Customers",
//     value: "48",
//     change: 5.3,
//     changeValue: "12",
//     icon: "Users" as keyof typeof iconMap,
//     iconColor: "bg-purple-500/20 text-purple-500",
//     isPositive: true,
//   },
//   {
//     title: "Conversion Rate",
//     value: "3.42%",
//     change: 3.1,
//     changeValue: "0.11%",
//     icon: "TrendingUp" as keyof typeof iconMap,
//     iconColor: "bg-red-500/20 text-red-500",
//     isPositive: false,
//   },
// ];
// const salesData = [
//   { name: "Jan", sales: 4000 },
//   { name: "Feb", sales: 3000 },
//   { name: "Mar", sales: 5000 },
//   { name: "Apr", sales: 4500 },
//   { name: "May", sales: 6000 },
//   { name: "Jun", sales: 5500 },
//   { name: "Jul", sales: 7000 },
// ];

// const categoryData = [
//   { name: "Electronics", value: 40 },
//   { name: "Clothing", value: 25 },
//   { name: "Home", value: 20 },
//   { name: "Other", value: 15 },
// ];

// const recentOrders = [
//   {
//     id: "ORD001",
//     orderNumber: "ORD-2024-001",
//     customer: "John Doe",
//     date: "2024-06-08T10:30:00Z",
//     status: "delivered",
//     total: 129.99,
//     items: 2,
//   },
//   {
//     id: "ORD002",
//     orderNumber: "ORD-2024-002",
//     customer: "Jane Smith",
//     date: "2024-06-07T14:45:00Z",
//     status: "shipped",
//     total: 89.99,
//     items: 1,
//   },
// ];

// const topProducts = [
//   {
//     id: "PRD001",
//     name: "Wireless Headphones",
//     image: "/placeholder.svg?height=80&width=80&text=🎧",
//     sales: 42,
//     revenue: 5459.58,
//     stock: 18,
//   },
//   {
//     id: "PRD002",
//     name: "Smart Watch",
//     image: "/placeholder.svg?height=80&width=80&text=⌚",
//     sales: 38,
//     revenue: 7599.62,
//     stock: 12,
//   },
// ];

// export default function SellerDashboard() {
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedPeriod, setSelectedPeriod] = useState("7days");

//   useEffect(() => {
//     // Simulate loading data
//     const timer = setTimeout(() => {
//       setIsLoading(false);
//     }, 1000);

//     return () => clearTimeout(timer);
//   }, []);

//   const handlePeriodChange = (period: string) => {
//     setSelectedPeriod(period);
//     // Here you would typically fetch new data based on the selected period
//     console.log("Period changed to:", period);
//   };

//   if (isLoading) {
//     return (
//       <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />

//       <div className="p-4  py-44 pt-24 px-8 pb-8">
//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//           {metricsData.map((metric, index) => {
//             const IconComponent = iconMap[metric.icon];
//             return (
//               <MetricCard
//                 key={index}
//                 title={metric.title}
//                 value={metric.value}
//                 change={metric.change}
//                 changeValue={metric.changeValue}
//                 icon={IconComponent}
//                 iconColor={metric.iconColor}
//                 isPositive={metric.isPositive}
//               />
//             );
//           })}
//         </div>

//         {/* Charts */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <SalesChart data={salesData} />
//           <CategoryChart data={categoryData} />
//         </div>

//         {/* Recent Orders and Top Products */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           <RecentOrders orders={recentOrders} />
//           <TopProducts products={topProducts} />
//         </div>

//         {/* Revenue Trends */}
//         <RevenueChart data={salesData} />
//       </div>
//     </div>
//   );
// }
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
