import { FaArrowRightLong } from "react-icons/fa6";

import Image from "next/image";

const Hero = () => (
  <section
    className={`bg-cover bg-center text-white`}
    style={{
      backgroundImage: "url('/backgrounds/hero-background.jpeg')",
    }}
  >
    <div className="max-w-[1340px] mx-auto grid py-32 md:grid-cols-2 gap-8 px-6">
      <div className="flex flex-col justify-center md:gap-y-12">
        <h2 className="mb-6 text-4xl font-semibold tracking-wide uppercase text-outline-primary md:text-6xl text-secondary">
          ÂM VANG DI SẢN KHMER
        </h2>
        <p className="mb-8 text-lg tracking-wide md:text-xl">
          Không chỉ là di sản, mà là nguồn cảm hứng vô tận cho những sản phẩm
          ứng dụng sáng tạo, đậm chất văn hóa.
        </p>
        <button className="bg-transparent text-[#BE984E] font-semibold text-base border-1 border-[#BE984E] px-6 py-[14px] md:px-8 md:py-4 rounded-full w-fit hover:bg-[#BE984E] hover:text-white active:bg-secondary/80 active:text-white/80 cursor-pointer transition-colors select-none flex items-center flex-row gap-x-3">
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

export default Hero;
