// import { Suspense } from "react";
// import Header from "./components/Header";
// import ProductsTable from "./components/products-table";
// import ProductsTableSkeleton from "./components/products-table-skeleton";

// export default function ProductsPage() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <Header />
//       <main className="pt-24 px-8 pb-8">
//         <h1 className="text-2xl font-bold mb-8">PRODUCT LIST</h1>
//         <Suspense fallback={<ProductsTableSkeleton />}>
//           <ProductsTable />
//         </Suspense>
//       </main>
//     </div>
//   );
// }
import { Suspense } from "react";
import Header from "./components/Header";
import ProductsTable from "./components/products-table";
import ProductsTableSkeleton from "./components/products-table-skeleton";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      <main className="pt-24 px-4 sm:px-6 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Product Management
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage your product inventory, pricing, and availability
            </p>
          </div>

          <Suspense fallback={<ProductsTableSkeleton />}>
            <ProductsTable />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
