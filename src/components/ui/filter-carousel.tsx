"use client";

import { useEffect, useState } from "react";

import Image from "next/image";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import useIsMobile from "@/hooks/useIsMobile";

import { cn } from "@/libs/utils";

interface FilterCarouselProps {
  isLoading?: boolean;
  onSelect: (value: string | null) => void;
  data: {
    value: string;
    label: string;
    image: string;
    description: string;
  }[];
}

export const FilterCarousel = ({
  isLoading,
  onSelect,
  data,
}: FilterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [showInfoMap, setShowInfoMap] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelect = () => setCurrent(api.selectedScrollSnap() + 1);
    onSelect();
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Handle automatic show on desktop only (currently unused, keep for future approach)
  // useEffect(() => {
  //   if (!isMobile && data.length > 0) {
  //     const activeItem = data[current - 1];
  //     if (activeItem) {
  //       const timeout = setTimeout(() => {
  //         setShowInfoMap((prev) => ({
  //           ...prev,
  //           [activeItem.value]: true,
  //         }));
  //       }, 500);

  //       // Hide info for all other items
  //       setShowInfoMap((prev) => {
  //         const newMap = { ...prev };
  //         data.forEach((item) => {
  //           if (item.value !== activeItem.value) {
  //             newMap[item.value] = false;
  //           }
  //         });
  //         return newMap;
  //       });

  //       return () => clearTimeout(timeout);
  //     }
  //   } else if (!isMobile) {
  //     // Hide all info when not mobile
  //     setShowInfoMap({});
  //   }
  // }, [current, isMobile, data]);

  const handleClick = (item: {
    value: string;
    label: string;
    image: string;
    description: string;
  }) => {
    onSelect(item.value);
    if (isMobile) {
      setShowInfoMap((prev) => ({
        ...prev,
        [item.value]: !prev[item.value],
      }));
    }
  };

  return (
    <div className="relative w-full">
      <Carousel
        setApi={setApi}
        opts={{
          align: "start",
          dragFree: true,
          loop: true,
          skipSnaps: false,
        }}
        className="w-full px-10 md:px-12"
      >
        <CarouselContent className="-ml-2 md:-ml-3">
          {!isLoading &&
            data.map((item, index) => {
              // const showInfo = showInfoMap[item.value] || false;

              return (
                <CarouselItem
                  key={item.value}
                  onClick={() => handleClick(item)}
                  className="relative pl-3 cursor-pointer basis-auto group"
                >
                  {/* Desktop image */}
                  <div className="relative hidden border border-secondary md:block overflow-hidden rounded-md w-[372px] h-[266px] 2xl:w-[558px] 2xl:h-[400px]">
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      quality={100}
                      priority={index === 0}
                      sizes="(min-width: 1536px) 558px, (min-width: 768px) 372px"
                      className={cn(
                        "object-cover transition-transform duration-300 hover:scale-105 select-none",
                      )}
                    />
                  </div>
                  <div className="md:hidden relative overflow-hidden rounded-md w-[286px] h-[206px] border border-secondary">
                    {/* Mobile image */}
                    <Image
                      src={item.image}
                      alt={item.label}
                      fill
                      quality={100}
                      priority={index === 0}
                      sizes="(max-width: 767px) 286px"
                      className={cn(
                        "object-cover transition-transform duration-300 select-none",
                      )}
                    />
                    {/* Info icon (mobile only, currently unused, keep for future approach) */}
                    {/* {isMobile && (
                      <div className="absolute z-10 bottom-3 right-4">
                        <div className="h-auto p-1 rounded-full shadow-md bg-white/60 active:bg-white/80 backdrop-blur-md">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-black/60 active:text-black/80"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"
                            />
                          </svg>
                        </div>
                      </div>
                    )} */}
                  </div>

                  {/* Info popup (currently unused, keep for future approach) */}
                  {/* <div
                    className={cn(
                      "absolute right-14 bottom-3 md:right-3 rounded-lg backdrop-blur-md bg-white/80 text-black shadow-lg w-54 md:w-80 transform transition-all duration-300 ease-in-out origin-bottom-right",
                      showInfo
                        ? "opacity-100 scale-100 translate-x-0"
                        : "opacity-0 scale-95 -translate-x-3 pointer-events-none",
                    )}
                  >
                    <div className="p-3 space-y-1">
                      <p className="text-xs font-semibold truncate md:text-base">
                        {item.label}
                      </p>
                      <p className="text-xs text-gray-700 md:text-sm">
                        {item.description}
                      </p>
                    </div>
                  </div> */}
                </CarouselItem>
              );
            })}
        </CarouselContent>
        <CarouselPrevious className="left-0 z-10 active:bg-black/70 active:text-white/70" />
        <CarouselNext className="right-0 z-10 active:bg-black/70 active:text-white/70" />
      </Carousel>
    </div>
  );
};
