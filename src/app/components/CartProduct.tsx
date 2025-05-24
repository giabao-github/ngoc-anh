import { Montserrat } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import { FaTrashCan } from 'react-icons/fa6';
import { FiMinus, FiPlus } from 'react-icons/fi';
import { useSwipeable } from 'react-swipeable';

import { useCart } from '../hooks/useCart';
import useIsMobile from '../hooks/useIsMobile';
import { CartItem, Product } from '../types';
import { Input } from '../ui/input';

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

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

  useEffect(() => {
    setInputValue(item.quantity.toString());
  }, [item.quantity]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    
    if (newValue === '') {
      setInputValue('');
      return;
    }
    
    if (/^\d*$/.test(newValue)) {
      if (Number(newValue) < 1 || Number(newValue) > product.quantity || newValue.length > 1) {
        const clampedValue = Math.min(Math.max(Number(newValue), 1), product.quantity);
        newValue = Number(clampedValue).toString();
      }
      setInputValue(newValue);
      // Only update actual quantity when we have a valid number
      const parsedValue = parseInt(newValue, 10);
      if (!isNaN(parsedValue)) {
        handleQuantityChange("set", product, parsedValue);
      }
    }
  };

  const handleBlur = () => {
    if (inputValue === '' || isNaN(parseInt(inputValue, 10))) {
      setInputValue('1');
      handleQuantityChange("set", product, 1);
    }
  };


  return (
    <div
      {...swipeHandlers}
      className="relative overflow-hidden my-4 md:my-6"

    >
      <div {...swipeHandlers} className="relative overflow-hidden min-h-24">
        {/* Slide-able content */}
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
            className="w-24 h-24 object-contain cursor-pointer shrink-0 border border-neutral-200 rounded-md"
          />

          {/* Right content */}
          <div className="flex-1 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            {/* Name + Pattern */}
            <div className="flex flex-col gap-y-1 w-full overflow-hidden">
              <h3
                title={item.name}
                className="text-base md:text-lg font-bold line-clamp-2 max-h-[56px]"
              >
                <Link href={`/products/${item.slug}`}>
                  <span className="hover:text-[#BB9244] active:text-[#BB9244]/70 transition-colors cursor-pointer">
                    {item.name.length > 68 && isMobile 
                      ? item.name.slice(0, 68) + '...' 
                      : item.name.length > 112 
                        ? item.name.slice(0, 112) + '...' 
                        : item.name}
                  </span>
                </Link>
              </h3>
              <p className="text-sm md:text-base text-gray-500">{product.details[0].color.length > 0 && `${product.details[0].color} / `}{item.pattern} / {product.size || product.volume || "Không xác định"}</p>
            </div>

            {/* Quantity & Price */}
            <div className="flex items-center justify-between gap-1 md:gap-4 flex-wrap sm:flex-nowrap">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() =>
                    item.quantity > 1 && product && handleQuantityChange("decrement", product)
                  }
                  className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-tl-lg rounded-bl-lg transition ${
                    item.quantity > 1
                      ? "cursor-pointer hover:bg-gray-200 active:bg-gray-200/80"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <FiMinus size={isMobile ? 12 : 16} />
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
                  className={`w-[34px] h-8 md:w-12 md:h-10 p-0 text-center font-medium rounded-none border-none shadow-[2px_0_4px_-1px_rgba(0,0,0,0.1),-2px_0_4px_-1px_rgba(0,0,0,0.1)] ${isMobile ? 'text-xs' : 'text-sm'} ${montserrat.className}`}
                />
                <button
                  onClick={() => product && item.quantity < product.quantity && handleQuantityChange("increment", product)}
                  className={`w-7 h-7 md:w-10 md:h-10 flex items-center justify-center rounded-tr-lg rounded-br-lg transition ${
                    product?.quantity && item.quantity < product.quantity
                      ? "cursor-pointer hover:bg-gray-200 active:bg-gray-200/80"
                      : "cursor-default text-gray-400"
                  }`}
                >
                  <FiPlus size={isMobile ? 12 : 16} />
                </button>
              </div>
              <div
                className={`w-[134px] md:w-36 text-right text-sm tracking-wide font-semibold text-orange-500 ${montserrat.className}`}
              >
                {(item.price * item.quantity).toLocaleString()}₫
              </div>
            </div>
          </div>

          {/* Desktop trash icon */}
          <button
            title="Xóa khỏi giỏ hàng"
            onClick={() => handleRemove(item)}
            className="absolute cursor-pointer top-0 right-0 text-neutral-400 hover:text-rose-500 active:text-rose-400/70 hidden sm:block"
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