"use client";

import { RefObject, useEffect, useState } from "react";

import Image from "next/image";
import { toast } from "sonner";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { ToastIds } from "@/constants/toastIds";

import { cn } from "@/libs/utils";

import { ImageData, Product } from "@/app/types";

import { Skeleton } from "./skeleton";

interface ProductCarouselProps {
  isLoading?: boolean;
  currentIndex?: number;
  imageRef?: RefObject<HTMLImageElement | null>;
  onSelect: (value: string | null) => void;
  data: ImageData[];
  product: Product;
}

const DESKTOP_IMAGE_WIDTH = 608;
const MOBILE_IMAGE_WIDTH = "95vw";

export const ProductCarousel = ({
  isLoading,
  data,
  currentIndex,
  imageRef,
  onSelect,
  product,
}: ProductCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();

  useEffect(() => {
    if (api && currentIndex !== undefined) {
      api.scrollTo(currentIndex);
    }
  }, [api, currentIndex]);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelectHandler = () => {
      try {
        const selectedIndex = api.selectedScrollSnap();
        onSelect(selectedIndex.toString());
      } catch (error) {
        toast.error("Không thể tải hình ảnh sản phẩm", {
          id: ToastIds.PRODUCT_CAROUSEL_SELECTION_ERROR,
        });
        console.warn("Carousel selection error:", error);
      }
    };

    api.on("select", onSelectHandler);
    onSelectHandler();

    return () => {
      api && api.off("select", onSelectHandler);
    };
  }, [api, onSelect]);

  if (isLoading) {
    return (
      <Skeleton className="w-full h-auto bg-gray-300 rounded-md aspect-square" />
    );
  }

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{ align: "center", dragFree: true, loop: true }}
        className="w-full h-full"
      >
        <CarouselContent className="-ml-3">
          {data.map((item, index) => (
            <CarouselItem
              key={item.value ?? index.toString()}
              onClick={() => onSelect(item.value ?? index.toString())}
              className="relative pl-3 cursor-pointer basis-auto group"
            >
              {/* Desktop image */}
              <div
                className="relative hidden overflow-hidden rounded-md md:block aspect-square"
                style={{
                  width: DESKTOP_IMAGE_WIDTH,
                }}
              >
                <Image
                  ref={index === currentIndex ? imageRef : null}
                  src={item.image}
                  alt={`${product.name} - ${item.label || `Hình ảnh ${index + 1}`}`}
                  fill
                  quality={100}
                  className={cn(
                    "w-full h-full transition-transform duration-300 select-none",
                    (product.zoom?.length ?? 0)
                      ? "object-cover"
                      : "object-contain",
                  )}
                  style={{
                    backgroundImage: product.background || "",
                  }}
                />
              </div>
              {/* Mobile image */}
              <div
                className="relative overflow-hidden rounded-md md:hidden aspect-square"
                style={{
                  width: MOBILE_IMAGE_WIDTH,
                }}
              >
                <Image
                  ref={index === currentIndex ? imageRef : null}
                  src={item.image}
                  alt={`${product.name} - ${item.label || `Hình ảnh ${index + 1}`}`}
                  fill
                  quality={100}
                  className={cn(
                    "w-full h-full transition-transform duration-300 select-none",
                    (product.zoom?.length ?? 0)
                      ? "object-cover"
                      : "object-contain",
                  )}
                  style={{
                    backgroundImage: product.background || "",
                  }}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-10 ml-3 md:ml-2 bg-white/30 text-black/70 hover:bg-white hover:text-black active:bg-white/70 active:text-black/70" />
        <CarouselNext className="right-0 z-10 mr-3 md:mr-2 bg-white/30 text-black/70 hover:bg-white hover:text-black active:bg-white/70 active:text-black/70" />
      </Carousel>
    </div>
  );
};
