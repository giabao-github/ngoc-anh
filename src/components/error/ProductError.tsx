import { FaArrowLeft } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";

import ErrorSearchBar from "@/components/error/ErrorSearchBar";

const ProductError = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 space-y-6 bg-rose-50 text-rose-500">
      <title>Không tìm thấy sản phẩm</title>
      {/* App Logo */}
      <Link
        href="/"
        className="absolute top-6 text-primary hover:text-[#D4AF37] active:text-[#D4AF37]/70 left-6"
      >
        <div className="flex items-center p-4 space-x-4 transition rounded-2xl bg-primary">
          <Image
            src="/logo.png"
            alt="Logo"
            width={80}
            height={80}
            className="object-cover rounded cursor-pointer select-none"
          />
          <h1 className="hidden text-2xl text-[#E6D280] font-semibold uppercase select-none md:text-3xl md:block">
            Thạch Âm
          </h1>
        </div>
      </Link>

      {/* Illustration */}
      <Image
        src="https://www.mahalaxmifoods.com/include/no-product.png"
        alt="Product not found"
        width={180}
        height={180}
        className="animate-pulse"
      />

      {/* Heading */}
      <h1 className="mt-8 text-3xl font-bold text-center md:text-4xl">
        Sản phẩm không tồn tại
      </h1>

      {/* Description */}
      <p className="max-w-md tracking-wide text-center text-rose-500">
        Chúng tôi không thể tìm thấy sản phẩm bạn đang tìm kiếm. Có thể đường
        dẫn không đúng hoặc sản phẩm đã bị gỡ.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col gap-3 mt-4 sm:flex-row">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white transition rounded-full shadow-md select-none bg-rose-600 hover:bg-rose-500/75 active:bg-rose-400"
        >
          <FaArrowLeft /> Quay về trang chủ
        </Link>

        <Link
          href="/#products"
          className="inline-flex items-center justify-center px-6 py-3 transition bg-white border rounded-full shadow-md select-none text-rose-600 border-rose-600 hover:bg-rose-200/70 active:bg-rose-100"
        >
          Xem sản phẩm khác
        </Link>
      </div>

      {/* Search bar */}
      <ErrorSearchBar />
    </div>
  );
};

export default ProductError;
