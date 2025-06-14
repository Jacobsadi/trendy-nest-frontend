// "use client";

// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { mockProducts, mockUsers } from "@/lib/services/users";
// import {
//   ChevronDown,
//   MoreHorizontal,
//   Search,
//   ShoppingBag,
//   Users,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// export default function AdminDashboard() {
//   const router = useRouter();
//   const [userSearchQuery, setUserSearchQuery] = useState("");
//   const [userRoleFilter, setUserRoleFilter] = useState("All");

//   const [productSearchQuery, setProductSearchQuery] = useState("");
//   const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
//   const [itemToDelete, setItemToDelete] = useState<{
//     id: string;
//     type: "user" | "product";
//   } | null>(null);
//   const [users, setUsers] = useState(mockUsers);
//   const [products, setProducts] = useState(mockProducts);
//   const [productCategoryFilter, setProductCategoryFilter] = useState("All");

//   // Filter users based on search query
//   const filteredUsers = users.filter(
//     (user) =>
//       (user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
//         user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
//         user.id.toLowerCase().includes(userSearchQuery.toLowerCase())) &&
//       (userRoleFilter === "All" || user.role === userRoleFilter)
//   );

//   // Get unique product categories
//   const productCategories = [
//     "All",
//     ...Array.from(new Set(products.map((product) => product.category))),
//   ];

//   // Filter products based on search query and category
//   const filteredProducts = products.filter(
//     (product) =>
//       (product.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
//         product.id.toLowerCase().includes(productSearchQuery.toLowerCase())) &&
//       (productCategoryFilter === "All" ||
//         product.category === productCategoryFilter)
//   );

//   // Handle delete confirmation
//   const handleDeleteClick = (id: string, type: "user" | "product") => {
//     setItemToDelete({ id, type });
//     setDeleteDialogOpen(true);
//   };

//   // Handle delete confirmation
//   const handleDeleteConfirm = () => {
//     if (itemToDelete) {
//       if (itemToDelete.type === "user") {
//         setUsers(users.filter((user) => user.id !== itemToDelete.id));
//       } else {
//         setProducts(
//           products.filter((product) => product.id !== itemToDelete.id)
//         );
//       }
//       setDeleteDialogOpen(false);
//       setItemToDelete(null);
//     }
//   };

//   // Navigate to user edit page
//   const handleUserClick = (userId: string) => {
//     router.push(`/admin/users/${userId}`);
//   };

//   // Navigate to product details page
//   const handleProductClick = (productId: string) => {
//     router.push(`/admin/products/${productId}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       {/* Top Header */}
//       <header className="sticky top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
//         <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between h-16">
//           <h1 className="text-xl font-semibold text-white">
//             <Link href="/">Admin Dashboard</Link>
//           </h1>

//           <nav className="flex space-x-1 mt-2 sm:mt-0">
//             <Button
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-700"
//               onClick={() => document.getElementById("users-tab")?.click()}
//             >
//               <Users className="h-4 w-4 mr-2" />
//               Users
//             </Button>
//             <Button
//               variant="ghost"
//               className="text-gray-300 hover:text-white hover:bg-gray-700"
//               onClick={() => document.getElementById("products-tab")?.click()}
//             >
//               <ShoppingBag className="h-4 w-4 mr-2" />
//               Products
//             </Button>
//           </nav>
//         </div>
//       </header>

//       {/* Main content */}
//       <div className="flex-1">
//         <main className="container mx-auto p-4 md:p-6 pt-6">
//           {/* Dashboard overview cards */}
//           <div className="grid gap-4 md:grid-cols-2 mb-6">
//             <Card className="bg-gray-800 border-gray-700">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-300">
//                   Total Users
//                 </CardTitle>
//                 <CardDescription className="text-gray-400">
//                   All registered users
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-white">
//                   {users.length}
//                 </div>
//                 <div className="text-xs text-gray-400">
//                   <span className="text-green-400 font-medium">+2.5%</span> from
//                   last month
//                 </div>
//               </CardContent>
//             </Card>
//             <Card className="bg-gray-800 border-gray-700">
//               <CardHeader className="pb-2">
//                 <CardTitle className="text-sm font-medium text-gray-300">
//                   Total Products
//                 </CardTitle>
//                 <CardDescription className="text-gray-400">
//                   All available products
//                 </CardDescription>
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold text-white">
//                   {products.length}
//                 </div>
//                 <div className="text-xs text-gray-400">
//                   <span className="text-green-400 font-medium">+4.3%</span> from
//                   last month
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Tabs for Users and Products */}
//           <Tabs defaultValue="users" className="w-full">
//             <TabsList className="mb-4 bg-gray-800 text-gray-400">
//               <TabsTrigger
//                 id="users-tab"
//                 value="users"
//                 className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
//               >
//                 <Users className="h-4 w-4" />
//                 Users
//               </TabsTrigger>
//               <TabsTrigger
//                 id="products-tab"
//                 value="products"
//                 className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
//               >
//                 <ShoppingBag className="h-4 w-4" />
//                 Products
//               </TabsTrigger>
//             </TabsList>

//             {/* Users Tab Content */}
//             <TabsContent value="users" className="space-y-4">
//               <div className="flex flex-col sm:flex-row justify-between gap-4">
//                 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                   <div className="relative w-full sm:w-72">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                     <Input
//                       type="search"
//                       placeholder="Search users..."
//                       className="w-full pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
//                       value={userSearchQuery}
//                       onChange={(e) => setUserSearchQuery(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-full sm:w-48">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
//                         >
//                           {userRoleFilter}
//                           <ChevronDown className="h-4 w-4 opacity-50" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-300">
//                         {["All", "ADMIN", "SELLER", "BUYER"].map((role) => (
//                           <DropdownMenuItem
//                             key={role}
//                             onClick={() => setUserRoleFilter(role)}
//                             className={`hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white ${
//                               userRoleFilter === role
//                                 ? "bg-gray-700 text-white"
//                                 : ""
//                             }`}
//                           >
//                             {role}
//                           </DropdownMenuItem>
//                         ))}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-700 text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       <tr>
//                         <th className="px-6 py-3 text-left">User</th>
//                         <th className="px-6 py-3 text-left">Email</th>
//                         <th className="px-6 py-3 text-left">Role</th>
//                         <th className="px-6 py-3 text-left">Status</th>
//                         <th className="px-6 py-3 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-700 bg-gray-800">
//                       {filteredUsers.length > 0 ? (
//                         filteredUsers.map((user) => (
//                           <tr
//                             key={user.id}
//                             className="hover:bg-gray-700 cursor-pointer"
//                             onClick={() => handleUserClick(user.id)}
//                           >
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center">
//                                 <Avatar className="h-8 w-8 mr-3">
//                                   <AvatarImage
//                                     src={user.avatar || "/placeholder.svg"}
//                                     alt={user.username}
//                                   />
//                                   <AvatarFallback className="bg-gray-700 text-gray-300">
//                                     {user.username
//                                       .substring(0, 2)
//                                       .toUpperCase()}
//                                   </AvatarFallback>
//                                 </Avatar>
//                                 <div>
//                                   <div className="font-medium text-white">
//                                     {user.username}
//                                   </div>
//                                   <div className="text-xs text-gray-400">
//                                     {user.id}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-gray-300">
//                               {user.email}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <Badge
//                                 variant={
//                                   user.role === "ADMIN"
//                                     ? "destructive"
//                                     : user.role === "SELLER"
//                                     ? "default"
//                                     : "secondary"
//                                 }
//                                 className={
//                                   user.role === "ADMIN"
//                                     ? "bg-red-900/30 text-red-400 hover:bg-red-900/40"
//                                     : user.role === "SELLER"
//                                     ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40"
//                                     : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//                                 }
//                               >
//                                 {user.role}
//                               </Badge>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <Badge
//                                 className={
//                                   user.status === "active"
//                                     ? "bg-green-900/30 text-green-400 hover:bg-green-900/40"
//                                     : "bg-red-900/30 text-red-400 hover:bg-red-900/40"
//                                 }
//                               >
//                                 {user.status}
//                               </Badge>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right">
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger
//                                   asChild
//                                   onClick={(e) => e.stopPropagation()}
//                                 >
//                                   <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="text-gray-400 hover:text-white hover:bg-gray-700"
//                                   >
//                                     <MoreHorizontal className="h-4 w-4" />
//                                     <span className="sr-only">Open menu</span>
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent
//                                   align="end"
//                                   className="bg-gray-800 border-gray-700 text-gray-300"
//                                 >
//                                   <DropdownMenuItem
//                                     className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleUserClick(user.id);
//                                     }}
//                                   >
//                                     Edit
//                                   </DropdownMenuItem>
//                                   <DropdownMenuItem
//                                     className="text-red-400 hover:bg-gray-700 hover:text-red-400 focus:bg-gray-700 focus:text-red-400"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleDeleteClick(user.id, "user");
//                                     }}
//                                   >
//                                     Delete
//                                   </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan={5}
//                             className="px-6 py-4 text-center text-gray-400"
//                           >
//                             No users found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </TabsContent>

//             {/* Products Tab Content */}
//             <TabsContent value="products" className="space-y-4">
//               <div className="flex flex-col sm:flex-row justify-between gap-4">
//                 <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
//                   <div className="relative w-full sm:w-72">
//                     <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
//                     <Input
//                       type="search"
//                       placeholder="Search products..."
//                       className="w-full pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
//                       value={productSearchQuery}
//                       onChange={(e) => setProductSearchQuery(e.target.value)}
//                     />
//                   </div>
//                   <div className="w-full sm:w-48">
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button
//                           variant="outline"
//                           className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
//                         >
//                           {productCategoryFilter}
//                           <ChevronDown className="h-4 w-4 opacity-50" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-300">
//                         {productCategories.map((category) => (
//                           <DropdownMenuItem
//                             key={category}
//                             onClick={() => setProductCategoryFilter(category)}
//                             className={`hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white ${
//                               productCategoryFilter === category
//                                 ? "bg-gray-700 text-white"
//                                 : ""
//                             }`}
//                           >
//                             {category}
//                           </DropdownMenuItem>
//                         ))}
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </div>
//                 </div>
//               </div>

//               <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
//                 <div className="overflow-x-auto">
//                   <table className="w-full">
//                     <thead className="bg-gray-700 text-xs font-medium text-gray-300 uppercase tracking-wider">
//                       <tr>
//                         <th className="px-6 py-3 text-left">Product</th>
//                         <th className="px-6 py-3 text-left">Category</th>
//                         <th className="px-6 py-3 text-left">Price</th>
//                         <th className="px-6 py-3 text-left">Stock</th>
//                         <th className="px-6 py-3 text-left">Status</th>
//                         <th className="px-6 py-3 text-right">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody className="divide-y divide-gray-700 bg-gray-800">
//                       {filteredProducts.length > 0 ? (
//                         filteredProducts.map((product) => (
//                           <tr
//                             key={product.id}
//                             className="hover:bg-gray-700 cursor-pointer"
//                             onClick={() => handleProductClick(product.id)}
//                           >
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center">
//                                 <div className="h-12 w-12 flex-shrink-0 mr-3 rounded bg-gray-700 overflow-hidden">
//                                   <Image
//                                     src={
//                                       product.images[0] || "/placeholder.svg"
//                                     }
//                                     alt={product.title}
//                                     width={60}
//                                     height={60}
//                                     className="h-full w-full object-cover"
//                                   />
//                                 </div>
//                                 <div>
//                                   <div className="font-medium text-white">
//                                     {product.title}
//                                   </div>
//                                   <div className="text-xs text-gray-400">
//                                     {product.id}
//                                   </div>
//                                 </div>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <Badge
//                                 variant="outline"
//                                 className="border-gray-700 text-gray-300"
//                               >
//                                 {product.category}
//                               </Badge>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-gray-300">
//                               ${product.price.toFixed(2)}
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <div className="flex items-center">
//                                 <div
//                                   className={`h-2.5 w-2.5 rounded-full mr-2 ${
//                                     product.stock > 50
//                                       ? "bg-green-400"
//                                       : product.stock > 10
//                                       ? "bg-yellow-400"
//                                       : "bg-red-400"
//                                   }`}
//                                 ></div>
//                                 <span className="text-gray-300">
//                                   {product.stock} units
//                                 </span>
//                               </div>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap">
//                               <Badge
//                                 className={
//                                   product.status === "active"
//                                     ? "bg-green-900/30 text-green-400 hover:bg-green-900/40"
//                                     : "bg-red-900/30 text-red-400 hover:bg-red-900/40"
//                                 }
//                               >
//                                 {product.status === "active"
//                                   ? "Active"
//                                   : "Out of Stock"}
//                               </Badge>
//                             </td>
//                             <td className="px-6 py-4 whitespace-nowrap text-right">
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger
//                                   asChild
//                                   onClick={(e) => e.stopPropagation()}
//                                 >
//                                   <Button
//                                     variant="ghost"
//                                     size="icon"
//                                     className="text-gray-400 hover:text-white hover:bg-gray-700"
//                                   >
//                                     <MoreHorizontal className="h-4 w-4" />
//                                     <span className="sr-only">Open menu</span>
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent
//                                   align="end"
//                                   className="bg-gray-800 border-gray-700 text-gray-300"
//                                 >
//                                   <DropdownMenuItem
//                                     className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleProductClick(product.id);
//                                     }}
//                                   >
//                                     View Details
//                                   </DropdownMenuItem>
//                                   <DropdownMenuItem
//                                     className="text-red-400 hover:bg-gray-700 hover:text-red-400 focus:bg-gray-700 focus:text-red-400"
//                                     onClick={(e) => {
//                                       e.stopPropagation();
//                                       handleDeleteClick(product.id, "product");
//                                     }}
//                                   >
//                                     Delete
//                                   </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             </td>
//                           </tr>
//                         ))
//                       ) : (
//                         <tr>
//                           <td
//                             colSpan={6}
//                             className="px-6 py-4 text-center text-gray-400"
//                           >
//                             No products found
//                           </td>
//                         </tr>
//                       )}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </main>
//       </div>

//       {/* Delete Confirmation Dialog */}
//       <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
//         <DialogContent className="bg-gray-800 border-gray-700 text-white">
//           <DialogHeader>
//             <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
//             <DialogDescription className="text-gray-400">
//               Are you sure you want to delete this {itemToDelete?.type}? This
//               action cannot be undone.
//             </DialogDescription>
//           </DialogHeader>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setDeleteDialogOpen(false)}
//               className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
//             >
//               Cancel
//             </Button>
//             <Button
//               variant="destructive"
//               onClick={handleDeleteConfirm}
//               className="bg-red-500 hover:bg-red-600 text-white"
//             >
//               Delete
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { deleteProduct, fetchProducts } from "@/lib/services/products";
import {
  deleteUser,
  getAllUsers,
  mockProducts,
  mockUsers,
} from "@/lib/services/users";
import {
  ChevronDown,
  MoreHorizontal,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";
import AdminHeader from "./AdminHeader";

export default function AdminDashboard() {
  const router = useRouter();
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [userRoleFilter, setUserRoleFilter] = useState("All");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: "user" | "product";
  } | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [products, setProducts] = useState(mockProducts);
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedUsers = await getAllUsers();
        if (Array.isArray(fetchedUsers) && fetchedUsers.length > 0) {
          const mappedUsers = fetchedUsers.map((user) => ({
            id: user.id,
            username: user.email?.split("@")[0] || "unknown",
            email: user.email,
            role: user.role,
            status: "active",
            avatar: `/placeholder.svg?height=40&width=40&text=${user.email
              ?.charAt(0)
              .toUpperCase()}`,
            address: user.addresses || {
              line1: "-",
              city: "-",
              state: "-",
              country: "-",
              zipCode: "-",
            },
          }));
          setUsers(mappedUsers);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }

      try {
        const fetchedProducts = await fetchProducts();
        if (Array.isArray(fetchedProducts) && fetchedProducts.length > 0) {
          const mappedProducts = fetchedProducts.map((product) => ({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            category: product.category || "Uncategorized",
            stock: product.quantity,
            status: product.quantity > 0 ? "active" : "out_of_stock",
            images: product.images?.length
              ? product.images
              : ["/placeholder.svg"],
          }));
          setProducts(mappedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    loadData();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      (user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
        user.id.toLowerCase().includes(userSearchQuery.toLowerCase())) &&
      (userRoleFilter === "All" || user.role === userRoleFilter)
  );

  const productCategories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  const filteredProducts = products.filter(
    (product) =>
      (product.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(productSearchQuery.toLowerCase())) &&
      (productCategoryFilter === "All" ||
        product.category === productCategoryFilter)
  );

  const handleDeleteClick = (id: string, type: "user" | "product") => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!itemToDelete) return;

    try {
      if (itemToDelete.type === "user") {
        await deleteUser(itemToDelete.id);
        setUsers((prev) => prev.filter((user) => user.id !== itemToDelete.id));
      } else {
        await deleteProduct(itemToDelete.id);
        setProducts((prev) =>
          prev.filter((product) => product.id !== itemToDelete.id)
        );
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      // Optional: show error feedback
    } finally {
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  const handleUserClick = (userId: string) => {
    router.push(`/admin/users/${userId}`);
  };

  const handleProductClick = (productId: string) => {
    router.push(`/admin/products/${productId}`);
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Header */}
      <AdminHeader />

      {/* Main content */}
      <div className="flex-1">
        <main className="container mx-auto p-4 md:p-6 pt-6">
          {/* Dashboard overview cards */}
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Users
                </CardTitle>
                <CardDescription className="text-gray-400">
                  All registered users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {users.length}
                </div>
                <div className="text-xs text-gray-400">
                  <span className="text-green-400 font-medium">+2.5%</span> from
                  last month
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-gray-300">
                  Total Products
                </CardTitle>
                <CardDescription className="text-gray-400">
                  All available products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-white">
                  {products.length}
                </div>
                <div className="text-xs text-gray-400">
                  <span className="text-green-400 font-medium">+4.3%</span> from
                  last month
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tabs for Users and Products */}
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="mb-4 bg-gray-800 text-gray-400">
              <TabsTrigger
                id="users-tab"
                value="users"
                className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
                id="products-tab"
                value="products"
                className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                <ShoppingBag className="h-4 w-4" />
                Products
              </TabsTrigger>
            </TabsList>

            {/* Users Tab Content */}
            <TabsContent value="users" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search users..."
                      className="w-full pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={userSearchQuery}
                      onChange={(e) => setUserSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          {userRoleFilter}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-300">
                        {["All", "ADMIN", "SELLER", "BUYER"].map((role) => (
                          <DropdownMenuItem
                            key={role}
                            onClick={() => setUserRoleFilter(role)}
                            className={`hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white ${
                              userRoleFilter === role
                                ? "bg-gray-700 text-white"
                                : ""
                            }`}
                          >
                            {role}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700 text-xs font-medium text-gray-300 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3 text-left">User</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Role</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link
                                href={`/admin/users/${user.id}`}
                                className="flex items-center"
                              >
                                <Avatar className="h-8 w-8 mr-3">
                                  <AvatarImage
                                    src={user.avatar || "/placeholder.svg"}
                                    alt={user.username}
                                  />
                                  <AvatarFallback className="bg-gray-700 text-gray-300">
                                    {user.username
                                      .substring(0, 2)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-medium text-white">
                                    {user.username}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {/* ID hidden */}
                                  </div>
                                </div>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              <Link href={`/admin/users/${user.id}`}>
                                {user.email}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link href={`/admin/users/${user.id}`}>
                                <Badge
                                  variant={
                                    user.role === "ADMIN"
                                      ? "destructive"
                                      : user.role === "SELLER"
                                        ? "default"
                                        : "secondary"
                                  }
                                  className={
                                    user.role === "ADMIN"
                                      ? "bg-red-900/30 text-red-400 hover:bg-red-900/40"
                                      : user.role === "SELLER"
                                        ? "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                  }
                                >
                                  {user.role}
                                </Badge>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Link href={`/admin/users/${user.id}`}>
                                <Badge
                                  className={
                                    user.status === "active"
                                      ? "bg-green-900/30 text-green-400 hover:bg-green-900/40"
                                      : "bg-red-900/30 text-red-400 hover:bg-red-900/40"
                                  }
                                >
                                  {user.status}
                                </Badge>
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-gray-800 border-gray-700 text-gray-300"
                                >
                                  <DropdownMenuItem
                                    className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      router.push(`/admin/users/${user.id}`);
                                    }}
                                  >
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-400 hover:bg-gray-700 hover:text-red-400 focus:bg-gray-700 focus:text-red-400"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(user.id, "user");
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={5}
                            className="px-6 py-4 text-center text-gray-400"
                          >
                            No users found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>

            {/* Products Tab Content */}
            <TabsContent value="products" className="space-y-4">
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="w-full pl-9 bg-gray-800 border-gray-700 text-white placeholder:text-gray-400"
                      value={productSearchQuery}
                      onChange={(e) => setProductSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-48">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-between bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                          {productCategoryFilter}
                          <ChevronDown className="h-4 w-4 opacity-50" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-gray-800 border-gray-700 text-gray-300">
                        {productCategories.map((category) => (
                          <DropdownMenuItem
                            key={category}
                            onClick={() => setProductCategoryFilter(category)}
                            className={`hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white ${
                              productCategoryFilter === category
                                ? "bg-gray-700 text-white"
                                : ""
                            }`}
                          >
                            {category}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700 text-xs font-medium text-gray-300 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3 text-left">Product</th>
                        <th className="px-6 py-3 text-left">Category</th>
                        <th className="px-6 py-3 text-left">Price</th>
                        <th className="px-6 py-3 text-left">Stock</th>
                        <th className="px-6 py-3 text-left">Status</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <tr
                            key={product.id}
                            className="hover:bg-gray-700 cursor-pointer"
                            onClick={() => handleProductClick(product.id)}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 mr-3 rounded bg-gray-700 overflow-hidden">
                                  <Image
                                    src={
                                      product.images[0] || "/placeholder.svg"
                                    }
                                    alt={product.title}
                                    width={60}
                                    height={60}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium text-white">
                                    {product.title}
                                  </div>
                                  <div className="text-xs text-gray-400">
                                    {product.description}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                variant="outline"
                                className="border-gray-700 text-gray-300"
                              >
                                {product.category}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              ${product.price.toFixed(2)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full mr-2 ${
                                    product.stock > 50
                                      ? "bg-green-400"
                                      : product.stock > 10
                                        ? "bg-yellow-400"
                                        : "bg-red-400"
                                  }`}
                                ></div>
                                <span className="text-gray-300">
                                  {product.stock} units
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <Badge
                                className={
                                  product.status === "active"
                                    ? "bg-green-900/30 text-green-400 hover:bg-green-900/40"
                                    : "bg-red-900/30 text-red-400 hover:bg-red-900/40"
                                }
                              >
                                {product.status === "active"
                                  ? "Active"
                                  : "Out of Stock"}
                              </Badge>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger
                                  asChild
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white hover:bg-gray-700"
                                  >
                                    <MoreHorizontal className="h-4 w-4" />
                                    <span className="sr-only">Open menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                  align="end"
                                  className="bg-gray-800 border-gray-700 text-gray-300"
                                >
                                  <DropdownMenuItem
                                    className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleProductClick(product.id);
                                    }}
                                  >
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-400 hover:bg-gray-700 hover:text-red-400 focus:bg-gray-700 focus:text-red-400"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteClick(product.id, "product");
                                    }}
                                  >
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan={6}
                            className="px-6 py-4 text-center text-gray-400"
                          >
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete this {itemToDelete?.type}? This
              action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
