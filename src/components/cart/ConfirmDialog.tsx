import { FaTrash, FaTriangleExclamation } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

import { Button } from "@/components/ui/button";

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
  isMobile,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 transition-opacity duration-200 bg-black/70"
        onClick={onClose}
      />

      {/* Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-desc"
        className="flex fixed inset-0 z-50 justify-center items-center p-4"
      >
        <div
          className={`
          bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-all duration-200
          ${isMobile ? "max-w-sm" : "max-w-md"}
        `}
        >
          {/* Header */}
          <div className="flex relative gap-3 items-center p-4 border-b md:p-6">
            <div className="flex flex-shrink-0 justify-center items-center w-10 h-10 bg-rose-100 rounded-full md:w-12 md:h-12">
              <FaTriangleExclamation className="text-lg text-rose-500 md:text-xl" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-rose-500 md:text-xl">
                Xác nhận xóa giỏ hàng?
              </h3>
              <p className="mt-1 text-sm text-gray-600">
                Hành động này không thể hoàn tác
              </p>
            </div>
            <div
              title="Đóng"
              onClick={onClose}
              className="absolute top-4 right-4"
            >
              <IoClose
                size={24}
                className="text-gray-400 cursor-pointer hover:text-black"
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 md:p-6">
            <p className="text-sm leading-relaxed text-gray-700 md:text-base">
              Bạn có chắc chắn muốn xóa tất cả{" "}
              <span className="font-semibold text-rose-500">
                {itemCount} sản phẩm
              </span>{" "}
              trong giỏ hàng không?
            </p>
            <div className="p-3 mt-4 bg-amber-50 rounded-lg border border-amber-600">
              <p className="flex gap-2 items-start text-xs text-amber-800 md:text-sm">
                <FaTriangleExclamation
                  className="text-amber-600 mt-0.5 flex-shrink-0"
                  size={12}
                />
                Tất cả sản phẩm sẽ bị xóa vĩnh viễn khỏi giỏ hàng của bạn và
                không thể hoàn tác.
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 p-4 border-t md:p-6">
            <Button
              onClick={onClose}
              variant="outline"
              className={`
                flex-1 font-bold transition-all duration-200
                ${isMobile ? "py-2.5 text-sm" : "py-3 text-base"}
                border-gray-400 hover:bg-gray-200 hover:border-gray-500 hover:text-black active:bg-gray-300 active:border-gray-600
              `}
            >
              Hủy bỏ
            </Button>
            <Button
              onClick={onConfirm}
              className={`
                flex-1 font-bold transition-all duration-200 transform
                ${isMobile ? "py-2.5 text-sm" : "py-3 text-base"}
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
