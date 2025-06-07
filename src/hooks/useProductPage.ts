import { useEffect, useMemo, useRef } from "react";

import { useAddToCart } from "@/hooks/useAddToCart";
import { useNotification } from "@/hooks/useNotification";
import { useProductState } from "@/hooks/useProductState";

import { Product } from "@/app/types";
import {
  calculateRatingStats,
  createImageData,
  findProductBySlug,
} from "@/lib/productUtils";

export const useProductPage = (slug: string) => {
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
  );

  // Memoized values
  const images = useMemo(() => product?.images ?? [], [product?.images]);
  const ratingStats = useMemo(
    () => calculateRatingStats(product?.rating),
    [product?.rating],
  );
  const imageData = useMemo(
    () => createImageData(images, product?.name || ""),
    [images, product?.name],
  );

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [slug]);

  // Main add to cart handler
  const handleAddToCart = () => {
    addToCartHook.addToCart(productState.quantity);
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
  };
};
