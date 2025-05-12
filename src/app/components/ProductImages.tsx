import Image from "next/image";
import { ProductCarousel } from "../ui/product-carousel";
import { ImageData, Product } from "../types";
import { Separator } from "../ui/separator";


interface ProductImagesProps {
  product: Product;
  currentIndex: number;
  images: string[];
  data: ImageData[];
  setCurrentIndex: (index: number) => void;
}

const ProductImages: React.FC<ProductImagesProps> = ({ product, currentIndex, images, data, setCurrentIndex }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center items-center">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <ProductCarousel onSelect={(value) => setCurrentIndex(Number(value))} data={data} currentIndex={currentIndex} />
        </div>
      </div>

      <div className="flex justify-center gap-4 mx-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`aspect-square w-16 md:w-28 cursor-pointer rounded-lg overflow-hidden ${currentIndex === index ? "ring-2 ring-[#BB9244]" : "ring-1 ring-neutral-100"}`}
          >
            <Image
              width={112} 
              height={112} 
              src={img}
              quality={100}
              alt={product.name} 
              className="w-full h-full object-cover"
            /> 
          </button>
        ))}
      </div>

      <div className="mt-8 md:mt-16 md:-mx-8">
        <Separator color="#BB9244" opacity={100} />
      </div>
    </div>
  );
}

export default ProductImages;