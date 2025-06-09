import { RefObject } from "react";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { products } from "@/app/storage";
import { Product } from "@/app/types";
import {
  formatText,
  normalizeText,
  normalizedProducts,
} from "@/libs/textUtils";

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
