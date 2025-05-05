"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import Image from "next/image";


interface FilterCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  onSelect:  (value: string | null) => void;
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
          'absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none',
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
        className='w-full px-12'
      >
        <CarouselContent className='-ml-3'>
          {!isLoading && data.map((item, index) => {
            const isActive = index === current - 1;
            const [showInfo, setShowInfo] = useState(false);

            useEffect(() => {
              if (isActive) {
                const timeout = setTimeout(() => {
                  setShowInfo(true);
                }, 500);
            
                return () => clearTimeout(timeout);
              } else {
                setShowInfo(false);
              }
            }, [isActive]);

            return (
              <CarouselItem 
                key={item.value}
                onClick={() => onSelect(item.value)}
                className='pl-3 basis-auto relative cursor-pointer group'
              >
                <div className="relative overflow-hidden rounded-md">
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={1034}
                    height={740}
                    className={cn(
                      "hidden md:block transition-transform duration-300 hover:scale-105",
                    )}
                  />
                  <Image
                    src={item.image}
                    alt={item.label}
                    width={517}
                    height={370}
                    className={cn(
                      "md:hidden transition-transform duration-300 hover:scale-105",
                    )}
                  />
                </div>
                <div className={cn(
                  "absolute bottom-3 right-3 rounded-lg backdrop-blur-md bg-white/80 text-black shadow-lg w-80 transform transition-all duration-500 ease-in-out",
                  showInfo 
                    ? "opacity-100 translate-x-0" 
                    : "opacity-0 -translate-x-3 pointer-events-none"
                )}>
                  <div className="p-3 space-y-1">
                    <p className="font-semibold text-base truncate">{item.label}</p>
                    <p className="text-sm text-gray-700 line-clamp-5">{item.description}</p>
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
          'absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none',
          current === count && 'hidden'
        )}
      />
    </div>
  );
}
