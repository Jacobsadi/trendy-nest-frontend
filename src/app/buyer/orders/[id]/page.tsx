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
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/services/cartStore";
import { fetchOrdersByBuyer } from "@/lib/services/orders";
import { fetchProductById } from "@/lib/services/products";
import { getUserById } from "@/lib/services/users";
import { useUser } from "@clerk/nextjs";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  Clock,
  CreditCard,
  HelpCircle,
  Truck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "../../components/header";
import { ImprovedActionsSection } from "./improved-actions-section";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
  product?: any; // Will store product details
}

interface Order {
  id: string;
  buyerId: string;
  orderNumber: string;
  status: string;
  total: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const orderId = params.id as string;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sellerEmail, setSellerEmail] = useState<string | null>(null);
  const [subject, setSubject] = useState("Order received - Thank you!");
  const [message, setMessage] = useState(
    "I received the order and I'm very happy with it!"
  );

  const [sending, setSending] = useState(false);
  const cartItems = useCartStore((state) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    async function loadOrder() {
      if (!user) return;

      try {
        setLoading(true);

        const orders = await fetchOrdersByBuyer(user.id);
        const currentOrder = orders.find((o) => o.id === orderId);

        if (!currentOrder) {
          setError("Order not found.");
          return;
        }

        // Verify order belongs to user (extra check)
        if (currentOrder.buyerId !== user.id) {
          router.push("/buyer/order-history");
          return;
        }

        // Attach product details to each item

        const itemsWithProducts = await Promise.all(
          (currentOrder.items ?? []).map(async (item: OrderItem) => {
            try {
              const product = await fetchProductById(item.productId);
              const sellerData = await getUserById(product.sellerId);
              const seller = await sellerData.json();
              console.log(
                "Seller Datat===================.>",
                product.sellerId
              );

              return {
                ...item,
                product,
                sellerEmail: seller.email,
              };
            } catch (err) {
              console.error(`Error fetching product ${item.productId}:`, err);
              return {
                ...item,
                product: {
                  title: "Product not found",
                  images: ["/placeholder.svg?height=80&width=80&text=❓"],
                },
                sellerEmail: null,
              };
            }
          })
        );

        setOrder({
          ...currentOrder,
          items: itemsWithProducts,
        });
        const firstSellerEmail =
          itemsWithProducts.find((item) => item.sellerEmail)?.sellerEmail ||
          null;
        setSellerEmail(firstSellerEmail);
      } catch (err) {
        console.error("Error loading order:", err);
        setError("Failed to load order details. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId, user, router]);

  function getStatusColor(status: string) {
    switch (status) {
      case "PENDING":
        return "bg-yellow-900/30 text-yellow-400 hover:bg-yellow-900/40";
      case "SHIPPED":
        return "bg-blue-900/30 text-blue-400 hover:bg-blue-900/40";
      case "DELIVERED":
        return "bg-green-900/30 text-green-400 hover:bg-green-900/40";
      case "CANCELLED":
        return "bg-red-900/30 text-red-400 hover:bg-red-900/40";
      default:
        return "bg-gray-900/30 text-gray-400 hover:bg-gray-900/40";
    }
  }

  function getStatusIcon(status: string) {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5" />;
      case "SHIPPED":
        return <Truck className="h-5 w-5" />;
      case "DELIVERED":
        return <CheckCircle className="h-5 w-5" />;
      case "CANCELLED":
        return <AlertCircle className="h-5 w-5" />;
      default:
        return <HelpCircle className="h-5 w-5" />;
    }
  }

  function getStatusSteps(status: string) {
    const steps = [
      { name: "Order Placed", status: "complete" },
      {
        name: "Processing",
        status:
          status === "PENDING"
            ? "current"
            : status === "CANCELLED"
              ? "canceled"
              : "complete",
      },
      {
        name: "Shipped",
        status:
          status === "SHIPPED"
            ? "current"
            : status === "DELIVERED"
              ? "complete"
              : status === "CANCELLED"
                ? "canceled"
                : "upcoming",
      },
      {
        name: "Delivered",
        status:
          status === "DELIVERED"
            ? "complete"
            : status === "CANCELLED"
              ? "canceled"
              : "upcoming",
      },
    ];

    return steps;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
        <main className="pt-24 px-4 md:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8 animate-pulse">
              <div className="h-6 w-32 bg-gray-700 rounded"></div>
            </div>
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-6">
              <div className="h-8 w-64 bg-gray-700 rounded mb-6"></div>
              <div className="space-y-4">
                <div className="h-24 bg-gray-700 rounded"></div>
                <div className="h-64 bg-gray-700 rounded"></div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
        <main className="pt-24 px-4 md:px-8 pb-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-800 rounded-lg border border-gray-700 p-8 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold mb-2">Order Not Found</h2>
              <p className="text-gray-400 mb-6">
                {error || "We couldn't find the order you're looking for."}
              </p>
              <Link href="/buyer/order-history">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  Return to Order History
                </Button>
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const orderTime = new Date(order.createdAt).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const statusSteps = getStatusSteps(order.status);

  const handleSend = async () => {
    if (!subject.trim() || !message.trim()) {
      return alert("Please fill out both subject and message.");
    }

    setSending(true);
    try {
      const res = await fetch("/api/send-seller", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "sadi@graduate.utm.my",
          orderId: order.orderNumber,
          status: "Received", // still available for your template logic
          subject, // buyer‑typed subject
          content: message, // buyer‑typed message
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Your confirmation email was sent!");
      } else {
        console.error(result);
        alert("Failed to send email.");
      }
    } catch (err) {
      console.error(err);
      alert("Error sending email.");
    } finally {
      setSending(false);
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} />
      <main className="pt-24 px-4 md:px-8 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            href="/buyer/history"
            className="inline-flex items-center text-gray-400 hover:text-white mb-8"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Order History
          </Link>

          {/* Order Header */}
          <div className="bg-gray-800 rounded-lg border border-gray-700 mb-6">
            <div className="p-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-white">
                    Order #{order.orderNumber}
                  </h1>
                  <p className="text-gray-400">
                    Placed on {orderDate} at {orderTime}
                  </p>
                </div>
                <Badge
                  className={`${getStatusColor(
                    order.status
                  )} flex items-center gap-2 px-3 py-1.5 text-sm`}
                >
                  {getStatusIcon(order.status)}
                  {order.status}
                </Badge>
              </div>
            </div>
          </div>

          {/* Order Status Timeline */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Order Status</CardTitle>
              <CardDescription className="text-gray-400">
                Track your order's progress
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div
                  className="absolute left-5 top-0 h-full w-0.5 bg-gray-700"
                  aria-hidden="true"
                ></div>
                <div className="space-y-8">
                  {statusSteps.map((step, index) => (
                    <div key={index} className="relative flex items-start">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full">
                        {step.status === "complete" ? (
                          <div className="h-10 w-10 rounded-full bg-green-900/30 flex items-center justify-center">
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          </div>
                        ) : step.status === "current" ? (
                          <div className="h-10 w-10 rounded-full bg-blue-900/30 flex items-center justify-center">
                            <Clock className="h-5 w-5 text-blue-400" />
                          </div>
                        ) : step.status === "canceled" ? (
                          <div className="h-10 w-10 rounded-full bg-red-900/30 flex items-center justify-center">
                            <AlertCircle className="h-5 w-5 text-red-400" />
                          </div>
                        ) : (
                          <div className="h-10 w-10 rounded-full bg-gray-700 flex items-center justify-center">
                            <div className="h-3 w-3 rounded-full bg-gray-500"></div>
                          </div>
                        )}
                      </div>
                      <div className="ml-4">
                        <h3
                          className={`text-lg font-medium ${
                            step.status === "complete"
                              ? "text-green-400"
                              : step.status === "current"
                                ? "text-blue-400"
                                : step.status === "canceled"
                                  ? "text-red-400"
                                  : "text-gray-400"
                          }`}
                        >
                          {step.name}
                        </h3>
                        {step.status === "current" && (
                          <p className="mt-1 text-sm text-gray-400">
                            {order.status === "PENDING"
                              ? "Your order is being processed"
                              : order.status === "SHIPPED"
                                ? "Your order is on the way"
                                : ""}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="bg-gray-800 border-gray-700 mb-6">
            <CardHeader>
              <CardTitle className="text-white">Order Items</CardTitle>
              <CardDescription className="text-gray-400">
                {order.items.length} item{order.items.length !== 1 ? "s" : ""}{" "}
                in your order
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 bg-gray-750 rounded-lg border border-gray-700"
                  >
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={
                          item.product?.images?.[0] ||
                          "/placeholder.svg?height=80&width=80&text=📦"
                        }
                        alt={item.product?.title || "Product"}
                        width={64}
                        height={64}
                        className="rounded-md object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="font-medium text-white">
                        {item.product?.title || "Product"}
                      </h3>
                      <p className="text-sm text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">${item.price}</p>
                      <p className="text-sm text-gray-400">
                        ${(Number(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-6 bg-gray-700" />

              <div className="space-y-2">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span>${order.total}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Tax</span>
                  <span>$0.00</span>
                </div>
                <Separator className="my-2 bg-gray-700" />
                <div className="flex justify-between font-medium text-white">
                  <span>Total</span>
                  <span>${order.total}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Truck className="h-5 w-5" />
                  Shipping Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Shipping details will be updated once your order is processed.
                </p>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">Payment method: Credit Card</p>
              </CardContent>
            </Card>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            {sellerEmail && (
              <a href={`mailto:${sellerEmail}`} className="w-fit">
                <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Need Help?
                </Button>
              </a>
            )}
            {order.status === "DELIVERED" && (
              <div>
                {/* Example usage of ImprovedActionsSection - replace with your actual data */}

                <ImprovedActionsSection
                  sellerEmail="sadi@graduate.utm.my"
                  order={order}
                  subject={subject}
                  setSubject={setSubject}
                  message={message}
                  setMessage={setMessage}
                  handleSend={handleSend}
                  sending={sending}
                />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
