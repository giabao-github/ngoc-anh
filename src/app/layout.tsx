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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Prevent mobile browsers from being treated as webviews */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <CartProvider>
        <body className={`${quicksand.className} antialiased`}>{children}</body>
        <Toaster />
      </CartProvider>
    </html>
  );
}
