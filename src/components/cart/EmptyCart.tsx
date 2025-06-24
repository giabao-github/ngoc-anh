import Image from "next/image";
import { useRouter } from "next/navigation";

import SearchBar from "@/components/sections/header/SearchBar";

const MESSAGES = {
  emptyCart: "Chưa có sản phẩm trong giỏ hàng...",
  returnHome: "trang chủ",
  searchPrompt: "hoặc nhập từ khoá sản phẩm bạn cần tìm ở ô tìm kiếm này",
};

const EmptyCart = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-y-2 justify-center items-center pt-12 pb-24">
      <Image
        src="/illustrations/empty-cart.jpeg"
        alt="Empty Cart"
        width={256}
        height={256}
        quality={100}
        className="mb-4 w-64 h-64 rounded-full"
      />
      <p className="mb-4 text-lg font-medium">{MESSAGES.emptyCart}</p>
      <p className="text-sm leading-relaxed text-center text-gray-600 mb-8 w-[96%] md:w-[75%]">
        Bạn có thể quay về
        <span
          className="font-bold mx-[6px] cursor-pointer text-black hover:underline"
          onClick={() => router.push("/")}
        >
          {MESSAGES.returnHome}
        </span>
        {MESSAGES.searchPrompt}
      </p>
      <div className="flex justify-center px-4 w-full md:px-0">
        <SearchBar />
      </div>
    </div>
  );
};

export default EmptyCart;
