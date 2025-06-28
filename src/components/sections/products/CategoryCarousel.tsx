import { useEffect, useState } from "react";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { cn } from "@/utils/styleUtils";

interface CategoryCarouselProps {
  categories: string[];
  selectedCategory: string;
  onSelect: (category: string) => void;
  renderButton: (props: {
    category: string;
    isSelected: boolean;
    onClick: (e: React.MouseEvent) => void;
    tabIndex: number;
    ariaLabel: string;
    role: string;
    ariaSelected: boolean;
  }) => React.ReactNode;
}

const CategoryCarousel = ({
  categories,
  selectedCategory,
  onSelect,
  renderButton,
}: CategoryCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  // Keyboard navigation: left/right arrow keys
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!api) {
      return;
    }
    if (e.key === "ArrowRight") {
      api.scrollNext();
    } else if (e.key === "ArrowLeft") {
      api.scrollPrev();
    }
  };

  return (
    <div
      className="relative w-full"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label="Chọn danh mục sản phẩm"
    >
      {/* Left fade effect */}
      <div
        className={cn(
          "absolute left-0 top-0 bottom-0 w-8 md:w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none transition-opacity duration-300",
          current === 1 && "opacity-0",
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
          slidesToScroll: 1,
        }}
        className="px-4 w-full md:px-8"
      >
        <CarouselContent className="flex flex-nowrap gap-x-2" role="listbox">
          {categories.map((category, idx) => (
            <CarouselItem key={category} className="flex-shrink-0 w-auto">
              {renderButton({
                category,
                isSelected: selectedCategory === category,
                onClick: (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onSelect(category);
                },
                tabIndex: 0,
                ariaLabel:
                  category === "all"
                    ? "Tất cả"
                    : category.charAt(0).toUpperCase() + category.slice(1),
                role: "option",
                ariaSelected: selectedCategory === category,
              })}
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2 z-20 rounded-full md:left-4" />
        <CarouselNext className="right-2 z-20 rounded-full md:right-4" />
      </Carousel>
      {/* Right fade effect */}
      <div
        className={cn(
          "absolute right-0 top-0 bottom-0 w-8 md:w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none transition-opacity duration-300",
          current === count && "opacity-0",
        )}
      />
    </div>
  );
};

export default CategoryCarousel;
