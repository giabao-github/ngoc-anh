import { RefObject } from "react";

import Image from "next/image";

import { ProductCarousel } from "@/components/ui/product-carousel";
import { Separator } from "@/components/ui/separator";

import { cn } from "@/libs/utils";

import { ImageData, Product } from "@/types/invoice";

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
            product={product}
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
              "aspect-square relative w-16 md:w-28 cursor-pointer rounded-lg overflow-hidden",
              currentIndex === index
                ? "ring-2 ring-secondary"
                : "ring-1 ring-neutral-100 hover:ring-neutral-300",
            )}
          >
            <Image
              src={img}
              alt={product.name}
              fill
              quality={100}
              className={cn(
                "w-full h-full",
                (product.zoom?.length ?? 0) ? "object-cover" : "object-contain",
              )}
              style={{
                background: product.background || "",
              }}
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
