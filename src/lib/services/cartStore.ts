// // stores/cartStore.ts
// import type { Message } from "ai";
// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import { Product } from "../types";
// interface CartItem extends Product {
//   quantity: number;
// }

// interface CartState {
//   cartItems: CartItem[];
//   addToCart: (product: Product, quantity: number) => void;
//   removeFromCart: (productId: string) => void;
//   updateQuantity: (productId: string, quantity: number) => void;
//   clearCart: () => void;
// }

// export const useCartStore = create<CartState>()(
//   persist(
//     (set, get) => ({
//       cartItems: [],
//       addToCart: (product, quantity) => {
//         const existing = get().cartItems.find((i) => i.id === product.id);
//         if (existing) {
//           set({
//             cartItems: get().cartItems.map((item) =>
//               item.id === product.id
//                 ? { ...item, quantity: item.quantity + quantity }
//                 : item
//             ),
//           });
//         } else {
//           set({
//             cartItems: [...get().cartItems, { ...product, quantity }],
//           });
//         }
//       },
//       removeFromCart: (productId) =>
//         set({
//           cartItems: get().cartItems.filter((item) => item.id !== productId),
//         }),
//       updateQuantity: (productId, quantity) =>
//         set({
//           cartItems: get().cartItems.map((item) =>
//             item.id === productId ? { ...item, quantity } : item
//           ),
//         }),
//       clearCart: () => set({ cartItems: [] }),
//     }),
//     {
//       name: "cart-storage", // ✅ this is the key in localStorage
//     }
//   )
// );

// interface ChatState {
//   messages: Message[];
//   setMessages: (msgs: Message[]) => void;
//   addMessage: (msg: Message) => void;
//   clearMessages: () => void;
// }

// export const useChatStore = create<ChatState>()(
//   persist(
//     (set, get) => ({
//       messages: [],
//       setMessages: (msgs) => set({ messages: msgs }),
//       addMessage: (msg) => set({ messages: [...get().messages, msg] }),
//       clearMessages: () => set({ messages: [] }),
//     }),
//     {
//       name: "chat-storage",
//     }
//   )
// );
// stores/cartStore.ts

import type { Message } from "ai";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "../types";

interface CartItem extends Product {
  quantity: number; // how many the user has in their cart
  stock: number; // the original product.quantity from the DB
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product, quantity) => {
        const existing = get().cartItems.find((i) => i.id === product.id);

        if (existing) {
          const newQty = existing.quantity + quantity;
          if (newQty > existing.stock) {
            alert(`Only ${existing.stock} in stock.`);
            return;
          }
          set({
            cartItems: get().cartItems.map((item) =>
              item.id === product.id ? { ...item, quantity: newQty } : item
            ),
          });
        } else {
          set({
            cartItems: [
              ...get().cartItems,
              {
                ...product, // spreads all product fields including .quantity
                quantity, // cart count
                stock: product.quantity, // original DB stock
              },
            ],
          });
        }
      },

      removeFromCart: (productId) =>
        set({
          cartItems: get().cartItems.filter((item) => item.id !== productId),
        }),

      updateQuantity: (productId, quantity) => {
        const item = get().cartItems.find((i) => i.id === productId);
        if (!item) return;
        if (quantity > item.stock) {
          alert(`Only ${item.stock} in stock.`);
          return;
        }
        set({
          cartItems: get().cartItems.map((i) =>
            i.id === productId ? { ...i, quantity } : i
          ),
        });
      },

      clearCart: () => set({ cartItems: [] }),
    }),
    {
      name: "cart-storage", // key in localStorage
    }
  )
);

interface ChatState {
  messages: Message[];
  setMessages: (msgs: Message[]) => void;
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],

      setMessages: (msgs) => set({ messages: msgs }),
      addMessage: (msg) => set({ messages: [...get().messages, msg] }),
      clearMessages: () => set({ messages: [] }),
    }),
    {
      name: "chat-storage",
    }
  )
);
