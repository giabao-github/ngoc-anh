"use client";

import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./carousel";
import Image from "next/image";

interface ProductCarouselProps {
  value?: string | null;
  isLoading?: boolean;
  currentIndex?: number;
  onSelect: (value: string | null) => void;
  data: {
    value?: string;
    label?: string;
    image: string;
  }[];
}


export const ProductCarousel = ({
  value,
  isLoading,
  onSelect,
  data,
  currentIndex,
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
      const selectedIndex = api.selectedScrollSnap();
      onSelect(selectedIndex.toString());
    };

    api.on('select', onSelectHandler);

    onSelectHandler();

    return () => {
      api.off('select', onSelectHandler);
    };
  }, [api, onSelect]);

  return (
    <div className='relative w-full'>
      <Carousel
        setApi={setApi}
        opts={{
          align: 'center',
          dragFree: true,
          loop: true,
        }}
        className='w-full'
      >
        <CarouselContent className='-ml-3'>
          {!isLoading && data.map((item, index) => {
            return (
              <CarouselItem
                key={item.value?? + index}
                onClick={() => onSelect(Number(item.value ?? + index).toString())}
                className='pl-3 basis-auto relative cursor-pointer group'
              >
                <div className="relative overflow-hidden rounded-md">
                  {/* Desktop image */}
                  <Image
                    src={item.image}
                    alt={item.label ?? ''}
                    width={648}
                    height={648}
                    className={cn(
                      "hidden md:block object-cover transition-transform duration-300 select-none",
                    )}
                  />
                  {/* Mobile image */}
                  <Image
                    src={item.image}
                    alt={item.label ?? ''}
                    width={304}
                    height={304}
                    className={cn(
                      "md:hidden object-cover transition-transform duration-300 select-none",
                    )}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='ml-2 left-0 z-20 bg-white/30 text-black/70 hover:bg-white hover:text-black' />
        <CarouselNext className='mr-2 right-0 z-20 bg-white/30 text-black/70 hover:bg-white hover:text-black' />
      </Carousel>
    </div>
  );
};
