"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong } from "react-icons/fa6";
import { IoWarningOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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

import { useChangePasswordForm } from "@/hooks/useChangePasswordForm";

import {
  changePassword,
  testNewPassword,
} from "@/lib/actions/password-actions";
import { updateUserPassword } from "@/lib/actions/user-actions";

import { cn } from "@/utils/styleUtils";

import { changePasswordClientSchema } from "@/app/schemas";

type ChangePasswordForm = z.infer<typeof changePasswordClientSchema>;

interface ChangePasswordGridViewProps {
  email: string;
}

export const ChangePasswordGridView = ({
  email,
}: ChangePasswordGridViewProps) => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordClientSchema),
    mode: "onChange",
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { submitButtonText, isButtonDisabled } = useChangePasswordForm(
    form,
    pending,
  );

  const onSubmit = async (data: ChangePasswordForm) => {
    setPending(true);

    const formData = new FormData();
    Object.entries({ ...data, email: email || "" }).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const check = await testNewPassword(email || "", data.newPassword);

      if (!check.success) {
        toast.error(check.error);
        return;
      }

      const res = await changePassword(formData);

      if (res.success) {
        toast.success("Đổi mật khẩu thành công", {
          description:
            "Các phiên đăng nhập đã được đăng xuất, hãy đăng nhập lại để tiếp tục",
        });

        form.reset({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });

        router.replace("/login");

        await updateUserPassword(email || "", data.newPassword);
      } else {
        console.error("Password change error:", res.error);
        if (res.error) {
          toast.error(res.error);
        } else {
          toast.error("Có lỗi xảy ra trong quá trình cập nhật mật khẩu", {
            description: "Vui lòng kiểm tra kết nối mạng hoặc tải lại trang",
          });
        }
      }
    } catch (error) {
      console.error("Password change error:", error);
      toast.error("Có lỗi xảy ra trong quá trình cập nhật mật khẩu", {
        description: "Vui lòng kiểm tra kết nối mạng hoặc tải lại trang",
      });
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    if (!pending && !email) {
      router.replace("/login");
    }
  }, [pending, email, router]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-1 p-6 md:col-span-5 md:p-8"
      >
        <div className="flex flex-col gap-y-8 md:gap-y-6">
          <div className="flex flex-col gap-y-2 items-center mb-2 text-center md:mb-3">
            <h1 className="text-xl font-bold md:text-2xl text-secondary md:text-gray-900">
              Đổi mật khẩu
            </h1>
            <p className="text-xs md:text-sm text-secondary/80 md:text-gray-600">
              Vui lòng nhập thông tin để đổi mật khẩu
            </p>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Email field (readonly) */}
            <FormItem className="space-y-1">
              <FormLabel className="text-[15px] md:text-sm font-semibold text-secondary/90 md:text-gray-700">
                Địa chỉ email (không thể thay đổi)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-1/2 w-4 h-4 transform -translate-y-1/2 text-secondary/60 md:text-primary/60" />
                  <Input
                    disabled
                    value={email || ""}
                    className="pl-10 h-10 text-sm font-medium border-2 disabled:cursor-default disabled:bg-white/5 disabled:text-secondary/90 md:disabled:bg-transparent md:disabled:text-gray-900/90 disabled:opacity-80 disabled:border-white/30 md:disabled:border-primary/30"
                  />
                </div>
              </FormControl>
              <div className="leading-tight min-h-4" />
            </FormItem>

            {/* Current password field */}
            <FormField
              name="currentPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[15px] md:text-sm font-semibold text-secondary/90 md:text-gray-700">
                    Mật khẩu hiện tại *
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <LockIcon className="absolute left-3 top-1/2 w-4 h-4 transition-colors transform -translate-y-1/2 text-secondary/50 md:text-gray-400 group-focus-within:text-secondary md:group-focus-within:text-primary" />
                      <Input
                        {...field}
                        type={showCurrent ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Nhập mật khẩu hiện tại"
                        className={cn(
                          "pl-10 h-10 border-2 transition-all duration-300 font-medium text-sm placeholder:text-secondary/50 md:placeholder:text-gray-400 bg-white/5 border-white/20 text-secondary focus:shadow-primary/10 md:bg-transparent md:text-gray-900",
                          fieldState.error
                            ? "border-red-400/50 focus:border-red-400 md:focus:border-red-500 md:shadow-red-100"
                            : "focus:border-white/50 hover:border-white/30 md:border-gray-300 md:hover:border-gray-400/70 md:focus:border-primary/50",
                        )}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowCurrent((value) => !value)}
                        className="absolute right-3 top-1/2 transition-all duration-200 transform -translate-y-1/2 text-secondary/50 md:text-gray-400 hover:text-secondary/80 md:hover:text-gray-600 hover:scale-110 active:scale-95"
                      >
                        {showCurrent ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
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
            {/* New password field */}
            <FormField
              name="newPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[15px] md:text-sm font-semibold text-secondary/90 md:text-gray-700">
                    Mật khẩu mới *
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <LockIcon className="absolute left-3 top-1/2 w-4 h-4 transition-colors transform -translate-y-1/2 text-secondary/50 md:text-gray-400 group-focus-within:text-secondary md:group-focus-within:text-primary" />
                      <Input
                        {...field}
                        type={showNew ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Nhập mật khẩu mới"
                        className={cn(
                          "pl-10 h-10 border-2 transition-all duration-300 font-medium text-sm placeholder:text-secondary/50 md:placeholder:text-gray-400 bg-white/5 border-white/20 text-secondary focus:shadow-primary/10 md:bg-transparent md:text-gray-900",
                          fieldState.error
                            ? "border-red-400/50 focus:border-red-400 md:focus:border-red-500 md:shadow-red-100"
                            : "focus:border-white/50 hover:border-white/30 md:border-gray-300 md:hover:border-gray-400/70 md:focus:border-primary/50",
                        )}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowNew((value) => !value)}
                        className="absolute right-3 top-1/2 transition-all duration-200 transform -translate-y-1/2 text-secondary/50 md:text-gray-400 hover:text-secondary/80 md:hover:text-gray-600 hover:scale-110 active:scale-95"
                      >
                        {showNew ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
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
            {/* Confirm new password field */}
            <FormField
              name="confirmNewPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-[15px] md:text-sm font-semibold text-secondary/90 md:text-gray-700">
                    Xác nhận mật khẩu mới *
                  </FormLabel>
                  <FormControl>
                    <div className="relative group">
                      <LockIcon className="absolute left-3 top-1/2 w-4 h-4 transition-colors transform -translate-y-1/2 text-secondary/50 md:text-gray-400 group-focus-within:text-secondary md:group-focus-within:text-primary" />
                      <Input
                        {...field}
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Nhập lại mật khẩu mới"
                        className={cn(
                          "pl-10 h-10 border-2 transition-all duration-300 font-medium text-sm placeholder:text-secondary/50 md:placeholder:text-gray-400 bg-white/5 border-white/20 text-secondary focus:shadow-primary/10 md:bg-transparent md:text-gray-900",
                          fieldState.error
                            ? "border-red-400/50 focus:border-red-400 md:focus:border-red-500 md:shadow-red-100"
                            : "focus:border-white/50 hover:border-white/30 md:border-gray-300 md:hover:border-gray-400/70 md:focus:border-primary/50",
                        )}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        onClick={() => setShowConfirm((value) => !value)}
                        className="absolute right-3 top-1/2 transition-all duration-200 transform -translate-y-1/2 text-secondary/50 md:text-gray-400 hover:text-secondary/80 md:hover:text-gray-600 hover:scale-110 active:scale-95"
                      >
                        {showConfirm ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
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
          </div>

          {/* Submit button */}
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
        </div>
      </form>
    </Form>
  );
};
