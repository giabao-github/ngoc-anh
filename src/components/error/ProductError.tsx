import { FaArrowLeft } from "react-icons/fa6";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import ErrorSearchBar from "@/components/error/ErrorSearchBar";

const ProductError = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 space-y-6 bg-rose-50 text-rose-500">
      <title>Không tìm thấy sản phẩm</title>
      {/* App Logo */}

      <div className="absolute flex items-center space-x-4 transition top-6 left-6">
        <Image
          src="/dark-logo.png"
          alt="Logo"
          width={1024}
          height={1024}
          quality={100}
          priority
          onClick={() => router.push("/")}
          className="object-contain w-20 h-20 cursor-pointer select-none"
        />
        <span
          className="hidden text-2xl font-semibold uppercase select-none text-primary md:text-3xl md:block"
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
