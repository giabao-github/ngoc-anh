import { useRouter } from "next/navigation";
import { RefObject, useState } from "react";

import useIsMobile from "../hooks/useIsMobile";
import { handleSearch } from "../lib/utils";
import DesktopHeader from "./DesktopHeader";
import MobileHeader from "./MobileHeader";

interface HeaderProps {
  hasSections?: boolean;
  hasFooter?: boolean;
  collectionRef?: RefObject<HTMLDivElement | null>;
  productsRef?: RefObject<HTMLDivElement | null>;
  aboutRef?: RefObject<HTMLDivElement | null>;
  cartIconRef?: RefObject<HTMLDivElement | null>;
}

const Header: React.FC<HeaderProps> = ({ hasSections, hasFooter, collectionRef, productsRef, aboutRef, cartIconRef }) => {
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
        <MobileHeader
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
}

export default Header;