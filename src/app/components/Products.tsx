import Image from "next/image";
import { RefObject, useLayoutEffect, useRef, useState } from "react";
import { FaBagShopping } from "react-icons/fa6";
import { FiShoppingCart } from "react-icons/fi";
import { products } from "../storage";
import { useRouter } from "next/navigation";


const ROWS_PER_CLICK = 2;

interface ProductsProps {
  productsRef?: RefObject<HTMLDivElement | null>;
}

const Products: React.FC<ProductsProps> = ({ productsRef }) => {
  const router = useRouter();
  const [visibleRows, setVisibleRows] = useState(ROWS_PER_CLICK);
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
    productsRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={productsRef} className={`py-16 md:py-32 px-2 md:px-6 bg-[#BB9244]`}>
      <div className="max-w-lg md:max-w-7xl mx-auto transition-all duration-500">
        <h2 className="text-2xl md:text-3xl font-semibold text-center mb-20 md:mb-24 text-white">
          Khám phá cửa hàng trực tuyến MINH LONG
        </h2>

        {/* Animated wrapper */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{ maxHeight: gridHeight ? `${gridHeight}px` : '9999px' }}
        >
          <div
            ref={gridRef}
            className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-8 justify-center transition-opacity duration-500"
          >
            {products.slice(0, itemsToShow).map((product) => (
              <div
                key={product.id}
                className="bg-white group relative overflow-hidden rounded-lg shadow-lg hover:shadow-xl mx-auto max-w-full md:min-w-[400px] transform transition-transform duration-500"
              >
                <div 
                  onClick={() => router.push(`/products/${product.details[0].slug}`)}
                  className="flex bg-[#FFF3E5] overflow-hidden h-fit md:h-80 items-center justify-center"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    height={256}
                    width={256}
                    className="w-full h-full object-contain transition-transform duration-300 transform group-hover:scale-105 cursor-pointer select-none"
                  />
                </div>

                <div
                  onClick={() => router.push(`/products/${product.details[0].slug}`)}
                  className="p-[10px] md:p-4 bg-white cursor-pointer hover:shadow transition-shadow"
                >
                  <h3 className="px-1 text-sm md:text-2xl font-semibold text-[#0C2543] line-clamp-2 min-h-[36px] md:min-h-20 leading-normal hover:underline">
                    {product.name}
                  </h3>
                  <p className="px-2 text-[#BB9244] font-semibold py-1 md:py-4 text-base md:text-2xl">
                    {product.details[0]?.price.toLocaleString('en-US') + '₫'}
                  </p>
                  <div className="hidden md:flex md:flex-row gap-0 md:gap-2 mb-2">
                    <button
                      onClick={() => router.push(`/products/${product.details[0].slug}`)}
                      className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] p-3 md:p-4 rounded-full w-full md:w-[50%] hover:bg-[#BB9244] active:bg-[#BB9244]/70 hover:text-white active:text-white/70 transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none"
                    >
                      <FiShoppingCart size={18} />
                      <span className="font-semibold tracking-wide text-xs md:text-sm">Thêm vào giỏ hàng</span>
                    </button>
                    <button 
                      onClick={() => router.push(`/products/${product.details[0].slug}`)}
                      className="mt-2 border border-[#BB9244] bg-transparent text-[#BB9244] p-3 md:p-4 rounded-full w-full md:w-[50%] hover:bg-[#BB9244] active:bg-[#BB9244]/70 hover:text-white active:text-white/70  transition-colors flex items-center justify-center gap-x-2 md:gap-x-3 cursor-pointer select-none"
                    >
                      <FaBagShopping size={18} />
                      <span className="font-semibold tracking-wide text-xs md:text-sm">Mua ngay</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-center mt-8 md:mt-16 transition-all duration-300">
          {!isAllVisible ? (
            <button
              onClick={showMore}
              className="select-none cursor-pointer px-6 py-3 md:px-8 md:py-4 text-xs md:text-base rounded-full bg-transparent text-white font-semibold border border-white hover:bg-white hover:text-[#BB9244] active:bg-white/70 active:text-[#BB9244]/70 transition-colors tracking-wide"
            >
              Xem thêm sản phẩm
            </button>
          ) : (
            <button
              onClick={collapse}
              className="select-none cursor-pointer px-6 py-3 md:px-8 md:py-4 text-xs md:text-base rounded-full bg-transparent text-white font-semibold border border-white hover:bg-white hover:text-[#BB9244] active:bg-white/70 active:text-[#BB9244]/70 transition-colors tracking-wide"
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