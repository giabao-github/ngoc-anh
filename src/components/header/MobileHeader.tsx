import { RefObject, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { useCart } from "@/hooks/useCart";

import { HASH_ROUTES } from "@/constants/routes";
import { handleNavigation } from "@/libs/navigationUtils";
import { handleSearch } from "@/libs/searchUtils";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

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
    <div className="pb-20">
      <header className="fixed top-0 left-0 z-20 w-full text-white bg-primary">
        {/* App Logo */}
        <div className="flex items-center justify-between px-6 py-2 mx-auto max-w-7xl">
          <div className="flex items-center space-x-4">
            <Image
              src="/logo.png"
              alt="Logo"
              width={1024}
              height={1024}
              quality={100}
              priority
              onClick={() => router.push("/")}
              className="object-contain w-16 h-16 rounded cursor-pointer select-none"
            />
            <span
              className="hidden text-2xl font-semibold uppercase select-none text-logo md:block"
              aria-label="Thạch Âm - Trang chủ"
              role="text"
            >
              Thạch Âm
            </span>
          </div>
          <div className="flex flex-row items-center gap-x-6">
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
                    montserrat.className
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
            <div className="relative w-10 h-10 overflow-hidden rounded-full ring-2 ring-white shadow-[0_0_16px_rgba(255,255,255,0.8)] active:shadow-[0_0_16px_rgba(255,255,255,1)]">
              <Image
                src="/avatar.jpeg"
                alt="Avatar"
                fill
                quality={100}
                className="object-cover cursor-pointer select-none"
              />
            </div>
            <button
              className="outline-none cursor-pointer ring-0 focus:ring-0 focus:outline-none"
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
          <nav className="flex flex-col space-y-4">
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
                className="absolute inset-y-0 flex items-center text-gray-200 transition cursor-pointer left-3 hover:text-white active:text-white/80"
              >
                <BsSearchHeart size={18} />
              </button>

              {/* Input */}
              <Input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm sản phẩm..."
                className={`w-full py-2 pl-10 pr-4 transition border border-white rounded-full shadow-md header-input shadow-white focus:ring-1 text-sm focus:ring-white focus:outline-none placeholder:text-gray-300 ${montserrat.className}`}
              />

              {query.trim().length > 0 && (
                <button
                  title="Xóa tìm kiếm"
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 flex items-center transition cursor-pointer right-3 text-neutral-300 hover:text-white active:text-white"
                >
                  <IoCloseCircle size={18} />
                </button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileHeader;
