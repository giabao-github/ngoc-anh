import { useCallback, useEffect, useRef, useState } from "react";
import { FiCheck, FiShoppingCart, FiX } from "react-icons/fi";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import useIsMobile from "@/hooks/useIsMobile";

import { cn } from "@/libs/utils";

import { Product } from "@/app/types";

interface AddToCartPopupProps {
  show: boolean;
  flag: string;
  product: Product;
  quantity: number;
  cartQuantity: number;
  onClose: () => void;
}

const AddToCartPopup: React.FC<AddToCartPopupProps> = ({
  show,
  flag,
  product,
  quantity,
  cartQuantity,
  onClose,
}) => {
  {
    /* Important notes (please read carefully and give a hotfix before committing): 
    This add to cart pop-up has several problems that may critically affect UX:
    - The progress bar does not reset its remaining time immediately when clicking to add to cart button multiple times, it waits for the current progress bar completes to start the new progress bar, causing a quite long delay.
    - Since the above delay, when clicking to add multiple items or a same item multiple times in short time (before a pop-up disappears), pop-up disappear before a progress bar completes, leading to user confusion and weird behavior.
    - When a pop-up is opened, clicking X icon cannot close it, but reset the progress bar remaining time (which is the expected outcome of the stated issues, currently no idea where this weird behavior is coming from). In brief, the close button is currently useless. The pop-up only auto closes after time out. The same issue appears on "Tiếp tục mua" and "Xem giỏ hàng" buttons, which cannot serve their accurate purpose but leading to the stated weird behavior.
    - Currently, there is no solution to fix those issues. The reviewer should propose a fix of all of stated ones, or create a simple version of it: remove complicated logic, only keep the UI and basic implementation.
    - All of the above is not all the issues happening, they are just identified issues.  
  */
  }
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const hideTimeoutRef = useRef<number | null>(null);

  // Cleanup function for timers
  const cleanupTimers = useCallback(() => {
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Handle popup closure
  const handleClose = useCallback(() => {
    cleanupTimers();
    setIsVisible(false);
    hideTimeoutRef.current = Number(
      setTimeout(() => {
        setShouldRender(false);
        onClose();
      }, 300), // Matches closing animation duration
    );
  }, [cleanupTimers, onClose]);

  // Sync popup visibility and animation with show prop
  useEffect(() => {
    if (show) {
      cleanupTimers();
      setShouldRender(true);
      setIsVisible(true);
      setAnimationKey((prev) => prev + 1); // Increment key to restart animation
    } else if (isVisible) {
      handleClose();
    }
    return cleanupTimers;
  }, [show, cleanupTimers, handleClose, isVisible]);

  const handleManualClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleViewCart = useCallback(() => {
    cleanupTimers();
    setIsVisible(false);
    hideTimeoutRef.current = Number(
      setTimeout(() => {
        setShouldRender(false);
        onClose();
        router.push("/cart");
      }, 300),
    );
  }, [cleanupTimers, onClose, router]);

  const handleBackdropClick = useCallback(() => {
    if (isMobile) {
      handleManualClose();
    }
  }, [isMobile, handleManualClose]);

  if (!shouldRender) {
    return null;
  }

  return (
    <>
      {isMobile && (
        <div
          className={cn(
            "fixed inset-0 bg-black/20 z-40 transition-opacity duration-300",
            isVisible ? "opacity-100" : "opacity-0",
          )}
          onClick={handleBackdropClick}
        />
      )}
      <div
        className={cn(
          "fixed z-50 transition-all duration-300 ease-out",
          isMobile
            ? cn(
                "left-4 right-4 bottom-4 transform",
                isVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-full opacity-0",
              )
            : cn(
                "top-20 right-4 w-80 transform",
                isVisible
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-95",
              ),
          "bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden",
        )}
      >
        <div className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-6 h-6 bg-green-100 rounded-full">
                <FiCheck className="w-4 h-4 text-green-600" />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">
                {flag === "add"
                  ? "Đã thêm vào giỏ hàng"
                  : "Đã cập nhật giỏ hàng"}
              </h4>
            </div>
            <button
              onClick={handleManualClose}
              className="p-1 transition-colors rounded-full hover:bg-gray-100 active:bg-gray-200"
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
                className={cn(
                  "w-16 h-16 border border-gray-200 rounded-xl",
                  (product.zoom ?? false)
                    ? "object-cover"
                    : "object-contain p-1",
                )}
                style={{
                  backgroundColor: product.background || "transparent",
                }}
              />
              <div className="absolute flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full -top-2 -right-2">
                {quantity}
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="mb-1 text-sm font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h5>
              <div className="space-y-1">
                <p className="text-xs text-gray-500">
                  Số lượng:{" "}
                  <span className="font-medium text-gray-700">{quantity}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Tổng trong giỏ:{" "}
                  <span className="font-medium text-gray-700">
                    {cartQuantity}
                  </span>
                </p>
                <p className="text-sm font-semibold text-gray-900">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.details[0].price * quantity)}
                </p>
              </div>
            </div>
          </div>
          <div className={cn("flex gap-3", isMobile ? "flex-col" : "flex-row")}>
            <Button
              variant="outline"
              onClick={handleManualClose}
              className={cn(
                "transition-all duration-200 border-gray-200 hover:border-gray-300",
                isMobile ? "flex-1" : "flex-1",
              )}
            >
              <span className="text-sm">Tiếp tục mua</span>
            </Button>
            <Button
              onClick={handleViewCart}
              className={cn(
                "bg-green-500 hover:bg-green-600 text-white transition-all duration-200",
                "shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]",
                isMobile ? "flex-1" : "flex-1",
              )}
            >
              <FiShoppingCart className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Xem giỏ hàng</span>
            </Button>
          </div>
        </div>
        <div className="h-1 bg-gray-100">
          <div
            key={animationKey} // Key changes to restart animation
            className={cn(
              "h-full bg-gradient-to-r from-green-400 to-green-600",
              isVisible && "animate-progress",
            )}
            onAnimationEnd={() => {
              if (isVisible) {
                handleClose();
              }
            }}
          />
        </div>
      </div>
    </>
  );
};

export default AddToCartPopup;
