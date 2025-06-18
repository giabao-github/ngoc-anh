import { useCallback } from "react";

import { cn } from "@/libs/utils";

interface BackToTopButtonProps {
  variant: "desktop" | "mobile";
  className?: string;
}

const variants = {
  desktop: {
    button: "px-6 py-3",
    text: "text-sm font-bold tracking-wide 2xl:text-base",
  },
  mobile: {
    button: "px-4 py-2",
    text: "text-xs font-bold tracking-wide",
  },
};

const BackToTopButton: React.FC<BackToTopButtonProps> = ({
  variant,
  className,
}) => {
  const handleClick = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "cursor-pointer select-none bg-transparent text-[#D4AF37] border border-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-white active:bg-[#D4AF37]/70 active:text-white/70 transition-colors flex items-center",
        variants[variant].button,
        className,
      )}
    >
      <span className={variants[variant].text}>Quay về đầu trang</span>
    </button>
  );
};

export default BackToTopButton;
