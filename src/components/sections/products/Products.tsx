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

import { arsenal } from "@/config/fonts";

import { calculateRatingStats } from "@/utils/productUtils";
import { cn } from "@/utils/styleUtils";

import { products } from "@/app/storage";

const INITIAL_ROWS = 2;
const LOAD_MORE_ROWS = 2;
const PRODUCTS_PER_ROW: Record<"mobile" | "tablet" | "desktop" | "xl", number> =
  {
    mobile: 2,
    tablet: 2,
    desktop: 3,
    xl: 4,
  };

// Breakpoints matching Tailwind CSS
const BREAKPOINTS = {
  tablet: 768,
  desktop: 1024,
  xl: 1536,
} as const;

interface ProductsProps {
  productsRef?: RefObject<HTMLDivElement | null>;
}

const Products: React.FC<ProductsProps> = ({ productsRef }) => {
  const [viewportWidth, setViewportWidth] = useState(0);
  const [visibleRows, setVisibleRows] = useState(INITIAL_ROWS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isInitialized, setIsInitialized] = useState(false);

  const scrollPositionRef = useRef(0);
  const isUpdatingRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Memoize viewport calculations
  const viewportInfo = useMemo(() => {
    const isMobile = viewportWidth > 0 && viewportWidth < BREAKPOINTS.tablet;
    const isTablet =
      viewportWidth >= BREAKPOINTS.tablet &&
      viewportWidth < BREAKPOINTS.desktop;
    const isDesktop =
      viewportWidth >= BREAKPOINTS.desktop && viewportWidth < BREAKPOINTS.xl;
    const isXl = viewportWidth >= BREAKPOINTS.xl;

    return { isMobile, isTablet, isDesktop, isXl };
  }, [viewportWidth]);

  const getColumnsPerRow = useCallback(() => {
    const { isTablet, isDesktop, isXl } = viewportInfo;

    if (isTablet) return PRODUCTS_PER_ROW.tablet;
    if (isDesktop) return PRODUCTS_PER_ROW.desktop;
    if (isXl) return PRODUCTS_PER_ROW.xl;
    return PRODUCTS_PER_ROW.mobile;
  }, [viewportInfo]);

  // Reset visible rows when viewport changes to maintain consistent initial display
  useEffect(() => {
    if (isInitialized && viewportWidth > 0) {
      setVisibleRows(INITIAL_ROWS);
    }
  }, [viewportWidth, isInitialized]);

  const handleCategoryChange = useCallback(
    (category: string) => {
      if (category === selectedCategory) return;

      isUpdatingRef.current = true;
      scrollPositionRef.current = window.scrollY;
      setSelectedCategory(category);
      setVisibleRows(INITIAL_ROWS);
    },
    [selectedCategory],
  );

  const handleSortChange = useCallback(
    (newSortBy: string) => {
      if (newSortBy === sortBy) return;

      isUpdatingRef.current = true;
      scrollPositionRef.current = window.scrollY;
      setSortBy(newSortBy);
    },
    [sortBy],
  );

  // Handle scroll position restoration with improved timing
  useLayoutEffect(() => {
    if (isUpdatingRef.current && wrapperRef.current) {
      const wrapper = wrapperRef.current;
      const originalHeight = wrapper.scrollHeight;

      requestAnimationFrame(() => {
        const newHeight = wrapper.scrollHeight;
        const heightDiff = newHeight - originalHeight;

        window.scrollTo({
          top: scrollPositionRef.current + heightDiff,
          behavior: "auto",
        });

        isUpdatingRef.current = false;
      });
    }
  }, [selectedCategory, sortBy]);

  // Handle viewport width changes with debouncing
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setViewportWidth(window.innerWidth);
      }, 100); // Debounce resize events
    };

    // Set initial width and mark as initialized
    setViewportWidth(window.innerWidth);
    setIsInitialized(true);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Memoize filtered and sorted products with better performance
  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? products
        : products.filter(
            (p) => p.category.toLowerCase() === selectedCategory.toLowerCase(),
          );

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort((a, b) => {
          const priceA = a.details[0]?.price ?? Number.POSITIVE_INFINITY;
          const priceB = b.details[0]?.price ?? Number.POSITIVE_INFINITY;
          return priceA - priceB;
        });

      case "price-high":
        return [...filtered].sort((a, b) => {
          const priceA = a.details[0]?.price ?? Number.NEGATIVE_INFINITY;
          const priceB = b.details[0]?.price ?? Number.NEGATIVE_INFINITY;
          return priceB - priceA;
        });

      case "rating":
        return [...filtered]
          .map((p) => ({
            product: p,
            avg: calculateRatingStats(p.rating).averageRating,
          }))
          .sort((a, b) => b.avg - a.avg)
          .map(({ product }) => product);

      case "newest":
        return [...filtered].sort((a, b) => b.id - a.id);

      default:
        return filtered;
    }
  }, [selectedCategory, sortBy]);

  // Calculate display information
  const displayInfo = useMemo(() => {
    const columns = getColumnsPerRow();
    const itemsToShow = visibleRows * columns;
    const initialItems = INITIAL_ROWS * columns;

    return {
      itemsToShow,
      isAllVisible: itemsToShow >= filteredAndSortedProducts.length,
      showControls: filteredAndSortedProducts.length > initialItems,
      columns,
    };
  }, [visibleRows, filteredAndSortedProducts.length, getColumnsPerRow]);

  const visibleProducts = useMemo(
    () => filteredAndSortedProducts.slice(0, displayInfo.itemsToShow),
    [filteredAndSortedProducts, displayInfo.itemsToShow],
  );

  const showMore = useCallback(() => {
    const currentScroll = window.scrollY;
    setVisibleRows((prev) => prev + LOAD_MORE_ROWS);

    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScroll,
        behavior: "auto",
      });
    });
  }, []);

  const collapse = useCallback(() => {
    setVisibleRows(INITIAL_ROWS);
    if (productsRef?.current) {
      productsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [productsRef]);

  // Memoize categories to prevent unnecessary recalculations
  const categories = useMemo(() => {
    const uniqueCategories = new Set<string>();
    const categoryMap = new Map<string, string>();

    products.forEach((p) => {
      const key = p.category.toLowerCase();
      if (!uniqueCategories.has(key)) {
        uniqueCategories.add(key);
        categoryMap.set(key, p.category);
      }
    });

    return ["all", ...Array.from(categoryMap.values())];
  }, []);

  // Grid class based on view mode and responsive design
  const gridClasses = useMemo(() => {
    if (viewMode === "list") {
      return "grid-cols-1";
    }

    // Use Tailwind responsive classes for better performance
    return "grid-cols-2 md:grid-cols-3 2xl:grid-cols-4";
  }, [viewMode]);

  return (
    <section
      ref={productsRef}
      className="px-4 py-16 md:py-24 lg:py-32 bg-secondary"
    >
      <div className="mx-auto max-w-7xl 2xl:max-w-[1700px]">
        <div className="mb-12 text-center md:mb-16">
          <h2
            className={cn(
              "mb-4 space-y-3 text-xl font-bold text-gray-900 md:text-2xl xl:text-3xl 2xl:text-4xl",
              arsenal.className,
            )}
          >
            <div>Khám phá cửa hàng trực tuyến</div>
            <div className="block text-transparent bg-clip-text bg-gradient-to-r to-green-500 from-primary">
              THẠCH ÂM
            </div>
          </h2>
          <p className="mx-auto max-w-2xl text-sm font-medium text-gray-800 md:text-lg">
            Những sản phẩm chất lượng cao được tuyển chọn kỹ lưỡng dành riêng
            cho bạn
          </p>
        </div>

        <ProductsPanel
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategoryChange={handleCategoryChange}
          sortBy={sortBy}
          setSortBy={handleSortChange}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        <div ref={wrapperRef} className="relative">
          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div
              className={cn(
                "grid gap-2 transition-all duration-300 md:gap-4 xl:gap-6",
                gridClasses,
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
          showControls={displayInfo.showControls}
          isAllVisible={displayInfo.isAllVisible}
          showMore={showMore}
          collapse={collapse}
        />
      </div>
    </section>
  );
};

export default Products;
