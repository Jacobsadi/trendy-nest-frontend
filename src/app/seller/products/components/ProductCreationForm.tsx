// "use client";

// import { useUser } from "@clerk/nextjs";
// import { useState } from "react";
// import Header from "./Header";
// import ProductInfoForm from "./ProductInfoForm";
// import ProductPhotoUpload from "./ProductPhotoUpload";
// import ProductPreview from "./ProductPreview";

// export default function ProductCreationForm() {
//   const [selectedSize, setSelectedSize] = useState("M");
//   const [selectedColors, setSelectedColors] = useState<string[]>([
//     "lightblue",
//     "white",
//   ]);
//   const [previewUrls, setPreviewUrls] = useState<string[]>([]);

//   // ✅ Form fields
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const { user } = useUser();
//   const sellerId = user?.id;

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const handleCancel = () => {
//     setTitle("");
//     setDescription("");
//     setPrice("");
//     setQuantity("");
//     setPreviewUrls([]);
//     setSelectedSize("M");
//     setSelectedColors(["lightblue", "white"]);
//     setMessage("");
//   };

//   const handleSubmit = async () => {
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("http://localhost:3001/products", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title,
//           description,
//           price: parseFloat(price),
//           quantity: parseInt(quantity),
//           sellerId,
//           images: previewUrls.filter((img) => img.trim() !== ""),
//         }),
//       });

//       if (!res.ok) throw new Error("Failed to create product");
//       const data = await res.json();
//       setMessage(" Product created!");
//       handleCancel();
//       console.log(
//         " Product created!==================================================>",
//         data
//       );
//     } catch (err: any) {
//       setMessage(` ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen pt-20">
//       <Header />
//       <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
//         <ProductPreview
//           selectedSize={selectedSize}
//           setSelectedSize={setSelectedSize}
//           selectedColors={selectedColors}
//           setSelectedColors={setSelectedColors}
//           imageUrls={previewUrls}
//           title={title}
//           description={description}
//           price={price}
//           quantity={quantity}
//           onCreate={handleSubmit}
//           onCancel={handleCancel}
//         />

//         <div className="md:col-span-2 space-y-20">
//           <ProductPhotoUpload
//             previewUrls={previewUrls}
//             setPreviewUrls={setPreviewUrls}
//           />
//           <ProductInfoForm
//             title={title}
//             setTitle={setTitle}
//             description={description}
//             setDescription={setDescription}
//             price={price}
//             setPrice={setPrice}
//             quantity={quantity}
//             setQuantity={setQuantity}
//           />
//           {/* <div className="text-right">
//             <button
//               onClick={handleSubmit}
//               disabled={loading}
//               className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700"
//             >
//               {loading ? "Creating..." : "Create Product"}
//             </button>
//             {message && <p className="mt-4 text-center text-sm">{message}</p>}
//           </div> */}
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { createProduct, updateProduct } from "@/lib/services/products";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import Header from "./Header";
import ProductInfoForm from "./ProductInfoForm";
import ProductPhotoUpload from "./ProductPhotoUpload";
import ProductPreview from "./ProductPreview";

interface ProductFormProps {
  initialValues?: {
    title: string;
    description: string;
    price: string;
    quantity: string;
    images: string[];
    id: string;
  };
  onSubmit?: (data: any) => Promise<void>;
  mode?: "create" | "edit";
}

export default function ProductCreationForm({
  initialValues,
  onSubmit,
  mode = "create",
}: ProductFormProps) {
  const { user } = useUser();
  const sellerId = user?.id;

  const [title, setTitle] = useState(initialValues?.title || "");
  const [description, setDescription] = useState(
    initialValues?.description || ""
  );
  const [price, setPrice] = useState(initialValues?.price || "");
  const [quantity, setQuantity] = useState(initialValues?.quantity || "");
  const [previewUrls, setPreviewUrls] = useState(initialValues?.images || []);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPrice("");
    setQuantity("");
    setPreviewUrls([]);
    setMessage("");
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const productData = {
      title,
      description,
      price: parseFloat(price),
      quantity: parseInt(quantity),
      sellerId,
      images: previewUrls.filter((img) => img.trim() !== ""),
    };

    try {
      let result;
      if (mode === "edit" && initialValues?.id) {
        result = await updateProduct(initialValues.id, productData);
        setMessage("✅ Product updated!");
      } else {
        result = await createProduct(productData);
        setMessage("✅ Product created!");
      }

      console.log("✅ Success:", result);
      resetForm();
    } catch (error: any) {
      console.error("❌ Error:", error);
      setMessage(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20">
      <Header />
      <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ProductPreview
          imageUrls={previewUrls}
          title={title}
          description={description}
          price={price}
          quantity={quantity}
          mode={mode}
          onCreate={
            onSubmit
              ? () => {
                  const productData = {
                    title,
                    description,
                    price: parseFloat(price),
                    quantity: parseInt(quantity),
                    images: previewUrls,
                  };
                  onSubmit(productData);
                }
              : handleSubmit
          }
          onCancel={resetForm}
        />

        <div className="md:col-span-2 space-y-20">
          <ProductPhotoUpload
            previewUrls={previewUrls}
            setPreviewUrls={setPreviewUrls}
          />
          <ProductInfoForm
            title={title}
            setTitle={setTitle}
            description={description}
            setDescription={setDescription}
            price={price}
            setPrice={setPrice}
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>
      </div>
    </div>
  );
}
