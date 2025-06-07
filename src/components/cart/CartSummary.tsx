import { FaArrowLeftLong } from "react-icons/fa6";

import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";

import { Separator } from "@/components/ui/separator";

import { useCart } from "@/hooks/useCart";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

const CartSummary = () => {
  const router = useRouter();
  const { totalPrice } = useCart();

  return (
    <div className="w-full lg:w-1/3 md:mt-8">
      <div className="p-6 space-y-4">
        <Separator color="#BB9244" opacity={40} />
        <div className={`flex justify-between ${montserrat.className}`}>
          <span className="text-sm font-medium tracking-wide text-gray-500 md:text-base">
            Tạm tính
          </span>
          <span className="text-sm font-semibold tracking-wider text-gray-500 md:text-base">
            {totalPrice?.toLocaleString() || 0}₫
          </span>
        </div>
        <Separator color="#BB9244" opacity={40} />
        <div
          className={`flex justify-between font-bold pt-2 text-orange-500 ${montserrat.className}`}
        >
          <span className="text-base tracking-wide md:text-lg">TỔNG CỘNG</span>
          <span className="text-base tracking-wider md:text-lg">
            {totalPrice?.toLocaleString() || 0}₫
          </span>
        </div>

        <button className="w-full py-3 mt-6 font-semibold tracking-wide text-white rounded-full cursor-pointer select-none bg-secondary hover:bg-secondary/80 active:bg-secondary/60">
          Thanh toán
        </button>
        <button
          onClick={() => router.push("/#products")}
          className="flex flex-row items-center justify-center w-full gap-3 py-3 font-semibold tracking-wide text-center rounded-full cursor-pointer select-none text-secondary hover:border hover:border-secondary hover:bg-secondary/20 active:border-secondary active:bg-secondary/40"
        >
          <FaArrowLeftLong size={18} />
          Mua thêm sản phẩm
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
