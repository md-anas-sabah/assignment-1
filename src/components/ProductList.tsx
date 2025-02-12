"use client";
import { useStore } from "@/store";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products, loading, selectedCategory } = useStore();

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
