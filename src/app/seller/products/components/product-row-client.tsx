// // app/seller/products/components/product-row-client.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import { deleteProduct } from "@/lib/services/products";
// import { Pencil, Trash2 } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// export default function ProductRowClient({ product }: { product: any }) {
//   const router = useRouter();

//   const handleDelete = async () => {
//     const confirmed = confirm("Are you sure you want to delete this product?");
//     if (!confirmed) return;

//     try {
//       await deleteProduct(product.id);

//       router.refresh();
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <tr className="border-b border-gray-700 hover:bg-gray-750">
//       <td className="p-4">{/* <Checkbox /> */}</td>
//       <td className="p-4">
//         <div className="flex items-center gap-3">
//           <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
//             <Image
//               src={product.images[0] || "/placeholder.svg?height=64&width=64"}
//               alt={product.title}
//               width={64}
//               height={64}
//               className="object-cover"
//             />
//           </div>
//           <div>
//             <p className="font-medium">{product.title}</p>
//           </div>
//         </div>
//       </td>
//       <td className="p-4">${product.price.toFixed(2)}</td>
//       <td className="p-4">
//         <p>{product.quantity} Item Left</p>
//         {/* <p className="text-gray-400">0 Sold</p> */}
//       </td>
//       <td className="p-4">{product.category}</td>
//       <td className="p-4">
//         <div className="flex gap-2">
//           {/* <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 text-gray-400 hover:text-white"
//           >
//             <Eye className="h-4 w-4" />
//           </Button> */}
//           <Link href={`/seller/products/${product.id}/edit`}>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-8 w-8 text-orange-400 hover:text-orange-300"
//             >
//               <Pencil className="h-4 w-4" />
//             </Button>
//           </Link>
//           <Button
//             variant="ghost"
//             size="icon"
//             className="h-8 w-8 text-red-400 hover:text-red-300"
//             onClick={handleDelete}
//           >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       </td>
//     </tr>
//   );
// }
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteProduct } from "@/lib/services/products";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProductRowClient({ product }: { product: any }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  const getStockStatus = (quantity: number) => {
    if (quantity === 0) {
      return { label: "Out of Stock", variant: "destructive" as const };
    } else if (quantity < 10) {
      return { label: "Low Stock", variant: "secondary" as const };
    } else {
      return { label: "In Stock", variant: "default" as const };
    }
  };

  const stockStatus = getStockStatus(product.quantity);

  return (
    <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
      <td className="p-4">
        <input
          type="checkbox"
          className="rounded border-slate-300 dark:border-slate-600"
        />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden flex items-center justify-center flex-shrink-0">
            <Image
              src={product.images?.[0] || "/placeholder.svg?height=48&width=48"}
              alt={product.title}
              width={48}
              height={48}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="min-w-0 flex-1">
            <p className="font-medium text-slate-900 dark:text-white truncate">
              {product.title}
            </p>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="font-medium text-slate-900 dark:text-white">
          ${product.price.toFixed(2)}
        </span>
      </td>
      <td className="p-4">
        <div>
          <p className="font-medium text-slate-900 dark:text-white">
            {product.quantity}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            items left
          </p>
        </div>
      </td>
      <td className="p-4">
        <Badge variant="outline" className="capitalize">
          {product.category}
        </Badge>
      </td>
      <td className="p-4">
        <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
      </td>
      <td className="p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem asChild>
              <Link
                href={`/seller/products/${product.id}`}
                className="flex items-center"
              >
                <Eye className="h-4 w-4 mr-2" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link
                href={`/seller/products/${product.id}/edit`}
                className="flex items-center"
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Product
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={handleDelete}
              className="text-red-600 dark:text-red-400 focus:text-red-600 dark:focus:text-red-400"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </td>
    </tr>
  );
}
