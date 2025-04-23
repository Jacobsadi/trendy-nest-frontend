import ProductCreationForm from "../../components/ProductCreationForm";

async function getProduct(id: string) {
  const res = await fetch(`http://localhost:3001/products/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

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
