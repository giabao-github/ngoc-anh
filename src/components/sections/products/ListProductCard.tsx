import { memo, useCallback, useMemo, useState } from "react";

import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { toast } from "sonner";

import AddToCartPopup from "@/components/product/AddToCartPopup";
import ProductCard from "@/components/sections/products/ProductCard";

import useIsMobile from "@/hooks/useIsMobile";

import { formatPrice, getOriginalPrice } from "@/utils/productUtils";
import { cn } from "@/utils/styleUtils";

import { Product } from "@/types/invoice";

interface ListProductCardProps {
  // Product
  product: Product;
  router: AppRouterInstance;

  // State
  quantity: number;
  isFavorite: boolean;
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

const ListProductCard: React.FC<ListProductCardProps> = ({
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
      e.stopPropagation();
      handleAddToCart();
    },
    [handleAddToCart],
  );

  if (isMobile) {
    return <ProductCard product={product} viewMode="grid" />;
  }

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
      <div className="overflow-hidden h-48 bg-white rounded-xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg group">
        <div className="flex flex-row h-full">
          <div
            className="overflow-hidden relative w-64 h-full cursor-pointer"
            style={{ background: product.background }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-cover transition-all duration-500 group-hover:scale-105",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
              )}
              onLoad={() => setImageLoaded(true)}
              priority
            />

            {!imageLoaded && (
              <div className="flex absolute inset-0 justify-center items-center bg-gray-200 animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16"></div>
              </div>
            )}

            <div className="absolute top-3 left-3 max-w-[calc(100%-6rem)]">
              <div className="flex flex-wrap gap-2">
                {"discount" in product.details[0].badge && (
                  <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-sm">
                    <span>-{product.details[0].badge.discount}%</span>
                  </span>
                )}
                {"isReward" in product.details[0].badge && (
                  <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-pink-600 to-pink-700 rounded-full shadow-sm">
                    <span>Hàng tặng</span>
                  </span>
                )}
                {"isBestseller" in product.details[0].badge && (
                  <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 rounded-full shadow-sm">
                    <span>Bán chạy</span>
                  </span>
                )}
                {product.details[0].badge.isNew && (
                  <span className="px-3 py-1 text-xs font-medium text-white bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm">
                    <span>Mới</span>
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleFavoriteToggle}
              className="absolute top-3 right-3 p-2 rounded-full shadow-md backdrop-blur-sm transition-all duration-200 bg-white/80 hover:bg-white"
              aria-label="Thêm vào danh sách yêu thích"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "text-red-500 fill-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          <div className="flex-1 p-5">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex justify-between items-start md:mb-2">
                  <span className="mr-2 text-sm text-blue-600 truncate">
                    {product.category}
                  </span>
                  {ratingStats.totalReviews > 0 ? (
                    <div className="flex flex-shrink-0 gap-1 items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium">
                        {ratingStats.displayRating}
                      </span>
                      <span className="inline text-sm text-gray-500">
                        ({ratingStats.totalReviews} đánh giá)
                      </span>
                    </div>
                  ) : (
                    <span className="inline text-sm text-gray-500">
                      Chưa có đánh giá
                    </span>
                  )}
                </div>

                <h3
                  className="mb-3 text-xl font-semibold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 transition-colors cursor-pointer w-fit h-fit line-clamp-2 hover:from-purple-600 hover:to-blue-600"
                  onClick={handleViewProduct}
                  title={product.name}
                >
                  {product.name}
                </h3>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex flex-row gap-x-4 items-center">
                  <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    {formattedPrice}
                  </div>
                  {formattedOriginalPrice && (
                    <div className="text-base text-gray-400 line-through">
                      {formattedOriginalPrice}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 w-2/5">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/products/${product.details[0].slug}`)
                    }
                    className="flex gap-x-3 justify-center items-center p-2 w-full bg-transparent rounded-full border transition-colors cursor-pointer select-none border-primary text-primary md:p-3 hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-primary active:border-primary/70"
                    aria-label="Xem sản phẩm"
                  >
                    <Eye strokeWidth={2.2} className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wide">
                      Xem sản phẩm
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={onAddToCart}
                    className={cn(
                      "flex items-center justify-center w-full p-2 transition-colors bg-transparent border rounded-full cursor-pointer select-none border-primary text-primary md:p-3 gap-x-3",
                      !isOutOfStock &&
                        "hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-primary active:border-primary/70",
                      isOutOfStock &&
                        "bg-gray-200 text-gray-400 border-gray-300 cursor-default",
                    )}
                    aria-label="Thêm vào giỏ hàng"
                  >
                    <ShoppingCart strokeWidth={2.2} className="w-4 h-4" />
                    <span className="text-sm font-bold tracking-wide">
                      Thêm vào giỏ
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(ListProductCard);
