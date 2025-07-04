import { useCallback, useMemo } from "react";
import { FiCheck, FiShoppingCart, FiX } from "react-icons/fi";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import useIsMobile from "@/hooks/useIsMobile";

import { formatPrice } from "@/utils/productUtils";
import { cn } from "@/utils/styleUtils";

import { Product } from "@/types/invoice";

interface AddToCartPopupProps {
  show: boolean;
  flag: string;
  product: Product;
  quantity: number;
  cartQuantity: number;
  onClose: () => void;
  progress: number;
}

const AddToCartPopup: React.FC<AddToCartPopupProps> = ({
  show,
  flag,
  product,
  quantity,
  cartQuantity,
  onClose,
  progress,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  // Memoize formatted prices
  const price = useMemo(
    () => formatPrice(product.details[0].price * quantity),
    [product.details[0].price, quantity],
  );
  const totalPrice = useMemo(
    () => formatPrice(product.details[0].price * cartQuantity),
    [product.details[0].price, cartQuantity],
  );

  const handleManualClose = useCallback(() => {
    onClose();
  }, [onClose]);

  const handleViewCart = useCallback(() => {
    onClose();
    router.push("/cart");
  }, [onClose, router]);

  if (!show) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed z-50 transition-all duration-300 ease-out",
        isMobile
          ? cn(
              "bottom-0 right-4 left-4 transform",
              show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-full",
            )
          : cn(
              "right-4 top-20 transform w-[340px]",
              show
                ? "opacity-100 scale-100 translate-x-0"
                : "opacity-0 scale-95 translate-x-full",
            ),
        "overflow-hidden bg-white rounded-2xl border border-gray-100 shadow-xl",
      )}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-2">
            <div className="flex justify-center items-center w-6 h-6 bg-green-100 rounded-full">
              <FiCheck className="w-4 h-4 text-green-600" />
            </div>
            <h4 className="text-sm font-semibold text-gray-900">
              {flag === "add" ? "Đã thêm vào giỏ hàng" : "Đã cập nhật giỏ hàng"}
            </h4>
          </div>
          <button
            type="button"
            onClick={handleManualClose}
            className="p-1 rounded-full transition-colors hover:bg-gray-100 active:bg-gray-200"
            aria-label="Đóng"
          >
            <FiX className="w-4 h-4 text-gray-400" />
          </button>
        </div>
        <div className="flex items-start mb-4 space-x-3">
          <div className="relative flex-shrink-0">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={64}
              height={64}
              quality={100}
              className={cn(
                "w-16 h-16 border border-gray-200 rounded-xl",
                (product.zoom?.length ?? 0) ? "object-cover" : "object-contain",
              )}
              style={{
                background: product.background || "",
              }}
            />
            <div className="flex absolute -top-2 -right-2 justify-center items-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full">
              {quantity}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h5 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h5>
            <div className="space-y-1">
              {isMobile ? (
                <p className="text-xs text-gray-500">
                  {`Số lượng: ${quantity} (tổng trong giỏ: ${cartQuantity})`}
                </p>
              ) : (
                <>
                  <p className="text-xs text-gray-700">Số lượng: {quantity}</p>
                  <p className="text-xs text-gray-700">
                    Tổng trong giỏ: {cartQuantity}
                  </p>
                </>
              )}
              <p className="text-sm font-semibold text-gray-900">
                {`${price} (${totalPrice})`}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <Button
            variant="outline"
            onClick={handleManualClose}
            className="flex-1 font-semibold border-gray-300 transition-all duration-200 hover:border-gray-400"
          >
            <span className="text-sm">Tiếp tục mua</span>
          </Button>
          <Button
            onClick={handleViewCart}
            className={cn(
              "flex-1 bg-green-600 hover:bg-green-600 text-white font-semibold transition-all duration-200",
              "shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
            )}
          >
            <FiShoppingCart className="w-4 h-4" />
            <span className="text-sm">Xem giỏ hàng</span>
          </Button>
        </div>
      </div>
      <div className="h-1 bg-gray-100">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-75 ease-linear"
          style={{ width: `${Math.max(0, Math.min(progress, 100))}%` }}
        />
      </div>
    </div>
  );
};
export default AddToCartPopup;
