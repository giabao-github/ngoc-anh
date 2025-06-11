"use client";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { toast } from "sonner";

import { products } from "@/app/storage";
import { CartItem, Product } from "@/app/types";
import { ToastIds } from "@/constants/toastIds";
import { getLocalCart } from "@/libs/cartUtils";

interface CartContextType {
  cartItems: CartItem[] | undefined;
  cartCount: number;
  totalPrice: number;
  totalCount: number;
  updateCartCount: () => void;
  isLoading: boolean;
  handleQuantityChange: (
    type: "increment" | "decrement" | "set",
    product: Product,
    value?: number,
  ) => void;
  handleRemove: (item: CartItem) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

const getCartItemKey = (item: { id: number; name: string }) =>
  `${item.id}-${item.name}`;

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const syncTimeoutRef = useRef<NodeJS.Timeout>(null);

  const cartCount = useMemo(() => cartItems?.length || 0, [cartItems]);

  const totalPrice = useMemo(() => {
    return (
      cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0
    );
  }, [cartItems]);

  const totalCount = useMemo(() => {
    return cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
  }, [cartItems]);

  // Debounced localStorage update
  const updateLocalStorage = useCallback((items: CartItem[]) => {
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    syncTimeoutRef.current = setTimeout(() => {
      try {
        localStorage.setItem("cart", JSON.stringify(items));
        // Dispatch custom event for cross-tab synchronization
        window.dispatchEvent(new CustomEvent("cartUpdated", { detail: items }));
      } catch (error) {
        console.error("Error updating localStorage:", error);
        toast.error("Không thể lưu giỏ hàng", {
          id: ToastIds.SAVE_CART_ERROR,
        });
      }
    }, 100);
  }, []);

  const updateCart = useCallback(
    (newItems: CartItem[]) => {
      setCartItems(newItems);
      updateLocalStorage(newItems);
    },
    [updateLocalStorage],
  );

  const initializeCart = useCallback(() => {
    try {
      const localCart = getLocalCart();

      // Validate and sync cart items with current products
      const validatedCart = localCart
        .map((item) => {
          const product = products.find(
            (p) => p.id === item.id && p.name === item.name,
          );
          if (!product) {
            return null;
          }

          return {
            id: product.id,
            name: product.name,
            color: product.details[0].color,
            slug: product.details[0].slug,
            price: product.details[0].price,
            image: product.images[0],
            quantity: Math.min(item.quantity, product.quantity || 1),
            maxQuantity: product.quantity,
            size: product.size,
          } as CartItem;
        })
        .filter((item): item is CartItem => item !== null);

      setCartItems(validatedCart);

      // Update localStorage if items were filtered out
      if (validatedCart.length !== localCart.length) {
        updateLocalStorage(validatedCart);
      }
    } catch (error) {
      console.error("Error initializing cart:", error);
      setCartItems([]);
    } finally {
      setIsLoading(false);
    }
  }, [updateLocalStorage]);

  const handleStorageChange = useCallback((event: CustomEvent<CartItem[]>) => {
    if (event.detail) {
      setCartItems(event.detail);
    }
  }, []);

  useEffect(() => {
    initializeCart();

    // Listen for custom cart update events (cross-tab sync)
    window.addEventListener(
      "cartUpdated",
      handleStorageChange as EventListener,
    );

    return () => {
      window.removeEventListener(
        "cartUpdated",
        handleStorageChange as EventListener,
      );
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [initializeCart, handleStorageChange]);

  const updateCartCount = useCallback(() => {
    initializeCart();
  }, [initializeCart]);

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [updateCartCount]);

  const handleQuantityChange = useCallback(
    (
      type: "increment" | "decrement" | "set",
      product: Product,
      value?: number,
    ) => {
      const itemKey = getCartItemKey(product);

      const newItems = cartItems?.map((item) => {
        if (getCartItemKey(item) !== itemKey) {
          return item;
        }

        const maxQty = product.quantity || 1;
        let newQty = item.quantity;

        switch (type) {
          case "increment":
            if (newQty + 1 >= maxQty) {
              toast.warning("Đã đạt số lượng mua tối đa cho sản phẩm này", {
                id: ToastIds.CART_MAX_QTY_WARNING,
              });
            }
            newQty = Math.min(item.quantity + 1, maxQty);
            break;
          case "decrement":
            newQty = Math.max(item.quantity - 1, 1);
            break;
          case "set":
            if (value !== undefined) {
              newQty = Math.min(Math.max(value, 1), maxQty);
            }
            break;
        }
        return { ...item, quantity: newQty };
      });

      updateCart(newItems || []);
    },
    [cartItems, updateCart],
  );

  const handleRemove = useCallback(
    (item: CartItem) => {
      const itemKey = getCartItemKey(item);
      const newItems =
        cartItems?.filter((i) => getCartItemKey(i) !== itemKey) || [];

      updateCart(newItems);

      toast.success(`Đã xóa ${item.quantity} sản phẩm khỏi giỏ hàng`, {
        id: ToastIds.REMOVE_ITEM_SUCCESS,
      });
    },
    [cartItems, updateCart],
  );

  // Clear cart handler
  const clearCart = useCallback(() => {
    try {
      const count =
        cartItems?.reduce((total, item) => total + item.quantity, 0) || 0;
      localStorage.removeItem("cart");
      setCartItems([]);
      window.dispatchEvent(new CustomEvent("cartUpdated", { detail: [] }));
      toast.success(`Đã xóa tất cả ${count} sản phẩm khỏi giỏ hàng`, {
        id: ToastIds.CLEAR_CART_SUCCESS,
      });
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Không thể xóa giỏ hàng", {
        id: ToastIds.CLEAR_CART_ERROR,
      });
    }
  }, [cartItems]);

  const contextValue = useMemo(
    () => ({
      cartItems,
      cartCount,
      totalPrice,
      totalCount,
      isLoading,
      updateCartCount,
      handleQuantityChange,
      handleRemove,
      clearCart,
    }),
    [
      cartItems,
      cartCount,
      totalPrice,
      totalCount,
      isLoading,
      updateCartCount,
      handleQuantityChange,
      handleRemove,
      clearCart,
    ],
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};
