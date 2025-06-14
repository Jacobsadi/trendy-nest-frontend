// "use client";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";

// interface Props {
//   title: string;
//   setTitle: (v: string) => void;
//   description: string;
//   setDescription: (v: string) => void;
//   price: string;
//   setPrice: (v: string) => void;
//   quantity: string;
//   setQuantity: (v: string) => void;
// }

// export default function ProductInfoForm({
//   title,
//   setTitle,
//   description,
//   setDescription,
//   price,
//   setPrice,
//   quantity,
//   setQuantity,
// }: Props) {
//   return (
//     <div>
//       <h3 className="text-gray-300 mb-4">Product Information</h3>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="text-gray-400 text-sm block mb-2">
//             Product Name
//           </label>
//           <Input
//             className="bg-gray-800 border-gray-700"
//             placeholder="Item Name"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="text-gray-400 text-sm block mb-2">Price</label>
//           <Input
//             className="bg-gray-800 border-gray-700"
//             placeholder="Price"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />
//         </div>

//         <div>
//           <label className="text-gray-400 text-sm block mb-2">Quantity</label>
//           <Input
//             className="bg-gray-800 border-gray-700"
//             placeholder="Stock quantity"
//             type="number"
//             value={quantity}
//             onChange={(e) => setQuantity(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="mt-6">
//         <label className="text-gray-400 text-sm block mb-2">Description</label>
//         <Textarea
//           className="bg-gray-800 border-gray-700 min-h-[100px]"
//           placeholder="Short description about the product"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";

interface Props {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  quantity: string;
  setQuantity: (v: string) => void;
  setFormValid: (v: boolean) => void; // <- NEW prop
  category: string;
  setCategory: (v: string) => void;
}

export default function ProductInfoForm({
  title,
  setTitle,
  description,
  setDescription,
  price,
  setPrice,
  quantity,
  setQuantity,
  setFormValid,
  category,
  setCategory,
}: Props) {
  const formRef = useRef<HTMLFormElement>(null);

  // Handle validation check
  useEffect(() => {
    if (formRef.current) {
      const isValid = formRef.current.checkValidity();
      setFormValid(isValid);
    }
  }, [title, description, price, quantity]);

  return (
    <form ref={formRef}>
      <h3 className="text-gray-300 mb-4">Product Information</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-gray-400 text-sm block mb-2">
            Product Name
          </label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Item Name"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm block mb-2">Price</label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Price"
            type="number"
            min="0.01"
            step="0.01"
            value={price}
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm block mb-2">Quantity</label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Stock quantity"
            type="number"
            min="0"
            value={quantity}
            required
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
        <div>
          <label className="text-gray-400 text-sm block mb-2">Category</label>
          <select
            className="w-full bg-gray-800 text-white border border-gray-700 rounded px-4 py-2"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select Category</option>
            <option value="Makeup">Makeup</option>
            <option value="Skincare">Skincare</option>
            <option value="Haircare">Haircare</option>
            <option value="Tools">Beauty Tools</option>
            <option value="Fragrance">Fragrance</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <label className="text-gray-400 text-sm block mb-2">Description</label>
        <Textarea
          className="bg-gray-800 border-gray-700 min-h-[100px]"
          placeholder="Short description about the product"
          value={description}
          required
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </form>
  );
}
