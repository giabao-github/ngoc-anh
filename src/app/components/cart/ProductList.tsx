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
  const [maxHeight, setMaxHeight] = useState<number | undefined>(undefined);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

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

    let totalHeight = 0;
    const itemsToMeasure = Math.min(maxItems, items.length);
    
    for (let i = 0; i < itemsToMeasure; i++) {
      totalHeight += (items[i] as HTMLElement).offsetHeight;
    }
    
    const spacing = 24 * (itemsToMeasure - 1);
    const verticalPadding = isMobile ? 10 : 24;
    setMaxHeight(totalHeight + spacing + 2 * verticalPadding);
  }, [isMobile]);

  useEffect(() => {
    // Initial calculation
    const frame = requestAnimationFrame(updateMaxHeight);

    // Set up ResizeObserver for dynamic updates
    if (containerRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        requestAnimationFrame(updateMaxHeight);
      });

      const items = containerRef.current.querySelectorAll('[data-item-index]');
      items.forEach(item => {
        resizeObserverRef.current?.observe(item as Element);
      });
    }

    return () => {
      cancelAnimationFrame(frame);
      resizeObserverRef.current?.disconnect();
    };
  }, [updateMaxHeight, cartItems.length]);

  // Clean up ResizeObserver when items change
  useEffect(() => {
    if (resizeObserverRef.current && containerRef.current) {
      resizeObserverRef.current.disconnect();
      
      const items = containerRef.current.querySelectorAll('[data-item-index]');
      items.forEach(item => {
        resizeObserverRef.current?.observe(item as Element);
      });
    }
  }, [cartItems.length]);


  return (
    <ScrollArea 
      className={isMobile ? "px-3" : "px-8"}
    >
      <div 
        ref={containerRef}
        style={{ maxHeight }} 
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
        <ScrollBar orientation="vertical" />
      </div>
    </ScrollArea>
  );
};

export default ProductList;