// export interface Product {
//   id: string;
//   title: string;
//   description: string;
//   price: number;
//   quantity: number;
//   sellerId: string;
//   images: string[];
//   createdAt: string;
//   updatedAt: string;
// }
// export interface ProductFormData {
//   title: string;
//   description: string;
//   price: number;
//   quantity: number;
//   sellerId?: string;
//   images: string[];
// }
// export interface RawOrder {
//   id: string;
//   buyerId: string;
//   total: string;
//   status: string;
//   createdAt: string;
//   items?: any[];
// }
// export interface OrderRow {
//   id: string;
//   createdAt: string;
//   customer: string; // now formatted address
//   priority: string;
//   total: string;
//   paymentStatus: "Paid" | "Unpaid";
//   items: number;
//   deliveryNumber: string;
//   orderStatus: string;
// }
// src/lib/types.ts (or your index.ts for types)
// src/lib/types.ts

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  sellerId: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
  category: string;
}

export interface ProductFormData {
  title: string;
  description: string;
  price: number;
  quantity: number;
  sellerId?: string;
  images: string[];
}

export interface RawOrder {
  id: string;
  orderNumber: string;
  buyerId: string;
  total: string;
  status: string;
  createdAt: string;
  items?: {
    id: string;
    orderId: string;
    productId: string;
    quantity: number;
    price: string;
  }[];
}

export interface BuyerAddress {
  city: string;
  line1: string;
  line2?: string; // Optional based on your data
  state: string;
  country: string;
  zipCode: string;
}

export interface Buyer {
  id: string;
  email: string;
  role: string;
  addresses: BuyerAddress; // Assuming 'addresses' is singular based on your example
  createdAt: string;
  updatedAt: string;
}

// EnrichedOrder combines RawOrder with specific buyer details for display
export interface EnrichedOrder extends RawOrder {
  buyerEmail: string;
  buyerAddress: string; // Formatted address string
}

// MOCK_RAW_ORDERS can be defined here if needed for fallback in utils.ts
/*
export const MOCK_RAW_ORDERS: RawOrder[] = [
  {
    id: "mock-8b94b89c",
    orderNumber: "MOCK-ORD-153716",
    buyerId: "mock-user_valid", // Use an ID that might have a mock buyer
    total: "160.50",
    status: "PENDING",
    createdAt: "2025-05-18T15:37:16.221Z",
    items: [{ id: "item1", orderId: "mock-8b94b89c", productId: "prod1", quantity: 1, price: "160.50" }]
  },
];
// Mock buyer data if you want to test enrichment offline
export const MOCK_BUYERS: Record<string, Buyer> = {
  "mock-user_valid": {
    id: "mock-user_valid",
    email: "mock.buyer@example.com",
    role: "BUYER",
    addresses: {
      city: "Mockville",
      line1: "123 Mock St",
      state: "MS",
      country: "MC",
      zipCode: "00000"
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z"
  }
};
*/
