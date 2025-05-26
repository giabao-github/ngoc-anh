import { useCallback, useEffect, useRef, useState } from "react";

import { CartItem } from "@/app/types";
import CartProduct from "@/app/components/cart/CartProduct";
import { products } from "@/app/storage";
import { ScrollArea, ScrollBar } from "@/app/ui/scroll-area";

interface ProductListProps {
  cartItems: CartItem[],
  isMobile: boolean,
};

const ProductList: React.FC<ProductListProps> = ({ cartItems, isMobile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  // CSS-based approach as fallback
  const estimatedItemHeight = 96;
  const maxItems = isMobile ? 3 : 4;
  const fallbackHeight = (estimatedItemHeight * maxItems) + (24 * (maxItems - 1)) + 32;

  const updateMaxHeight = useCallback(() => {
    if (!containerRef.current) {
      return;
    }

    const maxItems = isMobile ? 3 : 4;
    const items = containerRef.current.querySelectorAll('[data-item-index]');
    
    if (items.length === 0) {
      setMaxHeight(undefined);
      return;
    }

    // Wait for next frame to ensure all styles are applied
    setTimeout(() => {
      let totalHeight = 0;
      const itemsToMeasure = Math.min(maxItems, items.length);
      
      // Measure actual rendered heights
      for (let i = 0; i < itemsToMeasure; i++) {
        const element = items[i] as HTMLElement;
        const rect = element.getBoundingClientRect();
        totalHeight += rect.height;
      }
      
      // Add spacing between items
      const spacing = 24 * (itemsToMeasure - 1);
      
      // Account for container padding
      const containerPadding = 6;
      
      // Account for ScrollArea internal padding/margins
      const scrollAreaBuffer = 8;
      
      const calculatedHeight = totalHeight + spacing + (2 * containerPadding) + scrollAreaBuffer;
      
      setMaxHeight(calculatedHeight);
    }, 0);
  }, [isMobile]);

  // Debounced update function to prevent excessive recalculations
  const debouncedUpdate = useCallback(() => {
    const timeoutId = setTimeout(updateMaxHeight, 50);
    return () => clearTimeout(timeoutId);
  }, [updateMaxHeight]);

  useEffect(() => {
    // Initial calculation with delay to ensure DOM is ready
    const initialTimeout = setTimeout(updateMaxHeight, 100);

    return () => clearTimeout(initialTimeout);
  }, [updateMaxHeight, cartItems.length]);

  // Set up ResizeObserver
  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    // Clean up existing observer
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
    }

    // Create new observer
    resizeObserverRef.current = new ResizeObserver((entries) => {
      // Only update if the observed elements actually changed size
      const hasSignificantChange = entries.some(entry => {
        const { width, height } = entry.contentRect;
        return width > 0 && height > 0;
      });

      if (hasSignificantChange) {
        debouncedUpdate();
      }
    });

    // Observe all cart items
    const items = containerRef.current.querySelectorAll('[data-item-index]');
    items.forEach(item => {
      resizeObserverRef.current?.observe(item as Element);
    });

    // Also observe the container itself for layout changes
    resizeObserverRef.current.observe(containerRef.current);

    return () => {
      resizeObserverRef.current?.disconnect();
    };
  }, [cartItems.length, debouncedUpdate]);

  return (
    <ScrollArea 
      ref={scrollAreaRef}
      className={isMobile ? "px-3" : "px-8"}
    >
      <div 
        ref={containerRef}
        style={{ maxHeight: maxHeight || fallbackHeight }}
        className="space-y-6"
      >
        {cartItems.map((item, index) => {
          const product = products.find((product) => product.id === item.id);
          if (!product) {
            return null;
          }
          
          return (
            <div
              data-item-index={index} 
              key={item.slug}
            >
              <CartProduct 
                item={item} 
                index={index} 
                product={product} 
              />
            </div>
          );
        })}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};

export default ProductList;