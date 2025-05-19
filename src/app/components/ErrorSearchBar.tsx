"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsSearchHeartFill } from "react-icons/bs";
import { IoCloseCircle } from "react-icons/io5";
import { Input } from "../ui/input";
import { handleSearch } from "../lib/utils";
import { Montserrat } from "next/font/google";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
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
          className="absolute cursor-pointer inset-y-0 left-3 flex items-center text-rose-400 hover:text-rose-600 active:text-rose-400 transition"
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
          className={`w-full font-medium pl-10 pr-4 py-2 border border-rose-300 rounded-full focus:ring-2 focus:ring-rose-400 focus:outline-none placeholder:text-rose-300 transition ${montserrat.className}`}
        />

        {query.trim().length > 0 && (
          <button
            title="Xóa tìm kiếm"
            type="button"
            onClick={() => setQuery("")}
            className="absolute cursor-pointer inset-y-0 right-3 flex items-center text-rose-400 hover:text-rose-600 active:text-rose-400 transition"
          >
            <IoCloseCircle size={18} />
          </button>
        )}
      </div>
    </form>
  );
};

export default ErrorSearchBar;
