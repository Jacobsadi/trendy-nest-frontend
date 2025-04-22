import { Suspense } from "react";
import Header from "./components/Header";
import ProductsTable from "./components/products-table";
import ProductsTableSkeleton from "./components/products-table-skeleton";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <main className="pt-24 px-8 pb-8">
        <h1 className="text-2xl font-bold mb-8">PRODUCT LIST</h1>
        <Suspense fallback={<ProductsTableSkeleton />}>
          <ProductsTable />
        </Suspense>
      </main>
    </div>
  );
}
