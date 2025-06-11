import { RefObject } from "react";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import useIsMobile from "@/hooks/useIsMobile";

export const handleNavigation = (
  hash: string,
  hasSections: boolean | undefined,
  hasFooter: boolean | undefined,
  router: AppRouterInstance,
  ref?: RefObject<HTMLDivElement | null>,
) => {
  if (hasSections && ref?.current) {
    // Add extra offset for mobile on collection and product sections
    if (hash === "#collection" || hash === "#products") {
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const elementPosition = ref.current.offsetTop;
        window.scrollTo({
          top: elementPosition - 80,
          behavior: "smooth",
        });
      } else {
        ref.current.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }

    if (window.location.hash !== hash) {
      history.pushState(null, "", hash);
    }
  } else if (hasFooter && ref?.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push(`/${hash}`);
  }
};
