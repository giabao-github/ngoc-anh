import { FaArrowRightLong } from "react-icons/fa6";

import { LucideHome } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import SearchBar from "@/components/sections/header/SearchBar";

import { arsenal } from "@/config/fonts";

import { cn } from "@/utils/styleUtils";

const ProductError = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-8 justify-center items-center px-6 min-h-screen">
      <title>Không tìm thấy sản phẩm</title>
      {/* App Logo */}
      <div
        className={cn(
          "absolute flex items-center space-x-4 transition top-6 left-6",
          arsenal.className,
        )}
      >
        <Image
          src="/dark-logo.png"
          alt="Logo"
          width={80}
          height={80}
          quality={100}
          priority
          onClick={() => router.push("/")}
          className="object-contain w-20 h-20 cursor-pointer select-none"
        />
        <span
          className="block text-2xl font-semibold uppercase select-none text-primary md:text-3xl"
          aria-label="Thạch Âm - Trang chủ"
          role="text"
        >
          Thạch Âm
        </span>
      </div>

      {/* Illustration */}
      <Image
        src="https://www.mahalaxmifoods.com/include/no-product.png"
        alt="Product not found"
        width={180}
        height={180}
        className="animate-pulse"
      />

      {/* Heading */}
      <h1 className="mt-8 text-2xl font-bold text-center md:text-3xl xl:text-4xl">
        Sản phẩm không tồn tại
      </h1>

      {/* Description */}
      <p className="max-w-lg text-center">
        Chúng tôi không thể tìm thấy sản phẩm bạn đang tìm kiếm. Có thể đường
        dẫn không đúng hoặc sản phẩm đã bị gỡ.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col gap-6 my-4 md:flex-row">
        <Link
          href="/"
          className="inline-flex gap-3 justify-center items-center px-6 py-4 font-bold text-white rounded-full shadow-md transition duration-200 select-none bg-primary active:bg-primary/80 group"
        >
          <LucideHome
            size={18}
            strokeWidth={2}
            className="group-hover:scale-[1.2] group-active:scale-[1.2]"
          />
          <span>Quay về trang chủ</span>
        </Link>

        <Link
          href="/#products"
          className="inline-flex gap-3 justify-center items-center px-6 py-4 font-bold bg-white rounded-full border shadow-md transition select-none text-primary border-primary active:bg-gray-200 group"
        >
          <span>Xem sản phẩm khác</span>
          <FaArrowRightLong
            size={18}
            strokeWidth={2}
            className="group-hover:transform group-hover:translate-x-1 group-active:transform group-active:translate-x-1"
          />
        </Link>
      </div>

      {/* Search bar */}
      <SearchBar />
    </div>
  );
};

export default ProductError;
