import { useMemo } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";

import { montserrat } from "@/config/fonts";

import { useCart } from "@/hooks/useCart";

import { formatPrice } from "@/libs/productUtils";

const CartSummary = () => {
  const router = useRouter();
  const { totalPrice } = useCart();

  const formattedTotalPrice = formatPrice(totalPrice || 0);

  return (
    <div className="w-full lg:w-1/3 md:mt-8">
      <div className="p-6 space-y-4">
        <Separator color="#BB9244" opacity={40} />
        <div className={`flex justify-between ${montserrat.className}`}>
          <span className="text-sm font-medium tracking-wide text-gray-500 md:text-base">
            Tạm tính
          </span>
          <span className="text-sm font-semibold tracking-wider text-gray-500 md:text-base">
            {formattedTotalPrice}
          </span>
        </div>
        <Separator color="#BB9244" opacity={40} />
        <div
          className={`flex justify-between font-bold pt-2 text-orange-500 ${montserrat.className}`}
        >
          <span className="text-base tracking-wide md:text-lg">TỔNG CỘNG</span>
          <span className="text-base tracking-wider md:text-lg">
            {formattedTotalPrice}
          </span>
        </div>

        <button className="w-full py-3 mt-6 font-semibold tracking-wide text-white rounded-full cursor-pointer select-none bg-primary hover:bg-primary/80 active:bg-primary/60">
          Thanh toán
        </button>
        <button
          onClick={() => router.push("/#products")}
          className="flex flex-row items-center justify-center w-full gap-3 py-3 mt-2 font-semibold tracking-wide text-center border rounded-full cursor-pointer select-none text-primary border-primary hover:bg-primary/20 active:bg-primary/40"
        >
          <FaArrowLeftLong size={18} />
          Mua thêm sản phẩm
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
