"use client";
import { useStore } from "@/store";

export default function Categories() {
  const { categories, selectedCategory, setSelectedCategory } = useStore();

  // Helper function to format category name
  const formatCategoryName = (category: string) => {
    if (!category) return "";
    return category
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        key="all"
        className={`px-4 py-2 rounded-full whitespace-nowrap ${
          selectedCategory === "" ? "bg-yellow-400 text-black" : "bg-zinc-800"
        }`}
        onClick={() => setSelectedCategory("")}
      >
        All
      </button>
      {Array.isArray(categories) &&
        categories.map((category) => {
          if (typeof category !== "string") return null;
          return (
            <button
              key={category}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === category
                  ? "bg-yellow-400 text-black"
                  : "bg-zinc-800"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {formatCategoryName(category)}
            </button>
          );
        })}
    </div>
  );
}
