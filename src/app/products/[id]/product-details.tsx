/* eslint-disable @typescript-eslint/no-unused-vars */
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
  const [error, setError] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://dummyjson.com/products/${productId}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch product: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch product"
        );
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
      <div className="min-h-screen bg-black text-white p-4">
        <div className="animate-pulse">
          <div className="h-6 w-24 bg-zinc-800 rounded mb-6" />
          <div className="aspect-square mb-6 bg-zinc-800 rounded-lg" />
          <div className="h-8 w-3/4 bg-zinc-800 rounded mb-4" />
          <div className="h-20 bg-zinc-800 rounded mb-6" />
          <div className="h-12 bg-zinc-800 rounded" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-center">
          <p className="text-red-400">{error}</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white p-4">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center justify-center">
          <p>Product not found</p>
        </div>
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
        <Image
          src={product.images[currentImage] || product.thumbnail}
          alt={product.title}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </div>

      {/* {product.images.length > 0 && (
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {product.images.map((image, index) => (
            <button
              key={image}
              onClick={() => setCurrentImage(index)}
              className={`relative w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden ${
                currentImage === index ? "ring-2 ring-yellow-400" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${product.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )} */}

      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex items-center gap-1">
          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
          <span>{product.rating.toFixed(1)}</span>
        </div>
      </div>

      <div className="text-sm text-gray-400 mb-4">
        <p>Brand: {product.brand}</p>
        <p>Category: {product.category}</p>
      </div>

      <p className="text-gray-400 mb-6">{product.description}</p>

      <div className="text-sm text-gray-400 mb-2">
        In stock: {product.stock}
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center disabled:opacity-50"
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="text-lg">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center disabled:opacity-50"
            disabled={quantity >= product.stock}
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
        className="w-full bg-yellow-400 text-black py-4 rounded-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-yellow-500 transition-colors"
        disabled={product.stock === 0}
      >
        {product.stock === 0 ? "Out of Stock" : "Add to cart"}
      </button>
    </div>
  );
}
