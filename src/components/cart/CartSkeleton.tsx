import { FaTrashCan } from "react-icons/fa6";
import { FiMinus, FiPlus } from "react-icons/fi";

import { Skeleton } from "@/components/ui/skeleton";

interface CartSkeletonProps {
  isMobile?: boolean;
  skeletonCount: number;
}

const CartSkeleton: React.FC<CartSkeletonProps> = ({
  isMobile,
  skeletonCount = 4,
}) => {
  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <div key={i} className="relative my-4 overflow-hidden md:my-6">
          <div className="relative overflow-hidden min-h-24">
            <div
              className={`
                flex flex-row items-center gap-4 
                transition-transform duration-300 ease-in-out
              `}
            >
              {/* Skeleton Image */}
              <Skeleton className="w-24 h-24 rounded-md shrink-0" />

              {/* Right content */}
              <div className="flex flex-col flex-1 w-full gap-2 md:flex-row md:items-center md:justify-between">
                {/* Name */}
                <div className="flex flex-col w-full overflow-hidden gap-y-1">
                  {/* Skeleton Title */}
                  <Skeleton
                    className={`h-6 ${isMobile ? "w-3/5" : "w-4/5"} rounded-md mb-2`}
                  />
                  {/* Skeleton Details */}
                  <Skeleton className={`h-4 w-2/5 rounded-md`} />
                </div>

                {/* Quantity & Price */}
                <div className="flex flex-wrap items-center justify-between gap-1 md:gap-4 sm:flex-nowrap">
                  {/* Quantity Selector Skeleton */}
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      className="flex items-center justify-center text-gray-300 rounded-l-md w-7 h-7 md:w-10 md:h-10"
                      disabled
                    >
                      <FiMinus size={isMobile ? 12 : 16} />
                    </button>
                    <Skeleton
                      className={`w-[34px] h-8 md:w-12 md:h-10 rounded-none`}
                    />
                    <button
                      className="flex items-center justify-center text-gray-300 rounded-r-md w-7 h-7 md:w-10 md:h-10"
                      disabled
                    >
                      <FiPlus size={isMobile ? 12 : 16} />
                    </button>
                  </div>
                  {/* Price Skeleton */}
                  <Skeleton
                    className={`w-[70px] md:w-24 h-6 rounded-md ml-2`}
                  />
                </div>
              </div>

              {/* Desktop trash icon */}
              <span className="absolute top-0 right-0 hidden cursor-pointer text-neutral-300 sm:block">
                <FaTrashCan size={18} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartSkeleton;
