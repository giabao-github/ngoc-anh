import { RefObject } from "react";
import { Montserrat } from "next/font/google";
import { AnimatePresence } from "framer-motion";
import InvoiceForm from "./InvoiceForm";
import { Input } from "../ui/input";


const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400","500", "600", "700", "800"]
});

interface InvoiceSectionProps {
  invoiceOpen: boolean;
  setInvoiceOpen: (value: boolean) => void;
  contentRef: RefObject<HTMLDivElement | null>;
  contentHeight: number;
};

const InvoiceSection: React.FC<InvoiceSectionProps> = ({ invoiceOpen, setInvoiceOpen, contentRef, contentHeight }) => {
  return (
    <div className="mx-2 mt-8 md:mb-16 flex items-center gap-3">
      <div className="flex flex-col gap-y-4 w-full">
        <div className="flex items-center flex-row gap-3">
          <Input
            type="checkbox"
            id="invoice"
            checked={invoiceOpen}
            onChange={() => setInvoiceOpen(!invoiceOpen)}
            className="h-4 w-4 cursor-pointer"
          />
          <label htmlFor="invoice" className={`text-sm md:text-base font-medium ${montserrat.className}`}>
            Xuất hoá đơn cho đơn hàng
          </label>
        </div>
        <AnimatePresence initial={false}>
          {invoiceOpen && <InvoiceForm contentRef={contentRef} contentHeight={contentHeight} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InvoiceSection;