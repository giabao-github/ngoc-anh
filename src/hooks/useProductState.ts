import { useCallback, useEffect, useMemo, useState } from "react";

import { toast } from "sonner";

import { Product } from "@/types/invoice";

export const useProductState = (
  product: Product | undefined,
  availableQuantity: number,
  initialSlug?: string,
) => {
  const [activeVariant, setActiveVariant] = useState(initialSlug || "");
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeDetailIndex, setActiveDetailIndex] = useState(0);

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
      if (!activeVariant) {
        setActiveVariant(product.details[0].slug);
      }
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product, activeVariant]);

  // Quantity warning effect
  useEffect(() => {
    if (isAtMaxQuantity && availableQuantity > 0) {
      const timeoutId = setTimeout(() => {
        toast.warning("Đã đạt số lượng mua tối đa cho sản phẩm này");
      }, 300);

      return () => clearTimeout(timeoutId);
    }
  }, [isAtMaxQuantity, availableQuantity]);

  return {
    activeVariant,
    setActiveVariant,
    quantity,
    currentImageIndex,
    setCurrentImageIndex,
    canIncrement,
    canDecrement,
    isAtMaxQuantity,
    handleQuantityChange,
    activeDetailIndex,
    setActiveDetailIndex,
  };
};
