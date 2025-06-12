import { FaArrowRightLong } from "react-icons/fa6";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();

  return (
    <section
      className={`bg-cover bg-center text-white`}
      style={{
        backgroundImage: "url('/backgrounds/hero-background.jpeg')",
      }}
    >
      <div className="max-w-[1400px] mx-auto grid py-16 md:py-24 2xl:py-32 md:grid-cols-2 gap-8 px-6 md:px-12 2xl:px-0">
        <div className="flex flex-col justify-center md:gap-y-12">
          <h2 className="mb-6 text-4xl font-semibold uppercase md:text-5xl 2xl:text-6xl text-secondary">
            ÂM VANG DI SẢN KHMER
          </h2>
          <p className="mb-8 text-lg tracking-wide md:text-xl">
            Không chỉ là di sản, mà là nguồn cảm hứng vô tận cho những sản phẩm
            ứng dụng sáng tạo, đậm chất văn hóa.
          </p>
          <button
            onClick={() => router.push("/more")}
            className="bg-transparent text-secondary font-semibold text-base border border-secondary px-6 py-3.5 md:px-8 md:py-4 rounded-full w-fit hover:bg-secondary hover:text-black active:bg-secondary/80 active:text-black cursor-pointer transition-colors select-none flex items-center flex-row gap-x-3"
          >
            <span className="text-sm tracking-wide md:text-base">
              Tìm hiểu thêm
            </span>
            <FaArrowRightLong size={20} />
          </button>
        </div>
        <div className="relative h-[300px] md:h-[500px]">
          <Image
            src="/illustrations/dragon.jpeg"
            alt="Dragon"
            fill
            className="object-cover rounded-lg select-none"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
