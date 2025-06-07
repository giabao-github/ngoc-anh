import { Metadata } from "next";

import { SearchView } from "@/modules/search/views/SearchView";

export const metadata: Metadata = {
  title: "Kết quả tìm kiếm",
};

const SearchPage = () => {
  return <SearchView />;
};

export default SearchPage;
