import { RefObject, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";
import { BsSearchHeart } from "react-icons/bs";
import { Input } from "../ui/input";
import { handleSearch } from "../lib/utils";
import { Montserrat } from "next/font/google";
import { useCart } from "../CartContext";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

interface HeaderProps {
  hasSections?: boolean;
  hasFooter?: boolean;
  collectionRef?: RefObject<HTMLDivElement | null>;
  productsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ hasSections, hasFooter, collectionRef, productsRef, aboutRef }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query, router);
    }
  };


  return (
    <>
      {/* Desktop view */}
      <header className={`bg-[#0C2543] text-white py-2 px-6`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className={`flex items-center space-x-4`}>
            <Image
              src="https://www.zarla.com/images/zarla-sculpticon-1x1-2400x2400-20230210-9wkw87py43xdc9yhdpwq.png?crop=1:1,smart&width=250&dpr=2"
              alt="Logo"
              width={80}
              height={80}
              onClick={() => router.push('/')}
              className="object-cover rounded cursor-pointer bg-white select-none"
            />
            <h1 className="text-2xl font-semibold uppercase select-none hidden md:block">Ngọc Ánh</h1>
          </div>

          <nav className="hidden md:flex space-x-7 items-center tracking-wide">
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                collectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
                if (hasSections) {
                  history.pushState(null, '', '#collection');
                } else {
                  router.push("/#collection");
                }
              }} 
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
            >
              Bộ sưu tập
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                productsRef?.current?.scrollIntoView({ behavior: 'smooth' });
                if (hasSections) {
                  history.pushState(null, '', '#products');
                } else {
                  router.push("/#products");
                }
              }} 
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
            >
              Cửa hàng
            </Link>
            <Link
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (hasSections) {
                  aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
                  history.pushState(null, '', '#about');
                } else if (hasFooter) {
                  aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push("/#about");
                }
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
                  className={`w-96 font-medium pl-12 pr-4 py-2 border border-white rounded-full focus:ring-1 focus:ring-white focus:outline-none transition ${montserrat.className}`}
                />

                {query.trim().length > 0 && (
                  <button
                    title="Xóa tìm kiếm"
                    type="button"
                    onClick={() => setQuery("")}
                    className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-neutral-400 hover:text-white active:text-white transition"
                  >
                    <IoCloseCircle size={18} />
                  </button>
                )}
              </div>
            </div>
            <div className="relative cursor-pointer group">
              <FiShoppingCart 
                size={24}
                title="Đi đến giỏ hàng"
                aria-label="Giỏ hàng"
                onClick={() => router.push('/cart')}
                className="group-hover:text-[#D4AF37] group-active:text-[#D4AF37]/70"
              />
              {cartCount > 0 && (
                <div className={`absolute bg-white/90 text-orange-500/90 group-hover:bg-white group-hover:text-orange-500 text-[10px] font-bold ${cartCount > 99 ? 'w-7 h-2/3 -top-2 -right-4' : 'w-5 h-5 -top-[10px] -right-2'} rounded-full flex items-center justify-center ${montserrat.className}`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </div>
              )}
            </div>
            <FiUser
              size={24}
              title="Tài khoản"
              aria-label="Tài khoản" 
              onClick={() => router.push('/login?method=email')} 
              className="cursor-pointer hover:text-[#D4AF37] active:text-[#D4AF37]/70" 
            />
            <Image 
              src={'/vn-flag.jpeg'}
              alt="Vietnam"
              width={2160}
              height={2160}
              quality={100}
              className="h-10 w-10 rounded-full cursor-pointer select-none"
            />
          </nav>

          <div className="flex items-center flex-row gap-x-6 md:hidden">
          <div className="relative cursor-pointer group">
              <FiShoppingCart 
                size={24}
                title="Đi đến giỏ hàng"
                aria-label="Giỏ hàng"
                onClick={() => router.push('/cart')}
                className="group-hover:text-[#D4AF37] group-active:text-[#D4AF37]/70"
              />
              {cartCount > 0 && (
                <div className={`absolute bg-white/90 text-orange-500/90 group-hover:bg-white group-hover:text-orange-500 text-[10px] font-bold ${cartCount > 99 ? 'w-7 h-2/3 -top-2 -right-4' : 'w-5 h-5 -top-[10px] -right-2'} rounded-full flex items-center justify-center ${montserrat.className}`}>
                  {cartCount > 99 ? '99+' : cartCount}
                </div>
              )}
            </div>
            <FiUser
              size={24}
              title="Tài khoản"
              aria-label="Tài khoản"
              onClick={() => router.push('/login?method=email')} 
              className="cursor-pointer hover:text-[#D4AF37] active:text-[#D4AF37]/70" 
            />
            <Image 
              src={'https://static.vecteezy.com/system/resources/previews/016/328/942/large_2x/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png'}
              alt="Vietnam"
              width={2160}
              height={2160}
              quality={100}
              className="h-9 w-9 rounded-full cursor-pointer select-none"
            />
            <button
              className="cursor-pointer outline-none ring-0 focus:ring-0 focus:outline-none"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </header>
      {/* Mobile view */}
      {isMenuOpen && (
        <div className={`md:hidden bg-[#0C2543] text-white p-6`}>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                collectionRef?.current?.scrollIntoView({ behavior: 'smooth' });
                if (hasSections) {
                  history.pushState(null, '', '#collection');
                } else {
                  router.push("/#collection");
                }
              }} 
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors select-none w-fit"
            >
              Bộ sưu tập
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                productsRef?.current?.scrollIntoView({ behavior: 'smooth' });
                if (hasSections) {
                  history.pushState(null, '', '#products');
                } else {
                  router.push("/#products");
                }
              }} 
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors select-none w-fit"
            >
              Cửa hàng
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (hasSections) {
                  aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
                  history.pushState(null, '', '#about');
                } else if (hasFooter) {
                  aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push("/#about");
                }
              }} 
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition-colors select-none w-fit"
            >
              Về chúng tôi
            </Link>
            <div className="relative mt-4 mb-2">
              {/* Search icon */}
              <button
                title="Tìm kiếm"
                type="button"
                onClick={() => handleSearch(query, router)}
                className="absolute cursor-pointer inset-y-0 left-3 flex items-center text-white hover:text-[#D4AF37] active:text-[#D4AF37]/70 transition"
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
                className="w-full pl-10 pr-4 py-2 border border-white rounded-full focus:ring-1 focus:ring-white focus:outline-none transition"
              />

              {query.trim().length > 0 && (
                <button
                  title="Xóa tìm kiếm"
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-neutral-300 hover:text-white active:text-white transition"
                >
                  <IoCloseCircle size={18} />
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

export default Header;