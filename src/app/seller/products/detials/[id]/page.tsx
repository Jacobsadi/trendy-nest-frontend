import { fetchProductById } from "@/lib/services/products";
import ProductCreationForm from "../../components/ProductCreationForm";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>; // notice Promise<>
}) {
  const { id } = await params; // ✅ first await params
  const product = await fetchProductById(id);

  const initialValues = {
    id: product.id,
    title: product.title,
    description: product.description,
    price: String(product.price),
    quantity: String(product.quantity),
    images: product.images || [],
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <ProductCreationForm initialValues={initialValues} mode="edit" />
    </main>
  );
}
