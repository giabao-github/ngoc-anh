import { RefObject } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { FiShoppingCart, FiUser } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { montserrat } from "@/config/fonts";

import { HASH_ROUTES } from "@/constants/routes";

import { useCart } from "@/hooks/useCart";

import { handleNavigation } from "@/libs/navigationUtils";
import { handleSearch } from "@/libs/searchUtils";
import { cn } from "@/libs/utils";

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
  const navLinkClass =
    "hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors text-lg 2xl:text-xl w-fit outline-none ring-0 focus:ring-0 focus:outline-none";

  return (
    <header className="sticky top-0 z-20 px-6 py-2 text-white bg-primary">
      <div className="flex items-center justify-between mx-auto max-w-[1400px]">
        <div className="flex items-center space-x-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            quality={100}
            priority
            onClick={() => router.push("/")}
            className="object-contain w-16 h-16 cursor-pointer select-none md:w-20 md:h-20"
          />
          <h1 className="hidden text-2xl font-semibold uppercase select-none 2xl:text-3xl text-logo md:block">
            Thạch Âm
          </h1>
        </div>

        <nav className="hidden items-center font-semibold tracking-wider md:flex md:space-x-5 xl:space-x-7">
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
            className={navLinkClass}
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
            className={navLinkClass}
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
            className={navLinkClass}
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
                className="flex absolute inset-y-0 left-4 items-center text-gray-300 transition cursor-pointer hover:text-white active:text-white/80"
              >
                <BsSearchHeart size={18} />
              </button>

              {/* Input */}
              <Input
                type="text"
                aria-label="Tìm kiếm sản phẩm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm sản phẩm..."
                className={cn(
                  "header-input w-80 2xl:w-96 font-medium pl-12 pr-4 py-2 border border-white rounded-full shadow-md shadow-white focus:ring-1 focus:ring-white focus:outline-none placeholder:text-gray-400 transition",
                  montserrat.className,
                )}
              />

              {query.trim().length > 0 && (
                <button
                  title="Xóa tìm kiếm"
                  type="button"
                  onClick={() => setQuery("")}
                  className="flex absolute inset-y-0 right-3 items-center transition cursor-pointer text-neutral-400 hover:text-white active:text-white"
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
          <div className="relative flex items-center justify-center w-10 bg-white h-10 2xl:w-12 2xl:h-12 overflow-hidden rounded-full ring-2 ring-white shadow-[0_0_20px_rgba(255,255,255,0.8)]">
            <Image
              src="/avatar.jpeg"
              alt=""
              width={24}
              height={24}
              quality={100}
              className="object-contain w-8 h-8 select-none 2xl:w-10 2xl:h-10"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default DesktopHeader;
