import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 animate-pulse px-4">
      <div className="space-y-6 w-full max-w-md">
        {/* Skeleton for Header */}
        <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>

        {/* Skeleton for Input fields */}
        <div className="space-y-4">
          <div className="h-12 bg-gray-200 rounded-lg"></div>
          <div className="h-12 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Skeleton for Button */}
        <div className="h-12 bg-amber-200/60 rounded-lg"></div>

        {/* Skeleton for Social Buttons */}
        <div className="space-y-3">
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
          <div className="h-10 bg-gray-200 rounded-lg"></div>
        </div>

        {/* Skeleton for small text (e.g., reCAPTCHA notice) */}
        <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
