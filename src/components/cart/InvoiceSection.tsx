import { RefObject } from "react";

import { AnimatePresence } from "framer-motion";
import { Montserrat } from "next/font/google";

import InvoiceForm from "@/components/cart/InvoiceForm";
import { Input } from "@/components/ui/input";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface InvoiceSectionProps {
  invoiceOpen: boolean;
  setInvoiceOpen: (value: boolean) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  contentHeight: number;
}

const InvoiceSection: React.FC<InvoiceSectionProps> = ({
  invoiceOpen,
  setInvoiceOpen,
  contentRef,
  contentHeight,
}) => {
  return (
    <div className="flex items-center gap-3 mx-2 mt-8 md:mb-16">
      <div className="flex flex-col w-full gap-y-4">
        <div className="flex flex-row items-center gap-2 md:gap-3">
          <Input
            type="checkbox"
            id="invoice"
            checked={invoiceOpen}
            onChange={() => setInvoiceOpen(!invoiceOpen)}
            className="w-4 h-4 cursor-pointer"
          />
          <label
            htmlFor="invoice"
            className={`text-sm md:text-base font-medium ${montserrat.className}`}
          >
            Xuất hoá đơn cho đơn hàng
          </label>
        </div>
        <AnimatePresence initial={false}>
          {invoiceOpen && (
            <InvoiceForm
              contentRef={contentRef}
              contentHeight={contentHeight}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InvoiceSection;
