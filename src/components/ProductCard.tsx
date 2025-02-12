/* eslint-disable @next/next/no-img-element */
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const router = useRouter();

  return (
    <div
      className="bg-zinc-900 rounded-lg p-4 cursor-pointer"
      onClick={() => router.push(`/products/${product.id}`)}
    >
      <div className="relative aspect-square mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover rounded-lg w-full h-full"
        />
      </div>
      <div className="flex items-center gap-1 mb-1">
        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        <span className="text-sm">{product.rating.toFixed(1)}</span>
      </div>
      <h3 className="font-bold mb-1">{product.title}</h3>
      <p className="text-sm text-gray-400 mb-2">
        {product.description.slice(0,15)}...
      </p>
      <div className="flex items-center justify-between">
        <span className="font-bold">${product.price}</span>
        <button className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center text-black">
          +
        </button>
      </div>
    </div>
  );
}
