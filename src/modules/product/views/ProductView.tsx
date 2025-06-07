"use client";

import { Suspense } from "react";

import { useParams } from "next/navigation";

import ProductError from "@/components/error/ProductError";
import SkeletonLoader from "@/components/user/SkeletonLoader";

import { useProductPage } from "@/hooks/useProductPage";

import ProductPageLayout from "@/modules/product/views/ProductPageLayout";

export const ProductView = () => {
  const params = useParams();
  const slug = params.slug as string;

  const productPageData = useProductPage(slug);

  if (!productPageData.product) {
    return <ProductError />;
  }

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <ProductPageLayout {...productPageData} slug={slug} />
    </Suspense>
  );
};
