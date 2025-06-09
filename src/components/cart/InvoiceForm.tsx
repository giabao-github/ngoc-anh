import { RefObject, useState } from "react";

import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { toast } from "sonner";

import TaxCodeInput from "@/components/cart/TaxCodeInput";
import { Input } from "@/components/ui/input";
import EmailInput from "@/components/user/EmailInput";

import {
  sanitizeInput,
  sanitizeInputOnBlur,
  sanitizeInputWithLevel,
} from "@/libs/textUtils";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface InvoiceFormProps {
  contentRef: RefObject<HTMLDivElement | null>;
  contentHeight: number;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
  contentRef,
  contentHeight,
}) => {
  const [formState, setFormState] = useState({
    companyName: "",
    email: "",
    taxCode: "",
    address: "",
    emailError: "",
    taxCodeError: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const saveForm = () => {
    if (formState.companyName.trim().length === 0) {
      toast.error("Vui lòng nhập tên công ty", {
        description: "Tên công ty không được bỏ trống",
      });
    } else if (formState.companyName.trim().length < 3) {
      toast.error("Tên công ty quá ngắn", {
        description: "Tên công ty phải chứa ít nhất 3 ký tự",
      });
    } else if (formState.email.trim().length === 0) {
      toast.error("Vui lòng nhập email", {
        description: "Email không được bỏ trống",
      });
    } else if (formState.emailError.length > 0) {
      toast.error("Địa chỉ email không hợp lệ", {
        description: "Vui lòng nhập đúng định dạng email",
      });
    } else if (formState.taxCode.trim().length === 0) {
      toast.error("Vui lòng nhập mã số thuế", {
        description: "Mã số thuế không được bỏ trống",
      });
    } else if (formState.taxCodeError.length > 0) {
      toast.error("Mã số thuế không hợp lệ", {
        description: "Mã số thuế chỉ chứa 10 hoặc 13 chữ số",
      });
    } else if (formState.address.trim().length === 0) {
      toast.error("Vui lòng nhập địa chỉ công ty", {
        description: "Địa chỉ công ty không được bỏ trống",
      });
    } else if (formState.address.trim().length < 11) {
      toast.error("Địa chỉ công ty quá ngắn", {
        description: "Vui lòng nhập đầy đủ địa chỉ công ty",
      });
    } else {
      toast.success("Đã lưu thông tin", {
        description: "Thông tin đơn hàng của bạn đã được lưu",
      });
    }
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: contentHeight || "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="overflow-hidden"
    >
      <div ref={contentRef} className="flex flex-col font-medium gap-y-2">
        <Input
          type="text"
          placeholder="Tên công ty"
          value={sanitizeInputWithLevel(formState.companyName, "name")}
          onChange={(e) => handleChange("companyName", e.target.value)}
          onBlur={(e) =>
            handleChange("companyName", sanitizeInputOnBlur(e.target.value))
          }
          className={`w-full text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
        />
        <div className="flex flex-row gap-x-2">
          <EmailInput
            email={formState.email}
            setEmail={(value) => handleChange("email", value)}
            emailError={formState.emailError}
            setEmailError={(value) => handleChange("emailError", value)}
          />
          <TaxCodeInput
            taxCode={formState.taxCode}
            setTaxCode={(value) => handleChange("taxCode", value)}
            taxCodeError={formState.taxCodeError}
            setTaxCodeError={(value) => handleChange("taxCodeError", value)}
          />
        </div>
        <Input
          type="text"
          placeholder="Địa chỉ công ty"
          value={sanitizeInputWithLevel(formState.address, "moderate")}
          onChange={(e) => handleChange("address", e.target.value)}
          onBlur={(e) =>
            handleChange("address", sanitizeInputOnBlur(e.target.value))
          }
          className={`w-full text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
        />
        <button
          onClick={saveForm}
          className="px-6 py-3 mt-4 font-semibold tracking-wide text-white rounded-full cursor-pointer select-none w-fit bg-primary hover:bg-primary/80 active:bg-primary/60"
        >
          Lưu thông tin
        </button>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;
