import HomeClient from "@/app/buyer/home-client";
import { fetchProducts } from "@/lib/services/products";
import type { Product } from "@/lib/types";

export default async function HomePage() {
  const products: Product[] = await fetchProducts();

  return <HomeClient products={products} />;
}
