import { useMemo, useRef } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

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
  const { content, isLoading, error } = useProductContent(product);
  const tabRefs = useRef<(HTMLElement | null)[]>([]);

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

  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-400">Đang tải nội dung...</div>
    );
  }

  if (error) {
    return <div className="py-8 text-center text-rose-500">{error}</div>;
  }

  if (tabs.length === 0) {
    return (
      <div className="py-8 text-center text-gray-400">
        Không có nội dung cho sản phẩm này.
      </div>
    );
  }

  return (
    <TabGroup
      className="mx-2 md:mx-0 md:pb-20"
      onChange={(index) => {
        // Scroll to the selected tab
        const selectedTab = tabRefs.current[index];
        if (selectedTab) {
          selectedTab.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "center",
          });
        }
      }}
    >
      <ScrollArea className="w-full">
        <TabList className="flex gap-x-10 pb-0 border-b border-secondary/40">
          {tabs.map((tab, index) => (
            <Tab
              key={tab.key}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              className={({ selected }) =>
                `py-3 text-sm md:text-lg font-bold uppercase cursor-pointer border-b -mb-px transition outline-none ring-0 focus:ring-0 focus:outline-none whitespace-nowrap flex-shrink-0 ${
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <TabPanels className="pt-6">
        {tabs.map((tab) => (
          <TabPanel key={tab.key} className="space-y-4 font-medium">
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </TabGroup>
  );
};

export default ProductDetails;
