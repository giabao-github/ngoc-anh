import { RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";
import { HiOutlineMapPin } from "react-icons/hi2";


interface FooterProps {
  aboutRef?: RefObject<HTMLDivElement | null>;
}

const Footer: React.FC<FooterProps> = ({ aboutRef }) => (
  <footer ref={aboutRef} className={`bg-[#0C2543] text-white py-12 md:py-24 px-6`}>
    <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-16 md:gap-32">
      <div className="text-sm md:text-lg">
        <h3 className="mb-4 uppercase">Trụ sở chính</h3>
        <h1 className="text-lg md:text-2xl mb-4 font-semibold uppercase text-[#D4AF37]">Công ty TNHH Minh Long I</h1>
        <p>Số 333 Đường Hưng Định 24, Khu Phố Hưng Lộc, Phường Hưng Định, Thành Phố Thuận An, Tỉnh Bình Dương, Việt Nam.</p>
        <p>Điện Thoại: (+84) 274 3668899</p>
        <p>Fax: (+84) 274 3724173</p>
        <a
          href="https://www.google.com/maps/place/Ltd+Minh+Long+1+-+MINH+LONG+I,+Co.+Ltd./@10.9464587,106.7023139,17z/data=!3m1!4b1!4m5!3m4!1s0x3174d7412f3fd84b:0x3820a91ad46687c9!8m2!3d10.9464534!4d106.7045026"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-fit flex items-center flex-row gap-x-1 md:gap-x-2 cursor-pointer font-semibold text-xs md:text-base hover:text-[#D4AF37] active:text-[#D4AF37]/70"
        >
          <HiOutlineMapPin className="text-base md:text-xl"/>
          Xem bản đồ
        </a>
      </div>
      <div>
        <div className="text-sm md:text-lg">
          <h3 className="mb-4 uppercase">Kết nối với chúng tôi</h3>
          <p>Hotline:&nbsp; 
            <Link href={'tel:0378044394'} className="hover:text-[#D4AF37] active:text-[#D4AF37]/70">
              (+84) 915 047 339
            </Link>
          </p>
          <p>Email:&nbsp; 
            <Link href={'mailto:eshop@minhlong.com'} className="hover:text-[#D4AF37] active:text-[#D4AF37]/70">
              eshop@minhlong.com
            </Link>
          </p>
          <div className="flex space-x-6 mt-10 md:mt-12">
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
      </div>
      <div>
        <div className="hidden md:block">
          <div className="relative w-48 h-16">
            <Image
              src={'https://file.hstatic.net/200000532849/file/logothongbao_d4f8886efdb04dd3984bff803b418aa5.png'}
              alt='Verified'
              fill
              sizes="(max-width: 768px) 120px, 180px"
              className="object-contain"
            />
          </div>
        </div>
        <div className="md:hidden flex flex-row gap-x-8">
          <div className="relative w-32 h-12">
            <Image
              src={'https://file.hstatic.net/200000532849/file/logothongbao_d4f8886efdb04dd3984bff803b418aa5.png'}
              alt='Verified'
              fill
              sizes="(max-width: 768px) 120px, 180px"
              className="object-contain"
            />
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer select-none bg-transparent text-[#D4AF37] border border-[#D4AF37] px-4 py-2 rounded-full hover:bg-[#D4AF37] hover:text-white active:bg-[#D4AF37]/70 active:text-white/70 transition-colors flex items-center"
          >
            <span className="font-semibold text-xs tracking-wide">
              Quay về đầu trang
            </span>
          </button>
        </div>
        <div className="hidden md:flex mt-16 mx-4 text-center justify-start">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer select-none bg-transparent text-[#D4AF37] border border-[#D4AF37] px-6 py-3 rounded-full hover:bg-[#D4AF37] hover:text-white active:bg-[#D4AF37]/70 active:text-white/70 transition-colors flex items-center"
          >
            <span className="font-semibold tracking-wide">
              Quay về đầu trang
            </span>
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;