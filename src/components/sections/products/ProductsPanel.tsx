import { ChevronDown, LayoutGrid, List } from "lucide-react";

import { FilterCarousel } from "@/components/ui/filter-carousel";

import { quicksand } from "@/config/fonts";

import { cn } from "@/utils/styleUtils";

import CategoryCarousel from "./CategoryCarousel";

interface ProductsPanelProps {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  sortBy: string;
  setSortBy: (sortBy: string) => void;
  viewMode: "grid" | "list";
  setViewMode: (viewMode: "grid" | "list") => void;
}

const ProductsPanel: React.FC<ProductsPanelProps> = ({
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
}) => {
  const handleCategoryClick = (category: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedCategory(category);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setSortBy(e.target.value);
  };

  const handleViewModeClick =
    (mode: "grid" | "list") => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setViewMode(mode);
    };

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-between gap-4 p-4 mb-8 bg-white border shadow-sm rounded-xl",
        quicksand.className,
      )}
    >
      <FilterCarousel
        isLoading={!categories}
        selectedCategory={selectedCategory}
        categories={categories}
        onSelect={handleCategoryClick}
      />

      <div className="flex gap-4 items-center">
        <div className="hidden relative p-1 bg-gray-200 rounded-lg md:flex">
          {/* Animated active indicator */}
          <span
            className={cn(
              "absolute top-1 left-1 w-8 h-8 rounded-md bg-primary transition-transform duration-300 z-0",
              viewMode === "grid" ? "translate-x-0" : "translate-x-full",
            )}
            aria-hidden="true"
          />
          <button
            type="button"
            onClick={handleViewModeClick("grid")}
            className={cn(
              "relative z-10 flex-1 p-2 rounded-md transition-colors duration-300",
              viewMode === "grid" ? "text-white" : "text-gray-500",
            )}
          >
            <LayoutGrid className="mx-auto w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleViewModeClick("list")}
            className={cn(
              "relative z-10 flex-1 p-2 rounded-md transition-colors duration-300",
              viewMode === "list" ? "text-white" : "text-gray-500",
            )}
          >
            <List className="mx-auto w-4 h-4" />
          </button>
        </div>

        <div className="relative">
          <select
            title="Sắp xếp sản phẩm"
            aria-label="Sắp xếp sản phẩm"
            value={sortBy}
            onChange={handleSortChange}
            className="px-3 py-1.5 font-medium md:px-4 md:py-2 pr-8 md:pr-10 text-xs md:text-sm bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-transparent"
          >
            <option value="featured">Nổi bật</option>
            <option value="newest">Mới nhất</option>
            <option value="price-low">Giá thấp → cao</option>
            <option value="price-high">Giá cao → thấp</option>
            <option value="rating">Đánh giá cao</option>
          </select>
          <ChevronDown className="absolute right-2 top-1/2 w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default ProductsPanel;
