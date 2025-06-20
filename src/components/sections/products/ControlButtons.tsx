import { ChevronDown, ChevronUp } from "lucide-react";

interface ControlButtonsProps {
  showControls: boolean;
  isAllVisible: boolean;
  showMore: () => void;
  collapse: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  showControls,
  isAllVisible,
  showMore,
  collapse,
}) => {
  if (!showControls) {
    return null;
  }

  return (
    <div className="flex justify-center mt-12">
      {!isAllVisible ? (
        <button
          type="button"
          onClick={showMore}
          className="relative px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full transition-all duration-300 md:px-8 md:py-4 group hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200 active:from-blue-500 active:to-purple-500"
        >
          <span className="flex gap-2 items-center text-xs md:text-base">
            Xem thêm sản phẩm
            <ChevronDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
          </span>
        </button>
      ) : (
        <button
          type="button"
          onClick={collapse}
          className="px-5 py-3 font-semibold text-gray-700 bg-white rounded-full border-2 border-gray-300 transition-all duration-300 md:px-8 md:py-4 hover:shadow-md hover:border-gray-400 focus:outline-none focus:ring-4 group focus:ring-gray-200 active:bg-neutral-200"
        >
          <span className="flex gap-2 items-center text-xs md:text-base">
            Thu gọn
            <ChevronUp className="w-4 h-4 transition-transform group-hover:-translate-y-1" />
          </span>
        </button>
      )}
    </div>
  );
};

export default ControlButtons;
