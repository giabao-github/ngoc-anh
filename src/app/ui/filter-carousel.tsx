"use client";

import useIsMobile from "@/app/hooks/useIsMobile";
import { cn } from "@/app/lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/ui/carousel";
import Image from "next/image";
import { useEffect, useState } from "react";


interface FilterCarouselProps {
  value?: string | null;
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
  value,
  isLoading,
  onSelect,
  data
}: FilterCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className='relative w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          dragFree: true,
          loop: true,
        }}
        className='w-full px-10 md:px-12'
      >
        <CarouselContent className='-ml-3'>
          {!isLoading && data.map((item, index) => {
            const isActive = index === current - 1;
            const [showInfo, setShowInfo] = useState(false);

            // Handle automatic show on desktop only
            useEffect(() => {
              if (!isMobile && isActive) {
                const timeout = setTimeout(() => {
                  setShowInfo(true);
                }, 500);
                return () => clearTimeout(timeout);
              } else if (!isMobile) {
                setShowInfo(false);
              }
            }, [isActive, isMobile]);

            const handleClick = () => {
              onSelect(item.value);
              if (isMobile) {
                setShowInfo(prev => !prev);
              }
            };

            return (
              <CarouselItem
                key={item.value}
                onClick={handleClick}
                className='pl-3 basis-auto relative cursor-pointer group'
              >
                {/* Desktop image */}
                <div className="relative hidden md:block overflow-hidden rounded-md w-[1034px] h-[742px]">
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(min-width: 768px) 1034px"
                    className={cn(
                      "transition-transform duration-300 hover:scale-105 select-none",
                    )}
                  />
                </div>
                <div className="md:hidden relative overflow-hidden rounded-md w-[286px] h-[206px]">
                  {/* Mobile image */}
                  <Image
                    src={item.image}
                    alt={item.label}
                    fill
                    sizes="(max-width: 767px) 286px"
                    className={cn(
                      "h-auto transition-transform duration-300 select-none",
                    )}
                  />
                  {/* Info icon (mobile only) */}
                  {isMobile && (
                    <div className="absolute bottom-3 right-4 z-10">
                      <div className="bg-white/60 active:bg-white/80 h-auto backdrop-blur-md rounded-full p-1 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-black/60 active:text-black/80"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 100 20 10 10 0 000-20z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Info popup */}
                <div className={cn(
                  "absolute right-14 bottom-3 md:right-3 rounded-lg backdrop-blur-md bg-white/80 text-black shadow-lg w-54 md:w-80 transform transition-all duration-300 ease-in-out origin-bottom-right",
                  showInfo
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-95 -translate-x-3 pointer-events-none"
                )}>
                  <div className="p-3 space-y-1">
                    <p className="font-semibold text-xs md:text-base truncate">{item.label}</p>
                    <p className="text-xs md:text-sm text-gray-700">{item.description}</p>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='left-0 z-10 active:bg-black/70 active:text-white/70' />
        <CarouselNext className='right-0 z-10 active:bg-black/70 active:text-white/70' />
      </Carousel>
    </div>
  );
};
