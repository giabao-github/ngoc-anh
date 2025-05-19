"use client";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import SkeletonLoader from "@/app/components/SkeletonLoader";
import { products } from "@/app/storage";
import { Product } from "@/app/types";
import { normalizeText } from "../lib/utils";


const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const aboutRef = useRef<HTMLDivElement>(null);

  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(" ");

  const results = useMemo(() => {
    return products.filter((product) => {
      const normalizedName = normalizeText(product.name);
      const nameWords = normalizedName.split(/\s+/);
      return queryWords.every(word => nameWords.includes(word));
    });
  }, [query]);

  const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 768);
      checkMobile();
      window.addEventListener('resize', checkMobile);
      return () => window.removeEventListener('resize', checkMobile);
    }, []);
  
    return isMobile;
  };
  
  const isMobile = useIsMobile();


  return (
    <Suspense fallback={<SkeletonLoader />}>
      <title>Kết quả tìm kiếm</title>
      <Header hasFooter aboutRef={aboutRef} /> 
      <div className="px-4 sm:px-6 lg:px-16 pt-10 pb-20">
        {/* Heading */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-semibold text-gray-900">Tìm kiếm</h1>
          <p className="text-[#0C2543] my-4">
            Có <strong>{results.length} sản phẩm</strong> cho tìm kiếm <strong>"{query}"</strong>
          </p>
          <div className="w-20 h-1 bg-black mx-auto mt-2 rounded" />
        </div>

        {/* Product Grid */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          {results.map((product: Product) => (
              <div key={product.id} className="bg-neutral-100 border border-neutral-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200">
                <div
                  onClick={() => router.push(`/products/${product.details[0].slug}`)}
                  className="w-full h-64 relative overflow-hidden border-b border-neutral-200 cursor-pointer mb-4 bg-[#FFF3E5]"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    layout="fill"
                    objectFit="contain"
                    className="rounded"
                  />
                </div>
                <p className="px-3 py-0.5 text-sm text-[#BE984E]">{product.brand}</p>
                <h2
                  title={product.name}
                  onClick={() => router.push(`/products/${product.details[0].slug}`)}
                  className="min-h-[72px] px-3 py-2 font-semibold text-xl text-[#0C2543] cursor-pointer hover:underline active:text-[#0C2543]/70"
                >
                  {product.name.length > 70 && isMobile ? product.name.slice(0, 70) + '...' : product.name.length > 56 ? product.name.slice(0, 56) + '...' : product.name}
                </h2>
                <p className="px-3 pb-3 text-lg font-semibold mt-2">{product.details[0].price.toLocaleString()}₫</p>
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