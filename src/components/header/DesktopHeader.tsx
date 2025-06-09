import { RefObject } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { useCart } from "@/hooks/useCart";

import { HASH_ROUTES } from "@/constants/routes";
import { handleNavigation, handleSearch } from "@/libs/navigationUtils";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface DesktopHeaderProps {
  hasSections?: boolean;
  hasFooter?: boolean;
  collectionRef?: RefObject<HTMLDivElement | null>;
  productsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
  cartIconRef?: RefObject<HTMLDivElement | null>;
  query: string;
  setQuery: (query: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  hasSections,
  hasFooter,
  collectionRef,
  productsRef,
  aboutRef,
  cartIconRef,
  query,
  setQuery,
  handleKeyDown,
}) => {
  const router = useRouter();
  const { cartCount } = useCart();

  return (
    <header className={`sticky top-0 z-20 bg-primary text-white py-2 px-6`}>
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <div className={`flex items-center space-x-4`}>
          <Image
            src="/logo.png"
            alt="Logo"
            width={1024}
            height={1024}
            quality={100}
            priority
            onClick={() => router.push("/")}
            className="object-contain w-20 h-20 cursor-pointer select-none"
          />
          <h1 className="hidden text-3xl font-semibold uppercase select-none text-logo md:block">
            Thạch Âm
          </h1>
        </div>

        <nav className="items-center hidden tracking-wide md:flex space-x-7">
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
            }}
            className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
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
            }}
            className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
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
            }}
            className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
          >
            Về chúng tôi
          </Link>
          <div className="px-4">
            <div className="relative">
              {/* Search icon */}
              <button
                title="Tìm kiếm"
                type="button"
                onClick={() => handleSearch(query, router)}
                className="absolute cursor-pointer inset-y-0 left-4 flex items-center text-white hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition"
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
                className={`header-input w-96 font-medium pl-12 pr-4 py-2 border border-white rounded-full shadow-md shadow-white focus:ring-1 focus:ring-white focus:outline-none transition ${montserrat.className}`}
              />

              {query.trim().length > 0 && (
                <button
                  title="Xóa tìm kiếm"
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute inset-y-0 flex items-center transition cursor-pointer right-3 text-neutral-400 hover:text-white active:text-white"
                >
                  <IoCloseCircle size={18} />
                </button>
              )}
            </div>
          </div>
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
          <div className="relative w-12 h-12 overflow-hidden rounded-full ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.8)] hover:shadow-[0_0_20px_rgba(255,255,255,1)]">
            <Image
              src="/avatar.jpeg"
              alt="Avatar"
              fill
              quality={100}
              className="object-cover cursor-pointer select-none"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
