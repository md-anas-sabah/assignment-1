import { create } from "zustand";
import { Product } from "@/types";

interface Store {
  products: Product[];
  categories: string[];
  selectedCategory: string;
  loading: boolean;
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<Store>((set) => ({
  products: [],
  categories: [],
  selectedCategory: "",
  loading: false,
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const res = await fetch("https://dummyjson.com/products");
      const data = await res.json();
      set({ products: data.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  },
  fetchCategories: async () => {
    try {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();

      const validCategories = Array.isArray(data)
        ? data.filter((cat): cat is string => typeof cat === "string")
        : [];
      set({ categories: validCategories });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  },
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
