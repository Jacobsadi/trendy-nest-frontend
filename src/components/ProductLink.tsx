import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface ProductLinkProps {
  productId: string;
}

export function ProductLink({ productId }: ProductLinkProps) {
  return (
    <div className="mt-3 flex flex-col space-y-2">
      <div className="text-xs text-gray-400">Recommended product:</div>
      <Link
        href={`/buyer/products/details/${productId}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center gap-2 rounded-md bg-gradient-to-r from-orange-500 to-orange-600 px-3 py-2 text-sm font-medium text-white transition-all hover:from-orange-600 hover:to-orange-700"
      >
        View Product Details
        <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </Link>
    </div>
  );
}
