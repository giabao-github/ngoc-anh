import { RefObject } from "react";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const scrollToElement = (
  ref: RefObject<HTMLDivElement | null>,
  hash: string,
  isMobile: boolean = false,
) => {
  // Bail out during SSR
  if (typeof window === "undefined") {
    return;
  }

  if (!ref.current) {
    return;
  }

  const isSpecialSection = hash === "#collection" || hash === "#products";

  if (isMobile && isSpecialSection) {
    const elementPosition = ref.current.offsetTop;
    window.scrollTo({
      top: elementPosition - 80,
      behavior: "smooth",
    });
  } else {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }
};

export const handleNavigation = (
  hash: string,
  hasSections: boolean | undefined,
  hasFooter: boolean | undefined,
  router: AppRouterInstance,
  ref?: RefObject<HTMLDivElement | null>,
  isMobile: boolean = false,
) => {
  if (!ref?.current) {
    router.push(`/${hash}`);
    return;
  }

  if (hasSections || hasFooter) {
    scrollToElement(ref, hash, isMobile);

    if (
      hasSections &&
      typeof window !== "undefined" &&
      window.location.hash !== hash
    ) {
      history.pushState(null, "", hash);
    }
    return;
  }

  router.push(`/${hash}`);
};
