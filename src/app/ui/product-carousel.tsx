"use client";

import { cn } from "@/app/lib/utils";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/app/ui/carousel";
import Image from "next/image";
import { RefObject, useEffect, useState } from "react";


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
                {/* Desktop image */}
                <div className="hidden md:block relative overflow-hidden rounded-md w-[608px] aspect-square">
                  <Image
                    ref={index === currentIndex ? imageRef : null}
                    src={item.image}
                    alt={item.label ?? ''}
                    fill
                    sizes="(min-width: 768px) 608px"
                    className={cn(
                      "object-cover transition-transform duration-300 select-none",
                    )}
                  />
                </div>
                <div className="md:hidden w-[90vw] relative overflow-hidden rounded-md aspect-square">
                  {/* Mobile image */}
                  <Image
                    ref={index === currentIndex ? imageRef : null}
                    src={item.image}
                    alt={item.label ?? ''}
                    fill
                    sizes="(max-width: 767px) 90vw"
                    className={cn(
                      "object-cover transition-transform duration-300 select-none",
                    )}
                  />
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className='ml-3 md:ml-2 left-0 z-20 bg-white/30 text-black/70 hover:bg-white hover:text-black active:bg-white/70 active:text-black/70' />
        <CarouselNext className='mr-3 md:mr-2 right-0 z-20 bg-white/30 text-black/70 hover:bg-white hover:text-black active:bg-white/70 active:text-black/70' />
      </Carousel>
    </div>
  );
};
