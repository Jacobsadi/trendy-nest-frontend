//  /app/api/create-payment-intent/route.ts

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { cartItems, buyerId } = body;

  const total = cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.quantity,
    0
  );

  // Create order in your backend
  const orderRes = await fetch("http://localhost:3002/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      buyerId,
      total,
      items: cartItems,
    }),
  });

  const order = await orderRes.json();

  // Create payment intent
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    metadata: { orderId: order.id },
    payment_method_types: ["card"],
  });

  return NextResponse.json({ client_secret: paymentIntent.client_secret });
}
