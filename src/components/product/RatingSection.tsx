import { FaStar } from "react-icons/fa6";

import Link from "next/link";
import { useRouter } from "next/navigation";

import RatingBar from "@/components/product/RatingBar";
import RatingInput from "@/components/product/RatingInput";

import { Product } from "@/app/types";

interface RatingSectionProps {
  product: Product;
  averageRating: number;
  totalReviews: number;
}

const LOGIN_URL = "/login?method=email";

const RatingSection: React.FC<RatingSectionProps> = ({
  product,
  averageRating,
  totalReviews,
}) => {
  const router = useRouter();
  return (
    <div className="px-2 pt-10 pb-12 md:pt-0 md:px-16 md:pb-24">
      <div className="grid gap-8 md:grid-cols-1 md:gap-12">
        <div className="space-y-4 md:space-y-8">
          <h3 className="text-xl font-bold md:text-3xl">
            Nhận xét và đánh giá
          </h3>
          <div className="flex flex-col space-y-6 md:flex-row md:items-center md:justify-start md:space-y-0 md:space-x-10">
            {/* Left: overall rating */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <FaStar className="text-[#F3C63F] h-6 w-6 md:w-10 md:h-10" />
                <span className="text-xl font-bold md:text-3xl">
                  {averageRating}
                </span>
              </div>
              <p className="text-sm text-left text-gray-700 md:text-right">
                {totalReviews} đánh giá
              </p>
            </div>

            {/* Right: ratings breakdown */}
            <div className="w-2/3 space-y-1 md:space-y-2 md:w-full">
              {[5, 4, 3, 2, 1].map((star) => {
                const index = star - 1;
                const count =
                  product?.rating &&
                  Array.isArray(product.rating) &&
                  product.rating.length > index
                    ? (product.rating[index] ?? 0)
                    : 0;

                return (
                  <div key={star} className="flex items-center gap-3 md:gap-4">
                    {/* Stars */}
                    <div className="flex gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-3 h-3 md:w-4 md:h-4 ${
                            i < star ? "text-[#F3C63F]" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>

                    {/* Progress Bar */}
                    <div className="flex-1 h-[2px] md:h-[6px] min-w-[75%] md:min-w-[65%] bg-gray-200 rounded-full overflow-hidden">
                      <RatingBar count={count} totalReviews={totalReviews} />
                    </div>

                    {/* Count */}
                    <span className="text-xs text-gray-600 md:text-sm">
                      {count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <RatingInput onRate={() => {}} />
        </div>

        <div className="space-y-5">
          <h3 className="text-lg font-bold md:text-xl">Đánh giá sản phẩm</h3>
          <p className="text-sm text-gray-600 md:text-base">
            Bạn cần
            <Link
              href={LOGIN_URL}
              className="font-semibold text-primary hover:underline active:text-primary/70 px-[6px]"
            >
              đăng nhập
            </Link>
            để nhận xét và đánh giá sản phẩm này
          </p>
          <button
            onClick={() => router.push(LOGIN_URL)}
            className="flex items-center justify-center px-6 py-3 mt-2 transition-colors bg-transparent border rounded-full cursor-pointer select-none border-primary text-primary w-fit hover:bg-primary hover:text-white active:bg-primary/70 active:text-white/70 gap-x-2 md:gap-x-4"
          >
            <span className="text-xs font-semibold tracking-wide md:text-sm">
              Viết đánh giá
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingSection;
