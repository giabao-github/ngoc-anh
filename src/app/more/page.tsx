import { Metadata } from "next";

import { MoreView } from "@/modules/more/views/MoreView";

export const metadata: Metadata = {
  title: "Thạch Âm - Khi văn hóa trở thành hơi thở",
};

const MorePage = () => {
  return <MoreView />;
};

export default MorePage;
