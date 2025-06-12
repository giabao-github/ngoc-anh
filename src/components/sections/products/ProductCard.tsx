import { RefObject, memo } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

import Image from "next/image";

import { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
  onNavigate: (slug: string) => void;
}

const ProductCard = memo(({ product, onNavigate }: ProductCardProps) => (
  <div className="bg-white group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl mx-auto max-w-full md:min-w-[300px] 2xl:min-w-[400px] transform transition-transform duration-400">
    <div
      onClick={() => onNavigate(product.details[0].slug)}
      className="flex items-center justify-center h-[138px] mb-1 overflow-hidden md:h-[260px] xl:h-[278px] 2xl:h-72 md:mb-2"
      style={{
        backgroundColor:
          "background" in product ? product.background : "transparent",
      }}
    >
      <Image
        src={product.images[0]}
        alt={product.name}
        height={1024}
        width={1024}
        quality={100}
        priority={false}
        loading="lazy"
        className="object-contain w-full h-auto transition-transform duration-300 transform cursor-pointer select-none group-hover:scale-105"
      />
    </div>

    <div
      onClick={() => onNavigate(product.details[0].slug)}
      className="p-2 bg-white cursor-pointer md:p-3"
    >
      <h3 className="px-1 md:px-2 text-sm md:text-xl font-semibold text-primary line-clamp-2 min-h-[36px] md:min-h-[60px] leading-tight md:leading-normal hover:underline active:text-primary/70">
        {product.name}
      </h3>
      <p className="px-1 pt-2 font-semibold text-orange-500 md:px-2 md:py-4 md:text-2xl">
        {product.details[0]?.price.toLocaleString("en-US") + "₫"}
      </p>
      <div className="hidden mb-2 md:flex md:flex-row md:gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(product.details[0].slug);
          }}
          className="mt-2 border border-primary bg-transparent text-primary p-3 md:p-4 rounded-full w-full md:w-[67%] xl:w-[60%] 2xl:w-[50%] hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-none active:border-none transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none"
        >
          <FiShoppingCart size={18} />
          <span className="text-xs font-semibold tracking-wide md:text-sm">
            Thêm vào giỏ hàng
          </span>
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNavigate(product.details[0].slug);
          }}
          className="mt-2 border border-primary bg-transparent text-primary p-3 md:p-4 rounded-full w-full md:w-[50%] hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-none active:border-none transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none"
        >
          <FaBagShopping size={18} />
          <span className="text-xs font-semibold tracking-wide md:text-sm">
            Mua ngay
          </span>
        </button>
      </div>
    </div>
  </div>
));

export default ProductCard;
