"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, LucideCheckCircle2, MailIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { authClient } from "@/lib/auth-client";

import { cn } from "@/utils/styleUtils";
import { sanitizeInputOnBlur } from "@/utils/textUtils";

import { recoverySchema } from "@/app/schemas";

export const RecoveryGridView = () => {
  const [pending, setPending] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<z.infer<typeof recoverySchema>>({
    resolver: zodResolver(recoverySchema),
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const fieldNames = ["email"] as const;
  const watchedValues = useWatch({ control: form.control });
  const watchedErrors = form.formState.errors;

  const emptyFields = fieldNames.filter((f) => !watchedValues[f]);
  const hasAnyError = Object.keys(form.formState.errors).length > 0;
  let submitButtonText = "Gửi yêu cầu";
  const isButtonDisabled =
    pending || hasAnyError || emptyFields.length > 0 || isSuccess;

  if (pending) {
    submitButtonText = "Đang xử lý...";
  } else if (isSuccess) {
    submitButtonText = "Email đã được gửi";
  } else if (!isButtonDisabled) {
    submitButtonText = "Gửi yêu cầu";
  } else if (watchedErrors.email) {
    submitButtonText = watchedErrors.email.message || "Email không hợp lệ";
  } else if (emptyFields.length > 0) {
    submitButtonText = "Vui lòng nhập email của bạn";
  }

  const onSubmit = async (data: z.infer<typeof recoverySchema>) => {
    setPending(true);
    form.clearErrors();

    try {
      // @ts-ignore - this is the placeholder feature, the real implementation will be updated soon
      toast.success("Yêu cầu đã được gửi", {
        description:
          "Nếu email của bạn tồn tại trong hệ thống, bạn sẽ nhận được một liên kết để khôi phục mật khẩu.",
      });
      setIsSuccess(true);
    } catch (error) {
      toast.error("Gửi yêu cầu thất bại", {
        description: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
      });
    } finally {
      setPending(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="flex flex-col col-span-1 justify-center items-center p-6 h-full text-center md:col-span-3 md:p-8">
        <div className="flex flex-col gap-y-6 items-center w-full md:px-8 md:gap-y-8">
          <div className="p-3 mb-1 bg-green-100 rounded-full shadow-lg md:p-4 dark:bg-green-900/50">
            <CheckCircle2 className="w-10 h-10 text-green-600 md:h-12 md:w-12 dark:text-green-400" />
          </div>
          <div className="flex flex-col gap-y-4 w-full md:gap-y-6">
            <h1 className="text-xl font-bold md:text-2xl text-secondary md:text-gray-900">
              Kiểm tra hộp thư của bạn
            </h1>
            <div className="flex flex-col gap-y-1 w-full md:gap-y-2">
              <p className="text-sm whitespace-nowrap md:text-base text-secondary/80 md:text-gray-600">
                Nếu email hợp lệ, bạn sẽ nhận được liên kết khôi phục.
              </p>
              <p className="mt-1 text-sm whitespace-nowrap md:text-base text-secondary/80 md:text-gray-600">
                Đừng quên kiểm tra cả hộp thư rác (spam).
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-4 mt-2 w-full">
            <Button
              size="lg"
              className="flex gap-x-2 justify-center items-center w-full h-11 text-base font-semibold text-white bg-green-600 shadow-md transition-all hover:bg-green-600 group"
              onClick={() => (window.location.href = "/login")}
            >
              <LucideCheckCircle2 className="w-[18px] h-[18px] group-hover:scale-[1.2]" />
              Quay lại đăng nhập
            </Button>
            <Button
              size="lg"
              className="flex gap-x-2 justify-center items-center w-full h-11 text-base font-semibold shadow-md transition-all text-primary bg-secondary hover:bg-secondary group"
              onClick={() => setIsSuccess(false)}
            >
              <FaArrowLeftLong className="w-4 h-4 group-hover:transform group-hover:-translate-x-1" />
              Gửi lại yêu cầu khác
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-1 p-6 md:col-span-3 md:p-8"
      >
        <div className="flex flex-col gap-y-8 md:gap-y-6">
          <div className="flex flex-col gap-y-2 items-center mb-2 text-center md:mb-3">
            <h1 className="text-xl font-bold md:text-2xl text-secondary md:text-gray-900">
              Khôi phục mật khẩu
            </h1>
            <p className="text-xs md:text-sm text-secondary/80 md:text-gray-600">
              Nhập email để lấy lại mật khẩu của bạn
            </p>
          </div>

          <FormField
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <FormItem className="space-y-1">
                <FormLabel className="text-[15px] md:text-sm font-semibold text-secondary/90 md:text-gray-700">
                  Địa chỉ email *:
                </FormLabel>
                <FormControl>
                  <div className="relative group">
                    <MailIcon className="absolute left-3 top-1/2 w-4 h-4 transition-colors transform -translate-y-1/2 text-secondary/50 md:text-gray-400 group-focus-within:text-secondary md:group-focus-within:text-primary" />
                    <Input
                      key={inputKey}
                      type="email"
                      placeholder="thacham@gmail.com"
                      {...field}
                      className={cn(
                        "pl-10 h-10 border-2 transition-all duration-300 font-medium text-sm placeholder:text-secondary/50 md:placeholder:text-gray-400 bg-white/5 border-white/20 text-secondary focus:shadow-primary/10 md:bg-transparent md:text-gray-900",
                        fieldState.error
                          ? "border-red-400/50 focus:border-red-400 md:focus:border-red-500 md:shadow-red-100"
                          : "focus:border-white/50 hover:border-white/30 md:border-gray-300 md:hover:border-gray-400/70 md:focus:border-primary/50",
                      )}
                      onBlur={() => {
                        const sanitized = sanitizeInputOnBlur(
                          field.value,
                          "email",
                        );
                        if (sanitized !== field.value) {
                          field.onChange(sanitized);
                        }
                        setInputKey((prev) => prev + 1);
                        field.onBlur();
                      }}
                    />
                  </div>
                </FormControl>
                <div className="leading-tight min-h-4">
                  {fieldState.error && (
                    <p className="text-xs text-red-400/90 md:text-red-600">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              </FormItem>
            )}
          />

          <Button
            disabled={isButtonDisabled}
            type="submit"
            className="w-full mt-3 md:mt-4 h-10 text-sm font-semibold transition duration-200 bg-secondary text-primary hover:bg-secondary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none group"
          >
            {pending ? (
              <span className="flex gap-x-2 items-center">
                <span className="w-4 h-4 rounded-full border-2 animate-spin border-primary/20 border-t-primary" />
                {submitButtonText}
              </span>
            ) : isButtonDisabled ? (
              <span className="flex gap-x-2 items-center">
                <IoWarningOutline />
                {submitButtonText}
              </span>
            ) : (
              <span className="flex gap-x-2 items-center">
                {submitButtonText}
                <FaArrowRightLong className="group-hover:transform group-hover:translate-x-1 group-active:transform group-active:translate-x-1" />
              </span>
            )}
          </Button>

          <div className="text-sm text-center text-secondary/80 md:text-gray-600">
            Quay lại{" "}
            <Link
              href="/login"
              className="font-semibold transition-all duration-200 text-secondary md:text-primary hover:text-secondary/80 md:hover:text-primary/80 hover:underline"
            >
              đăng nhập
            </Link>{" "}
            hoặc{" "}
            <Link
              href="/register"
              className="font-semibold transition-all duration-200 text-secondary md:text-primary hover:text-secondary/80 md:hover:text-primary/80 hover:underline"
            >
              đăng ký
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
