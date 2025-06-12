"use client";

import { useParams } from "next/navigation";

import ProductError from "@/components/error/ProductError";

import { useProductView } from "@/hooks/useProductView";

import { ProductViewLayout } from "@/modules/product/views/ProductViewLayout";

export const ProductView = () => {
  const params = useParams();
  const slug = params.slug as string;

  if (!slug) {
    return <ProductError />;
  }

  const productViewData = useProductView(slug);

  if (!productViewData.product) {
    return <ProductError />;
  }

  return <ProductViewLayout {...productViewData} slug={slug} />;
};
