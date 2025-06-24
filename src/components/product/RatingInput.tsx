import { memo, useMemo, useState } from "react";
import { FaStar } from "react-icons/fa6";

interface RatingInputProps {
  onRate?: (rating: number) => void;
}
const RatingInput = ({ onRate }: RatingInputProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);
  const quality = useMemo(() => {
    if (selected === 1) {
      return "Tệ";
    } else if (selected === 2) {
      return "Không hài lòng";
    } else if (selected === 3) {
      return "Bình thường";
    } else if (selected === 4) {
      return "Hài lòng";
    } else if (selected === 5) {
      return "Tuyệt vời";
    } else {
      return "";
    }
  }, [selected]);

  const handleClick = (rating: number) => {
    setSelected(rating);
    if (onRate) {
      onRate(rating);
    }
  };

  return (
    <div className="inline-flex flex-col gap-1 items-start">
      <div className="flex gap-1 items-center">
        <p className="text-xs font-semibold md:text-base">
          Chất lượng sản phẩm
        </p>
        <div className="mx-2 md:mx-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              title={
                hovered === 1
                  ? "Tệ"
                  : hovered === 2
                    ? "Không hài lòng"
                    : hovered === 3
                      ? "Bình thường"
                      : hovered === 4
                        ? "Hài lòng"
                        : hovered === 5
                          ? "Tuyệt vời"
                          : ""
              }
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className="py-1 px-[2px] md:px-1 transition-transform duration-100 cursor-pointer hover:scale-125 focus:outline-none"
            >
              <FaStar
                className={`w-4 h-4 md:w-7 md:h-7 transition-colors ${
                  (hovered ?? selected) >= star
                    ? "text-[#F3C63F]"
                    : "text-gray-300"
                }`}
              />
            </button>
          ))}
        </div>
        <p
          className={`font-semibold text-xs md:text-base ${selected < 3 ? "text-orange-500" : selected >= 4 ? "text-[#F4B400]" : "text-neutral-500"}`}
        >
          {selected > 0 && quality}
        </p>
      </div>
      {selected > 0 && (
        <span className="px-1 py-4 text-sm font-medium text-gray-700">
          Bạn đã đánh giá{" "}
          <span className="text-[#F4B400] font-semibold">{selected} sao </span>{" "}
          cho sản phẩm này
        </span>
      )}
    </div>
  );
};

export default memo(RatingInput);
