"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { deleteProduct, fetchProducts } from "@/lib/services/products";
import { mockProducts } from "@/lib/services/users";
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  status: string;
  images: string[];
}

export default function ProductDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const prevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) =>
          (prevIndex - 1 + product.images.length) % product.images.length
      );
    }
  };
  const nextImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % product.images.length
      );
    }
  };
  const handleDelete = async () => {
    try {
      await deleteProduct(productId);
      setDeleteDialogOpen(false);
      router.push("/admin");
    } catch (error) {
      console.error("Failed to delete product:", error);
      // Optionally show error toast or dialog here
    }
  };
  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts();
        const fallbackProducts = mockProducts;
        const allProducts =
          Array.isArray(products) && products.length > 0
            ? products
            : fallbackProducts;

        const found = allProducts.find((p) => p.id === productId);

        if (!found) throw new Error("Product not found");

        const quantity = (found as any).quantity ?? (found as any).stock ?? 0;

        setProduct({
          id: found.id,
          title: found.title,
          description: found.description,
          price: found.price,
          category: found.category || "Uncategorized",
          stock: quantity,
          status: quantity > 0 ? "active" : "out_of_stock",
          images: found.images?.length ? found.images : ["/placeholder.svg"],
        });
      } catch (err) {
        console.error("Failed to fetch product:", err);
        router.push("/admin");
      } finally {
        setIsLoading(false);
      }
    };

    if (productId) loadProduct();
  }, [productId, router]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-50 w-full bg-gray-800 border-b border-gray-700 shadow-md">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between h-16">
          <h1 className="text-xl font-semibold text-white">
            <Link href="/">Admin Dashboard</Link>
          </h1>
        </div>
      </header>

      {/* Main content */}
      <div className="flex-1">
        <main className="container mx-auto p-4 md:p-6 pt-6">
          {/* Breadcrumb */}
          <div className="flex items-center mb-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link href="/" className="text-gray-400 hover:text-white">
              Products
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-300">Product Details</span>
          </div>

          {/* Back button */}
          <div className="flex justify-between items-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Products
            </Link>
            <Button
              variant="destructive"
              size="sm"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={() => setDeleteDialogOpen(true)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Product
            </Button>
          </div>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Product Image Carousel */}
            <Card className="bg-gray-800 border-gray-700 overflow-hidden">
              <CardContent className="p-0 relative">
                <div className="relative aspect-square w-full">
                  <Image
                    src={
                      product.images[currentImageIndex] || "/placeholder.svg"
                    }
                    alt={product.title}
                    fill
                    className="object-contain p-4"
                  />

                  {product.images.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white rounded-full p-2 hover:bg-gray-900/80"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-900/60 text-white rounded-full p-2 hover:bg-gray-900/80"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex justify-center gap-2 p-4 bg-gray-700/50">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-16 h-16 rounded overflow-hidden border-2 ${
                          currentImageIndex === index
                            ? "border-orange-500"
                            : "border-transparent"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Product Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h1 className="text-2xl font-bold text-white">
                        {product.title}
                      </h1>
                      <Badge
                        className={
                          product.status === "active"
                            ? "bg-green-900/30 text-green-400 hover:bg-green-900/40"
                            : "bg-red-900/30 text-red-400 hover:bg-red-900/40"
                        }
                      >
                        {product.status === "active"
                          ? "Active"
                          : "Out of Stock"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">{product.id}</p>
                  </div>

                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-white">
                      ${product.price.toFixed(2)}
                    </span>
                    <Badge
                      variant="outline"
                      className="ml-4 border-gray-700 text-gray-300"
                    >
                      {product.category}
                    </Badge>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white mb-2">
                      Description
                    </h2>
                    <p className="text-gray-300">{product.description}</p>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white mb-2">
                      Inventory
                    </h2>
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-300">Stock Count:</span>
                        <div className="flex items-center">
                          <div
                            className={`h-2.5 w-2.5 rounded-full mr-2 ${
                              product.stock > 50
                                ? "bg-green-400"
                                : product.stock > 10
                                ? "bg-yellow-400"
                                : "bg-red-400"
                            }`}
                          ></div>
                          <span className="text-white font-medium">
                            {product.stock} units
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-300">Status:</span>
                        <span className="text-white font-medium">
                          {product.status === "active"
                            ? "In Stock"
                            : "Out of Stock"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4 pt-4">
                    <Button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white">
                      Edit Product
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-gray-800 border-gray-700 text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-gray-400">
              Are you sure you want to delete{" "}
              <span className="font-medium text-white">{product.title}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
