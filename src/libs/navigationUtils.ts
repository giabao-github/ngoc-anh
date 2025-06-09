import { RefObject } from "react";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const handleNavigation = (
  hash: string,
  hasSections: boolean | undefined,
  hasFooter: boolean | undefined,
  router: AppRouterInstance,
  ref?: RefObject<HTMLDivElement | null>,
) => {
  if (hasSections && ref?.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
    if (window.location.hash !== hash) {
      history.pushState(null, "", hash);
    }
  } else if (hasFooter && ref?.current) {
    ref.current.scrollIntoView({ behavior: "smooth" });
  } else {
    router.push(`/${hash}`);
  }
};
