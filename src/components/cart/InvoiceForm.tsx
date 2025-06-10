import { RefObject, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { Montserrat } from "next/font/google";
import { toast } from "sonner";

import TaxCodeInput from "@/components/cart/TaxCodeInput";
import { Input } from "@/components/ui/input";
import EmailInput from "@/components/user/EmailInput";

import { useAddressData } from "@/hooks/useAddressData";

import { invoiceFormSchema } from "@/app/schemas";
import { InvoiceFormData } from "@/app/types";
import { sanitizeInputOnBlur, sanitizeInputWithLevel } from "@/libs/textUtils";

import { SelectDropdown } from "./SelectDropdown";

const montserrat = Montserrat({
  subsets: ["cyrillic", "latin", "vietnamese"],
  weight: ["200", "400", "500", "600", "700", "800"],
});

interface InvoiceFormProps {
  contentRef: RefObject<HTMLDivElement | null>;
  contentHeight: number;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({
  contentRef,
  contentHeight,
}) => {
  const {
    addressData,
    setAddressData,
    fetchProvinces,
    fetchDistricts,
    fetchWards,
  } = useAddressData();

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    defaultValues: {
      companyName: "",
      email: "",
      taxCode: "",
      province: "",
      district: "",
      ward: "",
      streetAddress: "",
    },
  });

  const watchedValues = form.watch();

  // Fetch provinces on mount
  useEffect(() => {
    fetchProvinces();
  }, [fetchProvinces]);

  // Fetch districts when province changes
  useEffect(() => {
    if (watchedValues.province) {
      fetchDistricts(watchedValues.province);
      // Reset dependent fields
      form.setValue("district", "");
      form.setValue("ward", "");
    } else {
      // Clear districts and wards when no province is selected
      setAddressData((prev) => ({ ...prev, districts: [], wards: [] }));
    }
  }, [watchedValues.province, fetchDistricts, form, setAddressData]);

  // Fetch wards when district changes
  useEffect(() => {
    if (watchedValues.district) {
      fetchWards(watchedValues.district);
      // Reset dependent field
      form.setValue("ward", "");
    } else {
      // Clear wards when no district is selected
      setAddressData((prev) => ({ ...prev, wards: [] }));
    }
  }, [watchedValues.district, fetchWards, form, setAddressData]);

  // Memoized full address
  const fullAddress = useMemo(() => {
    const parts = [];

    if (watchedValues.streetAddress?.trim()) {
      parts.push(watchedValues.streetAddress.trim());
    }

    if (watchedValues.ward) {
      const wardName = addressData.wards.find(
        (w) => String(w.code) === watchedValues.ward,
      )?.name;
      if (wardName) parts.push(wardName);
    }

    if (watchedValues.district) {
      const districtName = addressData.districts.find(
        (d) => String(d.code) === watchedValues.district,
      )?.name;
      if (districtName) parts.push(districtName);
    }

    if (watchedValues.province) {
      const provinceName = addressData.provinces.find(
        (p) => String(p.code) === watchedValues.province,
      )?.name;
      if (provinceName) parts.push(provinceName);
    }

    return parts.join(", ");
  }, [watchedValues, addressData]);

  const onSubmit = (data: InvoiceFormData) => {
    if (data.companyName.trim().length === 0) {
      toast.error("Vui lòng nhập tên công ty", {
        description: "Tên công ty không được bỏ trống",
      });
    } else if (data.companyName.trim().length < 3) {
      toast.error("Tên công ty quá ngắn", {
        description: "Tên công ty phải chứa ít nhất 3 ký tự",
      });
    } else if (data.email.trim().length === 0) {
      toast.error("Vui lòng nhập email", {
        description: "Email không được bỏ trống",
      });
    } else if (!data.province) {
      toast.error("Vui lòng chọn tỉnh/thành phố", {
        description: "Tỉnh/thành phố không được bỏ trống",
      });
    } else if (!data.district) {
      toast.error("Vui lòng chọn quận/huyện", {
        description: "Quận/huyện không được bỏ trống",
      });
    } else if (!data.ward) {
      toast.error("Vui lòng chọn phường/xã", {
        description: "Phường/xã không được bỏ trống",
      });
    } else if (data.streetAddress.trim().length === 0) {
      toast.error("Vui lòng nhập địa chỉ cụ thể", {
        description: "Số nhà, tên đường không được bỏ trống",
      });
    } else {
      toast.success("Đã lưu thông tin", {
        description: `Địa chỉ: ${fullAddress}`,
      });
    }
  };

  // Check if we should show the address preview
  const shouldShowPreview =
    watchedValues.streetAddress?.trim() ||
    watchedValues.province ||
    watchedValues.district ||
    watchedValues.ward;

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: contentHeight || "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="overflow-visible"
    >
      <div ref={contentRef} className="flex flex-col pb-4 font-medium gap-y-2">
        <Input
          type="text"
          placeholder="Tên công ty"
          value={sanitizeInputWithLevel(watchedValues.companyName, "name")}
          onChange={(e) => form.setValue("companyName", e.target.value)}
          onBlur={(e) =>
            form.setValue("companyName", sanitizeInputOnBlur(e.target.value))
          }
          className={`w-full text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
        />
        <div className="flex flex-row gap-x-2">
          <EmailInput
            email={watchedValues.email}
            setEmail={(value) => form.setValue("email", value)}
            emailError={form.formState.errors.email?.message}
            setEmailError={() => {}}
          />
          <TaxCodeInput
            taxCode={watchedValues.taxCode}
            setTaxCode={(value) => form.setValue("taxCode", value)}
            taxCodeError={form.formState.errors.taxCode?.message}
            setTaxCodeError={() => {}}
          />
        </div>
        {/* Address Selection */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <SelectDropdown
              value={watchedValues.province}
              onChange={(value) => form.setValue("province", value)}
              options={addressData.provinces.map((p) => ({
                code: p.code,
                name: p.name,
              }))}
              placeholder="Chọn tỉnh/thành phố"
              loading={addressData.loading.provinces}
              font={montserrat}
            />
            <SelectDropdown
              value={watchedValues.district}
              onChange={(value) => form.setValue("district", value)}
              options={addressData.districts.map((d) => ({
                code: d.code,
                name: d.name,
              }))}
              placeholder="Chọn quận/huyện"
              disabled={!watchedValues.province}
              font={montserrat}
            />
            <SelectDropdown
              value={watchedValues.ward}
              onChange={(value) => form.setValue("ward", value)}
              options={addressData.wards.map((w) => ({
                code: w.code,
                name: w.name,
              }))}
              placeholder="Chọn phường/xã"
              disabled={!watchedValues.district}
              font={montserrat}
            />
          </div>

          <Input
            type="text"
            placeholder="Số nhà, tên đường (ví dụ: 198 Cách Mạng Tháng Tám)"
            value={sanitizeInputWithLevel(
              watchedValues.streetAddress,
              "address",
            )}
            onChange={(e) => form.setValue("streetAddress", e.target.value)}
            onBlur={(e) =>
              form.setValue(
                "streetAddress",
                sanitizeInputOnBlur(e.target.value),
              )
            }
            className={`w-full text-sm md:text-base bg-neutral-100 border border-gray-300 focus:border-black rounded md:tracking-wide ${montserrat.className}`}
          />

          {/* Preview of full address */}
          {shouldShowPreview && (
            <div className="p-3 text-sm text-gray-700 border border-blue-200 rounded-md bg-blue-50">
              <span className="font-semibold text-blue-800">
                Địa chỉ đầy đủ:{" "}
              </span>
              <span className="text-gray-800">
                {fullAddress || "Vui lòng điền đầy đủ thông tin địa chỉ"}
              </span>
            </div>
          )}
        </div>
        {/* Submit button with proper spacing */}
        <div className="pt-4">
          <button
            onClick={form.handleSubmit(onSubmit)}
            className="px-6 py-3 font-semibold tracking-wide text-white transition-colors rounded-full cursor-pointer select-none w-fit bg-primary hover:bg-primary/80 active:bg-primary/60"
          >
            Lưu thông tin
          </button>
        </div>
      </div>
    </motion.div>
  );
};
