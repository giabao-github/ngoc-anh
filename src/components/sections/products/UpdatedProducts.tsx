import React, {
  RefObject,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import ControlButtons from "@/components/sections/products/ControlButtons";
import ProductCard from "@/components/sections/products/ProductCard";
import ProductsPanel from "@/components/sections/products/ProductsPanel";

import { calculateRatingStats } from "@/libs/productUtils";
import { cn } from "@/libs/utils";

import { products } from "@/app/storage";
import { Product } from "@/app/types";

const ROWS_PER_CLICK = 2;
const PRODUCTS_PER_ROW = { mobile: 1, tablet: 2, desktop: 3, xl: 4 };

interface ProductsProps {
  productsRef?: RefObject<HTMLDivElement | null>;
}

const UpdatedProducts: React.FC<ProductsProps> = ({ productsRef }) => {
  const [visibleRows, setVisibleRows] = useState(2);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewportWidth, setViewportWidth] = useState(0);
  const scrollPositionRef = useRef(0);
  const isUpdatingRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category === selectedCategory) {
        return;
      }
      isUpdatingRef.current = true;
      scrollPositionRef.current = window.scrollY;
      setSelectedCategory(category);
    },
    [selectedCategory],
  );

  const handleSortChange = useCallback(
    (newSortBy: string) => {
      if (newSortBy === sortBy) {
        return;
      }
      isUpdatingRef.current = true;
      scrollPositionRef.current = window.scrollY;
      setSortBy(newSortBy);
    },
    [sortBy],
  );

  // Handle scroll position restoration
  useLayoutEffect(() => {
    if (isUpdatingRef.current && wrapperRef.current) {
      const wrapper = wrapperRef.current;
      const originalHeight = wrapper.scrollHeight;

      requestAnimationFrame(() => {
        const newHeight = wrapper.scrollHeight;
        const heightDiff = newHeight - originalHeight;
        const scrollDiff = heightDiff;

        window.scrollTo({
          top: scrollPositionRef.current + scrollDiff,
          behavior: "auto",
        });

        isUpdatingRef.current = false;
      });
    }
  }, [selectedCategory, sortBy]);

  // Handle viewport width changes
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = viewportWidth < 768;
  const isTablet = viewportWidth >= 768 && viewportWidth < 1024;
  const isDesktop = viewportWidth >= 1024 && viewportWidth < 1536;

  const getColumnsPerRow = useCallback(() => {
    if (isMobile) {
      return PRODUCTS_PER_ROW.mobile;
    }
    if (isTablet) {
      return PRODUCTS_PER_ROW.tablet;
    }
    if (isDesktop) {
      return PRODUCTS_PER_ROW.desktop;
    }
    return PRODUCTS_PER_ROW.xl;
  }, [isMobile, isTablet, isDesktop]);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? [...products]
        : products.filter((p) => {
            const productCategory = p.category.toLowerCase();
            const selectedCategoryLower = selectedCategory.toLowerCase();
            return productCategory === selectedCategoryLower;
          });

    switch (sortBy) {
      case "price-low":
        return filtered.sort((a, b) => a.details[0].price - b.details[0].price);
      case "price-high":
        return filtered.sort((a, b) => b.details[0].price - a.details[0].price);
      case "rating":
        return filtered.sort(
          (a, b) =>
            calculateRatingStats(b.rating).averageRating -
            calculateRatingStats(a.rating).averageRating,
        );
      case "newest":
        return filtered.sort((a, b) => b.id - a.id);
      default:
        return filtered;
    }
  }, [selectedCategory, sortBy]);

  const { itemsToShow, isAllVisible, showControls } = useMemo(() => {
    const columns = getColumnsPerRow();
    const items = visibleRows * columns;
    return {
      itemsToShow: items,
      isAllVisible: items >= filteredAndSortedProducts.length,
      showControls: filteredAndSortedProducts.length > items,
    };
  }, [visibleRows, filteredAndSortedProducts.length, getColumnsPerRow]);

  const visibleProducts = useMemo(
    () => filteredAndSortedProducts.slice(0, itemsToShow),
    [filteredAndSortedProducts, itemsToShow],
  );

  const showMore = useCallback(() => {
    const currentScroll = window.scrollY;
    setVisibleRows((prev) => prev + ROWS_PER_CLICK);
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScroll,
        behavior: "auto",
      });
    });
  }, []);

  const collapse = useCallback(() => {
    setVisibleRows(ROWS_PER_CLICK);
    if (productsRef?.current) {
      productsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [productsRef]);

  const categories = useMemo(() => {
    const uniqueCategories = new Set(
      products.map((p) => p.category.toLowerCase()),
    );
    return ["all", ...Array.from(uniqueCategories)];
  }, []);

  return (
    <section
      ref={productsRef}
      className="px-4 py-16 md:py-24 lg:py-32 bg-secondary"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1400px]">
        <div className="mb-12 text-center md:mb-16">
          <h2 className="mb-4 space-y-2 text-xl font-bold text-gray-900 md:text-2xl xl:text-3xl 2xl:text-4xl">
            <div>Khám phá cửa hàng trực tuyến</div>
            <div className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-600">
              THẠCH ÂM
            </div>
          </h2>
          <p className="max-w-2xl mx-auto text-sm text-gray-800 md:text-lg">
            Những sản phẩm chất lượng cao được tuyển chọn kỹ lưỡng dành riêng
            cho bạn
          </p>
        </div>

        <ProductsPanel
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategoryChange}
          sortBy={sortBy}
          setSortBy={handleSortChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div ref={wrapperRef} className="relative">
          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div
              ref={gridRef}
              className={cn(
                "grid gap-2 md:gap-4 xl:gap-6 transition-all duration-300",
                viewMode === "list"
                  ? "grid-cols-1"
                  : "grid-cols-2 md:grid-cols-3 2xl:grid-cols-4",
              )}
            >
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        </div>

        <ControlButtons
          showControls={showControls}
          isAllVisible={isAllVisible}
          showMore={showMore}
          collapse={collapse}
        />
      </div>
    </section>
  );
};

export default UpdatedProducts;
