import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";

import Image from "next/image";
import { useRouter } from "next/navigation";

import useIsMobile from "@/hooks/useIsMobile";

import { products } from "@/app/storage";

const ROWS_PER_CLICK = 2;

interface ProductsProps {
  productsRef?: RefObject<HTMLDivElement | null>;
}

const Products: React.FC<ProductsProps> = ({ productsRef }) => {
  const router = useRouter();
  const [visibleRows, setVisibleRows] = useState(ROWS_PER_CLICK);
  const isMobile = useIsMobile();
  const productsPerRow = { mobile: 2, desktop: 3 };
  const itemsToShow = visibleRows * productsPerRow.desktop;
  const isAllVisible = itemsToShow >= products.length;

  const gridRef = useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = useState<number | undefined>(undefined);

  const updateGridHeight = () => {
    if (gridRef.current) {
      setGridHeight(gridRef.current.scrollHeight);
    }
  };

  useLayoutEffect(() => {
    updateGridHeight();
  }, [visibleRows]);

  const showMore = () => {
    setVisibleRows((prev) => prev + ROWS_PER_CLICK);
  };

  const collapse = () => {
    setVisibleRows(ROWS_PER_CLICK);
    productsRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={productsRef}
      className={`py-16 md:py-32 px-2 md:px-6 bg-secondary`}
    >
      <div className="max-w-lg mx-auto transition-all md:max-w-7xl duration-400">
        <h2 className="mb-20 text-2xl font-semibold text-center text-white md:text-3xl md:mb-24">
          Khám phá cửa hàng trực tuyến MINH LONG
        </h2>

        {/* Animated wrapper */}
        <div
          className="overflow-hidden transition-all ease-in-out duration-400"
          style={{ maxHeight: gridHeight ? `${gridHeight}px` : "9999px" }}
        >
          <div
            ref={gridRef}
            className="grid justify-center grid-cols-2 gap-2 transition-opacity md:grid-cols-3 md:gap-8 duration-400"
          >
            {products.slice(0, itemsToShow).map((product) => (
              <div
                key={product.id}
                className="bg-white group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl mx-auto max-w-full md:min-w-[400px] transform transition-transform duration-400"
              >
                <div
                  onClick={() =>
                    router.push(`/products/${product.details[0].slug}`)
                  }
                  className="flex bg-[#FFF3E5] overflow-hidden md:h-80 items-center justify-center mb-1 md:mb-0"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    height={256}
                    width={256}
                    className="object-contain w-full h-full transition-transform duration-300 transform cursor-pointer select-none group-hover:scale-105"
                  />
                </div>

                <div
                  onClick={() =>
                    router.push(`/products/${product.details[0].slug}`)
                  }
                  className="p-2 bg-white cursor-pointer md:p-3"
                >
                  <h3
                    className={`px-1 md:px-2 text-sm md:text-xl font-semibold text-primary line-clamp-2 min-h-[36px] md:min-h-[60px] leading-tight md:leading-normal hover:underline active:text-primary/70`}
                  >
                    {product.name}
                  </h3>
                  <p
                    className={`px-1 md:px-2 text-orange-500 font-semibold pt-2 md:py-4 md:text-2xl`}
                  >
                    {product.details[0]?.price.toLocaleString("en-US") + "₫"}
                  </p>
                  <div className="hidden mb-2 md:flex md:flex-row md:gap-2">
                    <button
                      onClick={() =>
                        router.push(`/products/${product.details[0].slug}`)
                      }
                      className="mt-2 border border-secondary bg-transparent text-secondary p-3 md:p-4 rounded-full w-full md:w-[50%] hover:bg-secondary active:bg-secondary/70 hover:text-white active:text-white/70 transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none"
                    >
                      <FiShoppingCart size={18} />
                      <span className="text-xs font-semibold tracking-wide md:text-sm">
                        Thêm vào giỏ hàng
                      </span>
                    </button>
                    <button
                      onClick={() =>
                        router.push(`/products/${product.details[0].slug}`)
                      }
                      className="mt-2 border border-secondary bg-transparent text-secondary p-3 md:p-4 rounded-full w-full md:w-[50%] hover:bg-secondary active:bg-secondary/70 hover:text-white active:text-white/70  transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none"
                    >
                      <FaBagShopping size={18} />
                      <span className="text-xs font-semibold tracking-wide md:text-sm">
                        Mua ngay
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 transition-all md:mt-16 duration-400">
          {!isAllVisible ? (
            <button
              onClick={showMore}
              className="px-6 py-3 text-xs font-semibold tracking-wide text-white transition-colors bg-transparent border border-white rounded-full cursor-pointer select-none md:px-8 md:py-4 md:text-base hover:bg-white hover:text-secondary active:bg-white/70 active:text-secondary/70"
            >
              Xem thêm sản phẩm
            </button>
          ) : (
            <button
              onClick={collapse}
              className="px-6 py-3 text-xs font-semibold tracking-wide text-white transition-colors bg-transparent border border-white rounded-full cursor-pointer select-none md:px-8 md:py-4 md:text-base hover:bg-white hover:text-secondary active:bg-white/70 active:text-secondary/70"
            >
              Thu gọn
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
