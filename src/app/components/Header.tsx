import { RefObject, useState } from "react";
import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";
import { handleSearch } from "../lib/utils";
import { useCart } from "../hooks/useCart";
import useIsMobile from "../hooks/useIsMobile";
import MobileHeader from "./MobileHeader";
import DesktopHeader from "./DesktopHeader";


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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartCount } = useCart();
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