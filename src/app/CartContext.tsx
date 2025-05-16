"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";


interface CartProviderProps {
  children: ReactNode;
}

const CartContext = createContext({
  cartCount: 0,
  updateCartCount: () => {},
});

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: CartProviderProps) => {
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

  return (
    <CartContext.Provider value={{ cartCount, updateCartCount }}>
      {children}
    </CartContext.Provider>
  );
};
