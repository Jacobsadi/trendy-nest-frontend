"use client";

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
import {
  ChevronDown,
  MoreHorizontal,
  Search,
  ShoppingBag,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

// Mock data for users
const mockUsers = [
  {
    id: "USR001",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "BUYER",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: "USR002",
    username: "janedoe",
    email: "jane.doe@example.com",
    role: "SELLER",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
  },
  {
    id: "USR003",
    username: "admin",
    email: "admin@example.com",
    role: "ADMIN",
    avatar: "/placeholder.svg?height=40&width=40&text=AD",
  },
  {
    id: "USR004",
    username: "sarahsmith",
    email: "sarah.smith@example.com",
    role: "BUYER",
    avatar: "/placeholder.svg?height=40&width=40&text=SS",
  },
  {
    id: "USR005",
    username: "mikebrown",
    email: "mike.brown@example.com",
    role: "SELLER",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
  },
  {
    id: "USR006",
    username: "emilyjones",
    email: "emily.jones@example.com",
    role: "BUYER",
    avatar: "/placeholder.svg?height=40&width=40&text=EJ",
  },
  {
    id: "USR007",
    username: "davidwilson",
    email: "david.wilson@example.com",
    role: "SELLER",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
  },
];

// Mock data for products
const mockProducts = [
  {
    id: "PRD001",
    title: "Wireless Headphones",
    price: 129.99,
    category: "Electronics",
    stock: 45,
    image: "/placeholder.svg?height=60&width=60&text=🎧",
  },
  {
    id: "PRD002",
    title: "Smart Watch",
    price: 199.99,
    category: "Electronics",
    stock: 28,
    image: "/placeholder.svg?height=60&width=60&text=⌚",
  },
  {
    id: "PRD003",
    title: "Cotton T-Shirt",
    price: 24.99,
    category: "Clothing",
    stock: 120,
    image: "/placeholder.svg?height=60&width=60&text=👕",
  },
  {
    id: "PRD004",
    title: "Running Shoes",
    price: 89.99,
    category: "Footwear",
    stock: 35,
    image: "/placeholder.svg?height=60&width=60&text=👟",
  },
  {
    id: "PRD005",
    title: "Bluetooth Speaker",
    price: 79.99,
    category: "Electronics",
    stock: 52,
    image: "/placeholder.svg?height=60&width=60&text=🔊",
  },
  {
    id: "PRD006",
    title: "Laptop Backpack",
    price: 49.99,
    category: "Accessories",
    stock: 78,
    image: "/placeholder.svg?height=60&width=60&text=🎒",
  },
  {
    id: "PRD007",
    title: "Stainless Steel Water Bottle",
    price: 19.99,
    category: "Accessories",
    stock: 94,
    image: "/placeholder.svg?height=60&width=60&text=🍶",
  },
];

export default function AdminDashboard() {
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [productSearchQuery, setProductSearchQuery] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<{
    id: string;
    type: "user" | "product";
  } | null>(null);
  const [users, setUsers] = useState(mockUsers);
  const [products, setProducts] = useState(mockProducts);
  const [productCategoryFilter, setProductCategoryFilter] = useState("All");

  // Filter users based on search query
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(userSearchQuery.toLowerCase())
  );

  // Get unique product categories
  const productCategories = [
    "All",
    ...Array.from(new Set(products.map((product) => product.category))),
  ];

  // Filter products based on search query and category
  const filteredProducts = products.filter(
    (product) =>
      (product.title.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        product.id.toLowerCase().includes(productSearchQuery.toLowerCase())) &&
      (productCategoryFilter === "All" ||
        product.category === productCategoryFilter)
  );

  // Handle delete confirmation
  const handleDeleteClick = (id: string, type: "user" | "product") => {
    setItemToDelete({ id, type });
    setDeleteDialogOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (itemToDelete) {
      if (itemToDelete.type === "user") {
        setUsers(users.filter((user) => user.id !== itemToDelete.id));
      } else {
        setProducts(
          products.filter((product) => product.id !== itemToDelete.id)
        );
      }
      setDeleteDialogOpen(false);
      setItemToDelete(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="hidden md:flex w-64 flex-col fixed inset-y-0 z-50 bg-gray-800 border-r border-gray-700">
        <div className="flex h-14 items-center border-b border-gray-700 px-4">
          <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid gap-1 px-2">
            <Button
              variant="ghost"
              className="justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <Users className="h-4 w-4" />
              Users
            </Button>
            <Button
              variant="ghost"
              className="justify-start gap-2 text-gray-300 hover:text-white hover:bg-gray-700"
            >
              <ShoppingBag className="h-4 w-4" />
              Products
            </Button>
          </nav>
        </div>
      </div>

      {/* Mobile header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center border-b border-gray-700 bg-gray-800 px-4">
        <h1 className="text-lg font-semibold text-white">Admin Dashboard</h1>
      </div>

      {/* Main content */}
      <div className="flex-1 md:pl-64">
        <main className="container mx-auto p-4 md:p-6 pt-16 md:pt-6">
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
                value="users"
                className="flex items-center gap-2 data-[state=active]:bg-gray-700 data-[state=active]:text-white"
              >
                <Users className="h-4 w-4" />
                Users
              </TabsTrigger>
              <TabsTrigger
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
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Add User
                </Button>
              </div>

              <div className="rounded-lg border border-gray-700 bg-gray-800 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-700 text-xs font-medium text-gray-300 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3 text-left">User</th>
                        <th className="px-6 py-3 text-left">Email</th>
                        <th className="px-6 py-3 text-left">Role</th>
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {filteredUsers.length > 0 ? (
                        filteredUsers.map((user) => (
                          <tr key={user.id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
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
                                    {user.id}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-gray-300">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
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
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
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
                                  <DropdownMenuItem className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-400 hover:bg-gray-700 hover:text-red-400 focus:bg-gray-700 focus:text-red-400"
                                    onClick={() =>
                                      handleDeleteClick(user.id, "user")
                                    }
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
                            colSpan={4}
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
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Add Product
                </Button>
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
                        <th className="px-6 py-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <tr key={product.id} className="hover:bg-gray-700">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="h-12 w-12 flex-shrink-0 mr-3 rounded bg-gray-700 overflow-hidden">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
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
                                    {product.id}
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
                            <td className="px-6 py-4 whitespace-nowrap text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
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
                                  <DropdownMenuItem className="hover:bg-gray-700 hover:text-white focus:bg-gray-700 focus:text-white">
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    className="text-red-400 hover:bg-gray-700 hover:text-red-400 focus:bg-gray-700 focus:text-red-400"
                                    onClick={() =>
                                      handleDeleteClick(product.id, "product")
                                    }
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
