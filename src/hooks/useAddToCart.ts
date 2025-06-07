import { RefObject, useCallback, useMemo } from "react";

import { toast } from "sonner";

import { useCart } from "@/hooks/useCart";
import useIsMobile from "@/hooks/useIsMobile";

import { CartItem, Product } from "@/app/types";
import { createCartItem, getCartFromStorage } from "@/lib/productUtils";
import { animateAddToCart } from "@/lib/utils";

export const useAddToCart = (
  product: Product | undefined,
  imageRef: RefObject<HTMLDivElement | null>,
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
    (quantity: number) => {
      if (!product) {
        toast.error("Không thể thêm sản phẩm vào giỏ hàng", {
          description: "Sản phẩm này hiện không tồn tại hoặc đã bị xóa",
        });
        return;
      }

      if (availableQuantity === 0) {
        toast.error("Bạn đã đạt số lượng mua tối đa của sản phẩm này", {
          description: `Số lượng sản phẩm trong giỏ: ${cartQuantity}`,
        });
        return;
      }

      if (quantity > availableQuantity) {
        toast.error("Số lượng bạn chọn vượt quá số lượng có sẵn", {
          description: `Số lượng có sẵn: ${availableQuantity}`,
        });
        return;
      }

      try {
        const existingCart = getCartFromStorage();
        const existingIndex = existingCart.findIndex(
          (item: CartItem) =>
            item.id === product.id && item.name === product.name,
        );
        const itemToAdd = createCartItem(product, quantity);

        // Animate and show notification
        animateAddToCart(imageRef, cartIconRef, isMobile);
        showNotificationWithTimeout(existingIndex !== -1 ? "update" : "add");

        // Update cart after animation delay
        setTimeout(() => {
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
        }, 1000);
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Đã xảy ra lỗi khi thêm sản phẩm vào giỏ hàng");
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
