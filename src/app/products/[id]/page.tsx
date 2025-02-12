import ProductDetail from "./product-details";

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  return <ProductDetail productId={params.id} />;
}
