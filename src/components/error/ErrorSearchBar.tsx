"use client";

import { useState } from "react";
import { BsSearchHeartFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";

import { Montserrat } from "next/font/google";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { handleSearch } from "@/libs/searchUtils";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

const ErrorSearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query, router);
    }
  };

  return (
    <form
      className="w-full max-w-sm mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch(query, router);
      }}
    >
      <div className="relative">
        {/* Search icon */}
        <button
          title="Tìm kiếm"
          type="button"
          onClick={() => handleSearch(query, router)}
          className="absolute inset-y-0 flex items-center transition cursor-pointer left-3 text-rose-400 hover:text-rose-600 active:text-rose-400"
        >
          <BsSearchHeartFill size={18} />
        </button>

        {/* Input */}
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tìm sản phẩm khác..."
          className={`w-full font-medium pl-10 pr-4 py-2 bg-rose-50 border border-rose-300 shadow-md shadow-rose-300 rounded-full focus:border-rose-400 focus:outline-none placeholder:text-rose-300 transition ${montserrat.className}`}
        />

        {query.trim().length > 0 && (
          <button
            title="Xóa tìm kiếm"
            type="button"
            onClick={() => setQuery("")}
            className="absolute inset-y-0 flex items-center transition cursor-pointer right-3 text-rose-400 hover:text-rose-600 active:text-rose-400"
          >
            <IoCloseCircle size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default ErrorSearchBar;
