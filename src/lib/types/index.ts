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
  buyerId: string;
  total: string;
  status: string;
  createdAt: string;
  items?: any[];
}
export interface OrderRow {
  id: string;
  createdAt: string;
  customer: string; // now formatted address
  priority: string;
  total: string;
  paymentStatus: "Paid" | "Unpaid";
  items: number;
  deliveryNumber: string;
  orderStatus: string;
}
