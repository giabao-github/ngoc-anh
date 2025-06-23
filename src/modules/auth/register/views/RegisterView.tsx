import Link from "next/link";

import { BrandGridView } from "@/components/auth/BrandGridView";
import { RegisterGridView } from "@/components/auth/RegisterGridView";
import { Card, CardContent } from "@/components/ui/card";

export const RegisterView = () => {
  return (
    <div className="flex flex-col gap-4 justify-between h-full md:gap-8">
      <Card className="flex-grow bg-transparent border-0 md:border md:overflow-hidden md:p-0 md:shadow-2xl md:backdrop-blur-sm md:bg-white/60 md:border-neutral-200">
        <CardContent className="grid grid-cols-1 p-0 h-full md:grid-cols-9">
          {/* Left side form */}
          <RegisterGridView />

          {/* Right side branding */}
          <BrandGridView type="register" />
        </CardContent>
      </Card>

      {/* Terms and Privacy */}
      <div className="px-4 pb-6 text-xs leading-relaxed text-center md:pb-0 text-secondary/70 md:text-gray-500 md:px-0">
        Bằng cách đăng ký, bạn đồng ý với{" "}
        <Link
          href="https://policies.google.com/terms"
          className="font-semibold transition-colors duration-200 text-secondary md:text-primary hover:underline"
        >
          Điều khoản sử dụng
        </Link>{" "}
        và{" "}
        <Link
          href="https://policies.google.com/privacy"
          className="font-semibold transition-colors duration-200 text-secondary md:text-primary hover:underline"
        >
          Chính sách bảo mật
        </Link>{" "}
        của chúng tôi.
      </div>
    </div>
  );
};
