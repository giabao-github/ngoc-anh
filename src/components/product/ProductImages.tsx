import { RefObject } from "react";

import Image from "next/image";

import { ProductCarousel } from "@/components/ui/product-carousel";
import { Separator } from "@/components/ui/separator";

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
          className="relative overflow-hidden rounded-lg aspect-square"
        >
          <ProductCarousel
            onSelect={(value) => setCurrentIndex(Number(value))}
            data={data}
            currentIndex={currentIndex}
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 mx-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`aspect-square w-16 md:w-28 cursor-pointer rounded-lg overflow-hidden ${
              currentIndex === index
                ? "ring-2 ring-secondary"
                : "ring-1 ring-neutral-100"
            }`}
          >
            <Image
              width={2048}
              height={2048}
              src={img}
              quality={100}
              alt={product.name}
              className="object-cover w-full h-full md:rotate-0 rotate-90"
            />
          </button>
        ))}
      </div>

      <div className="mt-8 md:mt-16 md:-mx-8">
        <Separator color="#BB9244" opacity={100} />
      </div>
    </div>
  );
};

export default ProductImages;
