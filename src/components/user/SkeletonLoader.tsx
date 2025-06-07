const SkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-50 animate-pulse">
      <div className="w-full max-w-md space-y-6">
        {/* Skeleton for Header */}
        <div className="w-1/2 h-6 mx-auto bg-gray-300 rounded"></div>

        {/* Skeleton for Input fields */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Skeleton for Button */}
        <div className="h-12 rounded-lg bg-amber-200/60"></div>

        {/* Skeleton for Social Buttons */}
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Skeleton for small text (e.g., reCAPTCHA notice) */}
        <div className="w-3/4 h-4 mx-auto bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
