import { useRef } from "react";

export const useHeaderCartIcon = () => {
  const cartIconRef = useRef<HTMLDivElement | null>(null);

  return {
    cartIconRef,
  };
};
