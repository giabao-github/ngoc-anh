import { useEffect, useMemo, useRef } from "react";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useNotification } from "@/hooks/useNotification";
import { useProductState } from "@/hooks/useProductState";

import {
  calculateRatingStats,
  createImageData,
  findProductBySlug,
} from "@/libs/productUtils";

import { ImageData, Product } from "@/types/invoice";

export const useProductView = (slug: string) => {
  const product: Product | undefined = useMemo(
    () => findProductBySlug(slug),
    [slug],
  );

  // Refs
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const cartIconRef = useRef<HTMLDivElement | null>(null);

  // Custom hooks
  const notification = useNotification();
  const addToCartHook = useAddToCart(
    product,
    imageRef,
    cartIconRef,
    notification.showNotificationWithTimeout,
  );
  const productState = useProductState(
    product,
    addToCartHook.availableQuantity,
    slug,
  );

  // Memoized values
  const images = useMemo(() => product?.images ?? [], [product?.images]);
  const ratingStats = useMemo(
    () => calculateRatingStats(product?.rating),
    [product?.rating],
  );
  const imageData: ImageData[] = useMemo(
    () =>
      createImageData(
        images,
        product?.name || "",
        product?.background || "transparent",
      ),
    [images, product?.name, product?.background],
  );

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Main add to cart handler
  const handleAddToCart = (skipAnimation: boolean = false) => {
    addToCartHook.addToCart(productState.quantity, skipAnimation);
  };

  return {
    // Product data
    product,
    images,
    imageData,
    ratingStats,
    // Refs
    aboutRef,
    imageRef,
    cartIconRef,
    // State from product state hook
    ...productState,
    // Cart functionality
    cartQuantity: addToCartHook.cartQuantity,
    availableQuantity: addToCartHook.availableQuantity,
    isOutOfStock: addToCartHook.isOutOfStock,
    handleAddToCart,
    // Notification functionality
    showNotification: notification.showNotification,
    notificationFlag: notification.notificationFlag,
    handleCloseNotification: notification.hideNotification,
    progress: notification.progress,
  };
};
