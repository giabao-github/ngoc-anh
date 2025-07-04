"use client";

import { useEffect, useMemo, useState } from "react";
import { FiHeart } from "react-icons/fi";

import { toast } from "sonner";

import { Separator } from "@/components/ui/separator";

import { formatPrice, getOriginalPrice } from "@/utils/productUtils";
import { cn } from "@/utils/styleUtils";

import { Product } from "@/types/invoice";

interface ProductInfoProps {
  product: Product;
  activeDetailIndex: number;
  setActiveDetailIndex: (index: number) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({
  product,
  activeDetailIndex,
  setActiveDetailIndex,
}) => {
  const favoriteKey = `favorite-${product.id}`;
  const [isFavorite, setIsFavorite] = useState(false);

  const selectedDetail =
    product.details[activeDetailIndex] || product.details[0];

  // Memoize formatted prices
  const formattedPrice = useMemo(
    () => formatPrice(selectedDetail.price),
    [selectedDetail.price],
  );
  const formattedOriginalPrice = useMemo(
    () => getOriginalPrice(product),
    [product],
  );

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
      });
    } else {
      toast.success("Đã xóa khỏi danh sách yêu thích", {
        description: "Đã xóa sản phẩm này khỏi danh sách yêu thích của bạn",
      });
    }
  };

  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-xl md:text-3xl font-bold max-w-[90%]">
          {product.name}
        </h1>
        <button
          type="button"
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

      <div className="space-y-2 text-xs text-gray-700">
        <p>{`Mã sản phẩm: ${product.code}`}</p>
        <p>{`Thương hiệu: ${product.brand}`}</p>
        {selectedDetail.ingredient && (
          <p>{`Nguyên liệu: ${selectedDetail.ingredient}`}</p>
        )}
        {"collection" in product ? (
          <p>{`Bộ sưu tập: ${product.collection}`}</p>
        ) : "material" in product ? (
          <p>{`Chất liệu: ${product.material}`}</p>
        ) : "bottleMaterial" in product ? (
          <p>{`Chất liệu chai: ${product.bottleMaterial}`}</p>
        ) : null}
      </div>

      <div className="flex flex-row gap-x-3 items-center md:gap-x-5">
        <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 md:text-4xl">
          {formattedPrice}
        </p>
        {formattedOriginalPrice !== formattedPrice && (
          <p className="text-gray-400 line-through md:text-xl">
            {formattedOriginalPrice}
          </p>
        )}
      </div>

      <Separator color="#BB9244" opacity={40} />
    </>
  );
};
export default ProductInfo;
