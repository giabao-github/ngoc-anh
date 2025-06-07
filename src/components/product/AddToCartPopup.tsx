import { FiX } from "react-icons/fi";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useIsMobile from "@/hooks/useIsMobile";

import { Product } from "@/app/types";

import { Button } from "../ui/button";

interface AddToCartPopupProps {
  show: boolean;
  flag: string;
  product: Product;
  quantity: number;
  cartQuantity: number;
  onClose: () => void;
}
const AddToCartPopup: React.FC<AddToCartPopupProps> = ({
  show,
  flag,
  product,
  quantity,
  cartQuantity,
  onClose,
}) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (show) {
    return (
      <div className="fixed cursor-pointer top-28 right-4 bg-white shadow-2xl rounded-xl p-3 md:p-4 w-[292px] md:w-[342px] z-50 border border-gray-200">
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-xs font-semibold text-green-600 md:text-sm">
            {flag === "add"
              ? "Đã thêm sản phẩm vào giỏ hàng!"
              : "Đã cập nhật số lượng sản phẩm trong giỏ hàng!"}
          </h4>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="cursor-pointer"
          >
            <FiX className="w-5 h-5 text-gray-300 hover:text-gray-700" />
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={isMobile ? 48 : 64}
            height={isMobile ? 48 : 64}
            className="object-cover w-12 h-12 border border-black rounded-lg md:w-16 md:h-16"
          />
          <div className="flex-1 space-y-1">
            <p className="text-xs font-medium text-gray-800 md:text-sm">
              {product.name}
            </p>
            <p className="text-xs text-gray-600 md:text-sm">
              {`Số lượng: ${quantity} (tổng cộng: ${cartQuantity})`}
            </p>
            <p className="mt-1 text-xs font-semibold text-gray-900 md:text-sm">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.details[0].price * quantity)}
            </p>
          </div>
        </div>
        <Button
          onClick={() => router.push("/cart")}
          className="w-full px-4 py-5 mt-3 text-white transition bg-green-500 rounded-xl hover:bg-green-600 active:bg-green-400"
        >
          <span className="text-sm font-semibold">Xem giỏ hàng</span>
        </Button>
      </div>
    );
  }

  return null;
};

export default AddToCartPopup;
