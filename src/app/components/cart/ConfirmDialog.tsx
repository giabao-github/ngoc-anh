import { FaTrash, FaTriangleExclamation } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { Button } from "@/app/ui/button";

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
  isMobile: boolean;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  itemCount, 
  isMobile 
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/70 z-50 transition-opacity duration-200"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`
          bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-200
          ${isMobile ? 'max-w-sm' : 'max-w-md'}
        `}>
          {/* Header */}
          <div className="flex relative items-center gap-3 p-4 md:p-6 border-b">
            <div 
              className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 bg-rose-100 rounded-full flex items-center justify-center">
              <FaTriangleExclamation className="text-rose-500 text-lg md:text-xl" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-semibold text-rose-500">
                Xác nhận xóa giỏ hàng?
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                Hành động này không thể hoàn tác
              </p>
            </div>
            <div 
              title="Đóng"
              onClick={onClose}
              className="absolute top-4 right-4"
            >
              <IoClose size={24} className="cursor-pointer text-gray-400 hover:text-black"/>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <p className="text-gray-700 text-sm md:text-base leading-relaxed">
              Bạn có chắc chắn muốn xóa tất cả{' '}
              <span className="font-semibold text-rose-500">
                {itemCount} sản phẩm
              </span>{' '}
              trong giỏ hàng không?
            </p>
            <div className="mt-4 p-3 bg-amber-50 border border-amber-600 rounded-lg">
              <p className="text-amber-800 text-xs md:text-sm flex items-start gap-2">
                <FaTriangleExclamation className="text-amber-600 mt-0.5 flex-shrink-0" size={12} />
                Tất cả sản phẩm sẽ bị xóa vĩnh viễn khỏi giỏ hàng của bạn và không thể hoàn tác.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-4 md:p-6 border-t">
            <Button
              onClick={onClose}
              variant="outline"
              className={`
                flex-1 font-semibold transition-all duration-200
                ${isMobile ? 'py-2.5 text-sm' : 'py-3 text-base'}
                border-gray-400 hover:bg-gray-200 hover:border-gray-500 hover:text-black active:bg-gray-300 active:border-gray-600
              `}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={onConfirm}
              className={`
                flex-1 font-semibold transition-all duration-200 transform
                ${isMobile ? 'py-2.5 text-sm' : 'py-3 text-base'}
                bg-white border border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-white active:bg-rose-400 active:text-white 
                hover:scale-[1.02] active:scale-[0.98]
                shadow-md hover:shadow-lg
              `}
            >
              <FaTrash className="mr-2" size={isMobile ? 14 : 16} />
              Xóa tất cả
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;