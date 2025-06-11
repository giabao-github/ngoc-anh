import { useState } from "react";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { handleSearch } from "@/libs/searchUtils";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const MESSAGES = {
  emptyCart: "Chưa có sản phẩm trong giỏ hàng...",
  returnHome: "trang chủ",
  searchPrompt: "hoặc nhập từ khoá sản phẩm bạn cần tìm ở đây:",
};

const EmptyCart = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query, router);
    }
  };

  return (
    <div
      className={`flex flex-col gap-y-2 items-center justify-center pt-12 pb-24 ${montserrat.className}`}
    >
      <Image
        src="/illustrations/empty-cart.jpeg"
        alt="Empty Cart"
        width={2160}
        height={2160}
        quality={100}
        className="w-64 h-64 mb-4 rounded-full"
      />
      <p className="mb-4 text-lg font-medium">{MESSAGES.emptyCart}</p>
      <p className="text-sm md:text-center text-gray-600 mb-8 w-[96%] md:w-[75%]">
        Bạn có thể quay về
        <span
          className="font-bold mx-[6px] cursor-pointer text-black hover:underline"
          onClick={() => router.push("/")}
        >
          {MESSAGES.returnHome}
        </span>
        {MESSAGES.searchPrompt}
      </p>
      <div className="w-full max-w-md">
        <div className="relative w-full">
          {/* Search icon */}
          <button
            title="Tìm kiếm"
            type="button"
            onClick={() => handleSearch(query, router)}
            className="absolute inset-y-0 flex items-center transition cursor-pointer left-3 text-neutral-400 hover:text-black"
          >
            <IoSearch size={24} />
          </button>

          {/* Input */}
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Tìm kiếm sản phẩm..."
            aria-label="Tìm kiếm sản phẩm"
            aria-describedby="search-help"
            className="w-full py-4 pl-12 pr-4 font-medium transition border rounded-md shadow-md border-neutral-300 shadow-neutral-300 focus:ring-neutral-400 focus:ring-1 focus:outline-none"
          />

          {query.trim().length > 0 && (
            <button
              title="Xóa tìm kiếm"
              type="button"
              onClick={() => setQuery("")}
              className="absolute inset-y-0 flex items-center transition cursor-pointer right-3 text-neutral-400 hover:text-black"
            >
              <IoCloseCircle size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
