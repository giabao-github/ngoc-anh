import { useContext } from "react";

import { CartContext } from "@/hooks/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
