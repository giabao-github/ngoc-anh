import { AnimatedSection } from "@/components/sections/more/AnimatedSection";

import { montserrat } from "@/config/fonts";

import { cn } from "@/libs/utils";

export const HeritageSection = () => (
  <AnimatedSection>
    <h2 className="mb-6 text-2xl font-bold text-center md:mb-12 md:text-4xl 2xl:text-5xl text-amber-400">
      TỪ DI SẢN ĐẾN HIỆN ĐẠI
    </h2>
    <div
      className={cn(
        "p-6 md:p-8 border font-medium bg-emerald-800/50 backdrop-blur-sm rounded-2xl border-amber-400/50",
        montserrat.className,
      )}
    >
      <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
        Thạch Âm không chỉ nhìn về quá khứ – mà giao tiếp với hiện tại bằng
        thiết kế.
      </p>
      <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
        Chúng tôi chuyển hóa những hoa văn cổ thành những sản phẩm ứng dụng hiện
        đại, gần gũi, hữu dụng – nhưng vẫn mang hồn cốt của văn hóa:
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        <ul className="space-y-3 text-amber-100">
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Bộ chén, đĩa, ly</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Huy hiệu, card, standee</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Khăn bandana chai nước</span>
          </li>
        </ul>
        <ul className="space-y-3 text-amber-100">
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Túi vải</span>
          </li>
          <li className="flex items-center space-x-3">
            <div className="w-2 h-2 rounded-full bg-amber-400"></div>
            <span>Sổ tay</span>
          </li>
        </ul>
      </div>
      <div className="p-3 mt-6 -mx-3 border rounded-lg md:p-4 bg-amber-400/10 border-amber-400/30">
        <p className="font-medium text-amber-200">
          Đặc biệt website Thạch Âm như một ngôi đền số – lưu giữ, bán, kể, kết
          nối.
        </p>
      </div>
    </div>
  </AnimatedSection>
);
