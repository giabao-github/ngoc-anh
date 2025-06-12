import { RefObject, memo, useLayoutEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { products } from "@/app/storage";

import ProductCard from "./ProductCard";

const ROWS_PER_CLICK = 2;

interface ProductsProps {
  productsRef?: RefObject<HTMLDivElement | null>;
}

const Products: React.FC<ProductsProps> = ({ productsRef }) => {
  const router = useRouter();
  const [visibleRows, setVisibleRows] = useState(ROWS_PER_CLICK);
  const productsPerRow = { mobile: 2, desktop: 3 };
  const itemsToShow = visibleRows * productsPerRow.desktop;
  const isAllVisible = itemsToShow >= products.length;

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);

  const updateGridHeight = () => {
    if (gridRef.current) {
      setGridHeight(gridRef.current.scrollHeight);
    }
  };

  useLayoutEffect(() => {
    updateGridHeight();
    // Add resize observer to handle window resizing
    const resizeObserver = new ResizeObserver(updateGridHeight);
    if (gridRef.current) {
      resizeObserver.observe(gridRef.current);
    }
    return () => resizeObserver.disconnect();
  }, [visibleRows]);

  const handleNavigate = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  const showMore = () => {
    setVisibleRows((prev) => prev + ROWS_PER_CLICK);
  };

  const collapse = () => {
    setVisibleRows(ROWS_PER_CLICK);
    productsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={productsRef}
      className="px-2 py-16 md:py-32 xl:py-40 md:px-6 bg-secondary"
    >
      <div className="max-w-lg mx-auto transition-all md:max-w-7xl duration-400">
        <h2 className="mb-20 text-xl font-semibold tracking-wide text-center text-primary md:text-2xl xl:text-3xl 2xl:text-4xl md:mb-24 2xl:mb-32">
          Khám phá cửa hàng trực tuyến THẠCH ÂM
        </h2>

        <div
          className="overflow-hidden transition-all ease-in-out duration-400"
          style={{ maxHeight: gridHeight ? `${gridHeight}px` : "9999px" }}
        >
          <div
            ref={gridRef}
            className="grid justify-center grid-cols-2 gap-2 transition-opacity md:grid-cols-3 md:gap-4 2xl:gap-8 duration-400"
          >
            {products.slice(0, itemsToShow).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>

        {products.length > ROWS_PER_CLICK * productsPerRow.desktop && (
          <div className="flex justify-center mt-8 transition-all md:mt-16 duration-400">
            <button
              onClick={!isAllVisible ? showMore : collapse}
              className="px-6 py-3 text-xs font-semibold tracking-wide transition-colors bg-transparent border rounded-full cursor-pointer select-none text-primary border-primary md:px-8 md:py-4 md:text-base hover:bg-white hover:text-primary active:bg-white/70 active:text-primary/70"
            >
              {!isAllVisible ? "Xem thêm sản phẩm" : "Thu gọn"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default memo(Products);
