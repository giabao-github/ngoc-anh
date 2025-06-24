import { useState } from "react";
import { IoCloseCircle, IoSearch } from "react-icons/io5";

import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";

import { handleSearch } from "@/utils/searchUtils";

const SearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleSearch(query, router);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="relative w-full max-w-md"
    >
      {/* Search icon */}
      <button
        title="Tìm kiếm"
        type="submit"
        className="flex absolute inset-y-0 left-3 items-center transition cursor-pointer text-neutral-400 hover:text-black"
      >
        <IoSearch size={24} />
      </button>

      {/* Input */}
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Tìm kiếm sản phẩm..."
        aria-label="Tìm kiếm sản phẩm"
        aria-describedby="search-help"
        className="py-5 pr-4 pl-12 w-full font-semibold rounded-md border shadow-md transition border-neutral-300 shadow-neutral-300 focus:ring-neutral-400 focus:ring-1 focus:outline-none placeholder:font-semibold"
      />

      {query.trim().length > 0 && (
        <button
          title="Xóa tìm kiếm"
          type="button"
          onClick={() => setQuery("")}
          className="flex absolute inset-y-0 right-3 items-center transition cursor-pointer text-neutral-400 hover:text-black"
        >
          <IoCloseCircle size={18} />
        </button>
      )}
    </form>
  );
};

export default SearchBar;
