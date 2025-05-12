import { RefObject, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";


interface HeaderProps {
  hasSections?: boolean;
  hasFooter?: boolean;
  collectionRef?: RefObject<HTMLDivElement | null>;
  productsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ hasSections, hasFooter, collectionRef, productsRef, aboutRef }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop view */}
      <header className={`bg-[#0C2543] text-white py-4 px-6`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className={`flex items-center space-x-4`}>
            <Image
              src="https://www.zarla.com/images/zarla-sculpticon-1x1-2400x2400-20230210-9wkw87py43xdc9yhdpwq.png?crop=1:1,smart&width=250&dpr=2"
              alt="Logo"
              width={40}
              height={40}
              onClick={() => router.push('/')}
              className="object-cover rounded cursor-pointer bg-white select-none"
            />
            <h1 className="text-2xl font-semibold uppercase select-none hidden md:block">Ngọc Ánh</h1>
          </div>

          <nav className="hidden md:flex space-x-6 items-center tracking-wide">
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
              className="hover:text-[#D4AF37] transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
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
              className="hover:text-[#D4AF37] transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
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
              className="hover:text-[#D4AF37] transition-colors text-lg w-fit outline-none ring-0 focus:ring-0 focus:outline-none"
            >
              Về chúng tôi
            </Link>
            <FiShoppingCart className="text-xl cursor-pointer hover:text-[#D4AF37]" />
            <FiUser onClick={() => router.push('/login?method=email')} className="text-xl cursor-pointer hover:text-[#D4AF37]" />
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
            <FiShoppingCart className="text-xl cursor-pointer hover:text-[#D4AF37]" />
            <FiUser onClick={() => router.push('/login?method=email')} className="text-xl cursor-pointer hover:text-[#D4AF37]" />
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
                className="hover:text-[#D4AF37] transition-colors select-none w-fit"
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
                className="hover:text-[#D4AF37] transition-colors select-none w-fit"
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
                className="hover:text-[#D4AF37] transition-colors select-none w-fit"
              >
                Về chúng tôi
              </Link>
            </nav>
          </div>
      )}
    </>
  );
}

export default Header;