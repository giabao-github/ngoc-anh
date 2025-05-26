import { Montserrat } from "next/font/google";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

import { handleSearch } from "@/app/lib/utils";
import { Input } from "@/app/ui/input";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

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
    <div className={`flex flex-col items-center justify-center pt-12 pb-24 ${montserrat.className}`}>
    <Image
      src="https://getillustrations.b-cdn.net//packs/essential-illustrations/scenes/_1x/shopping,%20e-commerce%20_%20shopping%20cart,%20cart,%20empty,%20not%20found,%20basket,%20shop_demo.png"
      alt="Empty Cart"
      width={256}
      height={256}
      className="mb-4"
    />
    <p className="text-lg font-medium mb-4">Chưa có sản phẩm trong giỏ hàng...</p>
    <p className="text-sm md:text-center text-gray-600 mb-8 w-[96%] md:w-[75%]">
      Bạn có thể quay về 
      <span 
        className="font-bold mx-[6px] cursor-pointer text-black hover:underline" 
        onClick={() => router.push("/")}
      >
        trang chủ
      </span> 
      hoặc nhập từ khoá sản phẩm bạn cần tìm ở đây:
    </p>
    <div className="w-full max-w-md">
      <div className="relative w-full">
        {/* Search icon */}
        <button
          title="Tìm kiếm"
          type="button"
          onClick={() => handleSearch(query, router)}
          className="absolute cursor-pointer inset-y-0 left-3 flex items-center text-neutral-400 hover:text-black transition"
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
          className="w-full font-medium pl-12 pr-4 py-4 border border-neutral-300 rounded-md shadow-md shadow-neutral-300 focus:border-neutral-400 focus:outline-none transition"
        />

        {query.trim().length > 0 && (
          <button
            title="Xóa tìm kiếm"
            type="button"
            onClick={() => setQuery("")}
            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-neutral-400 hover:text-black transition"
          >
            <IoCloseCircle size={18} />
          </button>
        )}
      </div>
    </div>
  </div>
  );
}

export default EmptyCart;