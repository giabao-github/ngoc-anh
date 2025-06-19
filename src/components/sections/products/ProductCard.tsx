import { useCallback, useEffect, useState } from "react";
import React from "react";

import { useRouter } from "next/navigation";
import { toast } from "sonner";

import ProductError from "@/components/error/ProductError";
import GridProductCard from "@/components/sections/products/GridProductCard";
import ListProductCard from "@/components/sections/products/ListProductCard";

import { montserrat, quicksand } from "@/config/fonts";

import { useProductView } from "@/hooks/useProductView";

import { Product } from "@/types/invoice";

interface ProductCardProps {
  product: Product;
  viewMode: "grid" | "list";
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode }) => {
  const slug = product.details[0]?.slug;

  if (!slug) {
    toast.error("Không thể tải dữ liệu sản phẩm", {
      description: "Vui lòng tải lại trang và thử lại",
    });
    return;
  }

  const {
    product: productData,
    cartQuantity,
    handleAddToCart,
    isOutOfStock,
    handleCloseNotification,
    notificationFlag,
    quantity,
    ratingStats,
    showNotification,
    progress,
  } = useProductView(slug);

  if (!productData) {
    return <ProductError />;
  }

  const router = useRouter();
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  useEffect(() => {
    const favoriteKey = `favorite-${product.id}`;
    const storedValue = localStorage.getItem(favoriteKey);
    if (storedValue === "true") {
      setFavorites((prev) => new Set(prev).add(product.id));
    }
  }, [product.id]);

  const toggleFavorite = useCallback((productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
  }, []);

  if (viewMode === "list") {
    return (
      <div className={quicksand.className}>
        <ListProductCard
          product={product}
          router={router}
          isFavorite={favorites.has(product.id)}
          onToggleFavorite={toggleFavorite}
          cartQuantity={cartQuantity}
          handleAddToCart={() => handleAddToCart(true)}
          handleCloseNotification={handleCloseNotification}
          isOutOfStock={isOutOfStock}
          notificationFlag={notificationFlag}
          quantity={quantity}
          ratingStats={ratingStats}
          showNotification={showNotification}
          progress={progress}
        />
      </div>
    );
  }

  return (
    <div className={quicksand.className}>
      <GridProductCard
        router={router}
        isFavorite={favorites.has(product.id)}
        onToggleFavorite={toggleFavorite}
        cartQuantity={cartQuantity}
        handleAddToCart={() => handleAddToCart(true)}
        handleCloseNotification={handleCloseNotification}
        isOutOfStock={isOutOfStock}
        product={product}
        notificationFlag={notificationFlag}
        quantity={quantity}
        ratingStats={ratingStats}
        showNotification={showNotification}
        progress={progress}
      />
    </div>
  );
};

export default React.memo(ProductCard);
