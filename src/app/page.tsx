"use client";
import { useEffect } from "react";
import ProductList from "@/components/ProductList";
import Categories from "@/components/Categories";
import { useStore } from "@/store";

export default function Home() {
  const { fetchProducts, fetchCategories } = useStore();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  return (
    <main className="min-h-screen bg-black p-4 text-white">
      <h1 className="text-2xl font-bold mb-6">Product List</h1>
      <Categories />
      <ProductList />
    </main>
  );
}
