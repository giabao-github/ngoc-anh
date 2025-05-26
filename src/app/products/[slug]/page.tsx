"use client";

import ProductError from "@/app/components/error/ProductError";
import ProductPageLayout from "@/app/components/product/ProductPageLayout";
import SkeletonLoader from "@/app/components/user/SkeletonLoader";
import { useProductPage } from "@/app/hooks/useProductPage";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

const ProductPage = () => {
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

export default ProductPage;