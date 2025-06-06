"use client";

import ProductError from "@/components/error/ProductError";
import ProductPageLayout from "@/components/product/ProductPageLayout";
import SkeletonLoader from "@/components/user/SkeletonLoader";
import { useProductPage } from "@/hooks/useProductPage";
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
