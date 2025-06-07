import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { LuPackageX } from "react-icons/lu";

import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import useIsMobile from "@/hooks/useIsMobile";

import { Product } from "@/app/types";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface PurchaseSectionProps {
  product: Product;
  slug: string;
  selectedPattern: string;
  quantity: number;
  availableQuantity: number;
  cartQuantity: number;
  canIncrement: boolean;
  canDecrement: boolean;
  isOutOfStock: boolean;
  setSelectedPattern: (pattern: string) => void;
  handleQuantityChange: (
    type: "increment" | "decrement" | "set",
    value?: number,
  ) => void;
  handleAddToCart: () => void;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({
  product,
  slug,
  selectedPattern,
  quantity,
  availableQuantity,
  cartQuantity,
  canIncrement,
  canDecrement,
  isOutOfStock,
  setSelectedPattern,
  handleQuantityChange,
  handleAddToCart,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [inputValue, setInputValue] = useState(quantity.toString());
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

  const handlePatternChange = useCallback(
    (pattern: string, patternSlug: string) => {
      setSelectedPattern(pattern);
      if (slug !== patternSlug) {
        router.push(`/products/${patternSlug}`);
      }
    },
    [slug, router, setSelectedPattern],
  );

  return (
    <>
      {/* Color selection */}
      {product.details[0].color && product.details[0].color.length > 0 && (
        <div className="space-y-2">
          <p className="font-semibold">Màu sắc</p>
          <div className="flex gap-4">
            {product.details.map((detail) => (
              <button
                key={detail.color}
                className={`w-fit px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-secondary hover:bg-secondary hover:text-white transition-colors border-secondary bg-secondary text-white ${montserrat.className}`}
              >
                {detail.color}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Pattern selection */}
      <div className="space-y-2">
        <p className="font-semibold">Hoa văn</p>
        <div className="flex gap-4">
          {product.details.map((pattern) => (
            <button
              key={pattern.pattern}
              onClick={() => handlePatternChange(pattern.pattern, pattern.slug)}
              className={`px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-secondary hover:bg-secondary hover:text-white transition-colors ${
                selectedPattern === pattern.pattern
                  ? "border-secondary bg-secondary text-white"
                  : "border-gray-300"
              } ${montserrat.className}`}
            >
              {pattern.pattern}
            </button>
          ))}
        </div>
      </div>

      {/* Size/Volume selection */}
      <div className="mb-6 space-y-2">
        <p className="font-semibold">
          {`${
            product.size
              ? "Kích thước"
              : product.volume
                ? "Dung tích"
                : "Kích thước/ Dung tích"
          }`}
        </p>
        <div
          className={`w-fit px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-secondary hover:bg-secondary hover:text-white transition-colors border-secondary bg-secondary text-white ${montserrat.className}`}
        >
          {product.size || product.volume || "Không xác định"}
        </div>
      </div>

      <Separator color="#BB9244" opacity={40} />

      {/* Quantity selection */}
      <div className="space-y-2">
        <p className="font-semibold">Số lượng</p>
        <div className="flex items-center gap-x-6">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
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
          <div
            className={`text-sm text-gray-600 tracking-wide ${montserrat.className}`}
          >
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
            disabled
            className="flex items-center justify-center w-full p-3 mt-2 text-gray-400 transition-colors bg-gray-200 border border-gray-300 rounded-full cursor-default select-none md:p-4 gap-x-2 md:gap-x-4"
          >
            <LuPackageX size={isMobile ? 18 : 24} />
            <span className="text-sm font-semibold md:text-base md:tracking-wide">
              Số lượng sản phẩm trong giỏ đạt giới hạn
            </span>
          </button>
        ) : (
          <>
            <button
              onClick={handleAntiSpamAddToCart}
              disabled={isAddingToCart}
              className={`mt-2 border border-secondary p-3 md:p-4 rounded-full w-full md:w-[40%] transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 select-none ${
                isAddingToCart
                  ? "bg-gray-200 text-gray-400 cursor-default border border-gray-300"
                  : "bg-transparent text-secondary hover:bg-secondary hover:text-white active:bg-secondary/80 active:text-white/80 cursor-pointer"
              }`}
            >
              <FiShoppingCart size={isMobile ? 18 : 24} />
              <span className="text-sm font-semibold md:text-base md:tracking-wide">
                {isAddingToCart ? "Đang thêm..." : "Thêm vào giỏ hàng"}
              </span>
            </button>
            <button className="mt-2 border border-secondary p-3 md:p-4 rounded-full w-full md:w-[60%] transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 select-none bg-transparent text-secondary hover:bg-secondary hover:text-white active:bg-secondary/80 active:text-white/80 cursor-pointer">
              <FaBagShopping size={isMobile ? 18 : 24} />
              <span className="text-sm font-semibold md:text-base md:tracking-wide">
                Mua ngay
              </span>
            </button>
          </>
        )}
      </div>
    </>
  );
};

export default PurchaseSection;
