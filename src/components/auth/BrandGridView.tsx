import {
  GalleryHorizontalEndIcon,
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { arsenal } from "@/config/fonts";

import { cn } from "@/utils/styleUtils";

const navigationItems = [
  { icon: HomeIcon, label: "Trang chủ", href: "/" },
  { icon: GalleryHorizontalEndIcon, label: "Bộ sưu tập", href: "/#collection" },
  { icon: ShoppingBagIcon, label: "Sản phẩm", href: "/#products" },
  { icon: ShoppingCartIcon, label: "Giỏ hàng", href: "/cart" },
];
interface BrandGridViewProps {
  type: "login" | "register" | "recovery";
}
export const BrandGridView = ({ type }: BrandGridViewProps) => {
  // Decorative star configuration
  const starElements = [
    // Bright stars
    { className: "top-8 left-8 w-2 h-2 bg-white", delay: 0 },
    { className: "right-6 bottom-12 w-2 h-2 bg-white/80", delay: 1000 },
    { className: "left-6 top-1/2 w-2.5 h-2.5 bg-white", delay: 500 },
    { className: "right-16 top-1/3 w-2 h-2 bg-white/90", delay: 1500 },
    { className: "left-20 bottom-1/3 w-2 h-2 bg-white/70", delay: 750 },
    // Medium brightness stars
    { className: "right-12 top-16 w-1.5 h-1.5 bg-white/60", delay: 300 },
    { className: "left-16 bottom-20 w-1.5 h-1.5 bg-white/50", delay: 1200 },
    { className: "bottom-8 right-20 w-1.5 h-1.5 bg-white/40", delay: 800 },
    { className: "left-12 top-24 w-1.5 h-1.5 bg-white/55", delay: 1600 },
    // Faint distant stars
    { className: "top-12 right-1/4 w-1 h-1 bg-white/30", delay: 300 },
    { className: "bottom-16 left-1/3 w-1 h-1 bg-white/25", delay: 700 },
    { className: "top-1/3 right-1/3 w-1 h-1 bg-white/35", delay: 1100 },
    { className: "top-2/3 left-1/4 w-1 h-1 bg-white/20", delay: 900 },
    // Additional stars
    { className: "top-6 right-1/2 w-1 h-1 bg-white/25", delay: 1300 },
    { className: "bottom-1/4 right-1/6 w-1 h-1 bg-white/20", delay: 600 },
    { className: "top-3/4 left-1/6 w-1 h-1 bg-white/30", delay: 1000 },
    { className: "top-1/4 left-1/2 w-1 h-1 bg-white/15", delay: 1400 },
    { className: "right-1/3 bottom-1/3 w-1 h-1 bg-white/18", delay: 1100 },
    // Very faint background stars
    { className: "top-10 left-16 w-1 h-1 bg-white/10", delay: 1800 },
    { className: "bottom-6 right-16 w-1 h-1 bg-white/12", delay: 1200 },
    { className: "top-2/3 right-1/6 w-1 h-1 bg-white/8", delay: 900 },
    { className: "left-1/3 top-1/6 w-1 h-1 bg-white/15", delay: 1500 },
  ];

  return (
    <>
      {/* Mobile branding - Navigation Icons */}
      <div className="flex relative flex-col gap-y-4 justify-center items-center py-6 border-t md:hidden border-white/10">
        <div className="flex relative z-10 gap-6">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group p-2.5 bg-white/10 rounded-full transition-all duration-200 hover:bg-white/20 active:scale-95 backdrop-blur-sm"
              title={item.label}
            >
              <item.icon
                strokeWidth={2.5}
                className="w-4 h-4 transition-colors text-secondary/70 group-hover:text-secondary"
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop branding - full experience */}
      <div
        className={cn(
          "hidden relative flex-col gap-y-6 justify-center items-center bg-gradient-to-br from-primary via-primary to-primary-accent md:flex",
          type === "login" ? "col-span-3" : "col-span-4",
        )}
      >
        {/* Navigation Icons */}
        <div className="flex relative z-10 gap-6 mb-6">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group p-2.5 bg-white/10 rounded-full transition-all duration-200 hover:bg-white/20 hover:scale-110 active:scale-95 backdrop-blur-sm"
              title={item.label}
            >
              <item.icon
                strokeWidth={2.5}
                className="w-5 h-5 transition-colors text-secondary/70 group-hover:text-secondary"
              />
            </Link>
          ))}
        </div>
        <div className="flex relative z-10 flex-col gap-4 items-center">
          <div className="relative group">
            <Image
              src="/logo.png"
              alt="Thạch Âm Logo"
              priority
              width={144}
              height={144}
              className="w-36 h-36 drop-shadow-2xl transition-transform duration-300 select-none"
            />
          </div>
          <div className="text-center">
            <p
              className={cn(
                "text-3xl font-bold tracking-wide uppercase drop-shadow-lg text-secondary",
                arsenal.className,
              )}
            >
              Thạch Âm
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        {starElements.map((star, index) => (
          <div
            key={index}
            className={`absolute animate-pulse ${star.className}`}
            style={{
              animationDelay: `${star.delay}ms`,
              clipPath:
                "polygon(50% 0%, 70% 30%, 100% 50%, 70% 70%, 50% 100%, 30% 70%, 0% 50%, 30% 30%)",
            }}
          />
        ))}
        {/* Subtle cosmic background glow */}
        <div className="absolute right-6 top-1/3 w-12 h-12 rounded-full blur-md animate-pulse bg-white/5 delay-2000"></div>
        <div className="absolute left-8 bottom-1/3 w-8 h-8 rounded-full blur-sm animate-pulse bg-white/4 delay-1800"></div>
        {/* Very subtle gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-transparent pointer-events-none via-white/2"></div>
      </div>
    </>
  );
};
