import { RefObject, useEffect, useMemo, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { InvoiceInput } from "@/components/cart/InvoiceInput";
import { SelectDropdown } from "@/components/cart/SelectDropdown";

import { montserrat } from "@/config/fonts";

import { ToastIds } from "@/constants/toastIds";

import { useAddressData } from "@/hooks/useAddressData";

import { cn } from "@/libs/utils";

import { invoiceFormSchema } from "@/app/schemas";
import { InvoiceFormData } from "@/types/invoice";

interface InvoiceFormProps {
  contentRef: RefObject<HTMLFormElement | null>;
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

  const [formHeight, setFormHeight] = useState(contentHeight);
  const [firstTouch, setFirstTouch] = useState(false);

  const form = useForm<InvoiceFormData>({
    resolver: zodResolver(invoiceFormSchema),
    mode: "onChange",
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
  const { errors } = form.formState;

  const shouldShowPreview =
    watchedValues.streetAddress?.trim() ||
    watchedValues.province ||
    watchedValues.district ||
    watchedValues.ward;

  // Calculate number of error rows and adjust form height
  const errorRows = useMemo(() => {
    let rows = 0;

    // Row 1: Company Name
    if (errors.companyName) {
      rows++;
    }

    // Row 2: Email and Tax Code (same row)
    if (errors.email || errors.taxCode) {
      rows++;
    }

    // Row 3: Province, District, Ward (same row)
    if (errors.province || errors.district || errors.ward) {
      rows++;
    }

    // Row 4: Street Address
    if (errors.streetAddress) {
      rows++;
    }

    // Row 5: Address Preview
    if (shouldShowPreview) {
      rows++;
    }

    return rows;
  }, [errors, shouldShowPreview]);

  // Update form height based on error rows
  useEffect(() => {
    const newHeight = contentHeight * (1 + errorRows * 0.1);
    setFormHeight(newHeight);
  }, [contentHeight, errorRows]);

  useEffect(() => {
    fetchProvinces();
    form.setValue("province", "");
  }, [fetchProvinces]);

  useEffect(() => {
    if (watchedValues.province) {
      setFirstTouch(true);
    }
  }, [watchedValues.province]);

  useEffect(() => {
    if (watchedValues.province) {
      fetchDistricts(watchedValues.province);
      form.setValue("district", "");
      form.setValue("ward", "");
      form.trigger(["district", "ward"]);
    } else {
      setAddressData((prev) => ({
        ...prev,
        districts: [],
        wards: [],
      }));
      if (firstTouch) {
        form.setValue("district", "");
        form.setValue("ward", "");
        form.trigger(["province", "district", "ward"]);
      }
    }
  }, [watchedValues.province, fetchDistricts, form, setAddressData]);

  useEffect(() => {
    if (watchedValues.district) {
      fetchWards(watchedValues.district);
      form.setValue("ward", "");
      if (firstTouch) {
        form.trigger("ward");
      }
    } else {
      setAddressData((prev) => ({ ...prev, wards: [] }));
      form.setValue("ward", "");
      if (firstTouch) {
        form.trigger(["district", "ward"]);
      }
    }
  }, [watchedValues.district, fetchWards, form, setAddressData]);

  const { fullAddress, previewLimit } = useMemo(() => {
    let limit = 100;
    const parts: string[] = [];
    if (watchedValues.streetAddress?.trim()) {
      parts.push(watchedValues.streetAddress.trim());
    }
    if (watchedValues.ward) {
      const wardName = addressData.wards.find(
        (w) => String(w.code) === watchedValues.ward,
      )?.name;
      if (wardName) {
        parts.push(wardName);
        limit += wardName.length + 2;
      }
    }
    if (watchedValues.district) {
      const districtName = addressData.districts.find(
        (d) => String(d.code) === watchedValues.district,
      )?.name;
      if (districtName) {
        parts.push(districtName);
        limit += districtName.length + 2;
      }
    }
    if (watchedValues.province) {
      const provinceName = addressData.provinces.find(
        (p) => String(p.code) === watchedValues.province,
      )?.name;
      if (provinceName) {
        parts.push(provinceName);
        limit += provinceName.length + 2;
      }
    }
    return { fullAddress: parts.join(", "), previewLimit: limit };
  }, [watchedValues, addressData]);

  const onSubmit = () => {
    toast.success("Đã lưu thông tin", {
      description: "Thông tin hóa đơn của bạn đã được lưu thành công",
      id: ToastIds.SAVE_INVOICE_SUCCESS,
    });
  };

  const onInvalid = (errors: FieldErrors<InvoiceFormData>) => {
    const errorMessages = Object.values(errors)
      .map((e) => (e?.message as string) ?? "")
      .filter(Boolean);

    toast.error("Có lỗi trong biểu mẫu", {
      description:
        errorMessages.length > 1
          ? "Vui lòng kiểm tra các trường thông tin"
          : errorMessages[0],
      id: ToastIds.INVOICE_FORM_ERROR,
    });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: formHeight, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      style={{ minHeight: formHeight }}
    >
      <form
        ref={contentRef}
        onSubmit={form.handleSubmit(onSubmit, onInvalid)}
        className="flex flex-col pb-4 font-medium gap-y-2"
        style={{ height: "100%" }}
      >
        {/* Company Name */}
        <InvoiceInput
          name="companyName"
          form={form}
          sanitizeLevel="name"
          placeholder="Tên công ty"
          font={montserrat}
          className="relative"
        />

        {/* Email and Tax Code */}
        <div className="flex flex-row gap-x-2">
          <InvoiceInput
            name="email"
            form={form}
            sanitizeLevel="email"
            placeholder="Email"
            font={montserrat}
            className="flex flex-col w-[61%] md:w-[70%]"
          />
          <InvoiceInput
            name="taxCode"
            form={form}
            sanitizeLevel="taxCode"
            maxLength={14}
            placeholder="Mã số thuế"
            font={montserrat}
            className="flex flex-col w-[39%] md:w-[30%]"
          />
        </div>

        {/* Address Selection */}
        <div className="space-y-2">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            <SelectDropdown
              name="province"
              title="Tỉnh/Thành phố"
              form={form}
              options={addressData.provinces.map((p) => ({
                code: p.code,
                name: p.name,
              }))}
              placeholder="Chọn tỉnh/thành phố"
              loading={addressData.loading.provinces}
              font={montserrat}
            />
            <SelectDropdown
              name="district"
              title="Quận/Huyện"
              form={form}
              options={addressData.districts.map((p) => ({
                code: p.code,
                name: p.name,
              }))}
              placeholder="Chọn quận/huyện"
              disabled={!watchedValues.province}
              font={montserrat}
            />
            <SelectDropdown
              name="ward"
              title="Phường/Xã"
              form={form}
              options={addressData.wards.map((p) => ({
                code: p.code,
                name: p.name,
              }))}
              placeholder="Chọn phường/xã"
              disabled={!watchedValues.district}
              font={montserrat}
            />
          </div>

          {/* Street Address */}
          <InvoiceInput
            name="streetAddress"
            form={form}
            sanitizeLevel="address"
            placeholder="Số nhà, tên đường (ví dụ: 198 Lê Lợi)"
            font={montserrat}
            className="relative"
          />

          {/* Address Preview */}
          {shouldShowPreview && (
            <div
              className={cn(
                "p-3 space-x-1.5 text-sm text-gray-700 border border-blue-200 rounded-md bg-blue-50",
                montserrat.className,
              )}
            >
              <span className="font-semibold text-blue-700">
                Địa chỉ đầy đủ:
              </span>
              <span className="text-gray-800">
                {fullAddress.length > previewLimit
                  ? fullAddress.slice(0, previewLimit) + "..."
                  : fullAddress || "Vui lòng điền đầy đủ thông tin địa chỉ"}
              </span>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="px-6 py-3 font-semibold tracking-wide text-white transition-colors rounded-full cursor-pointer select-none w-fit bg-primary hover:bg-primary/80 active:bg-primary/60"
          >
            Lưu thông tin
          </button>
        </div>
      </form>
    </motion.div>
  );
};
