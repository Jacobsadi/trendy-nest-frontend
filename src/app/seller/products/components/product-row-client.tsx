// app/seller/products/components/product-row-client.tsx
"use client";

import { Button } from "@/components/ui/button";
import { deleteProduct } from "@/lib/services/products";
import { Pencil, Trash2 } from "lucide-react";
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

  return (
    <tr className="border-b border-gray-700 hover:bg-gray-750">
      <td className="p-4">{/* <Checkbox /> */}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="w-16 h-16 bg-gray-700 rounded-md overflow-hidden flex items-center justify-center">
            <Image
              src={product.images[0] || "/placeholder.svg?height=64&width=64"}
              alt={product.title}
              width={64}
              height={64}
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium">{product.title}</p>
          </div>
        </div>
      </td>
      <td className="p-4">${product.price.toFixed(2)}</td>
      <td className="p-4">
        <p>{product.quantity} Item Left</p>
        {/* <p className="text-gray-400">0 Sold</p> */}
      </td>
      <td className="p-4">{product.category}</td>
      <td className="p-4">
        <div className="flex gap-2">
          {/* <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            <Eye className="h-4 w-4" />
          </Button> */}
          <Link href={`/seller/products/${product.id}/edit`}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-orange-400 hover:text-orange-300"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-400 hover:text-red-300"
            onClick={handleDelete}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </td>
    </tr>
  );
}
