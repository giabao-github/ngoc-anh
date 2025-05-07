"use client";

import React, { useState, useRef, useLayoutEffect, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Arsenal } from "next/font/google";
import {  FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { FaArrowRightLong, FaBagShopping, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { HiOutlineMapPin } from "react-icons/hi2";
import { collections, products } from "./storage";
import { FilterCarousel } from "./ui/filter-carousel";


const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});

const App = () => {
  const router = useRouter();
  const collectionRef = useRef<HTMLDivElement>(null);
  const productsRef =useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#collection') {
      collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#products') {
      productsRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (hash === '#about') {
      aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  });


  const Header = () => (
    <header className={`bg-[#0C2543] text-white py-4 px-6 ${arsenal.className}`}>
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

        <nav className="hidden md:flex space-x-8 items-center tracking-wide">
          <Link 
            href="#collection" 
            onClick={(e) => {
              e.preventDefault();
              collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              history.pushState(null, '', '#collection');
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Bộ sưu tập
          </Link>
          <Link 
            href="#products" 
            onClick={(e) => {
              e.preventDefault();
              productsRef.current?.scrollIntoView({ behavior: 'smooth' });
              history.pushState(null, '', '#products');
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Cửa hàng
          </Link>
          <Link 
            href="#about" 
            onClick={(e) => {
              e.preventDefault();
              aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
              history.pushState(null, '', '#about');  
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
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
            className="cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );


  const Hero = () => (
    <section className={`bg-[#0C2543] text-white ${arsenal.className}`}>
      <div className="max-w-[1340px] mx-auto grid md:grid-cols-2 gap-8 py-16 px-6">
        <div className="flex flex-col justify-center gap-y-4 md:gap-y-12">
          <h2 className="text-4xl md:text-6xl mb-6 uppercase font-semibold tracking-wide text-[#BE984E]">TINH HOA TỪ ĐẤT
          TINH XẢO TỪ NGƯỜI</h2>
          <p className="mb-8 text-lg md:text-xl tracking-wide">55 năm cho một hành trình bền bỉ đưa gốm sứ Việt Nam vươn tầm thế giới, tạo nên những tuyệt tác vĩnh cửu</p>
          <button className="bg-transparent text-[#BE984E] font-semibold text-base border-1 border-[#BE984E] px-6 py-[14px] md:px-8 md:py-4 rounded-full w-fit hover:bg-[#BE984E] hover:text-white cursor-pointer transition-colors select-none flex items-center flex-row gap-x-3">
            <span className="text-sm md:text-base">
              Tìm hiểu thêm
            </span>
            <FaArrowRightLong size={20} />
          </button>
        </div>
        <div className="relative h-[300px] md:h-auto">
          <Image
            src="https://file.hstatic.net/200000532849/file/chen_ngoc_th_ng_long_670x730px.png"
            alt="Featured Porcelain"
            fill
            className="object-contain rounded-lg select-none"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );

  const data = collections.map((collection) => ({
    value: collection.id.toString(),
    label: collection.name,
    image: collection.image,
    description: collection.description,
  }));


  const Collection = () => (
    <section ref={collectionRef} className={`py-12 md:py-32 px-6 bg-white ${arsenal.className}`}>
      <div className="max-w-lg md:max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-14 md:mb-20 text-black">Bộ Sưu Tập Minh Long</h2>
      </div>
      <FilterCarousel onSelect={() => {}} data={data} />
    </section>
  );


  const ROWS_PER_CLICK = 2;

  const Products = () => {
    const [visibleRows, setVisibleRows] = useState(ROWS_PER_CLICK);
    const productsPerRow = { mobile: 2, desktop: 3 };
    const itemsToShow = visibleRows * productsPerRow.desktop;
    const isAllVisible = itemsToShow >= products.length;

    const gridRef = useRef<HTMLDivElement>(null);
    const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);

    const updateGridHeight = () => {
      if (gridRef.current) {
        setGridHeight(gridRef.current.scrollHeight);
      }
    };

    useLayoutEffect(() => {
      updateGridHeight();
    }, [visibleRows]);

    const showMore = () => {
      setVisibleRows((prev) => prev + ROWS_PER_CLICK);
    };

    const collapse = () => {
      setVisibleRows(ROWS_PER_CLICK);
      productsRef?.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
      <section ref={productsRef} className={`py-12 md:py-32 px-6 bg-[#BB9244] ${arsenal.className}`}>
        <div className="max-w-lg md:max-w-7xl mx-auto transition-all duration-500">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-14 md:mb-20 text-white">
            Khám phá cửa hàng trực tuyến MINH LONG
          </h2>

          {/* Animated wrapper */}
          <div
            className="overflow-hidden transition-all duration-500 ease-in-out"
            style={{ maxHeight: gridHeight ? `${gridHeight}px` : '9999px' }}
          >
            <div
              ref={gridRef}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-center transition-opacity duration-500"
            >
              {products.slice(0, itemsToShow).map((product) => (
                <div
                  key={product.id}
                  className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl mx-auto max-w-full transform transition-transform duration-500"
                >
                  <div className="flex bg-[#FFF3E5] overflow-hidden h-fit md:h-64 items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.name}
                      height={256}
                      width={256}
                      className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-105 cursor-pointer select-none"
                    />
                  </div>

                  <div className="p-3 md:p-4 bg-white">
                    <h3 className="px-1 text-lg md:text-2xl font-semibold text-[#0C2543] line-clamp-2 min-h-[56px]">
                      {product.name}
                    </h3>
                    <p className="px-3 text-[#BB9244] font-semibold py-3 md:py-4 text-xl md:text-2xl">
                      {product.price}
                    </p>
                    <div className="flex flex-col md:flex-row gap-2">
                      <button className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] px-3 py-3 md:px-4 md:py-4 rounded-full w-full md:w-[60%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none">
                        <FiShoppingCart size={18} className="md:h-5 md:w-5" />
                        <span className="font-semibold text-xs md:text-sm">Thêm vào giỏ hàng</span>
                      </button>
                      <button className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] px-3 py-3 md:px-4 md:py-4 rounded-full w-full md:w-[52%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none">
                        <FaBagShopping size={18} className="md:h-5 md:w-5" />
                        <span className="font-semibold text-xs md:text-sm">Mua ngay</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-center mt-8 md:mt-16 transition-opacity duration-300">
            {!isAllVisible ? (
              <button
                onClick={showMore}
                className="select-none cursor-pointer px-6 py-3 md:px-8 md:py-4 text-xs md:text-base rounded-full bg-transparent text-white font-semibold border border-white hover:bg-white hover:text-[#BB9244] transition-colors"
              >
                Xem thêm sản phẩm
              </button>
            ) : (
              <button
                onClick={collapse}
                className="select-none cursor-pointer px-6 py-3 md:px-8 md:py-4 text-xs md:text-base rounded-full bg-transparent text-white font-semibold border border-white hover:bg-white hover:text-[#BB9244] transition-colors"
              >
                Thu gọn
              </button>
            )}
          </div>
        </div>
      </section>
    );
  };


  const Footer = () => (
    <footer ref={aboutRef} className={`bg-[#0C2543] text-white py-12 md:py-24 px-6 ${arsenal.className}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 md:gap-32">
        <div className="text-sm md:text-lg">
          <h3 className="mb-4 uppercase">Trụ sở chính</h3>
          <h1 className="text-lg md:text-2xl mb-4 font-semibold uppercase text-[#D4AF37]">Công ty TNHH Minh Long I</h1>
          <p>Số 333 Đường Hưng Định 24, Khu Phố Hưng Lộc, Phường Hưng Định, Thành Phố Thuận An, Tỉnh Bình Dương, Việt Nam.</p>
          <p>Điện Thoại: (+84) 274 3668899</p>
          <p>Fax: (+84) 274 3724173</p>
          <a
            href="https://www.google.com/maps/place/Ltd+Minh+Long+1+-+MINH+LONG+I,+Co.+Ltd./@10.9464587,106.7023139,17z/data=!3m1!4b1!4m5!3m4!1s0x3174d7412f3fd84b:0x3820a91ad46687c9!8m2!3d10.9464534!4d106.7045026"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 w-fit flex items-center flex-row gap-x-1 md:gap-x-2 cursor-pointer font-semibold text-xs md:text-base hover:text-[#D4AF37]"
          >
            <HiOutlineMapPin className="text-base md:text-xl"/>
            Xem bản đồ
          </a>
        </div>
        <div>
          <div className="text-sm md:text-lg">
            <h3 className="mb-4 uppercase">Kết nối với chúng tôi</h3>
            <p>Hotline:&nbsp; 
              <Link href={'tel:0378044394'} className="hover:text-[#D4AF37]">
                (+84) 915 047 339
              </Link>
            </p>
            <p>Email:&nbsp; 
              <Link href={'mailto:eshop@minhlong.com'} className="hover:text-[#D4AF37]">
                eshop@minhlong.com
              </Link>
            </p>
            <div className="flex space-x-6 mt-10 md:mt-12">
              <a
                href="https://www.facebook.com/minhlongcompany"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-xl md:text-3xl hover:text-[#D4AF37] cursor-pointer" />
              </a>
              <a
                href="https://www.instagram.com/minhlongporcelain"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-xl md:text-3xl hover:text-[#D4AF37] cursor-pointer" />
              </a>
              <a
                href="https://www.youtube.com/@MinhLongPorcelain"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaYoutube className="text-xl md:text-3xl hover:text-[#D4AF37] cursor-pointer" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="hidden md:block">
            <Image
              src={'https://file.hstatic.net/200000532849/file/logothongbao_d4f8886efdb04dd3984bff803b418aa5.png'}
              alt='Verified'
              width={180}
              height={80}
            />
          </div>
          <div className="md:hidden flex flex-row gap-x-8">
            <Image
              src={'https://file.hstatic.net/200000532849/file/logothongbao_d4f8886efdb04dd3984bff803b418aa5.png'}
              alt='Verified'
              width={120}
              height={53}
            />
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer select-none bg-transparent text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors flex items-center"
            >
              <span className="font-semibold text-xs">
                Quay về đầu trang
              </span>
            </button>
          </div>
          <div className="hidden md:flex mt-16 mx-4 text-center justify-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer select-none bg-transparent text-[#D4AF37] border border-[#D4AF37] px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors flex items-center"
            >
              <span className="font-semibold">
                Quay về đầu trang
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );


  return (
    <div className="min-h-screen">
      <Header />
      {isMenuOpen && (
        <div className={`md:hidden bg-[#0C2543] text-white p-6 ${arsenal.className}`}>
          <nav className="flex flex-col space-y-4">
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-[#D4AF37] transition-colors select-none"
            >
              Bộ sưu tập
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                productsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-[#D4AF37] transition-colors select-none"
            >
              Cửa hàng
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-[#D4AF37] transition-colors select-none"
            >
              Về chúng tôi
            </Link>
          </nav>
        </div>
      )}
      <Hero />
      <Collection />
      <Products />
      <Footer />
    </div>
  );
};

export default App;