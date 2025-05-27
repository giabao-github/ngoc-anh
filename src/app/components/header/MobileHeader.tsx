import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";
import { BsSearchHeart } from "react-icons/bs";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { IoCloseCircle } from "react-icons/io5";

import { useCart } from "@/app/hooks/useCart";
import { handleSearch } from "@/app/lib/utils";
import { Input } from "@/app/ui/input";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
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
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
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
  handleKeyDown
}) => {
  const router = useRouter();
  const { cartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <div className="fixed top-0 left-0 w-full z-20">
      <header className={`bg-[#0C2543] text-white py-2 px-6`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className={`flex items-center space-x-4`}>
            <Image
              src="https://www.zarla.com/images/zarla-sculpticon-1x1-2400x2400-20230210-9wkw87py43xdc9yhdpwq.png?crop=1:1,smart&width=250&dpr=2"
              alt="Logo"
              width={64}
              height={64}
              priority
              onClick={() => router.push('/')}
              className="object-cover rounded cursor-pointer bg-white select-none"
            />
            <h1 className="text-2xl font-semibold uppercase select-none hidden md:block">Ngọc Ánh</h1>
          </div>
          <div className="flex items-center flex-row gap-x-6">
            <div ref={cartIconRef} className="relative cursor-pointer group">
              <FiShoppingCart 
                size={24}
                title="Đi đến giỏ hàng"
                aria-label="Giỏ hàng"
                onClick={() => router.push('/cart')}
                className="group-hover:text-[#D4AF37] group-active:text-[#D4AF37]/70"
              />
              {cartCount > 0 && (
                <div className={`absolute bg-white text-orange-500 text-[10px] font-bold ${cartCount > 99 ? 'w-7 h-2/3 -top-2 -right-4' : 'w-5 h-5 -top-[10px] -right-2'} rounded-full flex items-center justify-center ${montserrat.className}`}>
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
      
      {/* Animated dropdown menu */}
      <div 
        className={`bg-gradient-to-b from-[#0C2543] to-[#364F6D] rounded-b-2xl text-white overflow-hidden transition-all duration-400 ease-in-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (collectionRef?.current) {
                  const elementPosition = collectionRef.current.offsetTop;
                  const offsetPosition =  elementPosition - 100;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
                if (hasSections) {
                  history.pushState(null, '', '#collection');
                } else {
                  router.push("/#collection");
                }
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
                if (productsRef?.current) {
                  const elementPosition = productsRef.current.offsetTop;
                  const offsetPosition =  elementPosition - 100;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
                if (hasSections) {
                  history.pushState(null, '', '#products');
                } else {
                  router.push("/#products");
                }
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
                if (hasSections) {
                  aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
                  history.pushState(null, '', '#about');
                } else if (hasFooter) {
                  aboutRef?.current?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  router.push("/#about");
                }
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
                className="header-input w-full pl-10 pr-4 py-2 border border-white rounded-full shadow-md shadow-white focus:ring-1 focus:ring-white focus:outline-none transition"
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
      </div>
    </div>
  );
}

export default MobileHeader;