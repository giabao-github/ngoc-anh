"use client";

import {
  RefObject,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useRouter } from "next/navigation";

import ProductCard from "@/components/sections/products/ProductCard";

import useIsMobile from "@/hooks/useIsMobile";

import { products } from "@/app/storage";

const ROWS_PER_CLICK = 2;
const PRODUCTS_PER_ROW = { mobile: 2, desktop: 3 };

interface ProductsProps {
  productsRef?: RefObject<HTMLDivElement | null>;
}

const Products: React.FC<ProductsProps> = ({ productsRef }) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [visibleRows, setVisibleRows] = useState(ROWS_PER_CLICK);
  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);

  const { itemsToShow, isAllVisible, showControls } = useMemo(() => {
    const columns = isMobile
      ? PRODUCTS_PER_ROW.mobile
      : PRODUCTS_PER_ROW.desktop;
    const items = visibleRows * columns;
    return {
      itemsToShow: items,
      isAllVisible: items >= products.length,
      showControls: products.length > ROWS_PER_CLICK * columns,
    };
  }, [visibleRows, isMobile]);

  const visibleProducts = useMemo(
    () => products.slice(0, itemsToShow),
    [itemsToShow],
  );

  const updateGridHeight = useCallback(() => {
    if (gridRef.current) {
      setGridHeight(gridRef.current.scrollHeight);
    }
  }, []);

  useLayoutEffect(() => {
    updateGridHeight();
  }, [visibleRows, updateGridHeight]);

  const handleNavigate = useCallback(
    (slug: string) => {
      router.push(`/products/${slug}`);
    },
    [router],
  );

  const showMore = useCallback(() => {
    setVisibleRows((prev) => prev + ROWS_PER_CLICK);
  }, []);

  const collapse = useCallback(() => {
    setVisibleRows(ROWS_PER_CLICK);
    productsRef?.current?.scrollIntoView({ behavior: "smooth" });
  }, [productsRef]);

  return (
    <section
      ref={productsRef}
      className="px-2 py-16 md:py-32 xl:py-40 md:px-6 bg-secondary"
    >
      <div className="max-w-lg mx-auto transition-all md:max-w-7xl duration-400">
        <h2 className="mb-20 text-xl font-semibold tracking-wide text-center text-primary md:text-3xl xl:text-4xl md:mb-24 2xl:mb-32">
          Khám phá cửa hàng trực tuyến THẠCH ÂM
        </h2>

        {/* Animated wrapper */}
        <div
          className="overflow-hidden transition-all ease-in-out duration-400"
          style={{ maxHeight: gridHeight ? `${gridHeight}px` : "9999px" }}
        >
          <div
            ref={gridRef}
            className="grid justify-center grid-cols-2 gap-2 transition-opacity md:grid-cols-3 md:gap-4 2xl:gap-8 duration-400"
          >
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onNavigate={handleNavigate}
              />
            ))}
          </div>
        </div>

        {/* Control buttons */}
        {showControls && (
          <div className="flex justify-center mt-8 transition-all md:mt-16 duration-400">
            {!isAllVisible ? (
              <button
                onClick={showMore}
                className="px-6 py-3 text-xs font-semibold tracking-wide transition-colors bg-transparent border rounded-full cursor-pointer select-none text-primary border-primary md:px-8 md:py-4 md:text-base hover:bg-white hover:text-primary active:bg-white/70 active:text-primary/70"
              >
                Xem thêm sản phẩm
              </button>
            ) : (
              <button
                onClick={collapse}
                className="px-6 py-3 text-xs font-semibold tracking-wide transition-colors bg-transparent border rounded-full cursor-pointer select-none text-primary border-primary md:px-8 md:py-4 md:text-base hover:bg-white hover:text-primary active:bg-white/70 active:text-primary/70"
              >
                Thu gọn
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;
