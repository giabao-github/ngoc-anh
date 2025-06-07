import type { Metadata } from "next";
import { Arsenal } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "@/hooks/CartContext";

import "./globals.css";

const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});

export const metadata: Metadata = {
  description: "Trang web của Ngọc Ánh dễ thương",
  icons: {
    icon: "/favicon.ico",
  },
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <CartProvider>
        <body className={`${arsenal.className} antialiased`}>{children}</body>
        <Toaster />
      </CartProvider>
    </html>
  );
}
