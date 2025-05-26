import Image from "next/image";
import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

import useIsMobile from "@/app/hooks/useIsMobile";
import { Product } from "@/app/types";

interface AddToCartPopupProps {
  show: boolean;
  flag: string;
  product: Product;
  quantity: number;
  cartQuantity: number;
  onClose: () => void;
}
const AddToCartPopup: React.FC<AddToCartPopupProps> = ({ show, flag, product, quantity, cartQuantity, onClose }) => {
  const router = useRouter();
  const isMobile = useIsMobile();

  if (show) {
    return (
      <div
        onClick={() => router.push('/cart')}
        className="fixed cursor-pointer top-28 right-4 bg-white shadow-2xl rounded-xl p-3 md:p-4 w-[292px] md:w-[342px] z-50 border border-gray-200"
      >
          <div className="flex justify-between items-start mb-3">
            <h4 className="text-green-600 font-semibold text-xs md:text-sm">
              {flag === "add" ? "Đã thêm sản phẩm vào giỏ hàng!" : "Đã cập nhật số lượng sản phẩm trong giỏ hàng!"}
            </h4>
            <button 
              onClick={onClose}
              className="cursor-pointer"
            >
              <FiX className="text-gray-300 hover:text-gray-700 w-5 h-5" />
            </button>
          </div>
  
          <div className="flex items-center space-x-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={isMobile ? 48 : 64}
              height={isMobile ? 48 : 64}
              className="w-12 h-12 md:w-16 md:h-16 border border-black object-cover rounded-lg"
            />
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-800 text-xs md:text-sm">
                {product.name}
              </p>
              <p className="text-xs md:text-sm text-gray-600">
                {`Số lượng: ${quantity} (tổng cộng: ${cartQuantity})`}
              </p>
              <p className="text-xs md:text-sm font-semibold text-gray-900 mt-1">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.details[0].price * quantity)}
              </p>
            </div>
          </div>
        </div>
    );
  }
}

export default AddToCartPopup;