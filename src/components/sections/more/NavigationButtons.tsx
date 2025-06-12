import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { ROUTES } from "@/constants/routes";

export const NavigationButtons = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center gap-6 md:gap-12 md:flex-row">
      <Button
        onClick={() => router.push(ROUTES.COLLECTION)}
        className="px-8 py-6 md:text-lg font-bold transition-all duration-300 transform bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-900 hover:from-amber-300 hover:to-amber-500 active:from-amber-200 active:to-amber-400 hover:scale-[1.02]"
      >
        Khám phá bộ sưu tập
      </Button>
      <Button
        onClick={() => router.push(ROUTES.PRODUCTS)}
        variant="outline"
        className="px-8 py-6 md:text-lg font-semibold transition-all duration-300 transform border-amber-400 text-amber-500 hover:bg-amber-400 active:bg-amber-300 hover:text-emerald-900 hover:scale-[1.02] active:text-emerald-900"
      >
        Cửa hàng trực tuyến
      </Button>
    </div>
  );
};
