import { useState } from "react";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { montserrat } from "@/config/fonts";

import { handleSearch } from "@/libs/searchUtils";
import { cn } from "@/libs/utils";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSearch(query, router);
    }
  };

  return (
    <div className={cn("relative w-full max-w-md", montserrat.className)}>
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
        className="w-full py-5 pl-12 pr-4 font-medium transition border rounded-md shadow-md border-neutral-300 shadow-neutral-300 focus:ring-neutral-400 focus:ring-1 focus:outline-none"
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
  );
};

export default SearchBar;
