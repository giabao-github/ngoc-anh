"use client";

import Header from "@/app/components/header/Header";
import Footer from "@/app/components/sections/Footer";
import SkeletonLoader from "@/app/components/user/SkeletonLoader";
import useIsMobile from "@/app/hooks/useIsMobile";
import { normalizeText } from "@/app/lib/utils";
import { products } from "@/app/storage";
import { Product } from "@/app/types";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useMemo, useRef } from "react";


const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const aboutRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(" ");
  const isMobile = useIsMobile();

  const results = useMemo(() => {
    return products.filter((product) => {
      const normalizedName = normalizeText(product.name);
      const nameWords = normalizedName.split(/\s+/);
      return queryWords.every(word => nameWords.includes(word));
    });
  }, [query]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Kết quả tìm kiếm</title>
      <Header hasFooter aboutRef={aboutRef} /> 
      <div className="px-2 lg:px-16 pt-10 pb-20">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-16">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900">Tìm kiếm</h1>
          <p className="text-sm md:text-base text-[#0C2543] my-3 md:my-4">
            Có <strong>{results.length} sản phẩm</strong> cho tìm kiếm <strong>"{query}"</strong>
          </p>
          <div className="w-16 md:w-20 h-1 bg-black mx-auto mt-2 rounded" />
        </div>

        {/* Product Grid */}
        <div className="grid gap-2 md:gap-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {results.map((product: Product) => (
              <div key={product.id} className="bg-neutral-100 border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                <div
                  onClick={() => router.push(`/products/${product.details[0].slug}`)}
                  className="w-full md:h-64 relative overflow-hidden border-b border-neutral-200 cursor-pointer bg-[#FFF3E5]"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    width={256}
                    height={256}
                    className="rounded object-contain"
                  />
                </div>
                <div 
                  onClick={() => router.push(`/products/${product.details[0].slug}`)}
                  className="p-2 md:p-3 space-y-1 cursor-pointer"
                >
                  <p className="text-xs md:text-sm text-[#BE984E]">{product.brand}</p>
                  <h2
                    title={product.name}
                    className="text-sm md:text-xl font-semibold text-[#0C2543] line-clamp-2 min-h-[36px] md:min-h-[60px] leading-tight md:leading-[1.4] hover:underline active:text-[#0C2543]/70"
                  >
                    {product.name}
                  </h2>
                  <p className="text-orange-500 md:text-xl font-semibold mt-2">{product.details[0].price.toLocaleString()}₫</p>
                </div>
              </div>
            ))
          }
        </div>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};

export default SearchPage;