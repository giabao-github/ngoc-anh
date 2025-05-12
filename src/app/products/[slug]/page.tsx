"use client";

import React, { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FiHeart, FiMinus, FiPlus, FiShoppingCart, FiX } from "react-icons/fi";
import { FaBagShopping, FaStar } from "react-icons/fa6";
import { IoWarning } from "react-icons/io5";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { products } from "@/app/storage";
import { ProductCarousel } from "@/app/ui/product-carousel";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Separator } from "@/app/ui/separator";
import { cn } from "@/app/lib/utils";
import RatingInput from "@/app/components/RatingInput";
import RatingBar from "@/app/components/RatingBar";


export const dynamic = "force-dynamic";

const ProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const product = useMemo(() => {
    return products.find((item) => item.patterns[0].slug === slug);
  }, [slug]);
  const [selectedPattern, setSelectedPattern] = useState(product?.patterns[0].name || "Không tìm thấy hoa văn");
  const [quantity, setQuantity] = useState(1);
  const [cartQuantity, setCartQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = product?.images ?? [];

  const { totalReviews, averageRating } = useMemo(() => {
    if (!product || !product.rating?.length) {
      return { totalReviews: 0, averageRating: 0 };
    }
    const totalReviews = product.rating.reduce((sum, count) => sum + count, 0);
    const weightedSum = product.rating.reduce(
      (sum, count, index) => sum + count * (index + 1),
      0
    );
    const averageRating = totalReviews > 0
      ? parseFloat((weightedSum / totalReviews).toFixed(1))
      : 0;
    return { totalReviews, averageRating };
  }, [product]);  

  const [showNotification, setShowNotification] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isWishlisted, setIsWishlisted] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const handleAddToCart = () => { 
    setCartQuantity(quantity);
    setShowNotification(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setShowNotification(false);
      timeoutRef.current = null;
    }, 5000);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleQuantityChange = (type: string) => {
    if (type === "increment" &&  product?.quantity && (quantity ?? 1) < product?.quantity) {
      setQuantity((quantity ?? 1) + 1);
    }
    if (type === "decrement" && (quantity ?? 1) > 1) {
      setQuantity((quantity ?? 1) - 1);
    }
  };

  const data = images.map((image, index) => ({
    value: index.toString(),
    label: product?.name,
    image: image,
  }));

  useEffect(() => {
    if (product) {
      setSelectedPattern(product.patterns[0].name);
      setQuantity(1);
      setCurrentImageIndex(0);
    }
  }, [product]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);  


  if (!product) {
    return (
      <div className="p-8 flex flex-col items-center justify-center text-center bg-red-50 border border-red-200 rounded-lg shadow-sm space-y-3">
        <IoWarning size={36} className="text-rose-600" />
        <h2 className="text-rose-600 text-lg font-bold">Sản phẩm không tồn tại</h2>
        <p className="text-rose-500 text-sm">
          Chúng tôi không tìm thấy sản phẩm bạn đang tìm kiếm. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
        </p>
        <Link
          href="/"
          className="mt-2 inline-block px-4 py-2 bg-rose-500 text-white rounded-md hover:animate-pulse transition"
        >
          Quay về trang chủ
        </Link>
      </div>
    );
  }  

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="max-w-7xl mx-auto px-4 py-8 bg-white">
      {showNotification && (
        <div className="fixed top-4 right-4 md:top-24 md:right-4 bg-white shadow-2xl rounded-xl p-4 w-80 z-50 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-green-600 font-semibold text-sm">
              Đã thêm vào giỏ hàng thành công!
            </h4>
            <button 
              onClick={handleCloseNotification}
              className="cursor-pointer"
            >
              <FiX className="text-gray-300 hover:text-gray-700 w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={64}
              height={64}
              className="w-16 h-16 border border-black object-cover rounded-lg"
            />
            <div className="flex-1 space-y-1">
              <p className="font-medium text-gray-800 text-sm">{product.name}</p>
              <p className="text-sm text-gray-600">
                {cartQuantity > 1 ? `Số lượng: ${cartQuantity}` : null}
              </p>
              <p className="text-sm font-semibold text-gray-900 mt-1">
                {new Intl.NumberFormat('vi-VN', {
                  style: 'currency',
                  currency: 'VND',
                }).format(product.patterns[0].price * cartQuantity)}
              </p>
            </div>
          </div>
        </div>
      )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:mt-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="flex justify-center items-center">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <ProductCarousel onSelect={(value) => setCurrentImageIndex(Number(value))} data={data} currentIndex={currentImageIndex} />
              </div>
            </div>

            <div className="flex justify-center gap-4 mx-auto">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`aspect-square w-16 md:w-28 cursor-pointer rounded-lg overflow-hidden ${currentImageIndex === index ? "ring-2 ring-[#BB9244]" : "ring-1 ring-neutral-100"}`}
                >
                  <Image 
                    width={112} 
                    height={112} 
                    src={img}
                    quality={100}
                    alt={`Thumbnail ${index + 1}`} 
                    className="w-full h-full object-cover"
                  /> 
                </button>
              ))}
            </div>

            <div className="mt-8 md:mt-16 md:-mx-8">
              <Separator color="#BB9244" opacity={100} />
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-4 md:space-y-6 mx-1 md:mx-0">
            <div className="flex justify-between items-start">
              <h1 className="text-xl md:text-3xl font-bold max-w-[90%]">{product.name}</h1>
              <button
                title={`${isWishlisted ? 'Remove from Favorite' : 'Add to Favorite'}`}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`group p-0 md:p-3 rounded-lg cursor-pointer outline-none ring-0 focus:ring-0 focus:outline-none md:hover:bg-red-50 ${isWishlisted ? "md:bg-red-50" : "bg-transparent md:bg-gray-50"}`}
              >
                <FiHeart
                  className={cn(
                    "w-6 h-6",
                    isWishlisted ? "fill-rose-500 stroke-rose-500" : "stroke-gray-500",
                    "group-hover:fill-rose-500 group-hover:stroke-rose-500"
                  )}
                />
              </button>
            </div>

            <div className="space-y-2 text-xs tracking-wide text-gray-700">
              <p>{`Mã sản phẩm: ${product.code}`}</p>
              <p>{`Thương hiệu: ${product.brand}`}</p>
              <p>{`Bộ sưu tập: ${product.collection}`}</p>
            </div>

            <p className="text-2xl md:text-4xl font-bold text-orange-500">{product.patterns[0]?.price?.toLocaleString('en-US') ?? 'Giá liên hệ'}₫</p>

            <Separator color="#BB9244" opacity={40} />

            <div className="space-y-4">
              <div className="space-y-2">
                <p className="font-semibold">Hoa văn</p>
                <div className="flex gap-4">
                  {product.patterns.map((pattern) => (
                    <button
                      key={pattern.name}
                      onClick={() => {
                        setSelectedPattern(pattern.name);
                        if (slug !== pattern.slug) {
                          router.push(`/products/${pattern.slug}`);
                        }
                      }}
                      className={`px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-[#BB9244] hover:bg-[#BB9244] hover:text-white transition-colors tracking-wide ${
                        selectedPattern === pattern.name
                          ? "border-[#BB9244] bg-[#BB9244] text-white"
                          : "border-gray-300"
                      }`}
                    >
                      {pattern.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <p className="font-semibold"
                >
                  {`${product.size ? 'Kích thước' : product.volume ? 'Dung tích' : 'Kích thước/ Dung tích'}`}
                </p>
                <div className="w-fit px-4 py-2 rounded-lg cursor-pointer select-none border text-sm hover:border-[#BB9244] hover:bg-[#BB9244] hover:text-white transition-colors border-[#BB9244] bg-[#BB9244] text-white tracking-wide"
                >
                  {product.size || product.volume || 'Không xác định'}
                </div>
              </div>

              <Separator color="#BB9244" opacity={40} />

              <div className="space-y-2">
                <p className="font-semibold">Số lượng</p>
                <div className="flex items-center gap-x-6">
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => quantity > 1 && handleQuantityChange("decrement")}
                      className={`p-2 ${
                        quantity > 1
                          ? "cursor-pointer hover:bg-gray-100"
                          : "cursor-default text-gray-400"
                      }`}
                    >
                      <FiMinus />
                    </button>
                    <span className="w-8 flex justify-center px-4">{quantity}</span>
                    <button
                      onClick={() => product.quantity && quantity < product.quantity && handleQuantityChange("increment")}
                      className={`p-2 ${
                        product.quantity && quantity < product.quantity
                          ? "cursor-pointer hover:bg-gray-100"
                          : "cursor-default text-gray-400"
                      }`}
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 tracking-wide">{`${product.quantity} sản phẩm còn lại`}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-2 mb-4 md:mb-8">
              <button
                onClick={handleAddToCart}
                className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] p-3 md:p-4 rounded-full w-full md:w-[40%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none"
              >
                <FiShoppingCart size={24} />
                <span className="font-semibold text-sm md:text-base">Thêm vào giỏ hàng</span>
              </button>
              <button 
                className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] p-3 md:p-4 rounded-full w-full md:w-[60%] hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none"
              >
                <FaBagShopping size={24} />
                <span className="font-semibold text-sm md:text-base">Mua ngay</span>
              </button>
            </div>
          </div>

          {/* Product Details Section */}
          <TabGroup className="mx-2 md:mx-0">
            <TabList className="flex border-b border-[#BB9244]/40 gap-x-10">
              {['CHI TIẾT SẢN PHẨM', 'HƯỚNG DẪN SỬ DỤNG'].map((tab) => (
                <Tab key={tab} className={({ selected }) =>
                  `py-3 text-sm md:text-lg font-semibold uppercase tracking-wide cursor-pointer border-b -mb-px transition outline-none ring-0 focus:ring-0 focus:outline-none ${
                    selected
                      ? 'border-[#BB9244] text-black'
                      : 'border-transparent text-gray-400 hover:border-[#BB9244] hover:text-black'
                  }`
                }>
                  {tab}
                </Tab>
              ))}
            </TabList>

            <TabPanels className="pt-6">
              {/* Tab 1 - Product Details */}
              <TabPanel className="space-y-4">
                {product.description || ""}
              </TabPanel>

              {/* Tab 2 - Usage Instructions */}
              <TabPanel className="space-y-4">
                {product.instruction || (
                  <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm md:text-base">
                    <li>Vệ sinh bằng khăn mềm, tránh va đập mạnh.</li>
                    <li>Không dùng hóa chất tẩy rửa mạnh.</li>
                    <li>Trưng bày nơi khô ráo, tránh ánh nắng trực tiếp.</li>
                  </ul>
                )}
              </TabPanel>
            </TabPanels>
          </TabGroup>

          {/* Ratings Section */}
          <div className="px-2 pt-10 md:pt-0 md:px-16 pb-12 md:pb-24">
            <div className="grid md:grid-cols-1 gap-8 md:gap-12">
                <div className="space-y-4 md:space-y-8">
                  <h3 className="text-xl md:text-3xl font-bold">Nhận xét và đánh giá</h3>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-start space-y-6 md:space-y-0 md:space-x-10">
                    {/* Left: Overall Rating */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <FaStar className="text-[#F3C63F] h-6 w-6 md:w-10 md:h-10" />
                        <span className="text-xl md:text-3xl font-bold">{averageRating}</span>
                      </div>
                      <p className="text-gray-700 text-left md:text-right text-sm">{totalReviews} đánh giá</p>
                    </div>

                    {/* Right: Ratings Breakdown */}
                    <div className="space-y-1 md:space-y-2 w-2/3 md:w-full">
                      {[5, 4, 3, 2, 1].map((star) => {
                        const index = star - 1;
                        const count = product?.rating?.[index] ?? 0;

                        return (
                          <div key={star} className="flex items-center gap-3 md:gap-4">
                            {/* Stars */}
                            <div className="flex gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <FaStar
                                  key={i}
                                  className={`w-3 h-3 md:w-4 md:h-4 ${i < star ? 'text-[#F3C63F]' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>

                            {/* Progress Bar */}
                            <div className="flex-1 h-[2px] md:h-[6px] min-w-[75%] md:min-w-[65%] bg-gray-200 rounded-full overflow-hidden">
                              <RatingBar count={count} totalReviews={totalReviews} />
                            </div>

                            {/* Count */}
                            <span className="text-xs md:text-sm text-gray-600">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <RatingInput onRate={() => {}} />
                </div>

              <div className="space-y-5">
                <h3 className="text-lg md:text-xl font-bold">Đánh giá sản phẩm</h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Bạn cần
                  <Link
                    href={'/login?method=email'}
                    className="font-semibold text-[#BB9244] hover:underline px-[6px]"
                  >
                    đăng nhập
                  </Link>
                  để nhận xét và đánh giá sản phẩm này
                </p>
                <button
                  onClick={() => router.push('/login?method=email')}
                  className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] px-6 py-3 rounded-full w-fit hover:bg-[#BB9244] hover:text-white transition-colors flex items-center justify-center gap-x-2 md:gap-x-4 cursor-pointer select-none"
                >
                  <span className="font-semibold text-xs md:text-sm">Viết đánh giá</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};

export default ProductPage;