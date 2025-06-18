import { RefObject, useState } from "react";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { arsenal } from "@/config/fonts";

import { HASH_ROUTES } from "@/constants/routes";

import { useCart } from "@/hooks/useCart";

import { handleNavigation } from "@/libs/navigationUtils";
import { handleSearch } from "@/libs/searchUtils";
import { cn } from "@/libs/utils";

interface MobileHeaderProps {
  hasSections?: boolean;
  hasFooter?: boolean;
  collectionRef?: RefObject<HTMLDivElement | null>;
  productsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
  cartIconRef?: RefObject<HTMLDivElement | null>;
  query: string;
  setQuery: (query: string) => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({
  hasSections,
  hasFooter,
  collectionRef,
  productsRef,
  aboutRef,
  cartIconRef,
  query,
  setQuery,
}) => {
  const router = useRouter();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query, router);
      setIsMenuOpen(false);
    }
  };

  return (
    <>
      <header className="sticky top-0 left-0 z-20 w-full text-white bg-primary">
        {/* App Logo */}
        <div className="flex justify-between items-center px-6 py-2 mx-auto max-w-7xl">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Thạch Âm Logo"
              width={64}
              height={64}
              quality={100}
              priority
              onClick={() => router.push("/")}
              className="object-contain w-16 h-16 rounded cursor-pointer select-none"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  router.push("/");
                }
              }}
            />
            <span
              className="hidden text-2xl font-semibold uppercase select-none text-logo md:block"
              aria-label="Thạch Âm - Trang chủ"
              role="text"
            >
              Thạch Âm
            </span>
          </div>
          <div className="flex flex-row gap-x-6 items-center">
            <div ref={cartIconRef} className="relative cursor-pointer group">
              <FiShoppingCart
                size={24}
                title="Đi đến giỏ hàng"
                aria-label="Giỏ hàng"
                onClick={() => router.push("/cart")}
                className="group-hover:text-[#D4AF37] group-active:text-[#D4AF37]/70"
              />
              {cartCount > 0 && (
                <div
                  className={`absolute bg-white text-orange-500 text-[10px] font-bold ${
                    cartCount > 99
                      ? "w-7 h-2/3 -top-2 -right-4"
                      : "w-5 h-5 -top-[10px] -right-2"
                  } rounded-full flex items-center justify-center ${
                    arsenal.className
                  }`}
                >
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )}
            </div>
            <FiUser
              size={24}
              title="Tài khoản"
              aria-label="Tài khoản"
              onClick={() => router.push("/login?method=email")}
              className="cursor-pointer hover:text-[#D4AF37] active:text-[#D4AF37]/70"
            />
            <div className="relative flex items-center justify-center w-10 bg-white h-10 overflow-hidden rounded-full ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:shadow-[0_0_20px_rgba(255,255,255,1)]">
              <Image
                src="/avatar.jpeg"
                alt="Avatar"
                width={24}
                height={24}
                quality={100}
                className="object-contain w-8 h-8 cursor-pointer select-none"
              />
            </div>
            <button
              type="button"
              className="ring-0 cursor-pointer outline-none focus:ring-0 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
      {/* Animated dropdown menu */}
      <div
        className={`fixed w-full top-[79px] z-20 bg-gradient-to-b from-primary via-[#1A4644] to-[#2D5F5A] rounded-b-2xl text-white overflow-hidden transition-all duration-400 ease-in-out ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="p-6">
          <nav
            className={cn(
              "flex flex-col space-y-6 text-lg font-semibold tracking-wider",
              arsenal.className,
            )}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(
                  HASH_ROUTES.COLLECTION,
                  hasSections,
                  undefined,
                  router,
                  collectionRef,
                  true,
                );
                setIsMenuOpen(false);
              }}
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors select-none w-fit"
            >
              Bộ sưu tập
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(
                  HASH_ROUTES.PRODUCTS,
                  hasSections,
                  undefined,
                  router,
                  productsRef,
                  true,
                );
                setIsMenuOpen(false);
              }}
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors select-none w-fit"
            >
              Cửa hàng
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation(
                  HASH_ROUTES.ABOUT,
                  hasSections,
                  hasFooter,
                  router,
                  aboutRef,
                  true,
                );
                setIsMenuOpen(false);
              }}
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors select-none w-fit"
            >
              Về chúng tôi
            </Link>
            <div className="relative mt-4 mb-1">
              {/* Search icon */}
              <button
                title="Tìm kiếm"
                type="button"
                onClick={() => {
                  handleSearch(query, router);
                  setIsMenuOpen(false);
                }}
                className="flex absolute inset-y-0 left-3 items-center text-gray-200 transition cursor-pointer hover:text-white active:text-white/80"
              >
                <IoSearch size={18} />
              </button>

              {/* Input */}
              <Input
                type="text"
                aria-label="Tìm kiếm sản phẩm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm sản phẩm..."
                className="py-2 pr-4 pl-10 w-full text-sm font-medium rounded-full border border-white shadow-md transition header-input shadow-white focus:ring-1 focus:ring-white focus:outline-none placeholder:text-gray-300 placeholder:font-medium"
              />

              {query.trim().length > 0 && (
                <button
                  title="Xóa tìm kiếm"
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex absolute inset-y-0 right-3 items-center transition cursor-pointer text-neutral-300 hover:text-white active:text-white"
                >
                  <IoCloseCircle size={18} />
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
