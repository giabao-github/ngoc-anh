import type { Metadata } from "next";
import { Quicksand } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";

import { CartProvider } from "@/hooks/CartContext";

import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin", "latin-ext", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  description: "Trang web của Thạch Âm",
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
        <body className={`${quicksand.className} antialiased`}>{children}</body>
        <Toaster />
      </CartProvider>
    </html>
  );
}
