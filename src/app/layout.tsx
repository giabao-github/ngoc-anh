import type { Metadata } from "next";
import { Arsenal, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const arsenal = Arsenal({
  weight: ["400", "700"],
  subsets: ["cyrillic", "latin", "vietnamese"],
});


export const metadata: Metadata = {
  description: "Trang web của Ngọc Ánh dễ thương",
  icons: {
    icon: '/src/app/favicon.ico',
  },
};

export const dynamic = 'force-dynamic';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${arsenal.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
