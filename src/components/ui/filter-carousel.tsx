"use client";

import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Skeleton } from "@/components/ui/skeleton";

import { cn } from "@/utils/styleUtils";

interface FilterCarouselProps {
  isLoading?: boolean;
  selectedCategory: string;
  categories: string[];
  onSelect: (category: string) => (e: React.MouseEvent) => void;
}

export const FilterCarousel = ({
  isLoading = false,
  selectedCategory,
  categories,
  onSelect,
}: FilterCarouselProps) => {
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

  return (
    <div className="flex relative w-full">
      {/* Left fade effect */}
      <div
        className={cn(
          "absolute left-7 md:left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none transition-opacity duration-300",
          current === 1 && "opacity-0",
        )}
      />
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="px-8 w-full md:px-12"
      >
        <CarouselContent className="flex flex-nowrap gap-x-2 mx-1 py-0.5">
          {isLoading
            ? Array.from({ length: categories.length }).map((_, index) => (
                <CarouselItem key={index} className="flex-shrink-0 w-auto">
                  <Skeleton className="px-4 py-1 w-full h-8 rounded-full" />
                </CarouselItem>
              ))
            : categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="flex-shrink-0 w-auto max-w-fit"
                >
                  <Badge
                    variant={selectedCategory === item ? "default" : "outline"}
                    className={cn(
                      "px-3 py-1.5 md:px-4 md:py-2 border border-neutral-200 rounded-full text-xs md:text-sm font-medium transition-all cursor-pointer",
                      selectedCategory === item
                        ? "bg-blue-600 text-white shadow-md ring-1 ring-blue-400"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300",
                    )}
                    onClick={onSelect(item)}
                    aria-label={`Select ${item} category`}
                  >
                    {index === 0 ? "Tất cả" : item}
                  </Badge>
                </CarouselItem>
              ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-10 rounded-full md:left-1" />
        <CarouselNext className="right-0 z-10 rounded-full md:right-1" />
      </Carousel>
      {/* Right fade effect */}
      <div
        className={cn(
          "absolute right-7 md:right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none transition-opacity duration-300",
          current === count && "opacity-0",
        )}
      />
    </div>
  );
};
