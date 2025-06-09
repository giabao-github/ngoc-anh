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

import { cn } from "@/libs/utils";

interface ProductCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  currentIndex?: number;
  imageRef?: RefObject<HTMLImageElement | null>;
  onSelect: (value: string | null) => void;
  data: {
    value?: string;
    label?: string;
    image: string;
  }[];
}

const DESKTOP_IMAGE_WIDTH = 608;
const MOBILE_IMAGE_WIDTH = "90vw";

export const ProductCarousel = ({
  value,
  isLoading,
  onSelect,
  data,
  currentIndex,
  imageRef,
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
        toast.error("An error occurred");
        console.warn("Carousel selection error:", error);
      }
    };

    try {
      api.on("select", onSelectHandler);
      onSelectHandler();
    } catch (error) {
      toast.error("An error occurred");
      console.warn("Carousel API error:", error);
    }

    return () => {
      try {
        api.off("select", onSelectHandler);
      } catch (error) {
        toast.error("An error occurred");
        console.warn("Carousel cleanup error:", error);
      }
    };
  }, [api, onSelect]);

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "center",
          dragFree: true,
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {!isLoading &&
            data.map((item, index) => {
              return (
                <CarouselItem
                  key={item.value ?? index.toString()}
                  onClick={() => onSelect(item.value ?? index.toString())}
                  className="relative pl-3 cursor-pointer basis-auto group"
                >
                  {/* Desktop image */}
                  <div
                    className="relative hidden overflow-hidden rounded-md md:block aspect-square"
                    style={{ width: DESKTOP_IMAGE_WIDTH }}
                  >
                    <Image
                      ref={index === currentIndex ? imageRef : null}
                      src={item.image}
                      alt={item.label ?? ""}
                      fill
                      quality={100}
                      sizes={`(min-width: 768px) ${DESKTOP_IMAGE_WIDTH}px`}
                      className={cn(
                        "object-cover transition-transform duration-300 select-none",
                      )}
                    />
                  </div>
                  {/* Mobile image */}
                  <div
                    className="relative overflow-hidden rounded-md md:hidden aspect-square"
                    style={{ width: MOBILE_IMAGE_WIDTH }}
                  >
                    <Image
                      ref={index === currentIndex ? imageRef : null}
                      src={item.image}
                      alt={item.label ?? ""}
                      fill
                      quality={100}
                      sizes={`(max-width: 767px) ${MOBILE_IMAGE_WIDTH}`}
                      className={cn(
                        "object-cover transition-transform duration-300 select-none",
                      )}
                    />
                  </div>
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-10 ml-3 md:ml-2 bg-white/30 text-black/70 hover:bg-white hover:text-black active:bg-white/70 active:text-black/70" />
        <CarouselNext className="right-0 z-10 mr-3 md:mr-2 bg-white/30 text-black/70 hover:bg-white hover:text-black active:bg-white/70 active:text-black/70" />
      </Carousel>
    </div>
  );
};
