const BASE_URL = "http://localhost:3004/users";

export async function getAllUsers() {
  const res = await fetch(BASE_URL, { cache: "no-store" });
  if (!res.ok) throw new Error("Failed to fetch users");
  return await res.json();
}

export async function getUserById(userId: string) {
  const res = await fetch(`${BASE_URL}/${userId}`, { cache: "no-store" });
  if (!res.ok) throw new Error("User not found");
  return await res.json();
}

export async function createOrFindUser(data: {
  id: string;
  email: string;
  name?: string;
  role?: string;
  addresses?: any;
}) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create or find user");
  return await res.json();
}

export async function updateUser(userId: string, data: Record<string, any>) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to update user");
  return await res.json();
}

export async function deleteUser(userId: string) {
  const res = await fetch(`${BASE_URL}/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete user");
  return await res.json();
}

// Mock data for users
export const mockUsers = [
  {
    id: "USR001",
    username: "johndoe",
    email: "john.doe@example.com",
    role: "BUYER",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    address: {
      line1: "123 Main St",
      city: "New York",
      state: "NY",
      country: "USA",
      zipCode: "10001",
    },
  },
  {
    id: "USR002",
    username: "janedoe",
    email: "jane.doe@example.com",
    role: "SELLER",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=JD",
    address: {
      line1: "456 Park Ave",
      city: "Boston",
      state: "MA",
      country: "USA",
      zipCode: "02108",
    },
  },
  {
    id: "USR003",
    username: "admin",
    email: "admin@example.com",
    role: "ADMIN",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=AD",
    address: {
      line1: "789 Tech Blvd",
      city: "San Francisco",
      state: "CA",
      country: "USA",
      zipCode: "94105",
    },
  },
  {
    id: "USR004",
    username: "sarahsmith",
    email: "sarah.smith@example.com",
    role: "BUYER",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40&text=SS",
    address: {
      line1: "321 Oak St",
      city: "Chicago",
      state: "IL",
      country: "USA",
      zipCode: "60601",
    },
  },
  {
    id: "USR005",
    username: "mikebrown",
    email: "mike.brown@example.com",
    role: "SELLER",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=MB",
    address: {
      line1: "654 Pine St",
      city: "Seattle",
      state: "WA",
      country: "USA",
      zipCode: "98101",
    },
  },
  {
    id: "USR006",
    username: "emilyjones",
    email: "emily.jones@example.com",
    role: "BUYER",
    status: "active",
    avatar: "/placeholder.svg?height=40&width=40&text=EJ",
    address: {
      line1: "987 Maple Ave",
      city: "Austin",
      state: "TX",
      country: "USA",
      zipCode: "78701",
    },
  },
  {
    id: "USR007",
    username: "davidwilson",
    email: "david.wilson@example.com",
    role: "SELLER",
    status: "inactive",
    avatar: "/placeholder.svg?height=40&width=40&text=DW",
    address: {
      line1: "246 Cedar Rd",
      city: "Miami",
      state: "FL",
      country: "USA",
      zipCode: "33101",
    },
  },
];

// Mock data for products
export const mockProducts = [
  {
    id: "PRD001",
    title: "Wireless Headphones",
    price: 129.99,
    description:
      "Premium wireless headphones with noise cancellation technology, providing crystal clear sound and comfort for extended use. Features Bluetooth 5.0 connectivity and 30-hour battery life.",
    category: "Electronics",
    stock: 45,
    status: "active",
    images: [
      "/placeholder.svg?height=400&width=400&text=🎧",
      "/placeholder.svg?height=400&width=400&text=Headphones+Side",
      "/placeholder.svg?height=400&width=400&text=Headphones+Box",
    ],
  },
  {
    id: "PRD002",
    title: "Smart Watch",
    price: 199.99,
    description:
      "Advanced smartwatch with health monitoring features, GPS tracking, and smartphone notifications. Water-resistant design with a vibrant OLED display and customizable watch faces.",
    category: "Electronics",
    stock: 28,
    status: "active",
    images: [
      "/placeholder.svg?height=400&width=400&text=⌚",
      "/placeholder.svg?height=400&width=400&text=Watch+Side",
      "/placeholder.svg?height=400&width=400&text=Watch+Box",
    ],
  },
  {
    id: "PRD003",
    title: "Cotton T-Shirt",
    price: 24.99,
    description:
      "Soft and comfortable 100% cotton t-shirt, perfect for everyday wear. Available in multiple colors and sizes. Pre-shrunk fabric ensures a consistent fit wash after wash.",
    category: "Clothing",
    stock: 120,
    status: "active",
    images: [
      "/placeholder.svg?height=400&width=400&text=👕",
      "/placeholder.svg?height=400&width=400&text=T-Shirt+Back",
      "/placeholder.svg?height=400&width=400&text=T-Shirt+Detail",
    ],
  },
  {
    id: "PRD004",
    title: "Running Shoes",
    price: 89.99,
    description:
      "Lightweight and durable running shoes with responsive cushioning for maximum comfort. Breathable mesh upper and rubber outsole provide excellent traction on various surfaces.",
    category: "Footwear",
    stock: 35,
    status: "active",
    images: [
      "/placeholder.svg?height=400&width=400&text=👟",
      "/placeholder.svg?height=400&width=400&text=Shoes+Side",
      "/placeholder.svg?height=400&width=400&text=Shoes+Bottom",
    ],
  },
  {
    id: "PRD005",
    title: "Bluetooth Speaker",
    price: 79.99,
    description:
      "Portable Bluetooth speaker with 360° sound and deep bass. Waterproof design makes it perfect for outdoor use. Includes built-in microphone for hands-free calling.",
    category: "Electronics",
    stock: 52,
    status: "active",
    images: [
      "/placeholder.svg?height=400&width=400&text=🔊",
      "/placeholder.svg?height=400&width=400&text=Speaker+Top",
      "/placeholder.svg?height=400&width=400&text=Speaker+Back",
    ],
  },
  {
    id: "PRD006",
    title: "Laptop Backpack",
    price: 49.99,
    description:
      "Durable laptop backpack with padded compartments for laptops up to 15.6 inches. Features multiple pockets for organization, water-resistant material, and comfortable padded straps.",
    category: "Accessories",
    stock: 78,
    status: "active",
    images: [
      "/placeholder.svg?height=400&width=400&text=🎒",
      "/placeholder.svg?height=400&width=400&text=Backpack+Inside",
      "/placeholder.svg?height=400&width=400&text=Backpack+Side",
    ],
  },
  {
    id: "PRD007",
    title: "Stainless Steel Water Bottle",
    price: 19.99,
    description:
      "Vacuum insulated stainless steel water bottle that keeps drinks cold for 24 hours or hot for 12 hours. Leak-proof design with a wide mouth for easy filling and cleaning.",
    category: "Accessories",
    stock: 0,
    status: "out_of_stock",
    images: [
      "/placeholder.svg?height=400&width=400&text=🍶",
      "/placeholder.svg?height=400&width=400&text=Bottle+Open",
      "/placeholder.svg?height=400&width=400&text=Bottle+Colors",
    ],
  },
];
