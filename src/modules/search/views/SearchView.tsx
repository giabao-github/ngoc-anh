"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import Header from "@/components/header/Header";
import Footer from "@/components/sections/Footer";

import { products } from "@/app/storage";
import { Product } from "@/app/types";
import { normalizeText } from "@/lib/utils";

export const SearchView = () => {
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
      return queryWords.every((word) => nameWords.includes(word));
    });
  }, [query]);

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
          <p className="my-3 text-sm md:text-base text-primary md:my-4">
            Có <strong>{results.length} sản phẩm</strong> cho tìm kiếm{" "}
            <strong>"{query}"</strong>
          </p>
          <div className="w-16 h-1 mx-auto mt-2 bg-black rounded md:w-20" />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 gap-2 md:gap-8 md:grid-cols-3 xl:grid-cols-5">
          {results.map((product: Product) => (
            <div
              key={product.id}
              className="overflow-hidden transition-all duration-200 border shadow-sm bg-neutral-100 border-neutral-200 rounded-xl hover:shadow-md"
            >
              <div
                onClick={() =>
                  router.push(`/products/${product.details[0].slug}`)
                }
                className="relative overflow-hidden border-b border-neutral-200 cursor-pointer bg-[#FFF3E5]"
              >
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  width={256}
                  height={256}
                  className="object-contain w-full rounded md:h-64 xl:h-[326px]"
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
                  {product.details[0].price.toLocaleString()}₫
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
