import { useMemo } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { montserrat } from "@/config/fonts";

import useIsMobile from "@/hooks/useIsMobile";

import { Product } from "@/app/types";

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

  const tabs = useMemo(() => {
    const tabConfigs: TabConfig[] = [];

    if ("description" in product) {
      tabConfigs.push({
        key: "description",
        label: isMobile ? "CHI TIẾT" : "CHI TIẾT SẢN PHẨM",
        content: product.description,
      });
    }

    if ("instruction" in product) {
      tabConfigs.push({
        key: "instruction",
        label: isMobile ? "HƯỚNG DẪN" : "HƯỚNG DẪN SỬ DỤNG",
        content: product.instruction,
      });
    } else {
      tabConfigs.push({
        key: "instruction",
        label: isMobile ? "HƯỚNG DẪN" : "HƯỚNG DẪN SỬ DỤNG",
        content: (
          <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
            <li>Vệ sinh bằng khăn mềm, tránh va đập mạnh.</li>
            <li>Không dùng hóa chất tẩy rửa mạnh.</li>
            <li>Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.</li>
          </ul>
        ),
      });
    }

    if ("note" in product) {
      tabConfigs.push({
        key: "note",
        label: isMobile ? "LƯU Ý" : "LƯU Ý QUAN TRỌNG",
        content: product.note,
      });
    }

    return tabConfigs;
  }, [product, isMobile]);

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
