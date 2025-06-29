// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   PaymentElement,
//   useElements,
//   useStripe,
// } from "@stripe/react-stripe-js";
// import { FormEvent, useState } from "react";

// export default function CheckoutForm({ orderId }: { orderId: string }) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     setLoading(true);
//     console.log("🧾 Submitting payment for order:", orderId);

//     const result = await stripe.confirmPayment({
//       elements,
//       confirmParams: {
//         return_url: `http://localhost:3000/buyer/orders/success?orderId=${orderId}`,
//       },
//     });

//     if (result.error) {
//       console.error("❌ Payment failed:", result.error.message, result.error);
//       alert(result.error.message);
//     } else {
//       console.log("✅ Payment submitted, redirecting...", result);
//       // You likely won't reach here as the user is redirected
//     }

//     setLoading(false);
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <PaymentElement />
//       <Button type="submit" disabled={!stripe || loading} className="w-full">
//         {loading ? "Processing..." : "Pay Now"}
//       </Button>
//     </form>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    console.log("🧾 Submitting payment for order:");

    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `https://trendy-nest-frontend.vercel.app/buyer/orders/success`,
      },
    });

    if (result.error) {
      console.error("❌ Payment failed:", result.error.message, result.error);
      alert(result.error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button type="submit" disabled={!stripe || loading} className="w-full">
        {loading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}
