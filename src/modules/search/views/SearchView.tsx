"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useSearchParams } from "next/navigation";

import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";
import ProductCard from "@/components/sections/products/ProductCard";
import ProductsPanel from "@/components/sections/products/ProductsPanel";

import { calculateRatingStats } from "@/utils/productUtils";
import { searchProducts } from "@/utils/searchUtils";
import { cn } from "@/utils/styleUtils";

import { Product } from "@/types/product";

export const SearchView = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const aboutRef = useRef<HTMLDivElement>(null);
  const [searchResults, setSearchResults] = useState<Product[]>([]);

  // Update search results when query changes
  useEffect(() => {
    const newResults = searchProducts(query).products;
    setSearchResults(newResults);
  }, [query]);

  const totalResults = searchResults.length;

  // State for product panel
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const scrollPositionRef = useRef(0);
  const isUpdatingRef = useRef(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Reset filters when query changes
  useEffect(() => {
    setSelectedCategory("all");
    setSortBy("featured");
  }, [query]);

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

  const filteredAndSortedProducts = useMemo(() => {
    let filtered =
      selectedCategory === "all"
        ? [...searchResults]
        : searchResults.filter((p) => {
            const productCategory = p.category.toLowerCase();
            const selectedCategoryLower = selectedCategory.toLowerCase();
            return productCategory === selectedCategoryLower;
          });

    switch (sortBy) {
      case "price-low":
        return [...filtered].sort(
          (a, b) =>
            (a.details[0]?.price ?? Number.POSITIVE_INFINITY) -
            (b.details[0]?.price ?? Number.POSITIVE_INFINITY),
        );
      case "price-high":
        return [...filtered].sort(
          (a, b) =>
            (b.details[0]?.price ?? Number.NEGATIVE_INFINITY) -
            (a.details[0]?.price ?? Number.NEGATIVE_INFINITY),
        );
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
  }, [searchResults, selectedCategory, sortBy]);

  const categories = useMemo(() => {
    const unique = new Map<string, string>();
    searchResults.forEach((p) => {
      const key = p.category.toLowerCase();
      if (!unique.has(key)) {
        unique.set(key, p.category);
      }
    });
    return ["all", ...unique.values()];
  }, [searchResults]);

  return (
    <>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="px-2 pt-10 pb-20 lg:px-16">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-16">
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            Tìm kiếm
          </h1>
          {query.trim().length > 0 ? (
            <p className="my-3 text-sm md:text-base text-primary md:my-4">
              Có <strong>{totalResults} sản phẩm</strong> cho tìm kiếm{" "}
              <strong>"{query}"</strong>
            </p>
          ) : (
            <p className="my-3 text-sm md:text-base text-primary md:my-4">
              Vui lòng nhập từ khóa để lọc kết quả chính xác
            </p>
          )}

          <div className="mx-auto mt-2 w-16 h-1 bg-black rounded md:w-20" />
        </div>

        {/* Products Panel */}
        {totalResults > 0 ? (
          <ProductsPanel
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
            sortBy={sortBy}
            setSortBy={handleSortChange}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />
        ) : (
          <p className="px-6 text-sm text-center text-gray-500 md:text-base">
            Vui lòng kiểm tra chính tả, sử dụng các từ tổng quát hơn và thử lại.
          </p>
        )}

        {/* Product Card */}
        <div ref={wrapperRef} className="relative">
          <div className="overflow-hidden transition-all duration-500 ease-in-out">
            <div
              className={cn(
                "grid gap-2 md:gap-4 xl:gap-6 transition-all duration-300",
                viewMode === "list"
                  ? "grid-cols-1"
                  : "grid-cols-2 md:grid-cols-3 2xl:grid-cols-4",
              )}
            >
              {filteredAndSortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </>
  );
};
