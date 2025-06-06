import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";

const Hero = () => (
  <section className={`bg-[#0C2543] text-white`}>
    <div className="max-w-[1340px] mx-auto grid md:grid-cols-2 gap-8 py-16 px-6">
      <div className="flex flex-col justify-center md:gap-y-12">
        <h2 className="text-4xl md:text-6xl mb-6 uppercase font-semibold tracking-wide text-[#BE984E]">TINH HOA TỪ ĐẤT
        TINH XẢO TỪ NGƯỜI</h2>
        <p className="mb-8 text-lg md:text-xl tracking-wide">55 năm cho một hành trình bền bỉ đưa gốm sứ Việt Nam vươn tầm thế giới, tạo nên những tuyệt tác vĩnh cửu</p>
        <button className="bg-transparent text-[#BE984E] font-semibold text-base border-1 border-[#BE984E] px-6 py-[14px] md:px-8 md:py-4 rounded-full w-fit hover:bg-[#BE984E] hover:text-white active:bg-[#BB9244]/80 active:text-white/80 cursor-pointer transition-colors select-none flex items-center flex-row gap-x-3">
          <span className="text-sm tracking-wide md:text-base">
            Tìm hiểu thêm
          </span>
          <FaArrowRightLong size={20} />
        </button>
      </div>
      <div className="relative h-[300px] md:h-auto">
        <Image
          src="https://file.hstatic.net/200000532849/file/chen_ngoc_th_ng_long_670x730px.png"
          alt="Featured Porcelain"
          fill
          className="object-contain rounded-lg select-none"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </div>
  </section>
);

export default Hero;