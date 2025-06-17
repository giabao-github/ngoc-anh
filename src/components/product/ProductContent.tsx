import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { montserrat } from "@/config/fonts";

import useIsMobile from "@/hooks/useIsMobile";

import { ProductContent as ProductContentType } from "@/types/product";

interface ProductContentProps {
  content: ProductContentType;
  isLoading: boolean;
}

interface TabConfig {
  key: string;
  label: string;
  content: React.ReactNode;
}

export default function ProductContent({
  content,
  isLoading,
}: ProductContentProps) {
  const isMobile = useIsMobile();

  const tabs: TabConfig[] = [
    {
      key: "description",
      label: isMobile ? "CHI TIẾT" : "CHI TIẾT SẢN PHẨM",
      content: content.description,
    },
    {
      key: "instruction",
      label: isMobile ? "HƯỚNG DẪN" : "HƯỚNG DẪN SỬ DỤNG",
      content: content.instruction,
    },
    {
      key: "note",
      label: isMobile ? "LƯU Ý" : "LƯU Ý QUAN TRỌNG",
      content: content.note,
    },
  ].filter((tab) => tab.content !== null && tab.content !== undefined);

  if (isLoading) {
    return (
      <div className="mx-2 md:mx-0 md:pb-20" aria-busy="true" role="status">
        <div className="space-y-4 animate-pulse">
          <div className="w-1/3 h-8 bg-gray-200" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-200" />
            <div className="w-5/6 h-4 bg-gray-200" />
            <div className="w-4/6 h-4 bg-gray-200" />
          </div>
        </div>
      </div>
    );
  }

  if (tabs.length === 0) {
    return null;
  }

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
}
