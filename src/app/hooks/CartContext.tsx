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
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.length;
    setCartCount(total);
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
    const syncCartWithProducts = async () => {
      const localCart = getLocalCart();
      
      const merged = localCart
        .map((item) => {
          const product = products.find((p) => p.id === item.id);
          if (!product) {
            return null;
          } 
          return { 
            id: product.id,
            name: product.name,
            pattern: product.details[0].pattern,
            slug: product.details[0].slug,
            price: product.details[0].price,
            image: product.images[0],
            quantity: item.quantity,
            maxQuantity: product.quantity,
            size: product.size,
            volume: product.volume,
          };
        })
        .filter(Boolean)
        .map(product => ({
          id: product?.id,
          name: product?.name,
          pattern: product?.pattern,
          slug: product?.slug,
          price: product?.price,
          image: product?.image,
          quantity: product?.quantity
        }));
        setCartItems(merged as CartItem[]);
    };
  
    syncCartWithProducts();
  }, []);

  const handleQuantityChange = (
    type: "increment" | "decrement" | "set",
    product: Product,
    value?: number
  ) => {
    setCartItems((prev) => {
      const updated = prev?.map((item) => {
        if (item.id === product.id && item.pattern === product.details[0].pattern) {
          let newQty = item.quantity;
  
          if (type === "increment" && product.quantity) {
            newQty = Math.min(item.quantity + 1, product.quantity);
          }
          else if (type === "decrement") {
            newQty = Math.max(item.quantity - 1, 1);
          }
          else if (type === "set" && value !== undefined && product.quantity) {
            newQty = Math.min(Math.max(value, 1), product.quantity);
          }
          return { ...item, quantity: newQty };
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updated));

      return updated;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartItems([]);
  };

  const handleRemove = (id: number) => {
    const updated = cartItems?.filter(item => item.id !== id);
  
    if (updated && updated.length === 0) {
      clearCart();
    } else {
      localStorage.setItem("cart", JSON.stringify(updated));
      setCartItems(updated);
    }
  
    updateCartCount();  
  };

  return (
    <CartContext.Provider value={{ 
      cartItems,
      cartCount, 
      totalPrice,
      updateCartCount, 
      handleQuantityChange, 
      handleRemove, 
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};
