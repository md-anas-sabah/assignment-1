"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Minus, Plus, Star } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Product } from "@/types";
import Image from "next/image";

interface ProductDetailProps {
  productId: string;
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    toast({
      title: "Added to cart",
      description: `${quantity} ${product.title} added to your cart`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white p-4 flex items-center justify-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <button
        onClick={() => router.back()}
        className="mb-6 flex items-center gap-2"
        aria-label="Go back"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      <div className="relative aspect-square mb-6">
        {/* <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-full object-cover rounded-lg"
        /> */}
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <p className="text-gray-400 mb-6">{product.description}</p>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center"
            aria-label="Increase quantity"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-2xl font-bold">
          ${(product.price * quantity).toFixed(2)}
        </span>
      </div>

      <button
        onClick={handleAddToCart}
        className="w-full bg-yellow-400 text-black py-4 rounded-lg font-bold"
      >
        Add to cart
      </button>
    </div>
  );
}
