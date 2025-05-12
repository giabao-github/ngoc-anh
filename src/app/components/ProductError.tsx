import Link from "next/link";
import { IoWarning } from "react-icons/io5";

const ProductError = () => {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center bg-red-50 border border-red-200 rounded-lg shadow-sm space-y-3">
      <IoWarning size={36} className="text-rose-600" />
      <h2 className="text-rose-600 text-lg font-bold">Sản phẩm không tồn tại</h2>
      <p className="text-rose-500 text-sm">
        Chúng tôi không tìm thấy sản phẩm bạn đang tìm kiếm. Vui lòng kiểm tra lại đường dẫn hoặc quay về trang chủ.
      </p>
      <Link
        href="/"
        className="mt-2 inline-block px-4 py-2 bg-rose-500 text-white rounded-md hover:animate-pulse transition"
      >
        Quay về trang chủ
      </Link>
    </div>
  );
}

export default ProductError;