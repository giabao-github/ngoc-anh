"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowRightLong, FaGithub } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { IoWarningOutline } from "react-icons/io5";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";

import { RegisterPasswordFields } from "@/components/auth/RegisterPasswordFields";
import { RegisterTextFields } from "@/components/auth/RegisterTextFields";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { TEXTS } from "@/constants/texts";

import { useRegisterForm } from "@/hooks/useRegisterForm";

import { addUser } from "@/lib/actions/user-actions";
import { authClient } from "@/lib/auth-client";

import { registerSchema } from "@/app/schemas";

export const RegisterGridView = () => {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [inputKey, setInputKey] = useState(0);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const { submitButtonText, isButtonDisabled } = useRegisterForm(form, pending);

  const handleToastMessage = (errorCode: string) => {
    if (errorCode === "USER_ALREADY_EXISTS") {
      toast.error(TEXTS.emailExists, {
        description: TEXTS.useAnotherEmail,
      });
    }
  };

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    setPending(true);
    form.clearErrors();

    authClient.signUp.email(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL: "/login",
      },
      {
        onSuccess: async () => {
          setPending(false);
          toast.success(TEXTS.registerSuccess, {
            description: TEXTS.useRegisteredInfo,
          });
          router.push("/login");

          const formData = new FormData();
          formData.append("name", data.name);
          formData.append("email", data.email);
          formData.append("password", data.password);
          await addUser(formData);
        },
        onError: ({ error }) => {
          setPending(false);
          if (error.code === "USER_ALREADY_EXISTS") {
            form.setError("email", {
              type: "manual",
              message: TEXTS.emailExists,
            });
          }
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
        className="col-span-1 p-6 md:col-span-5 md:p-8"
      >
        <div className="flex flex-col gap-y-8 md:gap-y-6">
          <div className="flex flex-col gap-y-2 items-center mb-2 text-center md:mb-3">
            <h1 className="text-xl font-bold md:text-2xl text-secondary md:text-gray-900">
              {TEXTS.welcome}
            </h1>
            <p className="text-xs md:text-sm text-secondary/80 md:text-gray-600">
              {TEXTS.startJourney}
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
              <span className="text-sm font-semibold">
                {TEXTS.continueWithGoogle}
              </span>
            </Button>
            <Button
              disabled={pending}
              onClick={() => onLoginSocial("github")}
              type="button"
              variant="outline"
              className="flex gap-3 justify-center items-center w-full h-10 text-white border-2 transition-all duration-300 bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30 md:bg-transparent md:border-gray-200 md:text-black md:hover:bg-gray-50 md:hover:border-gray-400 md:hover:text-black"
            >
              <FaGithub className="w-4 h-4" />
              <span className="text-sm font-semibold">
                {TEXTS.continueWithGithub}
              </span>
            </Button>
          </div>

          <div className="relative text-xs text-center after:border-white/20 md:after:border-gray-200 after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="relative z-10 px-3 font-medium bg-primary text-secondary/80 md:text-gray-500 md:bg-white">
              {TEXTS.orRegisterWithEmail}
            </span>
          </div>

          {/* Form fields */}
          <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 md:gap-x-6">
            <RegisterTextFields
              form={form}
              inputKey={inputKey}
              setInputKey={setInputKey}
            />

            <RegisterPasswordFields
              form={form}
              showPassword={showPassword}
              showConfirmPassword={showConfirmPassword}
              setShowPassword={setShowPassword}
              setShowConfirmPassword={setShowConfirmPassword}
            />
          </div>

          {/* Submit button */}
          <Button
            disabled={isButtonDisabled}
            type="submit"
            className="w-full mt-3 md:mt-4 h-10 text-sm font-semibold transition duration-200 bg-secondary text-primary hover:bg-secondary/90 hover:shadow-lg active:scale-[0.98] disabled:hover:scale-100 disabled:hover:shadow-none group"
          >
            {pending ? (
              <span className="flex gap-x-2 items-center">
                <span className="w-4 h-4 rounded-full border-2 animate-spin border-primary/20 border-t-primary" />
                {TEXTS.creatingAccount}
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
            {TEXTS.alreadyHaveAccount}{" "}
            <Link
              href="/login"
              className="font-semibold transition-all duration-200 text-secondary md:text-primary hover:text-secondary/80 md:hover:text-primary/80 hover:underline"
            >
              {TEXTS.loginNow}
            </Link>
          </div>
        </div>
      </form>
    </Form>
  );
};
