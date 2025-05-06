"use client"

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Arsenal } from "next/font/google";
import {  FiMenu, FiShoppingCart, FiUser, FiX } from "react-icons/fi";
import { FaArrowRightLong, FaBagShopping, FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { collections, products } from "./storage";
import { FilterCarousel } from "./ui/filter-carousel";


const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const collectionRef = useRef<HTMLDivElement>(null);
  const productsRef =useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setLoading(false);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, []);


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
            className="object-cover rounded cursor-pointer bg-white"
          />
          <h1 className="text-2xl font-semibold uppercase select-none hidden md:block">Ngọc Ánh</h1>
        </div>

        <nav className="hidden md:flex space-x-6 items-center tracking-wide">
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              collectionRef.current?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Bộ sưu tập
          </Link>
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              productsRef.current?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Cửa hàng
          </Link>
          <Link 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
            }} 
            className="hover:text-[#D4AF37] transition-colors text-lg"
          >
            Về chúng tôi
          </Link>
          <FiShoppingCart className="text-xl cursor-pointer hover:text-[#D4AF37]" />
          <FiUser className="text-xl cursor-pointer hover:text-[#D4AF37]" />
          <Image 
            src={'https://static.vecteezy.com/system/resources/previews/016/328/942/large_2x/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png'}
            alt="Vietnam"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full cursor-pointer"
          />
        </nav>

        <div className="flex flex-row gap-x-4 md:hidden">
          <Image 
            src={'https://static.vecteezy.com/system/resources/previews/016/328/942/large_2x/vietnam-flat-rounded-flag-icon-with-transparent-background-free-png.png'}
            alt="Vietnam"
            width={32}
            height={32}
            className="h-8 w-8 rounded-full cursor-pointer"
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
          <img
            src="https://file.hstatic.net/200000532849/file/chen_ngoc_th_ng_long_670x730px.png"
            alt="Featured Porcelain"
            className="w-full h-full object-contain rounded-lg"
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
    <section ref={collectionRef} className={`py-16 md:py-32 px-6 bg-white ${arsenal.className}`}>
      <div className="max-w-lg md:max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-black">Bộ Sưu Tập Minh Long</h2>
      </div>
      <FilterCarousel onSelect={() => {}} data={data} />
    </section>
  );


  const NewProducts = () => (
    <section ref={productsRef} className={`py-16 md:py-32 px-6 bg-[#BB9244] ${arsenal.className}`}>
      <div className="max-w-lg md:max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-12 text-white">
          Khám phá cửa hàng trực tuyến MINH LONG
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 justify-center">
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow mx-auto max-w-full"
            >
              <div className="flex bg-[#FFF3E5] overflow-hidden h-fit md:h-64 items-center justify-center">
                <Image
                  src={product.image}
                  alt={product.name}
                  height={256}
                  width={256}
                  className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-105 cursor-pointer"
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
                  <button className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] px-3 py-3 md:px-4 md:py-4 rounded-full w-full md:w-[60%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer">
                    <FiShoppingCart size={18} className="md:h-5 md:w-5" />
                    <span className="font-semibold text-xs md:text-sm">
                      Thêm vào giỏ hàng
                    </span>
                  </button>
                  <button className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] px-3 py-3 md:px-4 md:py-4 rounded-full w-full md:w-[52%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer">
                    <FaBagShopping size={18} className="md:h-5 md:w-5" />
                    <span className="font-semibold text-xs md:text-sm">
                      Mua ngay
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );


  const Footer = () => (
    <footer ref={aboutRef} className={`bg-[#0C2543] text-white py-12 md:py-24 px-6 ${arsenal.className}`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 md:gap-32">
        <div className="text-sm md:text-lg">
          <h3 className="mb-4 uppercase">Trụ sở chính</h3>
          <h1 className="text-lg md:text-2xl mb-4 font-semibold uppercase text-[#D4AF37]">Công ty TNHH Minh Long I</h1>
          <p>Số 333 Đường Hưng Định 24, Khu Phố Hưng Lộc, Phường Hưng Định, Thành Phố Thuận An, Tỉnh Bình Dương, Việt Nam.</p>
          <p>Điện Thoại: (+84) 274 3668899</p>
          <p>Fax: (+84) 274 3724173</p>
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
              <FaFacebookF className="text-xl md:text-3xl hover:text-[#D4AF37] cursor-pointer" onClick={() => router.push('https://www.facebook.com/minhlongcompany')} />
              <FaInstagram className="text-xl md:text-3xl hover:text-[#D4AF37] cursor-pointer" onClick={() => router.push('https://www.instagram.com/minhlongporcelain/')} />
              <FaYoutube className="text-xl md:text-3xl hover:text-[#D4AF37] cursor-pointer" onClick={() => router.push('https://www.youtube.com/@MinhLongPorcelain')} />
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
              className="cursor-pointer bg-transparent text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors flex items-center"
            >
              <span className="font-semibold text-xs">
                Quay về đầu trang
              </span>
            </button>
          </div>
          <div className="hidden md:flex mt-16 mx-4 text-center justify-start">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer bg-transparent text-[#D4AF37] border border-[#D4AF37] px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:text-white transition-colors flex items-center"
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

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0C2543]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#D4AF37]"></div>
      </div>
    );
  }

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
              className="hover:text-[#D4AF37] transition-colors"
            >
              Bộ sưu tập
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                productsRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-[#D4AF37] transition-colors"
            >
              Cửa hàng
            </Link>
            <Link 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                aboutRef.current?.scrollIntoView({ behavior: 'smooth' });
              }} 
              className="hover:text-[#D4AF37] transition-colors"
            >
              Về chúng tôi
            </Link>
          </nav>
        </div>
      )}
      <Hero />
      <Collection />
      <NewProducts />
      <Footer />
    </div>
  );
};

export default App;