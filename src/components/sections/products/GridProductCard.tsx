import { RefObject, useCallback, useState } from "react";
import { MdOutlineDiscount } from "react-icons/md";

import {
  Eye,
  Heart,
  Shield,
  ShoppingCart,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Image from "next/image";
import { toast } from "sonner";

import ProductError from "@/components/error/ProductError";
import AddToCartPopup from "@/components/product/AddToCartPopup";

import { getDiscountPrice } from "@/libs/productUtils";
import { cn } from "@/libs/utils";

import { Product } from "@/app/types";

interface GridProductCardProps {
  // Product
  product: Product;
  router: AppRouterInstance;

  // State
  quantity: number;
  isFavorite: boolean;
  showQuickView: boolean;
  ratingStats: { totalReviews: number; averageRating: number };

  // Cart state
  cartQuantity: number;
  isOutOfStock: boolean;

  // Handlers
  handleAddToCart: () => void;
  onToggleFavorite: (id: number) => void;
  setShowQuickView: (quickView: boolean) => void;

  // Notification
  showNotification: boolean;
  notificationFlag: string;
  handleCloseNotification: () => void;
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
  showQuickView,
  setShowQuickView,
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
  }, [product.details[0].slug, product.details.length]);

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
      <article className="flex flex-col h-full overflow-hidden transition-all duration-300 transform bg-white border border-gray-100 shadow-sm rounded-xl hover:shadow-xl group hover:border-blue-200 hover:-translate-y-1">
        <div
          className="relative flex-shrink-0 overflow-hidden cursor-pointer h-36 md:h-72"
          style={{ backgroundColor: product.background }}
          onClick={() => setShowQuickView(!showQuickView)}
          onMouseEnter={() => setShowQuickView(true)}
          onMouseLeave={() => setShowQuickView(false)}
        >
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={cn(
              "object-contain transition-all duration-500 group-hover:scale-105",
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-110",
            )}
            onLoad={() => setImageLoaded(true)}
            priority
          />

          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded-full md:w-16 md:h-16"></div>
            </div>
          )}

          <div className="absolute top-2.5 left-2.5 md:top-3 md:left-3 max-w-[calc(100%-4rem)] md:max-w-[calc(100%-6rem)]">
            <div className="flex flex-wrap gap-1.5 md:gap-2">
              {"discount" in product.details[0].badge && (
                <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-red-500 to-red-600 flex items-center gap-1">
                  <MdOutlineDiscount className="hidden w-3 h-3 md:inline" />
                  <span>-{product.details[0].badge.discount}%</span>
                </span>
              )}
              {"isReward" in product.details[0].badge && (
                <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-pink-600 to-pink-700">
                  <span>Hàng tặng</span>
                </span>
              )}
              {"isBestseller" in product.details[0].badge && (
                <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-orange-500 to-orange-600">
                  <span>Bán chạy</span>
                </span>
              )}
              {product.details[0].badge.isNew && (
                <span className="px-2 py-0.5 md:px-3 md:py-1 text-[10px] md:text-xs font-medium text-white rounded-full shadow-sm bg-gradient-to-r from-green-500 to-green-600 flex items-center gap-1">
                  <Zap className="hidden w-3 h-3 md:inline" />
                  <span>Mới</span>
                </span>
              )}
            </div>
          </div>

          <div
            className={`absolute inset-0 bg-black/20 backdrop-blur-[1px] flex items-center justify-center gap-2 md:gap-3 transition-all duration-300 ${
              showQuickView ? "opacity-100" : "opacity-0"
            }`}
          >
            <button
              type="button"
              onClick={() =>
                router.push(`/products/${product.details[0].slug}`)
              }
              className="p-2 transition-all duration-200 rounded-full shadow-lg md:p-3 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110"
              aria-label="Xem sản phẩm"
            >
              <Eye className="w-4 h-4 text-gray-700 md:w-5 md:h-5" />
            </button>
            <button
              type="button"
              onClick={handleFavoriteToggle}
              className="p-2 transition-all duration-200 rounded-full shadow-lg md:p-3 bg-white/80 backdrop-blur-sm hover:bg-white hover:scale-110"
              aria-label="Thêm vào danh sách yêu thích"
            >
              <Heart
                className={`w-4 h-4 md:w-5 md:h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"}`}
              />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart();
              }}
              disabled={isOutOfStock}
              className="p-2 text-white transition-all duration-200 rounded-full shadow-lg md:p-3 bg-amber-600 hover:scale-110 disabled:bg-gray-400 disabled:cursor-default"
              aria-label="Thêm vào giỏ hàng"
            >
              <ShoppingCart
                className={cn("w-4 h-4 text-white md:w-5 md:h-5")}
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
              className={`w-3 h-3 md:w-4 md:h-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>

        <div className="flex flex-col flex-grow p-2.5 md:p-5">
          <div className="flex items-center justify-between flex-shrink-0 mb-1.5 md:mb-2">
            <span className="mr-2 text-[10px] font-medium text-blue-600 truncate md:text-sm">
              {product.category}
            </span>
            <div className="flex items-center flex-shrink-0 gap-1">
              <Star className="w-2.5 h-2.5 text-yellow-400 md:w-4 md:h-4 fill-yellow-400" />
              <span className="text-[10px] font-medium md:text-sm">
                {ratingStats.averageRating}
              </span>
              <span className="hidden text-sm text-gray-500 md:inline">
                ({ratingStats.totalReviews} đánh giá)
              </span>
              <span className="inline text-[10px] text-gray-500 md:hidden">
                ({ratingStats.totalReviews})
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 mb-2 md:mb-3">
            <h3
              className="text-[12px] font-semibold leading-tight text-transparent transition-colors cursor-pointer md:text-lg w-fit h-fit line-clamp-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text hover:from-purple-600 hover:to-blue-600"
              title={product.name}
              onClick={handleViewProduct}
            >
              {product.name}
            </h3>
          </div>

          <div className="flex-grow"></div>

          <div className="flex items-center justify-between flex-shrink-0 mb-1 md:mb-4">
            <div className="flex flex-col gap-0.5 md:flex-row md:items-center md:gap-2">
              <div className="text-base font-bold text-transparent md:text-xl bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                {getDiscountPrice(product)}
              </div>
              {"discount" in product.details[0].badge && (
                <div className="text-xs text-gray-400 line-through md:text-sm">
                  {product.details[0].price.toLocaleString("vi-VN")}đ
                </div>
              )}
            </div>
            <div
              className={`text-xs relative h-full bg-amber-200 md:text-sm ${product.quantity > 0 ? "text-green-600" : "text-red-600"} whitespace-nowrap`}
            >
              <div className="absolute bottom-0 right-0 inline">
                {product.quantity > 0 ? "Còn hàng" : "Hết hàng"}
              </div>
            </div>
          </div>

          <div className="items-center justify-between flex-shrink-0 hidden mt-2 text-xs text-gray-500 md:flex md:mt-4">
            <div className="flex items-center gap-1">
              <Truck className="w-3 h-3" />
              <span className="hidden md:inline">Miễn phí vận chuyển</span>
              <span className="md:hidden">Free ship</span>
            </div>
            <div className="flex items-center gap-1">
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

export default GridProductCard;
