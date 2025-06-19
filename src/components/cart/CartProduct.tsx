import { memo } from "react";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useSwipeable } from "react-swipeable";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";

import { montserrat } from "@/config/fonts";

import { useCart } from "@/hooks/useCart";
import useIsMobile from "@/hooks/useIsMobile";

import { formatPrice, getProductDetails } from "@/libs/productUtils";
import { cn } from "@/libs/utils";

import { CartItem } from "@/types/cart";
import { Product } from "@/types/invoice";

interface CartProductProps {
  item: CartItem;
  index: number;
  product: Product;
}

const CartProduct: React.FC<CartProductProps> = ({ item, index, product }) => {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);
  const isMobile = useIsMobile();
  const [inputValue, setInputValue] = useState(item.quantity.toString());
  const { handleRemove, handleQuantityChange } = useCart();

  // Memoize formatted price
  const formattedTotalPrice = useMemo(
    () => formatPrice(item.price * item.quantity),
    [item.price, item.quantity],
  );

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setShowDelete(true),
    onSwipedRight: () => setShowDelete(false),
    preventScrollOnSwipe: true,
    trackMouse: isMobile,
  });

  useEffect(() => {
    if (isMobile && index === 0) {
      setTimeout(() => {
        setShowDelete(true);
        setTimeout(() => setShowDelete(false), 400);
      }, 500);
    }
  }, [isMobile, index]);

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (newValue === "") {
      setInputValue("");
      return;
    }

    if (/^\d*$/.test(newValue)) {
      if (
        Number(newValue) < 1 ||
        Number(newValue) > product.quantity ||
        newValue.length > 1
      ) {
        const clampedValue = Math.min(
          Math.max(Number(newValue), 1),
          product.quantity,
        );
        newValue = Number(clampedValue).toString();
      }
      setInputValue(newValue);
      // Only update actual quantity when we have a valid number
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue)) {
        handleQuantityChange("set", product, parsedValue);
      }
      if (Number(newValue) >= product.quantity) {
        toast.warning("Đã đạt số lượng mua tối đa cho sản phẩm này");
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
      setInputValue("1");
      handleQuantityChange("set", product, 1);
    }
  };

  return (
    <div {...swipeHandlers} className="overflow-hidden relative">
      <div {...swipeHandlers} className="overflow-hidden relative min-h-24">
        {/* Slide-able content */}
        <div
          className={`
            flex flex-row items-center gap-4 
            transform transition-transform duration-300 ease-in-out 
            ${showDelete ? "-translate-x-[72px]" : "translate-x-0"}
          `}
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={`${item.name} image`}
            width={96}
            height={96}
            quality={100}
            loading="lazy"
            onClick={() => router.push(`/products/${item.slug}`)}
            className={cn(
              "w-24 h-24 border border-gray-300 rounded-md cursor-pointer shrink-0",
              (product.zoom?.length ?? 0) ? "object-cover" : "object-contain",
            )}
            style={{
              background: product.background || "",
            }}
            role="button"
            aria-label={`View details for ${item.name}`}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                router.push(`/products/${item.slug}`);
              }
            }}
          />

          {/* Right content */}
          <div className="flex flex-col flex-1 gap-2 w-full md:flex-row md:items-center md:justify-between">
            {/* Name */}
            <div className="flex overflow-hidden flex-col gap-y-1 w-full">
              <h3
                title={item.name}
                className="text-base md:text-lg font-bold line-clamp-2 max-h-[56px]"
              >
                <Link href={`/products/${item.slug}`}>
                  <span className="transition-colors cursor-pointer hover:text-primary/90 active:text-primary/70">
                    {item.name.length > 68 && isMobile
                      ? item.name.slice(0, 68) + "..."
                      : item.name.length > 112
                        ? item.name.slice(0, 112) + "..."
                        : item.name}
                  </span>
                </Link>
              </h3>
              <p className="text-sm tracking-tight text-gray-500 md:text-base">
                {getProductDetails(product)}
              </p>
            </div>

            {/* Quantity & Price */}
            <div className="flex flex-wrap gap-1 justify-between items-center md:gap-4 sm:flex-nowrap">
              <div className="flex items-center rounded-lg border border-gray-300">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  disabled={item.quantity <= 1}
                  onClick={() =>
                    item.quantity > 1 &&
                    product &&
                    handleQuantityChange("decrement", product)
                  }
                  className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-tl-lg rounded-bl-lg transition ${
                    item.quantity > 1
                      ? "cursor-pointer hover:bg-gray-200 active:bg-gray-200/80"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <FiMinus size={isMobile ? 12 : 14} aria-hidden="true" />
                </button>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  min={1}
                  max={product.quantity}
                  className={cn(
                    "w-[34px] h-8 md:w-12 md:h-9 p-0 text-center font-medium rounded-none border-none shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1),-2px_0_4px_-1px_rgba(0,0,0,0.1)] text-xs md:text-sm",
                    montserrat.className,
                  )}
                  aria-label="Product quantity"
                  aria-valuemin={1}
                  aria-valuemax={product.quantity}
                  aria-valuenow={
                    isNaN(Number(inputValue)) ? undefined : Number(inputValue)
                  }
                />
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() =>
                    product &&
                    item.quantity < product.quantity &&
                    handleQuantityChange("increment", product)
                  }
                  className={`w-7 h-7 md:w-9 md:h-9 flex items-center justify-center rounded-tr-lg rounded-br-lg transition ${
                    product?.quantity && item.quantity < product.quantity
                      ? "cursor-pointer hover:bg-gray-200 active:bg-gray-200/80"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <FiPlus size={isMobile ? 12 : 14} />
                </button>
              </div>
              <div
                className={cn(
                  "w-[134px] md:w-36 text-right text-sm md:text-base tracking-[0.015em] font-bold text-orange-500",
                  montserrat.className,
                )}
              >
                {formattedTotalPrice}
              </div>
            </div>
          </div>

          {/* Desktop trash icon */}
          <button
            title="Xóa khỏi giỏ hàng"
            onClick={() => handleRemove(item)}
            className="hidden absolute top-0 right-0 cursor-pointer text-neutral-400 hover:text-rose-500 active:text-rose-400/70 sm:block"
          >
            <FaTrashCan size={18} />
          </button>
        </div>

        {/* Mobile swipe delete button */}
        <button
          onClick={() => handleRemove(item)}
          className={`
            absolute h-full right-0 top-1/2 -translate-y-1/2 
            bg-orange-500 text-white active:bg-orange-500/70 px-4 py-2 rounded-md shadow
            transition-all duration-300 ease-in-out
            ${
              showDelete
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10 pointer-events-none"
            }
          `}
        >
          Xóa
        </button>
      </div>
    </div>
  );
};

export default memo(CartProduct);
