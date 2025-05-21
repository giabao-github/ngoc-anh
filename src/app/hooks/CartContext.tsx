"use client";

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { CartItem, Product } from '../types';
import { products } from '../storage';
import { getLocalCart } from '../lib/utils';


interface CartContextType {
  cartItems: CartItem[] | undefined;
  cartCount: number;
  totalPrice: number;
  updateCartCount: () => void;
  handleQuantityChange: (type: "increment" | "decrement" | "set", product: Product, value?: number) => void;
  handleRemove: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | null>(null);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[] | undefined>(undefined);
  const [cartCount, setCartCount] = useState(0);

  const updateCartCount = useCallback(() => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]") as CartItem[];
      setCartCount(cart.length);
      setCartItems(cart);
    } catch (error) {
      console.error("Error updating cart count:", error);
      setCartCount(0);
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
    return () => window.removeEventListener("storage", updateCartCount);
  }, [updateCartCount]);
  
  // Calculate total price whenever cartItems changes
  const totalPrice = useMemo(() => {
    return cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  }, [cartItems]);

  useEffect(() => {
    const syncCartWithProducts = () => {
      try {
        const localCart = getLocalCart();
        
        // Map cart items to products and filter out unavailable products
        const updatedCart = localCart
          .map((item) => {
            const product = products.find((p) => p.id === item.id);
            if (!product) {
              return null;
            }
            
            return {
              id: product.id,
              name: product.name,
              pattern: product.details[0].pattern,
              color: product.details[0].color,
              slug: product.details[0].slug,
              price: product.details[0].price,
              image: product.images[0],
              quantity: Math.min(item.quantity, product.quantity || 1),
              maxQuantity: product.quantity,
              size: product.size,
              volume: product.volume,
            } as CartItem;
          })
          .filter((item): item is CartItem => item !== null);
        
        // Only update if there are changes
        if (JSON.stringify(updatedCart) !== JSON.stringify(cartItems)) {
          setCartItems(updatedCart);
          localStorage.setItem("cart", JSON.stringify(updatedCart));
        }
      } catch (error) {
        console.error("Error syncing cart with products:", error);
      }
    };
  
    syncCartWithProducts();
  }, []);

  const updateLocalCart = useCallback((items: CartItem[]) => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
      setCartItems(items);
      setCartCount(items.length);
    } catch (error) {
      console.error("Error updating local cart:", error);
    }
  }, []);

  const handleQuantityChange = useCallback(
    (type: "increment" | "decrement" | "set", product: Product, value?: number) => {
      const updated = [...cartItems!].map((item) => {
        // Match by both id and pattern for variant products
        if (item.id === product.id && item.slug === product.details[0].slug) {
          let newQty = item.quantity;
          const maxQty = product.quantity || 1;
  
          if (type === "increment") {
            newQty = Math.min(item.quantity + 1, maxQty);
          }
          else if (type === "decrement") {
            newQty = Math.max(item.quantity - 1, 1);
          }
          else if (type === "set" && value !== undefined) {
            newQty = Math.min(Math.max(value, 1), maxQty);
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });

      updateLocalCart(updated);
    }, [cartItems, updateLocalCart]);

  const clearCart = useCallback(() => {
    localStorage.removeItem("cart");
    setCartItems([]);
    setCartCount(0);
  }, []);

  const handleRemove = useCallback((id: number, slug?: string) => {
    const updated = slug
      // Remove by both id and slug if slug is provided
      ? cartItems?.filter(item => !(item.id === id && item.slug === slug))
      // Otherwise remove by id only
      : cartItems?.filter(item => item.id !== id);

    if (updated && updated.length === 0) {
      clearCart();
    } else if (updated) {
      updateLocalCart(updated);
    }
  }, [cartItems, clearCart, updateLocalCart]);

  const contextValue = useMemo(() => ({
    cartItems,
    cartCount, 
    totalPrice,
    updateCartCount, 
    handleQuantityChange, 
    handleRemove, 
    clearCart
  }), [cartItems, cartCount, totalPrice, updateCartCount, handleQuantityChange, handleRemove, clearCart]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
