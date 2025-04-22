"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  title: string;
  setTitle: (v: string) => void;
  description: string;
  setDescription: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  quantity: string;
  setQuantity: (v: string) => void;
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
}: Props) {
  return (
    <div>
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
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm block mb-2">Price</label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label className="text-gray-400 text-sm block mb-2">Quantity</label>
          <Input
            className="bg-gray-800 border-gray-700"
            placeholder="Stock quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>
      </div>
      <div className="mt-6">
        <label className="text-gray-400 text-sm block mb-2">Description</label>
        <Textarea
          className="bg-gray-800 border-gray-700 min-h-[100px]"
          placeholder="Short description about the product"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
    </div>
  );
}
