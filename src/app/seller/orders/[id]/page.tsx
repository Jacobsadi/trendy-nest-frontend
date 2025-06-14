// import { fetchOrderById } from "@/lib/services/orders";
// import { fetchProductById } from "@/lib/services/products";

// export default async function OrderDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const order = await fetchOrderById(params.id);

//   // fetch product details for each item
//   const itemsWithProduct = await Promise.all(
//     (order.items || []).map(async (item) => {
//       const product = await fetchProductById(item.productId);
//       return { ...item, productTitle: product?.title || "Unknown Product" };
//     })
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
//       <p>Buyer: {order.buyerEmail}</p>
//       <p>Address: {order.buyerAddress}</p>
//       <p>Status: {order.status}</p>
//       <p>Total: ${order.total}</p>

//       <h2 className="text-xl font-semibold mt-4">Items</h2>
//       <ul className="space-y-2">
//         {itemsWithProduct.map((item) => (
//           <li key={item.id} className="border p-3 rounded">
//             <p>
//               <strong>Product:</strong> {item.productTitle}
//             </p>
//             <p>Quantity: {item.quantity}</p>
//             <p>Price: ${item.price}</p>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchOrderById } from "@/lib/services/orders";
import { fetchProductById } from "@/lib/services/products";
import {
  Calendar,
  ChevronLeft,
  CreditCard,
  MapPin,
  Package,
  Truck,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../products/components/Header";
import { fetchBuyerData, formatBuyerAddress } from "../components/utils";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  productTitle?: string;
  productImage?: string;
}

interface Order {
  id: string;
  orderNumber: string;
  buyerEmail: string;
  buyerAddress: string;
  status: string;
  total: number;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [itemsWithProduct, setItemsWithProduct] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedOrder = await fetchOrderById(orderId);

        const buyerData = await fetchBuyerData(fetchedOrder.buyerId);
        const buyerEmail = buyerData?.email || "N/A";
        const buyerAddress = buyerData
          ? formatBuyerAddress(buyerData.addresses)
          : "Unknown Address";

        const itemsWithProductData = await Promise.all(
          (fetchedOrder.items || []).map(async (item) => {
            const product = await fetchProductById(item.productId);
            return {
              ...item,
              price: Number(item.price),
              productTitle: product?.title || "Unknown Product",
              productImage:
                product?.images?.[0] ||
                "/placeholder.svg?height=80&width=80&text=📦",
            };
          })
        );

        setOrder({
          ...fetchedOrder,
          total: Number(fetchedOrder.total),
          items: (fetchedOrder.items ?? []).map((item) => ({
            ...item,
            price: Number(item.price),
          })),
          buyerEmail,
          buyerAddress, // ✅ add enriched address
        });

        setItemsWithProduct(itemsWithProductData);
      } catch (error) {
        console.error("Error fetching order:", error);
        router.push("/seller/orders");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderId, router]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/40";
      case "processing":
        return "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40";
      case "shipped":
        return "bg-green-900/30 text-green-400 hover:bg-green-900/40";
      case "delivered":
        return "bg-green-900/30 text-green-400 hover:bg-green-900/40";
      case "cancelled":
        return "bg-red-900/30 text-red-400 hover:bg-red-900/40";
      default:
        return "bg-gray-900/30 text-gray-400 hover:bg-gray-900/40";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return <Calendar className="h-4 w-4" />;
      case "processing":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <Package className="h-4 w-4" />;
      default:
        return <Package className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Order Not Found</h2>
          <Link
            href="/seller/orders"
            className="text-orange-500 hover:text-orange-400"
          >
            Return to Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="flex-1 py-14">
        <main className="container mx-auto p-4 md:p-6 pt-6">
          <div className="flex items-center mb-6 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white">
              Dashboard
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <Link
              href="/seller/orders"
              className="text-gray-400 hover:text-white"
            >
              Orders
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-300">Order Details</span>
          </div>

          <Link
            href="/seller/orders"
            className="inline-flex items-center text-gray-400 hover:text-white mb-6"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Orders
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">
                Order #{order.orderNumber}
              </h1>
              <p className="text-gray-400">
                Placed on{" "}
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <Badge
                className={`${getStatusColor(
                  order.status
                )} flex items-center gap-2 px-3 py-2 text-sm`}
              >
                {getStatusIcon(order.status)}
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white font-medium">{order.buyerEmail}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white">{order.buyerAddress}</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">
                    ${(order.total * 0.9).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span className="text-white">
                    ${(order.total * 0.1).toFixed(2)}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-white">
                      Total
                    </span>
                    <span className="text-lg font-semibold text-white">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="h-5 w-5" />
                Order Items ({itemsWithProduct.length})
              </CardTitle>
              <CardDescription className="text-gray-400">
                Products included in this order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {itemsWithProduct.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 p-4 bg-gray-700 rounded-lg border border-gray-600"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.productImage || "/placeholder.svg"}
                        alt={item.productTitle || "Product"}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-white">
                        {item.productTitle}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-400">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Update Order Status
            </Button>
            <Button
              variant="outline"
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
            >
              Print Order
            </Button>
            <Button
              variant="outline"
              className="bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600 hover:text-white"
              onClick={async () => {
                try {
                  const res = await fetch("/api/send-confirmation", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      to: order.buyerEmail,
                      orderId: order.orderNumber,
                      status: order.status,
                    }),
                  });

                  const result = await res.json();
                  if (res.ok) {
                    alert("Email sent successfully!");
                  } else {
                    console.error(result);
                    alert("Failed to send email.");
                  }
                } catch (err) {
                  console.error(err);
                  alert("Error sending email.");
                }
              }}
            >
              Send Email to Customer
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
