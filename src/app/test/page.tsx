"use client";

import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";

const CreateProductPage = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    sellerId: "",
    images: [""], // Start with one input for images
  });
  const { user } = useUser();
  console.log("user id is =============================>", user?.id);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (index: number, value: string) => {
    const updatedImages = [...form.images];
    updatedImages[index] = value;
    setForm({ ...form, images: updatedImages });
  };

  const addImageField = () => {
    setForm((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("http://localhost:3001/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          price: parseFloat(form.price),
          quantity: parseInt(form.quantity),
          sellerId: form.sellerId,
          images: form.images.filter((img) => img.trim() !== ""),
        }),
      });

      if (!res.ok) throw new Error("Failed to create product");
      const data = await res.json();
      setMessage("✅ Product created!");
      console.log("✅ Product created!=======================>", data);
    } catch (err: any) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="sellerId"
          placeholder="Seller ID"
          value={form.sellerId}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />

        <div>
          <label className="block font-medium">Image URLs</label>
          {form.images.map((img, index) => (
            <input
              key={index}
              type="text"
              value={img}
              onChange={(e) => handleImageChange(index, e.target.value)}
              placeholder={`Image URL ${index + 1}`}
              className="w-full p-2 border rounded mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addImageField}
            className="text-sm text-blue-600 hover:underline"
          >
            + Add another image
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>

      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default CreateProductPage;
