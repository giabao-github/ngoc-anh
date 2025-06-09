"use client";

import { Suspense, useEffect, useRef } from "react";

import { useRouter } from "next/navigation";

import Header from "@/components/header/Header";
import Footer from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";

export const MoreView = () => {
  const router = useRouter();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <Suspense>
      <Header hasFooter aboutRef={aboutRef} />
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-primary/95 via-primary/90 to-primary/85">
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        <main className="relative z-10 pb-12 md:pt-12 md:pb-20">
          <div className="container max-w-lg px-4 py-16 mx-auto md:max-w-7xl">
            <div className="transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll">
              <h1 className="mb-6 text-2xl font-bold leading-tight text-center text-transparent uppercase md:mb-12 md:text-4xl 2xl:text-5xl bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text">
                THẠCH ÂM – KHI VĂN HÓA TRỞ THÀNH HƠI THỞ
              </h1>
            </div>

            <div className="space-y-12 md:space-y-24">
              <section className="transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll">
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
              </section>

              <section className="transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll">
                <h2 className="mb-6 text-2xl font-bold text-center md:mb-12 md:text-4xl 2xl:text-5xl text-amber-400">
                  TỪ DI SẢN ĐẾN HIỆN ĐẠI
                </h2>
                <div className="p-8 border bg-emerald-800/30 backdrop-blur-sm rounded-2xl border-amber-400/20">
                  <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
                    Thạch Âm không chỉ nhìn về quá khứ – mà giao tiếp với hiện
                    tại bằng thiết kế.
                  </p>
                  <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
                    Chúng tôi chuyển hóa những hoa văn cổ thành những sản phẩm
                    ứng dụng hiện đại, gần gũi, hữu dụng – nhưng vẫn mang hồn
                    cốt của văn hóa:
                  </p>
                  <div className="grid gap-4 md:grid-cols-2">
                    <ul className="space-y-3 text-amber-100">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Bộ chén, đĩa, ly</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Huy hiệu, card, standee</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Khăn bandana chai nước</span>
                      </li>
                    </ul>
                    <ul className="space-y-3 text-amber-100">
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Túi vải</span>
                      </li>
                      <li className="flex items-center space-x-3">
                        <div className="w-2 h-2 rounded-full bg-amber-400"></div>
                        <span>Sổ tay</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 mt-6 border rounded-lg bg-amber-400/10 border-amber-400/30">
                    <p className="font-medium text-amber-200">
                      Đặc biệt website Thạch Âm như một ngôi đền số – lưu giữ,
                      bán, kể, kết nối.
                    </p>
                  </div>
                </div>
              </section>

              <section className="transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll">
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
              </section>

              <section className="transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll">
                <h2 className="mb-6 text-2xl font-bold text-center md:mb-12 md:text-4xl 2xl:text-5xl text-amber-400">
                  TẦM NHÌN
                </h2>
                <div className="p-8 border bg-emerald-800/30 backdrop-blur-sm rounded-2xl border-amber-400/20">
                  <p className="mb-6 leading-relaxed md:text-lg text-amber-100">
                    Thạch Âm muốn trở thành:
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-full w-7 h-7 md:w-8 md:h-8 bg-amber-400">
                        <span className="text-sm font-bold text-emerald-900">
                          1
                        </span>
                      </div>
                      <p className="md:text-lg text-amber-100">
                        Một nhịp cầu giữa di sản Khmer và thế hệ mới.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-full w-7 h-7 md:w-8 md:h-8 bg-amber-400">
                        <span className="text-sm font-bold text-emerald-900">
                          2
                        </span>
                      </div>
                      <p className="md:text-lg text-amber-100">
                        Một thương hiệu "hồi sinh" mỹ học Khmer thông qua thiết
                        kế ứng dụng.
                      </p>
                    </div>
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center flex-shrink-0 mt-1 rounded-full w-7 h-7 md:w-8 md:h-8 bg-amber-400">
                        <span className="text-sm font-bold text-emerald-900">
                          3
                        </span>
                      </div>
                      <p className="md:text-lg text-amber-100">
                        Một cộng đồng yêu – sống – chia sẻ văn hóa Khmer từ miền
                        đất Trà Vinh.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section className="text-center transition-all duration-1000 ease-out transform translate-y-8 opacity-0 animate-on-scroll">
                <div className="flex flex-col justify-center gap-6 md:gap-12 md:flex-row">
                  <Button
                    onClick={() => router.push("/#collections")}
                    className="px-8 py-3 md:text-lg font-bold transition-all duration-300 transform bg-gradient-to-r from-amber-400 to-amber-600 text-emerald-900 hover:from-amber-300 hover:to-amber-500 active:from-amber-300 active:to-amber-500 hover:scale-[1.02]"
                  >
                    Khám phá bộ sưu tập
                  </Button>
                  <Button
                    onClick={() => router.push("/#products")}
                    variant="outline"
                    className="px-8 py-3 md:text-lg font-semibold transition-all duration-300 transform border-amber-400 text-amber-500 hover:bg-amber-400 active:bg-amber-300 hover:text-emerald-900 hover:scale-[1.02] active:text-emerald-900"
                  >
                    Cửa hàng trực tuyến
                  </Button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
      <Footer aboutRef={aboutRef} />
    </Suspense>
  );
};
