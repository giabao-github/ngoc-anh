"use client";

import { useEffect, useState } from "react";
import { FiHeart } from "react-icons/fi";

import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";

import { montserrat } from "@/config/fonts";

import { ToastIds } from "@/constants/toastIds";

import { cn } from "@/libs/utils";

import { Product } from "@/app/types";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  const favoriteKey = `favorite-${product.id}`;
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const storedValue = localStorage.getItem(favoriteKey);
    if (storedValue === "true") {
      setIsFavorite(true);
    }
  }, [favoriteKey]);

  const handleFavoriteToggle = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    localStorage.setItem(favoriteKey, newState.toString());
    if (!isFavorite) {
      toast.success("Đã thêm vào danh sách yêu thích", {
        description: "Đã thêm sản phẩm này vào danh sách yêu thích của bạn",
        id: ToastIds.ADD_TO_WISHLIST_SUCCESS,
      });
    } else {
      toast.success("Đã xóa khỏi danh sách yêu thích", {
        description: "Đã xóa sản phẩm này khỏi danh sách yêu thích của bạn",
        id: ToastIds.REMOVE_FROM_WISHLIST_SUCCESS,
      });
    }
  };

  return (
    <>
      <div className="flex items-start justify-between">
        <h1 className="text-xl md:text-3xl font-bold max-w-[90%]">
          {product.name}
        </h1>
        <button
          title={`${isFavorite ? "Remove from Favorite" : "Add to Favorite"}`}
          onClick={handleFavoriteToggle}
          className={`group p-0 md:p-3 rounded-lg cursor-pointer outline-none ring-0 focus:ring-0 focus:outline-none md:hover:bg-red-50 ${
            isFavorite ? "md:bg-red-50" : "bg-transparent md:bg-gray-50"
          }`}
        >
          <FiHeart
            className={cn(
              "w-6 h-6",
              isFavorite ? "fill-rose-500 stroke-rose-500" : "stroke-gray-500",
              "group-hover:fill-rose-500 group-hover:stroke-rose-500",
            )}
          />
        </button>
      </div>

      <div
        className={`space-y-2 text-xs text-gray-700 ${montserrat.className}`}
      >
        <p>{`Mã sản phẩm: ${product.code}`}</p>
        <p>{`Thương hiệu: ${product.brand}`}</p>
        {"collection" in product ? (
          <p>{`Bộ sưu tập: ${product.collection}`}</p>
        ) : (
          <p>{`Chất liệu: ${product.material}`}</p>
        )}
      </div>

      <p className="text-2xl font-bold text-orange-500 md:text-4xl">
        {product.details[0]?.price?.toLocaleString("en-US") ?? "Giá liên hệ"}₫
      </p>

      <Separator color="#BB9244" opacity={40} />
    </>
  );
};

export default ProductInfo;
