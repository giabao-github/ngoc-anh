import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Montserrat } from "next/font/google";

import { Product } from "@/app/types";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <TabGroup className="mx-2 md:mx-0">
      <TabList className="flex border-b border-secondary/40 gap-x-10">
        {["CHI TIẾT SẢN PHẨM", "HƯỚNG DẪN SỬ DỤNG"].map((tab) => (
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
        <TabPanel className="space-y-4">{product.description || ""}</TabPanel>

        {/* Tab 2 - Usage Instructions */}
        <TabPanel className="space-y-4">
          {product.instruction || (
            <ul className="list-disc list-inside text-gray-700 space-y-1 text-sm">
              <li>Vệ sinh bằng khăn mềm, tránh va đập mạnh.</li>
              <li>Không dùng hóa chất tẩy rửa mạnh.</li>
              <li>Trưng bày nơi khô ráo, tránh ánh nắng trực tiếp.</li>
            </ul>
          )}
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
};

export default ProductDetails;
