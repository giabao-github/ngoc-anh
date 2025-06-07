"use client";

import { useParams } from "next/navigation";

import ProductError from "@/components/error/ProductError";

import { useProductPage } from "@/hooks/useProductPage";

import ProductPageLayout from "@/modules/product/views/ProductPageLayout";

export const ProductView = () => {
  const params = useParams();
  const slug = params.slug as string;

  const productPageData = useProductPage(slug);

  if (!productPageData.product) {
    return <ProductError />;
  }

  return <ProductPageLayout {...productPageData} slug={slug} />;
};
