import { RefObject } from "react";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { HiOutlineMapPin } from "react-icons/hi2";

import Image from "next/image";

import BackToTopButton from "@/components/sections/footer/BackToTopButton";

const currentYear = new Date().getFullYear();

interface FooterProps {
  aboutRef?: RefObject<HTMLDivElement | null>;
}

const Footer: React.FC<FooterProps> = ({ aboutRef }) => (
  <footer
    ref={aboutRef}
    className="px-2 py-12 tracking-wide text-white md:px-6 bg-primary md:py-16"
  >
    <div className="grid gap-16 mx-auto px-6 max-w-[1400px] md:grid-cols-7 md:gap-32 relative">
      <div className="text-sm md:text-base 2xl:text-lg w-fit md:col-span-3">
        <h3 className="mb-4 font-medium uppercase">Trụ sở chính</h3>
        <div
          className="text-lg md:text-xl 2xl:text-2xl mb-4 font-semibold uppercase text-[#D4AF37] block"
          aria-label="Công ty TNHH Thạch Âm"
          role="text"
        >
          Công ty TNHH Thạch Âm
        </div>
        <div className="space-y-1">
          <p>
            Số 475A Đường Điện Biên Phủ, Phường 25, Quận Bình Thạnh, Thành Phố
            Hồ Chí Minh, Việt Nam.
          </p>
          <p>Điện Thoại: (+84) 915 047 339</p>
          <p>Fax: (+84) 915 047 339</p>
        </div>
        <a
          href="https://www.google.com/maps/place/HCMC+University+of+Technology+(HUTECH)+%E2%80%93+Sai+Gon+Campus/@10.8015401,106.7143719,21z/data=!4m15!1m8!3m7!1s0x317528a500e8c3d5:0xedfca63e47b5afb8!2zNDc1YSDEkGnhu4duIEJpw6puIFBo4bunLCBQaMaw4budbmcgMjUsIELDrG5oIFRo4bqhbmgsIEjhu5MgQ2jDrSBNaW5oIDcwMDAwLCBWaWV0bmFt!3b1!8m2!3d10.8017151!4d106.7144547!16s%2Fg%2F11lq6yh9h1!3m5!1s0x317528a459cb43ab:0x6c3d29d370b52a7e!8m2!3d10.8016175!4d106.7144559!16s%2Fg%2F124xvbfmg?entry=ttu&g_ep=EgoyMDI1MDYwOC4wIKXMDSoASAFQAw%3D%3D"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-fit flex items-center flex-row gap-x-1 md:gap-x-2 cursor-pointer font-semibold text-xs md:text-base hover:text-[#D4AF37] active:text-[#D4AF37]/70"
        >
          <HiOutlineMapPin className="text-base md:text-xl" />
          Xem bản đồ
        </a>
      </div>
      <div className="text-sm w-fit md:text-base 2xl:text-lg md:col-span-2">
        <h3 className="mb-4 font-medium uppercase">Kết nối với chúng tôi</h3>
        <div className="space-y-1">
          <p>
            Hotline:&nbsp;
            <a
              href={"tel:0915047339"}
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70"
            >
              (+84) 915 047 339
            </a>
          </p>
          <p>
            Email:&nbsp;
            <a
              href={"mailto:thacham@gmail.com"}
              className="hover:text-[#D4AF37] active:text-[#D4AF37]/70"
            >
              thacham@gmail.com
            </a>
          </p>
        </div>
        <div className="flex mt-10 space-x-6 md:mt-12">
          <a
            href="https://www.facebook.com/minhlongcompany"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebookF className="text-xl md:text-3xl hover:text-[#D4AF37] active:text-[#D4AF37]/70 cursor-pointer" />
          </a>
          <a
            href="https://www.instagram.com/minhlongporcelain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="text-xl md:text-3xl hover:text-[#D4AF37] active:text-[#D4AF37]/70 cursor-pointer" />
          </a>
          <a
            href="https://www.youtube.com/@MinhLongPorcelain"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaYoutube className="text-xl md:text-3xl hover:text-[#D4AF37] active:text-[#D4AF37]/70 cursor-pointer" />
          </a>
        </div>
      </div>
      <div className="w-fit md:absolute md:right-0 md:col-span-1">
        <div className="hidden md:block">
          <div className="relative w-auto h-14 2xl:h-16">
            <Image
              src={
                "https://file.hstatic.net/200000532849/file/logothongbao_d4f8886efdb04dd3984bff803b418aa5.png"
              }
              alt="Logo chứng nhận đã đăng ký Bộ Công Thương"
              fill
              sizes="(max-width: 768px) 128px, 192px"
              className="object-contain"
            />
          </div>
        </div>
        <div className="hidden justify-start mx-4 mt-16 text-center md:flex">
          <BackToTopButton variant="desktop" />
        </div>
        <div className="flex flex-row gap-x-8 md:hidden">
          <div className="relative w-32 h-12">
            <Image
              src={
                "https://file.hstatic.net/200000532849/file/logothongbao_d4f8886efdb04dd3984bff803b418aa5.png"
              }
              alt="Verified"
              fill
              sizes="(max-width: 768px) 128px, 192px"
              className="object-contain"
            />
          </div>
          <BackToTopButton variant="mobile" />
        </div>
      </div>
    </div>
    <div className="mt-16 text-base font-semibold tracking-wide text-center text-white md:text-lg">
      &copy; {currentYear} Thạch Âm. All rights reserved.
    </div>
  </footer>
);

export default Footer;
