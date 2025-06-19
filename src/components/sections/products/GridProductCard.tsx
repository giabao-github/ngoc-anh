"use client";

import { useCallback, useMemo, useState } from "react";
import React from "react";

import {
  Eye,
  Heart,
  LucideFlame,
  LucideGift,
  LucideTag,
  LucideZap,
  Shield,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { toast } from "sonner";

import AddToCartPopup from "@/components/product/AddToCartPopup";

import useIsMobile from "@/hooks/useIsMobile";

import { formatPrice, getOriginalPrice } from "@/libs/productUtils";
import { cn } from "@/libs/utils";

import { Product } from "@/types/invoice";

interface GridProductCardProps {
  // Product
  product: Product;
  router: AppRouterInstance;
  // State
  quantity: number;
  isFavorite: boolean;
  // Rating data
  ratingStats: {
    totalReviews: number;
    displayRating: string;
  };
  // Cart state
  cartQuantity: number;
  isOutOfStock: boolean;
  // Handlers
  handleAddToCart: () => void;
  onToggleFavorite: (id: number) => void;
  // Notification
  showNotification: boolean;
  notificationFlag: string;
  handleCloseNotification: () => void;
  progress: number;
}

const GridProductCard: React.FC<GridProductCardProps> = ({
  product,
  ratingStats,
  quantity,
  cartQuantity,
  isOutOfStock,
  handleAddToCart,
  showNotification,
  notificationFlag,
  handleCloseNotification,
  router,
  isFavorite,
  onToggleFavorite,
  progress,
}) => {
  const isMobile = useIsMobile();
  const favoriteKey = `favorite-${product.id}`;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Memoize formatted prices
  const formattedPrice = useMemo(
    () => formatPrice(product.details[0].price),
    [product.details[0].price],
  );
  const formattedOriginalPrice = useMemo(() => {
    if ("discount" in product.details[0].badge) {
      return getOriginalPrice(product);
    }
    return null;
  }, [product]);

  const handleImageInteraction = useCallback(() => {
    if (isMobile) {
      if (hasInteracted) {
        setShowQuickView((prev) => !prev);
      } else {
        setShowQuickView(true);
        setHasInteracted(true);
      }
    }
  }, [isMobile, hasInteracted]);

  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      setShowQuickView(true);
      setHasInteracted(true);
    }
  }, [isMobile]);

  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      setShowQuickView(false);
    }
  }, [isMobile]);

  const handleFavoriteToggle = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onToggleFavorite(product.id);
      const newFavoriteState = !isFavorite;
      localStorage.setItem(favoriteKey, newFavoriteState.toString());
      if (newFavoriteState) {
        toast.success("Đã thêm vào danh sách yêu thích", {
          description: "Đã thêm sản phẩm này vào danh sách yêu thích của bạn",
        });
      } else {
        toast.success("Đã xóa khỏi danh sách yêu thích", {
          description: "Đã xóa sản phẩm này khỏi danh sách yêu thích của bạn",
        });
      }
    },
    [onToggleFavorite, product.id, isFavorite, favoriteKey],
  );

  const handleViewProduct = useCallback(() => {
    if (product.details.length) {
      router.push(`/products/${product.details[0].slug}`);
    }
  }, [product, router]);

  const onAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleAddToCart();
    },
    [handleAddToCart],
  );

  return (
    <>
      <AddToCartPopup
        show={showNotification}
        flag={notificationFlag}
        product={product}
        quantity={quantity}
        cartQuantity={cartQuantity}
        onClose={handleCloseNotification}
        progress={progress}
      />
      <article className="flex overflow-hidden flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 transform hover:shadow-xl group hover:border-blue-200 hover:-translate-y-1">
        <div
          className="overflow-hidden relative flex-shrink-0 h-36 cursor-pointer md:h-72"
          style={{ background: product.background }}
          onClick={handleImageInteraction}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-cover transition-all duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
            )}
            onLoad={() => setImageLoaded(true)}
            priority
          />
          {!imageLoaded && (
            <div className="flex absolute inset-0 justify-center items-center bg-gray-200 animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full md:w-16 md:h-16"></div>
            </div>
          )}
          <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 max-w-[calc(100%-4rem)] md:max-w-[calc(100%-6rem)]">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {(() => {
                const badges = product.details[0].badge;
                return (
                  <>
                    {"discount" in badges && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-red-500 to-red-600 flex items-center gap-1">
                        <LucideTag className="hidden w-3 h-3 md:inline" />
                        <span>-{badges.discount}%</span>
                      </span>
                    )}
                    {"isReward" in badges && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-pink-600 to-pink-700 flex items-center gap-1">
                        <LucideGift className="hidden w-3 h-3 md:inline" />
                        <span>Hàng tặng</span>
                      </span>
                    )}
                    {"isBestseller" in badges && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-orange-500 to-orange-600 flex items-center gap-1">
                        <LucideFlame className="hidden w-3 h-3 md:inline" />
                        <span>Bán chạy</span>
                      </span>
                    )}
                    {badges.isNew && (
                      <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-green-500 to-green-600 flex items-center gap-1">
                        <LucideZap className="hidden w-3 h-3 md:inline" />
                        <span>Mới</span>
                      </span>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
          <div
            className={cn(
              "absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center gap-2 md:gap-3 transition-all duration-300",
              showQuickView && hasInteracted
                ? "opacity-100"
                : "opacity-0 pointer-events-none",
            )}
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                router.push(`/products/${product.details[0].slug}`);
              }}
              className="p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 md:p-3 bg-white/80 hover:bg-white hover:scale-110"
              aria-label="Xem sản phẩm"
            >
              <Eye
                strokeWidth={2.2}
                className="w-4 h-4 text-gray-700 md:w-5 md:h-5"
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleFavoriteToggle(e);
              }}
              className="p-2 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 md:p-3 bg-white/80 hover:bg-white hover:scale-110"
              aria-label="Thêm vào danh sách yêu thích"
            >
              <Heart
                strokeWidth={2.2}
                className={`w-4 h-4 md:w-5 md:h-5 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-700"}`}
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onAddToCart(e);
              }}
              className={cn(
                "p-2 text-white transition-all duration-200 rounded-full shadow-lg md:p-3 bg-amber-600",
                !isOutOfStock && "hover:scale-110",
                isOutOfStock && "bg-gray-400 cursor-default",
              )}
              aria-label="Thêm vào giỏ hàng"
            >
              <ShoppingCart
                strokeWidth={2.2}
                className="w-4 h-4 text-white md:w-5 md:h-5"
              />
            </button>
          </div>
          <button
            type="button"
            onClick={handleFavoriteToggle}
            className="absolute p-1.5 md:p-2 transition-all duration-200 rounded-full shadow-sm md:hidden top-2 right-2 md:top-3 md:right-3 bg-white/80 backdrop-blur-sm hover:bg-white"
            aria-label="Thêm vào danh sách yêu thích"
          >
            <Heart
              strokeWidth={2.2}
              className={`w-3 h-3 md:w-4 md:h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>
        <div className="flex flex-col gap-y-2 flex-grow p-2.5 md:p-5">
          <div className="flex items-center justify-between flex-shrink-0 mb-1.5 md:mb-2">
            <span className="mr-2 text-[10px] text-blue-600 truncate md:text-sm">
              {product.category}
            </span>
            {ratingStats.totalReviews > 0 ? (
              <div className="flex flex-shrink-0 gap-1 items-center">
                <Star className="w-2.5 h-2.5 text-yellow-400 md:w-4 md:h-4 fill-yellow-400" />
                <span className="text-[10px] md:text-sm">
                  {ratingStats.displayRating}
                </span>
                <span className="hidden text-sm text-gray-500 md:inline">
                  ({ratingStats.totalReviews} đánh giá)
                </span>
                <span className="inline text-[10px] text-gray-500 md:hidden">
                  ({ratingStats.totalReviews})
                </span>
              </div>
            ) : (
              <span className="inline text-[10px] md:text-sm text-gray-500">
                Chưa có đánh giá
              </span>
            )}
          </div>
          <div className="flex-shrink-0 mb-2 md:mb-3">
            <h3
              className="text-[12px] font-semibold leading-tight text-transparent transition-colors cursor-pointer md:text-xl w-fit h-fit line-clamp-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-600"
              title={product.name}
              onClick={handleViewProduct}
            >
              {product.name}
            </h3>
          </div>
          <div className="flex-grow"></div>
          <div className="flex flex-shrink-0 justify-between items-center mb-1 md:mb-4">
            <div className="flex flex-col gap-0.5 md:gap-x-4 md:flex-row md:items-center md:gap-2">
              <div className="text-base font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500 md:text-2xl">
                {formattedPrice}
              </div>
              {formattedOriginalPrice && (
                <div className="text-xs text-gray-400 line-through md:text-base">
                  {formattedOriginalPrice}
                </div>
              )}
            </div>
            <div
              className={cn(
                "text-xs whitespace-nowrap relative h-full bg-amber-200 md:text-sm",
                isOutOfStock
                  ? "text-yellow-600"
                  : product.quantity > 0
                    ? "text-green-600"
                    : "text-red-600",
              )}
            >
              <div className="inline absolute right-0 bottom-0">
                {isOutOfStock
                  ? isMobile
                    ? "Giới hạn mua"
                    : "Không thể mua thêm"
                  : product.quantity > 0
                    ? "Còn hàng"
                    : "Hết hàng"}
              </div>
            </div>
          </div>
          <div className="hidden flex-shrink-0 justify-between items-center mt-2 text-xs text-gray-500 md:flex md:mt-4">
            <div className="flex gap-1 items-center">
              <Truck className="w-3 h-3" />
              <span className="hidden md:inline">Miễn phí vận chuyển</span>
              <span className="md:hidden">Free ship</span>
            </div>
            <div className="flex gap-1 items-center">
              <Shield className="w-3 h-3" />
              <span className="hidden md:inline">Bảo hành 1 năm</span>
              <span className="md:hidden">1 năm BH</span>
            </div>
          </div>
        </div>
      </article>
    </>
  );
};

export default React.memo(GridProductCard);
