// src/services/products.ts

import { mockProducts } from "../mockData";
import { Product, ProductFormData } from "../types";
const mockProductData = mockProducts[0];
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch("http://localhost:3001/products");

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [data];
  } catch (error) {
    console.error("Error fetching products:", error);
    return mockProducts;
  }
}
export async function fetchProductById(id: string): Promise<Product> {
  try {
    const response = await fetch(`http://localhost:3001/products/${id}`);

    if (!response.ok) {
      throw new Error(`Failed to fetch product: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching product details:", error);
    // Return a mock product if fetch fails
    return mockProductData;
  }
}
export async function createProduct(
  productData: ProductFormData
): Promise<Product> {
  const response = await fetch("http://localhost:3001/products", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return await response.json();
}

export async function updateProduct(
  productId: string,
  productData: ProductFormData
): Promise<Product> {
  const response = await fetch(`http://localhost:3001/products/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return await response.json();
}
