import { RefObject, useState } from "react";

import { useRouter } from "next/navigation";

import DesktopHeader from "@/components/header/DesktopHeader";
import MobileHeader from "@/components/header/MobileHeader";

import useIsMobile from "@/hooks/useIsMobile";

import { handleSearch } from "@/lib/utils";

interface HeaderProps {
  hasSections?: boolean;
  hasFooter?: boolean;
  collectionRef?: RefObject<HTMLDivElement | null>;
  productsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
  cartIconRef?: RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({
  hasSections,
  hasFooter,
  collectionRef,
  productsRef,
  aboutRef,
  cartIconRef,
}) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const isMobile = useIsMobile();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query, router);
    }
  };

  return (
    <>
      {isMobile ? (
        <div className="pb-20">
          <MobileHeader
            hasSections={hasSections}
            hasFooter={hasFooter}
            collectionRef={collectionRef}
            productsRef={productsRef}
            aboutRef={aboutRef}
            cartIconRef={cartIconRef}
            query={query}
            setQuery={setQuery}
          />
        </div>
      ) : (
        <DesktopHeader
          hasSections={hasSections}
          hasFooter={hasFooter}
          collectionRef={collectionRef}
          productsRef={productsRef}
          aboutRef={aboutRef}
          cartIconRef={cartIconRef}
          query={query}
          setQuery={setQuery}
          handleKeyDown={handleKeyDown}
        />
      )}
    </>
  );
};

export default Header;
