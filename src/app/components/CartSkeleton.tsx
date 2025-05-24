interface CartSkeletonProps {
  skeletonCount: number;
}

const CartSkeleton: React.FC<CartSkeletonProps> = ({ skeletonCount = 4 }) => {
  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, i) => (
        <div className="flex items-center gap-4 animate-pulse mt-6">
          {/* Image skeleton */}
          <div className="w-24 h-24 bg-gray-200 rounded-md shrink-0" />

          {/* Right content skeleton */}
          <div className="flex-1 w-full flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            {/* Name + Pattern */}
            <div className="flex flex-col w-full gap-2">
              <div className="w-full h-4 bg-gray-200 rounded" />
              <div className="w-1/2 h-3 bg-gray-200 rounded" />
            </div>

            {/* Quantity & Price */}
            <div className="flex items-center justify-between gap-4 w-full">
              <div className="flex items-center gap-1">
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded" />
                <div className="w-[34px] md:w-10 h-8 bg-gray-200 rounded" />
                <div className="w-7 h-7 md:w-8 md:h-8 bg-gray-200 rounded" />
              </div>
              <div className="w-24 h-5 bg-gray-200 rounded" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CartSkeleton;