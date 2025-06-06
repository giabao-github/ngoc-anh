import { Montserrat } from "next/font/google";
import { FaArrowLeftLong } from "react-icons/fa6";

import { useCart } from "@/hooks/useCart";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";

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
          <span className="text-sm md:text-base tracking-wide text-gray-500 font-medium">
            Tạm tính
          </span>
          <span className="text-sm md:text-base tracking-wider text-gray-500 font-semibold">
            {totalPrice?.toLocaleString() || 0}₫
          </span>
        </div>
        <Separator color="#BB9244" opacity={40} />
        <div
          className={`flex justify-between font-bold pt-2 text-orange-500 ${montserrat.className}`}
        >
          <span className="text-base md:text-lg tracking-wide">TỔNG CỘNG</span>
          <span className="text-base md:text-lg tracking-wider">
            {totalPrice?.toLocaleString() || 0}₫
          </span>
        </div>

        <button className="w-full mt-6 bg-[#BB9244] hover:bg-[#BB9244]/80 active:bg-[#BB9244]/60 cursor-pointer text-white py-3 rounded-full font-semibold select-none tracking-wide">
          Thanh toán
        </button>
        <button
          onClick={() => router.push("/#products")}
          className="w-full text-center font-semibold text-[#BB9244] hover:border hover:border-[#BB9244] hover:bg-[#BB9244]/20 active:border-[#BB9244] active:bg-[#BB9244]/40 cursor-pointer py-3 flex flex-row gap-3 items-center justify-center rounded-full select-none tracking-wide"
        >
          <FaArrowLeftLong size={18} />
          Mua thêm sản phẩm
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
