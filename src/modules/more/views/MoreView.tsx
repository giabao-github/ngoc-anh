"use client";

import { useRef } from "react";

import Header from "@/components/header/Header";
import Footer from "@/components/sections/Footer";
import { AnimatedSection } from "@/components/sections/more/AnimatedSection";
import { HeritageSection } from "@/components/sections/more/HeritageSection";
import { NavigationButtons } from "@/components/sections/more/NavigationButtons";

import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export const MoreView = () => {
  const aboutRef = useRef<HTMLDivElement>(null);
  useScrollAnimation();

  return (
    <>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        <main className="relative z-10 pb-12 md:pt-12 md:pb-20">
          <div className="container max-w-lg px-4 py-16 mx-auto md:max-w-7xl">
            <AnimatedSection>
              <h1 className="mb-6 text-2xl font-bold leading-tight text-center text-transparent uppercase md:mb-12 md:text-4xl 2xl:text-5xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text">
                THẠCH ÂM – KHI VĂN HÓA TRỞ THÀNH HƠI THỞ
              </h1>
            </AnimatedSection>

            <div className="space-y-12 md:space-y-24">
              <AnimatedSection>
                <div className="p-8 border bg-emerald-800/30 backdrop-blur-sm rounded-2xl border-amber-400/20">
                  <p className="leading-relaxed md:text-lg text-amber-100">
                    Thạch Âm ra đời từ một chuyến đi đến chùa Phướng – một trong
                    những ngôi chùa Khmer cổ kính tại Trà Vinh. Ở đó, những họa
                    tiết uốn lượn của rồng Naga, hoa văn cột đá, sóng nước, mây
                    trời… không chỉ nằm yên trên tường mà như đang thì thầm kể
                    chuyện.
                  </p>
                  <p className="mt-4 leading-relaxed md:text-lg text-amber-100">
                    Chúng tôi tin rằng mỗi nét chạm ấy đều là một{" "}
                    <span className="font-semibold text-amber-400">
                      "thanh âm"
                    </span>{" "}
                    của thời gian, của niềm tin, của bản sắc Khmer – và những
                    thanh âm đó xứng đáng được vang vọng trong đời sống hôm nay.
                  </p>
                </div>
              </AnimatedSection>

              <HeritageSection />

              <AnimatedSection>
                <h2 className="mb-6 text-2xl font-bold text-center md:mb-12 md:text-4xl 2xl:text-5xl text-amber-400">
                  THÔNG ĐIỆP
                </h2>
                <div className="p-8 border bg-emerald-800/30 backdrop-blur-sm rounded-2xl border-amber-400/20">
                  <h3 className="mb-4 text-2xl font-bold text-center text-amber-300">
                    VĂN HÓA LÀ ĐỂ SỐNG, KHÔNG CHỈ ĐỂ NGẮM
                  </h3>
                  <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
                    Thạch Âm không bán sản phẩm – mà bán trải nghiệm sống cùng
                    văn hóa.
                  </p>
                  <p className="mb-4 leading-relaxed md:text-lg text-amber-100">
                    Chúng tôi mơ về một thế giới nơi giới trẻ:
                  </p>
                  <ul className="space-y-3 text-amber-100">
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-amber-400"></div>
                      <span>Không chỉ biết đến hoa văn Khmer qua ảnh.</span>
                    </li>
                    <li className="flex items-start space-x-3">
                      <div className="w-2 h-2 mt-2 rounded-full bg-amber-400"></div>
                      <span>
                        Mà đeo nó, mặc nó, uống nước từ nó, sống cùng nó.
                      </span>
                    </li>
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <h2 className="mb-6 text-2xl font-bold text-center md:mb-12 md:text-4xl 2xl:text-5xl text-amber-400">
                  TẦM NHÌN
                </h2>
                <div className="p-8 border bg-emerald-800/30 backdrop-blur-sm rounded-2xl border-amber-400/20">
                  <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
                    Thạch Âm muốn trở thành:
                  </p>
                  <div className="space-y-4">
                    {[
                      "Một nhịp cầu giữa di sản Khmer và thế hệ mới.",
                      'Một thương hiệu "hồi sinh" mỹ học Khmer thông qua thiết kế ứng dụng.',
                      "Một cộng đồng yêu – sống – chia sẻ văn hóa Khmer từ miền đất Trà Vinh.",
                    ].map((text, index) => (
                      <div key={index} className="flex items-start space-x-4">
                        <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-full w-7 h-7 md:w-8 md:h-8 bg-amber-400">
                          <span className="text-sm font-bold text-emerald-900">
                            {index + 1}
                          </span>
                        </div>
                        <p className="md:text-lg text-amber-100">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection className="text-center">
                <NavigationButtons />
              </AnimatedSection>
            </div>
          </div>
        </main>
      </div>
      <Footer aboutRef={aboutRef} />
    </>
  );
};
