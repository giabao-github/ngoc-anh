import Image from "next/image";
import { FiX } from "react-icons/fi";
import { Product } from "../types";
import { useRouter } from "next/navigation";


interface AddToCartPopupProps {
  show: boolean;
  product: Product;
  cartQuantity: number;
  onClose: () => void;
}
const AddToCartPopup: React.FC<AddToCartPopupProps> = ({ show, product, cartQuantity, onClose }) => {
  const router = useRouter();

  if (show) {
    return (
      <div
        onClick={() => router.push('/cart')}
        className="fixed cursor-pointer top-4 right-4 md:top-24 md:right-4 bg-white shadow-2xl rounded-xl p-4 w-80 z-50 border border-gray-200"
      >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-green-600 font-semibold text-sm">
              Đã thêm vào giỏ hàng thành công!
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
              width={64}
              height={64}
              className="w-16 h-16 border border-black object-cover rounded-lg"
            />
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-800 text-sm">{product.name}</p>
              <p className="text-sm text-gray-600">
                {cartQuantity > 1 ? `Số lượng: ${cartQuantity}` : null}
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.details[0].price * cartQuantity)}
              </p>
            </div>
          </div>
        </div>
    );
  }
}

export default AddToCartPopup;