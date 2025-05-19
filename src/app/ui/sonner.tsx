"use client";

import { useTheme } from "next-themes";
import { Josefin_Sans } from "next/font/google";
import { Toaster as Sonner, ToasterProps } from "sonner";


const josefin = Josefin_Sans({
  subsets: ["latin", "vietnamese"],
  weight: ["200", "300", "400","500", "600", "700"]
});

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      richColors={true}
      toastOptions={{
        unstyled: true,
        className:
          `w-full max-w-sm border-2 px-3 py-4 rounded-lg shadow-lg flex gap-2 justify-start items-center`,
        classNames: {
          success:
            "border border-green-200 bg-green-200",
          error:
            "border border-red-200 bg-red-200",
          warning:
            "border-yellow-200 bg-yellow-50 text-yellow-900",
          info:
            "border-blue-200 bg-blue-50 text-blue-900",
          default:
            "border-zinc-200 bg-white text-zinc-900",
          title: 
            "text-sm font-semibold",
          description: 
            "mt-1 text-xs opacity-70",
          actionButton:
            "text-sm text-blue-600 hover:underline ml-auto",
          cancelButton:
            "text-sm text-zinc-500 hover:text-zinc-800",
          closeButton:
            "text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition ml-auto",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
