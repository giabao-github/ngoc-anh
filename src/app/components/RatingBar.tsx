import { useState, useEffect } from 'react';


interface RatingBarProps {
  count: number;
  totalReviews: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ count, totalReviews }) => {
  const proportion = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimatedWidth(proportion), 100);
    return () => clearTimeout(timeout);
  }, [proportion]);

  return (
    <div className="flex-1 h-1 md:h-[6px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className={`h-full bg-gradient-to-r from-yellow-400 to-orange-400 transition-all duration-700 ease-out rounded-full`}
        style={{ width: `${animatedWidth}%` }}
      />
    </div>
  );
};

export default RatingBar;
