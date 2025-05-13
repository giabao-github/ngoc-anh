import Link from "next/link";
import Image from "next/image";
import { IoWarning } from "react-icons/io5";
import { FaArrowLeft } from "react-icons/fa6";
import { Input } from "../ui/input";
import { BsSearchHeartFill } from "react-icons/bs";
import ErrorSearchBar from "./ErrorSearchBar";

const ProductError = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-rose-50 text-rose-500 px-6 space-y-6">
      {/* App Logo */}
      <Link href="/" className="absolute top-6 text-[#0C2543] hover:text-[#D4AF37] left-6">
        <div className="flex items-center space-x-2 transition">
          <Image
              src="https://www.zarla.com/images/zarla-sculpticon-1x1-2400x2400-20230210-9wkw87py43xdc9yhdpwq.png?crop=1:1,smart&width=250&dpr=2"
              alt="Logo"
              width={40}
              height={40}
              className="object-cover rounded cursor-pointer bg-white select-none"
            />
            <h1 className="text-2xl font-semibold uppercase select-none hidden md:block">Ngọc Ánh</h1>
        </div>
      </Link>

      {/* Illustration */}
      <Image
        src="https://www.mahalaxmifoods.com/include/no-product.png"
        alt="Product not found"
        width={120}
        height={120}
        className="animate-pulse"
      />

      {/* Icon */}
      <div className="bg-rose-200 p-3 rounded-full shadow-sm">
        <IoWarning className="text-rose-500" size={36} />
      </div>

      {/* Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center">Sản phẩm không tồn tại</h1>

      {/* Description */}
      <p className="text-center text-rose-500 max-w-md">
        Chúng tôi không thể tìm thấy sản phẩm bạn đang tìm kiếm. Có thể đường dẫn không đúng hoặc sản phẩm đã bị gỡ.
      </p>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-white bg-rose-600 hover:bg-rose-700 rounded-full transition shadow-md"
        >
          <FaArrowLeft /> Quay về trang chủ
        </Link>

        <Link
          href="/#products"
          className="inline-flex items-center justify-center px-6 py-3 text-rose-700 bg-white border border-rose-300 hover:bg-rose-100 rounded-full transition"
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
