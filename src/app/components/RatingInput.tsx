import { useMemo, useState } from 'react';
import { FaStar } from 'react-icons/fa6';

const RatingInput = ({ onRate }: { onRate: (rating: number) => void }) => {
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
    onRate(rating);
  }

  return (
    <div className="inline-flex flex-col items-start gap-1">
      <div className="flex items-center gap-1">
        <p className="font-semibold text-xs md:text-base">Chất lượng sản phẩm</p>
        <div className="mx-2 md:mx-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              title={hovered === 1 ? "Tệ" : hovered === 2 ? "Không hài lòng" : hovered === 3 ? "Bình thường" : hovered === 4 ? "Hài lòng" : hovered === 5 ? "Tuyệt vời" : ""}
              onClick={() => handleClick(star)}
              onMouseEnter={() => setHovered(star)}
              onMouseLeave={() => setHovered(null)}
              className="py-1 px-[2px] md:px-1 transition-transform duration-100 cursor-pointer hover:scale-125 focus:outline-none"
            >
              <FaStar
                className={`w-4 h-4 md:w-7 md:h-7 transition-colors ${
                  (hovered ?? selected) >= star ? 'text-[#F3C63F]' : 'text-gray-300'
                }`}
              />
            </button>
          ))}
        </div>
        <p className={`font-semibold text-xs md:text-base ${selected < 3 ? 'text-orange-500' : selected >= 4 ? 'text-[#F4B400]' : 'text-neutral-500'}`}>{selected > 0 && quality}</p>
      </div>
      {selected > 0 && (
        <span className="py-4 px-1 text-sm text-gray-700 font-medium">
          Bạn đã đánh giá <span className="text-[#F4B400] font-semibold">{selected} sao </span> cho sản phẩm này
        </span>
      )}
    </div>
  );
}

export default RatingInput;
