import { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import { Product } from "@/app/types";

export const useProductState = (
  product: Product | undefined,
  availableQuantity: number,
) => {
  const [activeSelector, setActiveSelector] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Quantity controls
  const isAtMaxQuantity = useMemo(() => {
    return availableQuantity === 0 || quantity >= availableQuantity;
  }, [availableQuantity, quantity]);

  const canIncrement = useMemo(
    () => quantity < availableQuantity,
    [quantity, availableQuantity],
  );
  const canDecrement = useMemo(
    () => quantity > 1 && availableQuantity > 0,
    [quantity, availableQuantity],
  );

  const handleQuantityChange = useCallback(
    (type: "increment" | "decrement" | "set", value?: number) => {
      setQuantity((prev) => {
        if (type === "increment") {
          return Math.min(prev + 1, availableQuantity);
        } else if (type === "decrement") {
          return Math.max(prev - 1, 1);
        } else if (type === "set" && value !== undefined) {
          return Math.min(Math.max(value, 1), availableQuantity);
        }
        return prev;
      });
    },
    [availableQuantity],
  );

  // Initialize state when product changes
  useEffect(() => {
    if (product) {
      const selector = product.details[0].color;
      setActiveSelector(selector);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  // Quantity warning effect
  useEffect(() => {
    if (isAtMaxQuantity && availableQuantity > 0) {
      const timeoutId = setTimeout(() => {
        toast.warning("Đã đạt số lượng mua tối đa cho sản phẩm này", {
          id: "cart-max-quantity-warning",
        });
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isAtMaxQuantity, availableQuantity]);

  return {
    activeSelector,
    setActiveSelector,
    quantity,
    currentImageIndex,
    setCurrentImageIndex,
    canIncrement,
    canDecrement,
    isAtMaxQuantity,
    handleQuantityChange,
  };
};
