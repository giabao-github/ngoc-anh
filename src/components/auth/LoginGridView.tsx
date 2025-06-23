"use client";

import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { FaArrowRightLong, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoWarningOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { LoginFields } from "@/components/auth/LoginFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { authClient } from "@/lib/auth-client";

import { loginSchema } from "@/app/schemas";

export const LoginGridView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [inputKey, setInputKey] = useState(0);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [changeCount, setChangeCount] = useState(0);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Use useWatch to subscribe to all field values
  const fieldNames = ["email", "password"] as const;
  const watchedValues = useWatch({ control: form.control });
  const watchedErrors = form.formState.errors;

  // Dynamic submit button text
  const emptyFields = fieldNames.filter((f) => !watchedValues[f]);
  const errorFields = fieldNames.filter((f) => watchedErrors[f]);
  const hasAnyError = Object.keys(form.formState.errors).length > 0;
  let submitButtonText = "Đăng nhập";
  const isButtonDisabled = pending || hasAnyError || emptyFields.length > 0;

  if (pending) {
    submitButtonText = "Đang đăng nhập";
  } else if (!isButtonDisabled) {
    submitButtonText = "Đăng nhập";
  } else if (errorFields.length > 1) {
    submitButtonText = "Vui lòng sửa các lỗi trong biểu mẫu";
  } else if (errorFields.length === 1) {
    const field = errorFields[0];
    submitButtonText = watchedErrors[field]?.message
      ? `${watchedErrors[field]?.message}`
      : "Có lỗi trong biểu mẫu";
  } else if (emptyFields.length > 0) {
    submitButtonText = "Vui lòng điền đầy đủ thông tin";
  }

  const handleToastMessage = (errorCode: string) => {
    if (errorCode === "INVALID_EMAIL_OR_PASSWORD") {
      toast.error("Email hoặc mật khẩu không chính xác", {
        description: "Vui lòng kiểm tra lại thông tin đăng nhập",
      });
    }
  };

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    setPending(true);
    setHasSubmitted(true);
    form.clearErrors();

    authClient.signIn.email(
      {
        email: data.email,
        password: data.password,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
          router.push("/");
        },
        onError: ({ error }) => {
          setPending(false);
          form.setError("email", {
            type: "manual",
            message: "Email hoặc mật khẩu không chính xác",
          });
          form.setError("password", {
            type: "manual",
            message: "Email hoặc mật khẩu không chính xác",
          });
          handleToastMessage(error.code);
        },
      },
    );
  };

  const onLoginSocial = (provider: "github" | "google") => {
    setPending(true);

    authClient.signIn.social(
      {
        provider,
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          setPending(false);
        },
        onError: () => {
          setPending(false);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="col-span-1 p-6 md:col-span-3 md:p-8"
      >
        <div className="flex flex-col gap-y-8 md:gap-y-6">
          <div className="flex flex-col gap-y-2 items-center mb-2 text-center md:mb-3">
            <h1 className="text-xl font-bold md:text-2xl text-secondary md:text-gray-900">
              Chào mừng bạn trở lại
            </h1>
            <p className="text-xs md:text-sm text-secondary/80 md:text-gray-600">
              Đăng nhập để tiếp tục hành trình của bạn
            </p>
          </div>

          {/* Social login buttons */}
          <div className="grid grid-cols-1 gap-3 mb-2 md:grid-cols-2">
            <Button
              disabled={pending}
              onClick={() => onLoginSocial("google")}
              type="button"
              variant="outline"
              className="flex gap-3 justify-center items-center w-full h-10 text-white border-2 transition-all duration-300 bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30 md:bg-transparent md:border-gray-200 md:text-black md:hover:bg-blue-50 md:hover:border-blue-400 md:hover:text-black"
            >
              <FcGoogle className="w-4 h-4" />
              <span className="text-sm font-semibold">Tiếp tục với Google</span>
            </Button>
            <Button
              disabled={pending}
              onClick={() => onLoginSocial("github")}
              type="button"
              variant="outline"
              className="flex gap-3 justify-center items-center w-full h-10 text-white border-2 transition-all duration-300 bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30 md:bg-transparent md:border-gray-200 md:text-black md:hover:bg-gray-50 md:hover:border-gray-400 md:hover:text-black"
            >
              <FaGithub className="w-4 h-4" />
              <span className="text-sm font-semibold">Tiếp tục với GitHub</span>
            </Button>
          </div>

          <div className="relative text-xs text-center after:border-white/20 md:after:border-gray-200 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="relative z-10 px-3 font-medium bg-primary text-secondary/80 md:text-gray-500 md:bg-white">
              Hoặc đăng nhập bằng email
            </span>
          </div>

          {/* Form fields */}
          <LoginFields
            form={form}
            showPassword={showPassword}
            inputKey={inputKey}
            changeCount={changeCount}
            hasSubmitted={hasSubmitted}
            setShowPassword={setShowPassword}
            setInputKey={setInputKey}
            setChangeCount={setChangeCount}
          />

          {/* Submit button */}
          <Button
            disabled={isButtonDisabled}
            type="submit"
            className="w-full mt-3 md:mt-4 h-10 text-sm font-semibold transition duration-200 bg-secondary text-primary hover:bg-secondary/90 hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:shadow-none group"
          >
            {pending ? (
              <span className="flex gap-x-2 items-center">
                <span className="w-4 h-4 rounded-full border-2 animate-spin border-primary/20 border-t-primary" />
                Đang đăng nhập
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

          {/* Login and recovery links */}
          <div className="text-sm text-center text-secondary/80 md:text-gray-600">
            Chưa có tài khoản?{" "}
            <Link
              href="/register"
              className="font-semibold transition-all duration-200 text-secondary md:text-primary hover:text-secondary/80 md:hover:text-primary/80 hover:underline"
            >
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
