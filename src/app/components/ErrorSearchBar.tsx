"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsSearchHeartFill } from "react-icons/bs";
import { Input } from "../ui/input";


const removeVietnameseTones = (str: string) => {
  return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();
};

const ErrorSearchBar = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!query.trim()) {
      return;
    }

    const slug = removeVietnameseTones(query.trim());
    router.push(`/products/${slug}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <form
      className="w-full max-w-sm mt-6"
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <div className="relative">
        {/* Icon */}
        <button
          type="submit"
          className="absolute cursor-pointer inset-y-0 left-3 flex items-center text-rose-400 hover:text-rose-600 transition"
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
          className="w-full pl-10 pr-4 py-2 border border-rose-300 rounded-full focus:ring-2 focus:ring-rose-400 focus:outline-none transition"
        />
      </div>
    </form>
  );
};

export default ErrorSearchBar;
