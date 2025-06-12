import { useEffect, useMemo } from "react";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { montserrat } from "@/config/fonts";

import useIsMobile from "@/hooks/useIsMobile";

import { Product } from "@/app/types";

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const isMobile = useIsMobile();

  const tabs = useMemo(() => {
    const initialTabs: string[] = [];

    if ("description" in product) {
      const tabName = isMobile ? "CHI TIẾT" : "CHI TIẾT SẢN PHẨM";
      initialTabs.push(tabName);
    }
    if ("instruction" in product) {
      const tabName = isMobile ? "HƯỚNG DẪN" : "HƯỚNG DẪN SỬ DỤNG";
      initialTabs.push(tabName);
    }
    if ("note" in product) {
      const tabName = isMobile ? "LƯU Ý" : "LƯU Ý QUAN TRỌNG";
      initialTabs.push(tabName);
    }

    return initialTabs;
  }, [product, isMobile]);

  return (
    <TabGroup className="mx-2 md:mx-0 md:pb-20">
      <TabList className="flex border-b border-secondary/40 gap-x-10">
        {tabs.map((tab) => (
          <Tab
            key={tab}
            className={({ selected }) =>
              `py-3 text-sm md:text-lg font-semibold uppercase tracking-wide cursor-pointer border-b -mb-px transition outline-none ring-0 focus:ring-0 focus:outline-none ${
                selected
                  ? "border-secondary text-black"
                  : "border-transparent text-gray-400 hover:border-secondary hover:text-black"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </TabList>

      <TabPanels className={`pt-6 ${montserrat.className}`}>
        {/* Tab 1 - Product Details */}
        {"description" in product && (
          <TabPanel className="space-y-4">{product.description}</TabPanel>
        )}

        {/* Tab 2 - Usage Instructions */}
        <TabPanel className="space-y-4">
          {product.instruction || (
            <ul className="space-y-1 text-sm text-gray-700 list-disc list-inside">
              <li>Vệ sinh bằng khăn mềm, tránh va đập mạnh.</li>
              <li>Không dùng hóa chất tẩy rửa mạnh.</li>
              <li>Bảo quản nơi khô ráo, tránh ánh nắng trực tiếp.</li>
            </ul>
          )}
        </TabPanel>

        {/* Tab 3 - Important Notes */}
        {"note" in product && (
          <TabPanel className="space-y-4">{product.note}</TabPanel>
        )}
      </TabPanels>
    </TabGroup>
  );
};

export default ProductDetails;
