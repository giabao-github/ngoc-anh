"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import Image from "next/image";

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

// Helper hook to detect if it's mobile
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // md = 768px
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

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
      {/* Left fade */}
      <div
        className={cn(
          'absolute left-8 md:left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none',
          current === 1 && 'hidden'
        )}
      />
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
                <div className="relative overflow-hidden rounded-md">
                  {/* Desktop image */}
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={1034}
                    height={740}
                    className={cn(
                      "hidden md:block transition-transform duration-300 hover:scale-105",
                    )}
                  />
                  {/* Mobile image */}
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={286}
                    height={204}
                    className={cn(
                      "md:hidden transition-transform duration-300 hover:scale-105",
                    )}
                  />

                  {/* Info icon (mobile only) */}
                  {isMobile && (
                    <div className="absolute bottom-3 right-4 z-10">
                      <div className="bg-white/80 backdrop-blur-md rounded-full p-1 shadow-md">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-black"
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
        <CarouselPrevious className='left-0 z-20' />
        <CarouselNext className='right-0 z-20' />
      </Carousel>

      {/* Right fade */}
      <div
        className={cn(
          'absolute right-8 md:right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none',
          current === count && 'hidden'
        )}
      />
    </div>
  );
};
