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
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [progress, setProgress] = useState(100);

  // Use refs to store timer IDs for cleanup
  const autoCloseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Cleanup function to clear all timers
  const cleanupTimers = useCallback(() => {
    if (autoCloseTimerRef.current) {
      clearTimeout(autoCloseTimerRef.current);
      autoCloseTimerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  }, []);

  // Handle popup close with animation
  const handleClose = useCallback(() => {
    cleanupTimers();
    setIsVisible(false);
    hideTimeoutRef.current = setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300); // Match animation duration
  }, [cleanupTimers, onClose]);

  useEffect(() => {
    if (show) {
      // Always cleanup existing timers first
      cleanupTimers();

      // Reset and show popup
      setShouldRender(true);
      setIsVisible(true);
      setProgress(100); // Reset progress bar to 100%

      // Set up the 3-second auto-close timer
      autoCloseTimerRef.current = setTimeout(() => {
        handleClose();
      }, 3000);

      // Smoothly decrease progress bar over 3 seconds (60fps = ~16.67ms intervals)
      const progressStep = 100 / (3000 / 16.67); // Progress decrease per frame
      progressIntervalRef.current = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev - progressStep;
          return newProgress <= 0 ? 0 : newProgress;
        });
      }, 16.67); // ~60fps for smooth animation
    } else if (isVisible) {
      handleClose();
    }

    // Cleanup on unmount or when show changes
    return cleanupTimers;
  }, [show, cleanupTimers, handleClose, isVisible]);

  // Manual close handler
  const handleManualClose = useCallback(() => {
    handleClose();
  }, [handleClose]);

  // View cart handler
  const handleViewCart = useCallback(() => {
    cleanupTimers();
    setIsVisible(false);
    hideTimeoutRef.current = setTimeout(() => {
      setShouldRender(false);
      onClose();
      router.push("/cart");
    }, 300);
  }, [cleanupTimers, onClose, router]);

  // Backdrop click handler (mobile only)
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
            className="h-full transition-all duration-75 ease-out bg-gradient-to-r from-green-400 to-green-600"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </>
  );
};

export default AddToCartPopup;
