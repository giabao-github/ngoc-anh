import { ChevronDown, Grid3X3, List } from "lucide-react";

import { cn } from "@/libs/utils";

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
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 mb-8 bg-white border shadow-sm rounded-xl">
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            type="button"
            key={category}
            onClick={handleCategoryClick(category)}
            className={cn(
              "px-3 py-1.5 md:px-4 md:py-2 border border-neutral-200 rounded-full text-xs md:text-sm font-medium transition-all",
              selectedCategory === category
                ? "bg-blue-600 text-white shadow-md ring-1 ring-blue-400"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200",
            )}
          >
            {category === "all"
              ? "Tất cả"
              : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <select
            title="Sort selection"
            value={sortBy}
            onChange={handleSortChange}
            className="px-3 py-1.5 md:px-4 md:py-2 pr-8 md:pr-10 text-xs md:text-sm bg-white border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-neutral-300 focus:border-transparent"
          >
            <option value="featured">Nổi bật</option>
            <option value="newest">Mới nhất</option>
            <option value="price-low">Giá thấp → cao</option>
            <option value="price-high">Giá cao → thấp</option>
            <option value="rating">Đánh giá cao</option>
          </select>
          <ChevronDown className="absolute w-4 h-4 text-gray-500 transform -translate-y-1/2 pointer-events-none right-2 top-1/2" />
        </div>

        <div className="hidden p-1 bg-gray-100 rounded-lg md:flex">
          <button
            type="button"
            onClick={handleViewModeClick("grid")}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === "grid" ? "bg-white shadow-sm" : "text-gray-500",
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={handleViewModeClick("list")}
            className={cn(
              "p-2 rounded-md transition-all",
              viewMode === "list" ? "bg-white shadow-sm" : "text-gray-500",
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPanel;
