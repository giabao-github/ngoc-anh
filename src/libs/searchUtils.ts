import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { formatText, normalizeText } from "@/libs/textUtils";

import { products } from "@/app/storage";
import { Product } from "@/types/invoice";

export interface SearchResult {
  products: Product[];
  query: string;
}

const normalizedProducts =
  products?.map((product) => ({
    ...product,
    normalizedName: normalizeText(product.name),
  })) || [];

export const searchProducts = (query: string): SearchResult => {
  const formattedQuery = formatText(query);

  // Empty query - show all products
  if (formattedQuery.length === 0) {
    return { products: products, query: "" };
  }

  const normalizedQuery = normalizeText(formattedQuery);

  // Split query into words and filter out empty strings
  const queryWords = normalizedQuery
    .split(" ")
    .filter((word) => word.length > 0);

  // Use Map for O(1) lookup instead of array iteration for large datasets
  const productScores = new Map<string, number>();

  normalizedProducts.forEach((product) => {
    const matchCount = queryWords.filter((word) =>
      product.normalizedName.includes(word),
    ).length;

    if (matchCount > 0) {
      // Boost score for exact matches and word order
      let score = matchCount;
      if (product.normalizedName.includes(normalizedQuery)) {
        score += 5;
      }
      if (product.normalizedName.startsWith(normalizedQuery)) {
        score += 3;
      }

      productScores.set(product.id.toString(), score);
    }
  });

  // Get sorted products based on scores
  const sortedProducts = Array.from(productScores.entries())
    .sort(([, a], [, b]) => b - a)
    .map(([productId]) =>
      normalizedProducts.find((product) => product.id.toString() === productId),
    )
    .filter(Boolean) as Product[];

  return {
    products: sortedProducts,
    query: formattedQuery,
  };
};

export const handleSearch = (query: string, router: AppRouterInstance) => {
  const formattedQuery = formatText(query);

  const encoded = encodeURIComponent(formattedQuery);
  router.push(`/search?query=${encoded}`);
};
