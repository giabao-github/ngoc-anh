import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import { Montserrat } from 'next/font/google';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { FaTrashCan } from 'react-icons/fa6';
import { Input } from '../ui/input';
import { CartItem, Product } from '../types';


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

const CartProduct = ({
  item,
  index,
  product,
  handleRemove,
  handleQuantityChange,
}: {
  item: CartItem;
  index: number;
  product: Product;
  handleRemove: (id: number) => void;
  handleQuantityChange: (action: "increment" | "decrement" | "set", product: Product, value?: number) => void;
}) => {
  const router = useRouter();
  const [showDelete, setShowDelete] = useState(false);

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    return isMobile;
  };
  
  const isMobile = useIsMobile();

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setShowDelete(true),
    onSwipedRight: () => setShowDelete(false),
    preventScrollOnSwipe: true,
    trackMouse: isMobile
  });

  useEffect(() => {
    if (isMobile && index === 0) {
      setTimeout(() => {
        setShowDelete(true);
        setTimeout(() => setShowDelete(false), 400);
      }, 500);
    }
  }, [isMobile, index]);


  return (
    <div
      {...swipeHandlers}
      className="relative overflow-hidden mt-6"

    >
      <div {...swipeHandlers} className="relative overflow-hidden min-h-[100px]">
        {/* Slideable content */}
        <div
          className={`
            flex flex-row items-center gap-4 
            transform transition-transform duration-300 ease-in-out 
            ${showDelete ? '-translate-x-[72px]' : 'translate-x-0'}
          `}
        >
          {/* Image */}
          <Image
            src={item.image}
            alt={item.name}
            width={96}
            height={96}
            onClick={() => router.push(`/products/${item.slug}`)}
            className="w-24 h-24 object-contain cursor-pointer shrink-0"
          />

          {/* Right content */}
          <div className="flex-1 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            {/* Name + Pattern */}
            <div className="flex flex-col w-full overflow-hidden">
              <h3
                title={item.name}
                onClick={() => router.push(`/products/${item.slug}`)}
                className={`text-base md:w-fit max-w-full md:text-lg font-bold hover:text-[#BB9244] transition-colors cursor-pointer truncate`}
              >
                {item.name.length > 34 && isMobile ? item.name.slice(0, 34) + '...' : item.name}
              </h3>
              <p className="text-sm md:text-base text-gray-500">{item.pattern} / {product.size || product.volume || "Không xác định"}</p>
            </div>

            {/* Quantity & Price */}
            <div className="flex items-center justify-between gap-1 md:gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center">
                <button
                  onClick={() =>
                    item.quantity > 1 && product && handleQuantityChange("decrement", product)
                  }
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-l transition ${
                    item.quantity > 1
                      ? "cursor-pointer hover:bg-gray-200"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <FiMinus />
                </button>
                <Input
                  type="number"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={product.quantity && item.quantity > product.quantity ? product.quantity : item.quantity}
                  onChange={(e) => {
                    const value = parseInt(e.target.value, 10);
                    if (isNaN(value) && product) {
                      handleQuantityChange("set", product, 1);
                    } else if (product && product.quantity) {
                      const clamped = Math.min(Math.max(value, 1), product.quantity);
                      handleQuantityChange("set", product, clamped);
                    }
                  }}
                  onBlur={() => {
                    if (item.quantity < 1 && product) {
                      handleQuantityChange("set", product, 1);
                    } else if (product.quantity && item.quantity > product.quantity) {
                      handleQuantityChange("set", product, product.quantity);
                    }
                  }}
                  min={1}
                  className={`w-10 md:w-12 p-0 text-center border-none shadow ${item.quantity > 999 ? 'text-xs' : 'text-sm'} font-medium input-no-spinner ${montserrat.className}`}
                />
                <button
                  onClick={() => product && handleQuantityChange("increment", product)}
                  className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-r transition ${
                    product?.quantity && item.quantity < product.quantity
                      ? "cursor-pointer hover:bg-gray-200"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <FiPlus />
                </button>
              </div>
              <div
                className={`w-[136px] md:w-36 text-right ${item.price * item.quantity > 10000000000 ? 'text-sm' : 'text-base'} tracking-wide font-semibold text-[#0C2543] ${montserrat.className}`}
              >
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
            </div>
          </div>

          {/* Desktop trash icon */}
          <button
            title="Xóa khỏi giỏ hàng"
            onClick={() => handleRemove(item.id)}
            className="absolute cursor-pointer top-0 right-0 text-neutral-400 hover:text-rose-500 hidden sm:block"
          >
            <FaTrashCan size={18} />
          </button>
        </div>

        {/* Mobile swipe delete button */}
        <button
          onClick={() => handleRemove(item.id)}
          className={`
            absolute h-full right-0 top-1/2 -translate-y-1/2 
            bg-orange-500 text-white px-4 py-2 rounded-md shadow
            transition-all duration-300 ease-in-out
            ${showDelete ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10 pointer-events-none'}
          `}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

export default CartProduct;