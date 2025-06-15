import { useCallback, useMemo, useState } from "react";
import { MdOutlineDiscount } from "react-icons/md";

import { Eye, Heart, ShoppingCart, Star, Zap } from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import AddToCartPopup from "@/components/product/AddToCartPopup";

import { calculateRatingStats, getDiscountPrice } from "@/libs/productUtils";
import { cn } from "@/libs/utils";

import { Product } from "@/app/types";

interface ListProductCardProps {
  // Product
  product: Product;
  router: AppRouterInstance;

  // State
  quantity: number;
  isFavorite: boolean;
  ratingStats: { totalReviews: number; averageRating: number };

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
}) => {
  const favoriteKey = `favorite-${product.id}`;
  const [imageLoaded, setImageLoaded] = useState(false);

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

  return (
    <>
      <AddToCartPopup
        show={showNotification}
        flag={notificationFlag}
        product={product}
        quantity={quantity}
        cartQuantity={cartQuantity}
        onClose={handleCloseNotification}
      />
      <div className="overflow-hidden transition-all duration-300 bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-lg group">
        <div className="flex flex-row">
          <div
            className="relative w-64 h-auto overflow-hidden cursor-pointer"
            style={{ backgroundColor: product.background }}
          >
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn(
                "object-contain transition-all duration-500 group-hover:scale-105",
                imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
              )}
              onLoad={() => setImageLoaded(true)}
              priority
            />

            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
                <div className="w-8 h-8 bg-gray-300 rounded-full sm:w-12 sm:h-12 md:w-16 md:h-16"></div>
              </div>
            )}

            <div className="absolute top-3 left-3 max-w-[calc(100%-6rem)]">
              <div className="flex flex-wrap gap-2">
                {"discount" in product.details[0].badge && (
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-red-500 to-red-600">
                    <span>-{product.details[0].badge.discount}%</span>
                  </span>
                )}
                {"isReward" in product.details[0].badge && (
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-pink-600 to-pink-700">
                    <span>Hàng tặng</span>
                  </span>
                )}
                {"isBestseller" in product.details[0].badge && (
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-orange-500 to-orange-600">
                    <span>Bán chạy</span>
                  </span>
                )}
                {product.details[0].badge.isNew && (
                  <span className="px-3 py-1 text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-green-500 to-green-600">
                    <span>Mới</span>
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={handleFavoriteToggle}
              className="absolute p-2 transition-all duration-200 rounded-full shadow-md top-3 right-3 bg-white/80 backdrop-blur-sm hover:bg-white"
              aria-label="Thêm vào danh sách yêu thích"
            >
              <Heart
                className={`w-4 h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
              />
            </button>
          </div>

          <div className="flex-1 p-5">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <div className="flex items-start justify-between md:mb-2">
                  <span className="mr-2 text-sm font-medium text-blue-600 truncate">
                    {product.category}
                  </span>
                  <div className="flex items-center flex-shrink-0 gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">
                      {ratingStats.averageRating}
                    </span>
                    <span className="inline text-sm text-gray-500">
                      ({ratingStats.totalReviews} đánh giá)
                    </span>
                  </div>
                </div>

                <h3
                  className="mb-3 text-lg font-semibold leading-tight text-transparent transition-colors cursor-pointer w-fit h-fit line-clamp-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-600"
                  onClick={handleViewProduct}
                  title={product.name}
                >
                  {product.name}
                </h3>

                {/* {"features" in product.details && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.details[0].features.map((feature: string, index: number) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )} */}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-row items-center gap-2">
                  <div className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                    {getDiscountPrice(product)}
                  </div>
                  {"discount" in product.details[0].badge && (
                    <div className="text-sm text-gray-400 line-through ">
                      {product.details[0].price.toLocaleString("vi-VN")}đ
                    </div>
                  )}
                </div>

                <div className="flex w-2/5 gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      router.push(`/products/${product.details[0].slug}`)
                    }
                    className="flex items-center justify-center w-full p-2 transition-colors bg-transparent border rounded-full cursor-pointer select-none border-primary text-primary md:p-3 hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-primary active:border-primary/70 gap-x-3"
                    aria-label="Xem sản phẩm"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="text-sm font-semibold tracking-wide">
                      Xem sản phẩm
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={isOutOfStock}
                    className="flex items-center justify-center w-full p-2 transition-colors bg-transparent border rounded-full cursor-pointer select-none border-primary text-primary md:p-3 hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-primary active:border-primary/70 gap-x-3 disabled:bg-gray-200 disabled:text-gray-400 disabled:border-gray-300 disabled:cursor-default"
                    aria-label="Thêm vào giỏ hàng"
                  >
                    <ShoppingCart className={cn("w-4 h-4")} />
                    <span className="text-sm font-semibold tracking-wide">
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

export default ListProductCard;
