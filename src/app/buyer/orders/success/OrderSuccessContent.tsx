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
import {
  fetchProductById,
  updateProductQuantity,
} from "@/lib/services/products";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  CreditCard,
  Home,
  Mail,
  Package,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  buyerId: string;
  total: string;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderId = searchParams.get("orderId");
  const paymentIntent = searchParams.get("payment_intent");
  const { user } = useUser();

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const cartItems = useCartStore((state) => state.cartItems);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const toggleCart = () => setIsCartOpen(!isCartOpen);
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const hasCreatedOrderRef = useRef(false); // ✅ flag to prevent re-creation
  useEffect(() => {
    async function createOrderAfterPayment() {
      if (!user || hasCreatedOrderRef.current || cartItems.length === 0) return;

      try {
        setLoading(true);
        hasCreatedOrderRef.current = true; // ✅ mark as created before starting

        const buyerId = user.id;
        const items = cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        }));
        const total = Math.round(
          cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        );

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_ORDERS_API}/create-after-payment`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ buyerId, total, items }),
          }
        );

        const data = await response.json();
        const newOrder = data.order;

        if (!newOrder) {
          throw new Error("Order creation failed");
        }
        // ✅ Decrease product quantities
        await Promise.all(
          items.map(async (item) => {
            try {
              const product = await fetchProductById(item.productId);
              const updatedQuantity = Math.max(
                product.quantity - item.quantity,
                0
              );

              await updateProductQuantity(item.productId, updatedQuantity);
            } catch (err) {
              console.error(
                `Failed to update quantity for product ${item.productId}:`,
                err
              );
            }
          })
        );
        setOrderDetails({
          ...newOrder,
          items: newOrder.items ?? [],
        });

        useCartStore.getState().clearCart?.();
      } catch (error) {
        console.error("Error creating order:", error);
        // router.push("/buyer");
      } finally {
        setLoading(false);
      }
    }

    createOrderAfterPayment();
  }, [user, cartItems]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // Calculate estimated delivery date (7 days from order creation)
  const getEstimatedDelivery = (createdAt: string) => {
    const orderDate = new Date(createdAt);
    const deliveryDate = new Date(
      orderDate.getTime() + 7 * 24 * 60 * 60 * 1000
    );
    return deliveryDate.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30";
      case "SHIPPED":
        return "bg-blue-500/20 text-blue-400 hover:bg-blue-500/30";
      case "DELIVERED":
        return "bg-green-500/20 text-green-400 hover:bg-green-500/30";
      case "CANCELLED":
        return "bg-red-500/20 text-red-400 hover:bg-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading your order details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-400 mb-6">
            We couldn't find your order details.
          </p>
          <Link href="/buyer">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              Return to Shop
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      {/* <Header toggleCart={toggleCart} cartItemsCount={cartItemCount} /> */}

      <main className="container mx-auto px-4 py-16">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Success Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-green-500/20 rounded-full mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <CheckCircle className="w-10 h-10 text-green-400" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Order Confirmed!
            </h1>
            <p className="text-xl text-gray-300 mb-2">
              Thank you for your purchase
            </p>
            <p className="text-gray-400">
              We've received your order and will send you a confirmation email
              shortly.
            </p>
          </motion.div>

          {/* Order Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Order Details Card */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Package className="h-5 w-5 text-orange-400" />
                    Order Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Order Number</span>
                    <Badge className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30">
                      {orderDetails.orderNumber}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Items</span>
                    <span className="text-white">
                      {orderDetails.items.length} items
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Status</span>
                    <Badge className={getStatusColor(orderDetails.status)}>
                      {orderDetails.status}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Order Date</span>
                    <span className="text-white">
                      {new Date(orderDetails.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>

                  <Separator className="bg-gray-700" />

                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Total Amount</span>
                    <span className="text-white font-semibold text-lg">
                      ${Number(orderDetails.total).toFixed(2)}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment & Shipping Info */}
            <motion.div variants={itemVariants}>
              <Card className="bg-gray-800 border-gray-700 h-full">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-400" />
                    Payment & Shipping
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">
                        Payment Confirmed
                      </p>
                      <p className="text-sm text-gray-400">
                        {paymentIntent
                          ? `Payment ID: ${paymentIntent.slice(0, 12)}...`
                          : "Payment processed successfully"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Truck className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">
                        Estimated Delivery
                      </p>
                      <p className="text-sm text-gray-400">
                        {getEstimatedDelivery(orderDetails.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">
                        Confirmation Email
                      </p>
                      <p className="text-sm text-gray-400">
                        Sent to your registered email
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Order Items Summary */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Package className="h-5 w-5 text-blue-400" />
                  Order Items ({orderDetails.items.length})
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Items included in your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {orderDetails.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center p-3 bg-gray-750 rounded-lg border border-gray-700"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="text-white font-medium">
                            Product ID: {item.productId.slice(0, 8)}...
                          </p>
                          <p className="text-sm text-gray-400">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-white font-medium">
                          ${Number(item.price).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-400">each</p>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4 bg-gray-700" />

                <div className="flex justify-between items-center">
                  <span className="text-lg font-medium text-white">
                    Order Total
                  </span>
                  <span className="text-xl font-bold text-white">
                    ${Number(orderDetails.total).toFixed(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* What's Next Section */}
          <motion.div variants={itemVariants}>
            <Card className="bg-gray-800 border-gray-700 mb-8">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-400" />
                  What's Next?
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Here's what you can expect from your order
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Package className="h-6 w-6 text-blue-400" />
                    </div>
                    <h3 className="font-medium text-white mb-2">
                      Order Processing
                    </h3>
                    <p className="text-sm text-gray-400">
                      We'll prepare your items for shipment within 1-2 business
                      days
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Truck className="h-6 w-6 text-orange-400" />
                    </div>
                    <h3 className="font-medium text-white mb-2">
                      Shipping Updates
                    </h3>
                    <p className="text-sm text-gray-400">
                      You'll receive tracking information once your order ships
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    </div>
                    <h3 className="font-medium text-white mb-2">Delivery</h3>
                    <p className="text-sm text-gray-400">
                      Your order will arrive by{" "}
                      {getEstimatedDelivery(orderDetails.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            variants={itemVariants}
          >
            <Link href="/buyer/history">
              <Button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg">
                <Package className="h-5 w-5 mr-2" />
                View Order History
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </Link>

            <Link href={`/buyer/orders/${orderDetails.id}`}>
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 px-8 py-3 text-lg"
              >
                <Package className="h-5 w-5 mr-2" />
                View Order Details
              </Button>
            </Link>

            <Link href="/buyer">
              <Button
                variant="outline"
                className="bg-gray-700 border-gray-600 text-white hover:bg-gray-600 px-8 py-3 text-lg"
              >
                <Home className="h-5 w-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
}
