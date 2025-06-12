import { useState } from "react";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { montserrat } from "@/config/fonts";

import { handleSearch } from "@/libs/searchUtils";

import SearchBar from "../SearchBar";

const MESSAGES = {
  emptyCart: "Chưa có sản phẩm trong giỏ hàng...",
  returnHome: "trang chủ",
  searchPrompt: "hoặc nhập từ khoá sản phẩm bạn cần tìm ở ô tìm kiếm này",
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
      <p className="text-sm leading-relaxed text-center text-gray-600 mb-8 w-[96%] md:w-[75%]">
        Bạn có thể quay về
        <span
          className="font-bold mx-[6px] cursor-pointer text-black hover:underline"
          onClick={() => router.push("/")}
        >
          {MESSAGES.returnHome}
        </span>
        {MESSAGES.searchPrompt}
      </p>
      <div className="flex justify-center w-full px-4 md:px-0">
        <SearchBar />
      </div>
    </div>
  );
};

export default EmptyCart;
