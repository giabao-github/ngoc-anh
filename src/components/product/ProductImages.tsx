import { RefObject } from "react";

import Image from "next/image";

import { ProductCarousel } from "@/components/ui/product-carousel";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/libs/utils";

import { ImageData, Product } from "@/app/types";

interface ProductImagesProps {
  product: Product;
  currentIndex: number;
  images: string[];
  data: ImageData[];
  imageRef?: RefObject<HTMLDivElement | null>;
  setCurrentIndex: (index: number) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({
  product,
  currentIndex,
  images,
  data,
  imageRef,
  setCurrentIndex,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center">
        <div
          ref={imageRef}
          className="relative overflow-hidden rounded-lg ring ring-gray-300 aspect-square"
        >
          <ProductCarousel
            data={data}
            onSelect={(value) => setCurrentIndex(Number(value))}
            currentIndex={currentIndex}
          />
        </div>
      </div>
      <div className="flex justify-center gap-4 mx-auto">
        {images.map((img, index) => (
          <button
            type="button"
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "aspect-square relative w-16 md:w-28 cursor-pointer rounded-lg overflow-hidden group",
              currentIndex === index
                ? "ring-2 ring-secondary"
                : "ring-1 ring-neutral-100",
            )}
          >
            <Image
              src={img}
              alt=""
              fill
              quality={10}
              className="absolute inset-0 object-cover select-none"
              aria-hidden="true"
            />
            <Image
              src={img}
              width={112}
              height={112}
              sizes="(min-width: 768px) 112px, 64px"
              quality={100}
              alt={product.name}
              className="relative object-contain w-full h-full"
            />
          </button>
        ))}
      </div>
      <div className="mt-8 md:mt-16 md:-mx-8">
        <Separator color="#BB9244" opacity={40} />
      </div>
    </div>
  );
};

export default ProductImages;
