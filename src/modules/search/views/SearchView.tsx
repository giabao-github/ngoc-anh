"use client";

import { Suspense, useEffect, useRef } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import Footer from "@/components/sections/footer/Footer";
import Header from "@/components/sections/header/Header";

import { formatPrice } from "@/libs/productUtils";
import { searchProducts } from "@/libs/searchUtils";

import { Product } from "@/types/invoice";

export const SearchView = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const aboutRef = useRef<HTMLDivElement>(null);
  const searchResults = searchProducts(query).products;
  const totalResults = searchResults.length;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Suspense>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="px-2 pt-10 pb-20 lg:px-16">
        {/* Heading */}
        <div className="mb-10 text-center md:mb-16">
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Tìm kiếm
          </h1>
          {query.trim().length > 0 ? (
            <p className="my-3 text-sm md:text-base text-primary md:my-4">
              Có <strong>{totalResults} sản phẩm</strong> cho tìm kiếm{" "}
              <strong>"{query}"</strong>
            </p>
          ) : (
            <p className="my-3 text-sm md:text-base text-primary md:my-4">
              Vui lòng nhập từ khóa để lọc kết quả chính xác
            </p>
          )}

          <div className="w-16 h-1 mx-auto mt-2 bg-black rounded md:w-20" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-8 md:grid-cols-3 2xl:grid-cols-5">
          {searchResults.map((product: Product) => (
            <div
              key={product.id}
              className="overflow-hidden transition-all duration-200 border shadow-sm bg-neutral-100 border-neutral-200 rounded-xl hover:shadow-md"
            >
              <div
                onClick={() =>
                  router.push(`/products/${product.details[0].slug}`)
                }
                className="relative flex items-center justify-center overflow-hidden border-b h-[136px] md:h-[223px] 2xl:h-[245px] cursor-pointer border-neutral-200"
                style={{
                  background: product.background || "",
                }}
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={245}
                  height={245}
                  quality={100}
                  className="object-contain w-full h-auto rounded-t"
                />
              </div>
              <div
                onClick={() =>
                  router.push(`/products/${product.details[0].slug}`)
                }
                className="p-2 space-y-1 cursor-pointer md:p-3"
              >
                <p className="text-xs md:text-sm text-[#BE984E]">
                  {product.brand}
                </p>
                <h2
                  title={product.name}
                  className="text-sm md:text-xl font-semibold text-primary line-clamp-2 min-h-[36px] md:min-h-[60px] leading-tight md:leading-[1.4] hover:underline active:text-primary/70"
                >
                  {product.name}
                </h2>
                <p className="mt-2 font-semibold text-orange-500 md:text-xl">
                  {formatPrice(product.details[0].price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};
