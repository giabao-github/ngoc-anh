import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaStar } from "react-icons/fa6";
import { Product } from "../types";
import RatingBar from "./RatingBar";
import RatingInput from "./RatingInput";


interface RatingSectionProps {
  product: Product;
  averageRating: number;
  totalReviews: number;
}

const RatingSection: React.FC<RatingSectionProps> = ({ product, averageRating, totalReviews }) => {
  const router = useRouter();
  return (
    <div className="px-2 pt-10 md:pt-0 md:px-16 pb-12 md:pb-24">
      <div className="grid md:grid-cols-1 gap-8 md:gap-12">
          <div className="space-y-4 md:space-y-8">
            <h3 className="text-xl md:text-3xl font-bold">Nhận xét và đánh giá</h3>
            <div className="flex flex-col md:flex-row md:items-center md:justify-start space-y-6 md:space-y-0 md:space-x-10">
              {/* Left: overall rating */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FaStar className="text-[#F3C63F] h-6 w-6 md:w-10 md:h-10" />
                  <span className="text-xl md:text-3xl font-bold">{averageRating}</span>
                </div>
                <p className="text-gray-700 text-left md:text-right text-sm">{totalReviews} đánh giá</p>
              </div>

              {/* Right: ratings breakdown */}
              <div className="space-y-1 md:space-y-2 w-2/3 md:w-full">
                {[5, 4, 3, 2, 1].map((star) => {
                  const index = star - 1;
                  const count = product?.rating?.[index] ?? 0;

                  return (
                    <div key={star} className="flex items-center gap-3 md:gap-4">
                      {/* Stars */}
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-3 h-3 md:w-4 md:h-4 ${i < star ? 'text-[#F3C63F]' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>

                      {/* Progress Bar */}
                      <div className="flex-1 h-[2px] md:h-[6px] min-w-[75%] md:min-w-[65%] bg-gray-200 rounded-full overflow-hidden">
                        <RatingBar count={count} totalReviews={totalReviews} />
                      </div>

                      {/* Count */}
                      <span className="text-xs md:text-sm text-gray-600">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <RatingInput onRate={() => {}} />
          </div>

        <div className="space-y-5">
          <h3 className="text-lg md:text-xl font-bold">Đánh giá sản phẩm</h3>
          <p className="text-gray-600 text-sm md:text-base">
            Bạn cần
            <Link
              href={'/login?method=email'}
              className="font-semibold text-[#BB9244] hover:underline active:text-[#BB9244]/70 px-[6px]"
            >
              đăng nhập
            </Link>
            để nhận xét và đánh giá sản phẩm này
          </p>
          <button
            onClick={() => router.push('/login?method=email')}
            className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] px-6 py-3 rounded-full w-fit hover:bg-[#BB9244] hover:text-white active:bg-[#BB9244]/70 active:text-white/70 transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none"
          >
            <span className="font-semibold tracking-wide text-xs md:text-sm">Viết đánh giá</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default RatingSection;