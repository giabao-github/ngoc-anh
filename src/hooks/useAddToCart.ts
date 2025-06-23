import { RefObject, useCallback, useMemo } from "react";
import React from "react";

import { toast } from "sonner";

import { ToastIds } from "@/constants/toastIds";

import { useCart } from "@/hooks/useCart";
import useIsMobile from "@/hooks/useIsMobile";

import { animateAddToCart } from "@/utils/cartUtils";
import { createCartItem, getCartFromStorage } from "@/utils/productUtils";

import { CartItem } from "@/types/cart";
import { Product } from "@/types/invoice";

export const useAddToCart = (
  product: Product | undefined,
  imageRef: RefObject<HTMLElement | null>,
  cartIconRef: RefObject<HTMLDivElement | null>,
  showNotificationWithTimeout: (flag: string) => void,
) => {
  const { cartItems, updateCartCount } = useCart();
  const isMobile = useIsMobile();

  // Calculate quantities
  const cartQuantity = useMemo(() => {
    if (!product || !cartItems) {
      return 0;
    }
    const cartItem = cartItems.find(
      (item) => item.id === product.id && item.name === product.name,
    );
    return cartItem?.quantity || 0;
  }, [product, cartItems]);

  const availableQuantity = useMemo(() => {
    if (!product) {
      return 0;
    }
    return Math.max(0, product.quantity - cartQuantity);
  }, [product, cartQuantity]);

  const isOutOfStock = useMemo(
    () => availableQuantity === 0,
    [availableQuantity],
  );

  const addToCart = useCallback(
    (quantity: number, skipAnimation: boolean = false) => {
      if (!product) {
        toast.error("Không thể thêm sản phẩm vào giỏ hàng");
        return;
      }

      if (availableQuantity === 0) {
        toast.warning("Đã đạt số lượng mua tối đa của sản phẩm này");
        return;
      }

      if (quantity > availableQuantity) {
        toast.warning("Số lượng bạn chọn vượt quá số lượng có sẵn");
        return;
      }

      const existingCart = getCartFromStorage();
      const existingIndex = existingCart.findIndex(
        (item: CartItem) =>
          item.id === product.id && item.name === product.name,
      );
      const itemToAdd = createCartItem(product, quantity);
      const flag = existingIndex !== -1 ? "update" : "add";

      const updateLocalCart = () => {
        if (existingIndex !== -1) {
          existingCart[existingIndex].quantity = Math.min(
            existingCart[existingIndex].quantity + quantity,
            product.quantity,
          );
        } else {
          existingCart.push(itemToAdd);
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        updateCartCount();
      };

      try {
        // Animate and show notification
        if (!skipAnimation) {
          const startAnimation = animateAddToCart(
            imageRef,
            cartIconRef,
            isMobile,
          );
          showNotificationWithTimeout(flag);

          // Update cart after animation delay and cleanup animation
          setTimeout(() => {
            updateLocalCart();
            if (typeof startAnimation === "function") {
              startAnimation();
            }
          }, 1000);
        } else {
          showNotificationWithTimeout(flag);
          updateLocalCart();
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng", {
          id: ToastIds.ADD_TO_CART_ERROR,
        });
      }
    },
    [
      product,
      availableQuantity,
      cartQuantity,
      isMobile,
      updateCartCount,
      imageRef,
      cartIconRef,
      showNotificationWithTimeout,
    ],
  );

  return {
    cartQuantity,
    availableQuantity,
    isOutOfStock,
    addToCart,
  };
};
