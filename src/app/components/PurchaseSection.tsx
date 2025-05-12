import { useRouter } from "next/navigation";
import { Product } from "../types";
import { Separator } from "../ui/separator";
import { FiMinus, FiPlus, FiShoppingCart } from "react-icons/fi";
import { FaBagShopping } from "react-icons/fa6";
import { Input } from "../ui/input";

interface PurchaseSectionProps {
  product: Product;
  slug: string;
  selectedPattern: string;
  quantity: number;
  setSelectedPattern: (pattern: string) => void;
  handleQuantityChange: (type: "increment" | "decrement" | "set", value?: number) => void;
  handleAddToCart: () => void;
}

const PurchaseSection: React.FC<PurchaseSectionProps> = ({ product, slug, selectedPattern, quantity, setSelectedPattern, handleQuantityChange, handleAddToCart }) => {
  const router = useRouter();

  return (
    <>
      {/* Patterns, size/volume, and quantity */}
      <div className="space-y-4">
        <div className="space-y-2">
          <p className="font-semibold">Hoa văn</p>
          <div className="flex gap-4">
            {product.patterns.map((pattern) => (
              <button
                key={pattern.name}
                onClick={() => {
                  setSelectedPattern(pattern.name);
                  if (slug !== pattern.slug) {
                    router.push(`/products/${pattern.slug}`);
                  }
                }}
                className={`px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-[#BB9244] hover:bg-[#BB9244] hover:text-white transition-colors tracking-wide ${
                  selectedPattern === pattern.name
                    ? "border-[#BB9244] bg-[#BB9244] text-white"
                    : "border-gray-300"
                }`}
              >
                {pattern.name}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <p className="font-semibold"
          >
            {`${product.size ? 'Kích thước' : product.volume ? 'Dung tích' : 'Kích thước/ Dung tích'}`}
          </p>
          <div className="w-fit px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-[#BB9244] hover:bg-[#BB9244] hover:text-white transition-colors border-[#BB9244] bg-[#BB9244] text-white tracking-wide"
          >
            {product.size || product.volume || 'Không xác định'}
          </div>
        </div>

        <Separator color="#BB9244" opacity={40} />

        <div className="space-y-2">
          <p className="font-semibold">Số lượng</p>
          <div className="flex items-center gap-x-6">
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => quantity > 1 && handleQuantityChange("decrement")}
                className={`w-10 h-10 flex items-center justify-center rounded-tl-lg rounded-bl-lg transition ${
                  quantity > 1
                    ? "cursor-pointer hover:bg-gray-100"
                    : "cursor-default text-gray-400"
                }`}
              >
                <FiMinus />
              </button>
              <Input
                type="number"
                inputMode="numeric"
                pattern="[0-9]*"
                value={quantity}
                onChange={(e) => {
                  const value = parseInt(e.target.value, 10);
                  if (isNaN(value)) {
                    handleQuantityChange("set", 1);
                  } else {
                    const clamped = Math.min(Math.max(value, 1), product.quantity ?? 1);
                    handleQuantityChange("set", clamped);
                  }
                }}
                onBlur={() => {
                  if (quantity < 1) {
                    handleQuantityChange("set", 1);
                  }
                }}
                min={1}
                max={product.quantity ?? 1}
                className="w-12 text-center rounded-none border-none shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1),-2px_0_4px_-1px_rgba(0,0,0,0.1)] text-sm input-no-spinner"
              />
              <button
                onClick={() => product.quantity && quantity < product.quantity && handleQuantityChange("increment")}
                className={`w-10 h-10 flex items-center justify-center rounded-tr-lg rounded-br-lg transition ${
                  product.quantity && quantity < product.quantity
                    ? "cursor-pointer hover:bg-gray-100"
                    : "cursor-default text-gray-400"
                }`}
              >
                <FiPlus />
              </button>
            </div>
            <p className="text-sm text-gray-600 tracking-wide">{`${product.quantity} sản phẩm còn lại`}</p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row gap-2 mb-4 md:mb-8">
        <button
          onClick={handleAddToCart}
          className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] p-3 md:p-4 rounded-full w-full md:w-[40%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none"
        >
          <FiShoppingCart size={24} />
          <span className="font-semibold text-sm md:text-base">Thêm vào giỏ hàng</span>
        </button>
        <button 
          className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] p-3 md:p-4 rounded-full w-full md:w-[60%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none"
        >
          <FaBagShopping size={24} />
          <span className="font-semibold text-sm md:text-base">Mua ngay</span>
        </button>
      </div>
    </>
  );
}

export default PurchaseSection;