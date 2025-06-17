import { useMemo } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { montserrat } from "@/config/fonts";

import useIsMobile from "@/hooks/useIsMobile";
import { useProductContent } from "@/hooks/useProductContent";

import { Product } from "@/types/product";

interface ProductDetailsProps {
  product: Product;
}

interface TabConfig {
  key: string;
  label: string;
  content: React.ReactNode;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const isMobile = useIsMobile();
  const content = useProductContent(product);

  const tabs = useMemo(() => {
    const tabConfigs: TabConfig[] = [];

    if (content.description) {
      tabConfigs.push({
        key: "description",
        label: isMobile ? "CHI TIẾT" : "CHI TIẾT SẢN PHẨM",
        content: content.description,
      });
    }

    if (content.instruction) {
      tabConfigs.push({
        key: "instruction",
        label: isMobile ? "HƯỚNG DẪN" : "HƯỚNG DẪN SỬ DỤNG",
        content: content.instruction,
      });
    }

    if (content.note) {
      tabConfigs.push({
        key: "note",
        label: isMobile ? "LƯU Ý" : "LƯU Ý QUAN TRỌNG",
        content: content.note,
      });
    }

    return tabConfigs;
  }, [content, isMobile]);

  return (
    <TabGroup className="mx-2 md:mx-0 md:pb-20">
      <TabList className="flex border-b border-secondary/40 gap-x-10">
        {tabs.map((tab) => (
          <Tab
            key={tab.key}
            className={({ selected }) =>
              `py-3 text-sm md:text-lg font-semibold uppercase tracking-wide cursor-pointer border-b -mb-px transition outline-none ring-0 focus:ring-0 focus:outline-none ${
                selected
                  ? "border-secondary text-black"
                  : "border-transparent text-gray-400 hover:border-secondary hover:text-black"
              }`
            }
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      <TabPanels className={`pt-6 ${montserrat.className}`}>
        {tabs.map((tab) => (
          <TabPanel key={tab.key} className="space-y-4">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default ProductDetails;
