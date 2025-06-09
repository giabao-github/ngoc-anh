import { RefObject } from "react";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { products } from "@/app/storage";
import { formatText, normalizeText } from "@/libs/textUtils";

export const handleNavigation = (
  hash: string,
  hasSections: boolean | undefined,
  hasFooter: boolean | undefined,
  router: AppRouterInstance,
  ref?: RefObject<HTMLDivElement | null>,
) => {
  if (hasSections && ref?.current) {
    const currentHash = window.location.hash;
    if (currentHash === hash) {
      ref.current.scrollIntoView({ behavior: "smooth" });
      return;
    }
    ref.current.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", hash);
  } else if (hasFooter && ref?.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push(`/${hash}`);
  }
};

export const handleSearch = (query: string, router: AppRouterInstance) => {
  const trimmed = query.trim();
  if (!trimmed) {
    return;
  }

  const formattedQuery = formatText(trimmed);
  const normalizedQuery = normalizeText(formattedQuery);
  const queryWords = normalizedQuery.split(" ");
  const encoded = encodeURIComponent(formattedQuery);

  const exactMatch = products.find((product) =>
    queryWords.every((word) => normalizeText(product.name).includes(word)),
  );

  if (!exactMatch) {
    let bestMatch: (typeof products)[number] | null = null;
    let maxScore = 0;

    for (const product of products) {
      const normalizedName = normalizeText(product.name);
      const score = queryWords.filter((word) =>
        normalizedName.includes(word),
      ).length;

      if (score > maxScore) {
        maxScore = score;
        bestMatch = product;
      }
    }
  }
  router.push(`/search?query=${encoded}`);
};
