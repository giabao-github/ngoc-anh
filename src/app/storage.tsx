import React from "react";

export const collections = [
  {
    id: 1,
    name: "Card Visit Thạch Âm (card)",
    description: "",
    image: "/products/featured-card-transparent.png",
  },
  {
    id: 2,
    name: "Huy Hiệu Thạch Âm (vàng)",
    description: "",
    image: "/products/yellow-badge-transparent.png",
  },
  {
    id: 3,
    name: "Huy Hiệu Thạch Âm (xanh rêu)",
    description: "",
    image: "/products/green-badge-transparent.png",
  },
  {
    id: 4,
    name: "Khăn Bandana Thạch Âm",
    description: "",
    image: "/products/badana-transparent.png",
  },
  {
    id: 5,
    name: "Card Visit Thạch Âm (hộp)",
    description: "",
    image: "/products/card-transparent.png",
  },
];

export const products = [
  {
    id: 1,
    name: "Huy hiệu Thạch Âm - Xanh Rêu",
    images: ["/products/green-badge.png", "/products/green-badge.jpg"],
    description: (
      <div className="space-y-4 text-sm tracking-normal text-gray-700 md:tracking-wide">
        <p>
          Huy hiệu này là một biểu tượng tinh tế của dự án Thạch Âm trong môn Đồ
          án Vốn cổ Khmer, kết hợp giữa yếu tố văn hóa truyền thống và thiết kế
          hiện đại.
        </p>
        <p>
          Logo "THẠCH ÂM" được trình bày nổi bật, với chữ "THẠCH" nằm gọn trong
          một khung hình chữ nhật và chữ "ÂM" đặt bên dưới, có thể được tạo hình
          cách điệu với những đường nét uốn lượn mang đậm phong cách nghệ thuật
          Khmer cổ điển. Một chi tiết đồ họa uốn lượn lấy cảm hứng từ các hoa
          văn truyền thống Khmer, có thể là hình ảnh Naga hoặc Kinnari cách
          điệu, được tích hợp khéo léo vào phần chữ hoặc bao quanh nó, tạo điểm
          nhấn ấn tượng.
        </p>
        <p>
          Phiên bản xanh rêu: Logo màu vàng đồng hoặc vàng gold nổi bật trên nền
          xanh rêu, tạo cảm giác sang trọng, cổ kính và quyền quý.
        </p>
      </div>
    ),
    code: "A001_693564536",
    brand: "Thạch Âm",
    material: "Kim loại mạ bóng, in hình phủ nhựa bóng/mờ",
    pin: "Ghim kim cài lưng (an toàn, dễ sử dụng)",
    type: "Huy hiệu truyền thống",
    details: [
      {
        color: "Nền xanh rêu",
        slug: "huy-hieu-truyen-thong-xanh-reu",
        price: 20000,
      },
      {
        color: "Nền vàng nhạt",
        slug: "huy-hieu-truyen-thong-vang-nhat",
        price: 20000,
      },
    ],
    size: "10 cm",
    quantity: 1800,
    rating: [25, 50, 70, 500, 800],
  },
  {
    id: 2,
    name: "Huy hiệu Thạch Âm - Vàng Nhạt",
    images: ["/products/yellow-badge.jpeg", "/products/yellow-badge.png"],
    description: (
      <div className="space-y-4 text-sm tracking-normal text-gray-700 md:tracking-wide">
        <p>
          Huy hiệu này là một biểu tượng tinh tế của dự án Thạch Âm trong môn Đồ
          án Vốn cổ Khmer, kết hợp giữa yếu tố văn hóa truyền thống và thiết kế
          hiện đại.
        </p>
        <p>
          Logo "THẠCH ÂM" được trình bày nổi bật, với chữ "THẠCH" nằm gọn trong
          một khung hình chữ nhật và chữ "ÂM" đặt bên dưới, có thể được tạo hình
          cách điệu với những đường nét uốn lượn mang đậm phong cách nghệ thuật
          Khmer cổ điển. Một chi tiết đồ họa uốn lượn lấy cảm hứng từ các hoa
          văn truyền thống Khmer, có thể là hình ảnh Naga hoặc Kinnari cách
          điệu, được tích hợp khéo léo vào phần chữ hoặc bao quanh nó, tạo điểm
          nhấn ấn tượng.
        </p>
        <p>
          Phiên bản vàng nhạt: Logo màu xanh rêu hoặc đen được đặt trên nền vàng
          nhạt, mang lại cảm giác nhẹ nhàng, trang nhã nhưng vẫn giữ được nét cổ
          điển.
        </p>
      </div>
    ),
    code: "A001_693564536",
    brand: "Thạch Âm",
    material: "Kim loại mạ bóng, in hình phủ nhựa bóng/mờ",
    pin: "Ghim kim cài lưng (an toàn, dễ sử dụng)",
    type: "Huy hiệu truyền thống",
    details: [
      {
        color: "Nền vàng",
        slug: "huy-hieu-truyen-thong-vang-nhat",
        price: 20000,
      },
      {
        color: "Nền xanh rêu",
        slug: "huy-hieu-truyen-thong-xanh-reu",
        price: 20000,
      },
    ],
    size: "10 cm",
    quantity: 1500,
    rating: [20, 40, 60, 400, 900],
  },
  {
    id: 3,
    name: "Khăn Bandana Thạch Âm",
    images: ["/products/badana-transparent.png"],
    background: "#EDEDED",
    description: (
      <div className="space-y-4 text-sm tracking-normal text-gray-700 md:tracking-wide">
        <p>"Khăn Bandana Thạch Âm: Nét Vàng Cổ Tích Giữa Làn Gió Hiện Đại."</p>
        <p>
          Hãy tưởng tượng bạn đang lạc bước giữa những hành lang đá rêu phong
          của Angkor, ánh nắng chiều hắt lên những phù điêu vàng son. Đó chính
          là cảm hứng bất tận mà nhóm Thạch Âm đã chắt lọc, gửi gắm vào từng sợi
          vải của chiếc khăn bandana đặc biệt này.
        </p>
        <p>
          Với sắc xanh rêu trầm mặc như thời gian ngủ yên trên đá, và những họa
          tiết vàng đồng tinh xảo như chính những kho báu ẩn mình, Khăn Bandana
          "Dấu Vàng Thời Gian" là sự giao thoa hoàn hảo giữa quá khứ lẫy lừng và
          phong cách cá nhân độc đáo. Mỗi chiếc khăn là một bản tuyên ngôn về vẻ
          đẹp di sản, được thiết kế thủ công đầy tâm huyết trong khuôn khổ môn
          Đồ án Vốn cổ Khmer.
        </p>
        <p>
          Hãy để chiếc khăn này không chỉ là phụ kiện, mà là câu chuyện bạn mang
          theo, là dấu ấn của một nền văn minh rực rỡ, sẵn sàng cùng bạn khám
          phá những hành trình mới.
        </p>
      </div>
    ),
    instruction: (
      <div className="space-y-4 text-sm tracking-normal text-gray-700 md:tracking-wide">
        <p>
          Để giữ gìn vẻ đẹp nguyên bản và giá trị tinh thần của Khăn Bandana
          Thạch Âm, bạn nên giặt tay nhẹ nhàng với nước lạnh và xà phòng dịu
          nhẹ.
        </p>
        <p>
          Tránh sử dụng thuốc tẩy hoặc giặt máy ở chế độ mạnh, vì có thể làm
          phai màu và ảnh hưởng đến chất vải thủ công.
        </p>
        <p>
          Khi phơi, nên phơi khăn ở nơi thoáng mát, tránh ánh nắng trực tiếp để
          giữ cho sắc xanh rêu và họa tiết vàng đồng luôn rực rỡ theo thời gian.
        </p>
        <p>
          Khi không sử dụng, bạn có thể gấp gọn khăn và bảo quản trong túi vải
          hoặc hộp, như cách lưu giữ một mảnh di sản - để mỗi lần mở ra, vẫn vẹn
          nguyên cảm xúc ban đầu.
        </p>
      </div>
    ),
    code: "A001_694535520",
    brand: "Thạch Âm",
    material: "Luạ",
    type: "Khăn Badana",
    details: [
      {
        color: "Xanh rêu đậm",
        slug: "khan-bandana-thach-am",
        price: 250000,
      },
    ],
    size: "55 cm x 55 cm",
    quantity: 200,
    rating: [15, 25, 50, 320, 900],
  },
  {
    id: 4,
    name: "Card Visit Thạch Âm",
    images: ["/products/card.png", "/products/featured-card.png"],
    description: (
      <div className="space-y-4 text-sm tracking-normal text-gray-700 md:tracking-wide">
        <p>Giới Thiệu Bộ Card Visit "Thạch Âm: Dấu Ấn Di Sản Khmer"</p>
        <p>"Không chỉ là card visit, đây là một tuyên ngôn văn hóa."</p>
        <p>
          Trong thế giới hiện đại, nơi sự kết nối là chìa khóa, nhóm Thạch Âm tự
          hào giới thiệu bộ card visit độc đáo, tinh hoa của quá trình nghiên
          cứu và sáng tạo trong môn Đồ án Vốn cổ Khmer. Mỗi tấm card không chỉ
          mang thông tin liên hệ, mà còn là một tác phẩm nghệ thuật, một minh
          chứng sống động cho vẻ đẹp trường tồn của di sản Khmer.
        </p>
        <div className="space-y-2">
          <p>Thiết kế song hành - Vẻ đẹp đối lập hài hòa:</p>
          <p>
            Mặt A (Xanh Rêu Đậm & Vàng Đồng): Nổi bật với tông màu xanh rêu sâu
            thẳm, gợi nhớ đến những phiến đá cổ kính rêu phong và khu rừng huyền
            bí bao quanh các đền đài Angkor. Trên nền xanh ấy, logo "THẠCH ÂM"
            và các họa tiết Khmer cổ điển được in nổi hoặc dập chìm với sắc vàng
            đồng rực rỡ, tượng trưng cho sự thịnh vượng, quyền quý và ánh hào
            quang của một nền văn minh vàng son. Mặt này thể hiện sự vững chãi,
            uy nghi và chiều sâu văn hóa.
          </p>
          <p>
            Mặt B (Vàng Nhạt & Xanh Rêu Đậm): Mang một sắc thái tươi sáng hơn
            với nền vàng nhạt (kem/ngà), tượng trưng cho sự tinh khiết, ánh sáng
            và sự khởi đầu mới. Các họa tiết Khmer uốn lượn tinh tế và thông tin
            liên hệ được trình bày bằng màu xanh rêu đậm, tạo sự tương phản đầy
            cuốn hút. Mặt này thể hiện sự thanh lịch, gần gũi và tính ứng dụng
            hiện đại, nhưng vẫn giữ được nét cổ kính qua các chi tiết hoa văn.
          </p>
        </div>
        <div className="space-y-2">
          <p>Điểm nhấn từ họa tiết:</p>
          <p>
            Mỗi họa tiết trên card được nhóm Thạch Âm tỉ mỉ nghiên cứu và cách
            điệu từ những hoa văn truyền thống Khmer, như hình ảnh Naga uốn
            lượn, các đường kỷ hà phức tạp, hay những mô-típ lá cây, hoa sen
            quen thuộc trong kiến trúc và điêu khắc cổ. Điều này không chỉ tăng
            tính thẩm mỹ mà còn kể một câu chuyện về bản sắc văn hóa.
          </p>
        </div>
        <div className="space-y-2">
          <p>Chất liệu và hoàn thiện:</p>
          <p>
            Bộ card được in trên chất liệu giấy cao cấp, có độ dày dặn và bề mặt
            được xử lý tinh tế (giấy mỹ thuật có cán mờ/bóng nhẹ), mang lại cảm
            giác sang trọng và đẳng cấp khi cầm trên tay.
          </p>
        </div>
        <div className="space-y-2">
          <p>Ý nghĩa:</p>
          <p>
            Bộ card visit "Thạch Âm: Dấu Ấn Di Sản Khmer" không chỉ là công cụ
            giao tiếp. Đó là một lời mời khám phá, một cầu nối giữa quá khứ vĩ
            đại và hiện tại đầy tiềm năng, là biểu tượng cho sự sáng tạo và tâm
            huyết của nhóm Thạch Âm trong việc gìn giữ và lan tỏa giá trị vốn cổ
            Khmer.
          </p>
        </div>
        <p>Hãy trao đi tấm card này, và bạn đang trao đi một câu chuyện.</p>
      </div>
    ),
    code: "A001_01134034503",
    brand: "Thạch Âm",
    material: "Giấy mỹ thuật cao cấp",
    type: "Card Visit",
    details: [
      {
        color: "Xanh rêu đậm & vàng đồng",
        slug: "card-visit-thach-am",
        price: 5000,
      },
    ],
    size: "90 mm x 54 mm",
    quantity: 120,
    rating: [4, 8, 12, 190, 1256],
  },
];
