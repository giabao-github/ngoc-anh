import { memo, useCallback, useMemo } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

import Image from "next/image";

import { Product } from "@/app/types";

interface ProductCardProps {
  product: Product;
  onNavigate: (slug: string) => void;
}

// Optimized comparison function with deep equality check for product details
const areEqual = (prevProps: ProductCardProps, nextProps: ProductCardProps) => {
  const prevProduct = prevProps.product;
  const nextProduct = nextProps.product;

  return (
    prevProduct.id === nextProduct.id &&
    prevProduct.name === nextProduct.name &&
    prevProduct.images[0] === nextProduct.images[0] &&
    prevProduct.details[0]?.slug === nextProduct.details[0]?.slug &&
    prevProduct.details[0]?.price === nextProduct.details[0]?.price &&
    prevProps.onNavigate === nextProps.onNavigate
  );
};

const ProductCard = memo(({ product, onNavigate }: ProductCardProps) => {
  // Memoize product details to prevent recalculation
  const productDetails = useMemo(
    () => ({
      slug: product.details[0]?.slug,
      price: product.details[0]?.price?.toLocaleString("vi-VN") + "₫",
      backgroundColor:
        "background" in product ? product.background : "transparent",
      firstImage: product.images[0],
    }),
    [product],
  );

  // Memoize click handlers to prevent re-renders
  const handleCardClick = useCallback(() => {
    if (product.details.length) {
      onNavigate(productDetails.slug);
    }
  }, [onNavigate, productDetails.slug]);

  const handleButtonClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigate(productDetails.slug);
    },
    [onNavigate, productDetails.slug],
  );

  return (
    <article className="bg-white group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl mx-auto max-w-full md:min-w-[300px] 2xl:min-w-[400px] transform transition-transform duration-400">
      {/* Product Image */}
      <div
        onClick={handleCardClick}
        className="flex items-center justify-center h-[138px] mb-1 overflow-hidden md:h-[260px] xl:h-[278px] 2xl:h-72 md:mb-2 cursor-pointer"
        style={{ backgroundColor: productDetails.backgroundColor }}
      >
        <Image
          src={productDetails.firstImage}
          alt={product.name}
          width={288}
          height={288}
          quality={100}
          loading="lazy"
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 400px"
          className="object-contain w-full h-auto transition-transform duration-300 transform select-none group-hover:scale-105"
        />
      </div>

      {/* Product Info */}
      <div
        onClick={handleCardClick}
        className="p-2 bg-white cursor-pointer md:p-3"
      >
        <h3 className="px-1 md:px-2 text-sm md:text-xl font-semibold text-primary line-clamp-2 min-h-[36px] md:min-h-[60px] leading-tight md:leading-normal hover:underline active:text-primary/70">
          {product.name}
        </h3>
        <p className="px-1 pt-2 font-semibold text-orange-500 md:px-2 md:py-4 md:text-2xl">
          {productDetails.price}
        </p>

        {/* Action Buttons - Desktop Only */}
        <div className="hidden mb-2 md:flex md:flex-row md:gap-2">
          <ActionButton
            onClick={handleButtonClick}
            icon={<FiShoppingCart size={18} />}
            text="Thêm vào giỏ hàng"
            className="md:w-[67%] xl:w-[60%] 2xl:w-[50%]"
          />
          <ActionButton
            onClick={handleButtonClick}
            icon={<FaBagShopping size={18} />}
            text="Mua ngay"
            className="md:w-[50%]"
          />
        </div>
      </div>
    </article>
  );
}, areEqual);

// Memoized action button component
const ActionButton = memo(
  ({
    onClick,
    icon,
    text,
    className = "",
  }: {
    onClick: (e: React.MouseEvent) => void;
    icon: React.ReactNode;
    text: string;
    className?: string;
  }) => (
    <button
      onClick={onClick}
      className={`mt-2 border border-primary bg-transparent text-primary p-3 md:p-4 rounded-full w-full hover:bg-primary active:bg-primary/70 hover:text-white active:text-white/70 hover:border-none active:border-none transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none ${className}`}
    >
      {icon}
      <span className="text-xs font-semibold tracking-wide md:text-sm">
        {text}
      </span>
    </button>
  ),
);

ActionButton.displayName = "ActionButton";
ProductCard.displayName = "ProductCard";

export default ProductCard;
