import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { LuPackageX } from "react-icons/lu";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import { montserrat } from "@/config/fonts";

import useIsMobile from "@/hooks/useIsMobile";

import { cn } from "@/utils/styleUtils";

import { Product, ProductDetail } from "@/types/invoice";

interface PurchaseSectionProps {
  product: Product;
  slug: string;
  activeSelector: string;
  quantity: number;
  availableQuantity: number;
  cartQuantity: number;
  canIncrement: boolean;
  canDecrement: boolean;
  isOutOfStock: boolean;
  setActiveSelector: (selector: string) => void;
  handleQuantityChange: (
    type: "increment" | "decrement" | "set",
    value?: number,
  ) => void;
  handleAddToCart: () => void;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  product,
  slug,
  activeSelector,
  quantity,
  availableQuantity,
  cartQuantity,
  canIncrement,
  canDecrement,
  isOutOfStock,
  setActiveSelector,
  handleQuantityChange,
  handleAddToCart,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const variantLabel = product.details[0].pattern ? "Họa tiết" : "Màu sắc";

  // Handle add to cart with cool down
  const handleAntiSpamAddToCart = useCallback(() => {
    if (isAddingToCart) {
      return;
    }

    setIsAddingToCart(true);
    handleAddToCart();

    // Reset after 1 second
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  }, [handleAddToCart, isAddingToCart]);

  useEffect(() => {
    if (isOutOfStock && quantity !== 0) {
      setInputValue("0");
      handleQuantityChange("set", 0);
    } else if (!isOutOfStock && quantity === 0) {
      setInputValue("1");
      handleQuantityChange("set", 1);
    } else if (!isOutOfStock && quantity > availableQuantity) {
      setInputValue(availableQuantity.toString());
      handleQuantityChange("set", availableQuantity);
    } else {
      setInputValue(quantity.toString());
    }
  }, [quantity, availableQuantity, isOutOfStock, handleQuantityChange]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value;

      if (newValue === "") {
        setInputValue("");
        return;
      }

      if (/^\d*$/.test(newValue)) {
        const numValue = Number(newValue);

        // Remove leading zeros
        if (newValue.length > 1 && newValue.startsWith("0")) {
          newValue = numValue.toString();
        }

        // Clamp value to available quantity
        if (numValue > availableQuantity) {
          const clampedValue = availableQuantity.toString();
          setInputValue(clampedValue);
          handleQuantityChange("set", availableQuantity);
          return;
        }

        if (numValue < 1) {
          setInputValue("1");
          handleQuantityChange("set", 1);
          return;
        }

        setInputValue(newValue);
        if (!isNaN(numValue) && numValue > 0) {
          handleQuantityChange("set", numValue);
        }
      }
    },
    [availableQuantity, handleQuantityChange],
  );

  const handleBlur = useCallback(() => {
    if (inputValue === "" || isNaN(parseInt(inputValue, 10))) {
      setInputValue("1");
      handleQuantityChange("set", 1);
    }
  }, [inputValue, handleQuantityChange]);

  const getSelectorValue = (detail: ProductDetail) => {
    return detail.pattern || detail.color;
  };

  const handleVariantChange = useCallback(
    (variantSlug: string) => {
      // Update URL first for immediate feedback
      if (slug !== variantSlug) {
        router.replace(`/products/${variantSlug}`, { scroll: false });
      }
      // Then update the active selector
      setActiveSelector(variantSlug);
    },
    [slug, router, setActiveSelector],
  );

  return (
    <>
      {/* Color card */}
      {product.details[0].color && variantLabel !== "Màu sắc" && (
        <div className="mb-6 space-y-2">
          <p className="font-semibold">Màu sắc</p>
          <div className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors select-none w-fit border-primary bg-secondary text-primary">
            {product.details[0].color}
          </div>
        </div>
      )}

      {/* Variant selector */}
      <div className="space-y-2">
        <p className="font-semibold">{variantLabel}</p>
        <div className="flex gap-4">
          {product.details.map((detail) => (
            <button
              type="button"
              key={detail.slug}
              onClick={() => handleVariantChange(detail.slug)}
              className={cn(
                "px-4 py-2 rounded-lg cursor-pointer select-none border text-sm font-medium hover:bg-secondary hover:text-primary transition-colors",
                activeSelector === detail.slug
                  ? "border-primary bg-secondary text-primary hover:border-primary"
                  : "border-gray-300",
              )}
            >
              {getSelectorValue(detail)}
            </button>
          ))}
        </div>
      </div>

      {/* Size card */}
      <div className="mb-6 space-y-2">
        <p className="font-semibold">Kích thước</p>
        <div className="px-4 py-2 text-sm font-medium rounded-lg border transition-colors select-none w-fit border-primary bg-secondary text-primary">
          {product.size || "Không xác định"}
        </div>
      </div>

      <Separator color="#BB9244" opacity={40} />

      {/* Quantity selection */}
      <div className="space-y-2">
        <p className="font-semibold">Số lượng</p>
        <div className="flex gap-x-6 items-center">
          <div className="flex items-center rounded-lg border border-gray-300">
            <button
              type="button"
              onClick={() => canDecrement && handleQuantityChange("decrement")}
              disabled={!canDecrement}
              className={`w-10 h-10 flex items-center justify-center rounded-tl-lg rounded-bl-lg shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1)] transition ${
                canDecrement
                  ? "cursor-pointer hover:bg-gray-200 active:bg-gray-200/80"
                  : "bg-gray-100 text-gray-400 cursor-default"
              }`}
            >
              <FiMinus />
            </button>
            <Input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleBlur}
              min={1}
              max={availableQuantity}
              disabled={isOutOfStock}
              overrideDisabled="true"
              className={`w-12 p-0 text-center rounded-none border-none text-sm tracking-wide ${
                montserrat.className
              } ${
                isOutOfStock ? "bg-gray-100 text-gray-400 cursor-default" : ""
              }`}
            />
            <button
              type="button"
              onClick={() => canIncrement && handleQuantityChange("increment")}
              disabled={!canIncrement}
              className={`w-10 h-10 flex items-center justify-center rounded-tr-lg rounded-br-lg shadow-[-2px_0_4px_-1px_rgba(0,0,0,0.1)] transition ${
                canIncrement
                  ? "cursor-pointer hover:bg-gray-200 active:bg-gray-200/80"
                  : "bg-gray-100 text-gray-400 cursor-default"
              }`}
            >
              <FiPlus />
            </button>
          </div>
          <div className="text-sm text-gray-600">
            <p>{`${product.quantity} sản phẩm còn lại`}</p>
            {cartQuantity > 0 && (
              <p className="text-xs text-gray-500">
                (Trong giỏ: {cartQuantity}, có thể thêm: {availableQuantity})
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-row gap-2 mt-6 mb-8 md:mt-12">
        {isOutOfStock ? (
          <button
            type="button"
            disabled
            className="flex gap-x-2 justify-center items-center p-3 mt-2 w-full text-gray-400 bg-gray-200 rounded-full border border-gray-300 transition-colors cursor-default select-none md:p-4 md:gap-x-4"
          >
            <LuPackageX size={isMobile ? 18 : 24} />
            <span className="text-sm font-bold md:text-base md:tracking-wide">
              Số lượng sản phẩm trong giỏ đạt giới hạn
            </span>
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={handleAntiSpamAddToCart}
              disabled={isAddingToCart}
              className={cn(
                "mt-2 border border-primary p-3 md:p-4 bg-white rounded-full w-full md:w-[45%] transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 select-none",
                isAddingToCart
                  ? "bg-gray-200 text-gray-400 cursor-default border border-gray-300"
                  : "text-primary hover:bg-primary hover:text-white active:bg-primary/80 active:text-white/80 cursor-pointer hover:border-none active:border-none",
              )}
            >
              <FiShoppingCart size={isMobile ? 18 : 24} />
              <span className="text-sm font-bold md:text-base">
                {isAddingToCart
                  ? "Đang thêm..."
                  : isMobile
                    ? "Thêm vào giỏ"
                    : "Thêm vào giỏ hàng"}
              </span>
            </button>
            <button
              type="button"
              className="mt-2 border border-primary p-3 md:p-4 rounded-full w-full md:w-[55%] transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 select-none bg-white text-primary hover:bg-primary hover:text-white active:bg-primary/80 active:text-white/80 cursor-pointer hover:border-none active:border-none"
            >
              <FaBagShopping size={isMobile ? 18 : 24} />
              <span className="text-sm font-bold md:text-base">Mua ngay</span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PurchaseSection;
