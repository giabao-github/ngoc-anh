import React from 'react';

export const collections = [
  {
    id: 1,
    name: "Nồi sứ dưỡng sinh",
    description: "Sứ dưỡng sinh được thiết kế với đa dạng kiểu dáng, kích cỡ khác nhau, phù hợp với mọi phương pháp nấu ăn như xào, kho, nấu cơm, luộc/hấp, nấu canh, chiên, rang, nấu chậm,...và mọi loại bếp chuyên dụng như bếp gas, bếp hồng ngoại, bếp từ, lò nướng.",
    image: "https://file.hstatic.net/200000532849/file/banner_home_page_pc_1058x758px_6_fe76c86bb70b4f70a2631f859f15f45b.png"
  },
  {
    id: 2,
    name: "Bộ Sưu Tập Minh Long",
    description: "Sản phẩm Minh Long được phối hợp theo nhiều phong cách màu sắc, chú trọng tính hài hòa, trang nhã nên phù hợp với mọi thời đại",
    image: "https://file.hstatic.net/200000532849/file/banner_home_page_pc_1058x758px_5_f6da3bfa993a4387a3fe85d3adf35011.png"
  },
  {
    id: 3,
    name: "Bộ Sưu Tập Minh Long",
    description: "Sản phẩm Minh Long được phối hợp theo nhiều phong cách màu sắc, chú trọng tính hài hòa, trang nhã nên phù hợp với mọi thời đại",
    image: "https://file.hstatic.net/200000532849/file/banner_home_page_pc_1058x758px_7_3a6734b4aa374afd9225c6a91935b9ec.png"
  },
  {
    id: 4,
    name: "Bộ Sưu Tập Minh Long",
    description: "Sản phẩm Minh Long được phối hợp theo nhiều phong cách màu sắc, chú trọng tính hài hòa, trang nhã nên phù hợp với mọi thời đại",
    image: "https://file.hstatic.net/200000532849/file/banner_home_page_pc_1058x758px_8_ad7e3a1e46464d59aa546b4a10351924.png"
  },
  {
    id: 5,
    name: "Bộ Sưu Tập Minh Long",
    description: "Sản phẩm Minh Long được phối hợp theo nhiều phong cách màu sắc, chú trọng tính hài hòa, trang nhã nên phù hợp với mọi thời đại",
    image: "https://file.hstatic.net/200000532849/file/desktop.png"
  },
];


export const products = [
  {
    id: 1,
    name: "Bình hoa 35 cm - Xuân Ca",
    images: [
      "https://product.hstatic.net/200000532849/product/binh-hoa-35-cm-binh-hoa-xuan-ca_693564536-sm-01_5fe99ccf497b41bb8870c389519de331_grande.png?v=1746845545811",
      "https://product.hstatic.net/200000532849/product/binh-hoa-35-cm-binh-hoa-xuan-ca_693564536-sm-03_65cbd37dfbd14d73b19dea9b407d905d_grande.png?v=1746845545811",
      "https://product.hstatic.net/200000532849/product/binh-hoa-35-cm-binh-hoa-xuan-ca_693564536-sm-04_5af9db21f7784c61a6656b8f10d58c54_grande.png?v=1746845545811"
    ],
    description: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p>Dù ở bất cứ đâu, mỗi độ mai - đào khoe sắc, lòng người lại hân hoan trở về bên gia đình đón một mùa xuân mới. Tất thảy ý nghĩa của sự sum vầy ấm áp trong ngày Tết, được Minh Long gửi gắm trọn vẹn qua Bình hoa Xuân Ca. Vẻ đẹp của hai loài hoa đặc trưng hòa quyện như vũ điệu rộn ràng mùa xuân. Mai vàng rực rỡ từ phương Nam mang theo lời chúc thịnh vượng, trường thọ. Trong khi đào thắm tươi miền Bắc khẽ chạm đến an lành, hạnh phúc. Cổ bình điểm xuyết hoa sen, biểu trưng cho tâm hồn thuần khiết. Gam màu xanh cobalt dịu mát, kết hợp với viền vàng 24k lấp lánh, tạo nên nét trang nhã và quý phái, tô điểm không gian thêm sinh động.</p>
        <p>Bình hoa Xuân Ca gửi gắm lời chúc phúc vẹn toàn cho chủ sở hữu, gợi nhớ về những mùa Tết đoàn viên. Đồng thời thể hiện nghĩa tình gắn kết giữa hai miền, tạo nên bản hòa ca tuyệt diệu của đất trời trước thềm xuân mới.</p>
      </div>
    ),
    code: "A001_693564536",
    brand: "Minh Long",
    collection: "Bình Hoa",
    type: "Bình hoa",
    patterns: [
      {
        name: "Xuân Ca",
        slug: "binh-hoa-35-cm-xuan-ca",
        price: 7560000
      },
      {
        name: "Se Sẻ Và Bông Hoa",
        slug: "binh-hoa-35-cm-se-se-va-bong-hoa",
        price: 8424000
      },
    ],
    size: "35 cm",
    quantity: 15,
    rating: [25, 50, 70, 500, 800]
  },
  {
    id: 2,
    name: "Bình hoa 35 cm - Se Sẻ Và Bông Hoa",
    images: [
      "https://product.hstatic.net/200000532849/product/binh-hoa-35-cm-binh-hoa-se-se-va-bong-hoa_693564545-sm-01_4b050a2726b944a48a3b6ea83336239f_grande.png?v=1746845410130",
      "https://product.hstatic.net/200000532849/product/binh-hoa-35-cm-binh-hoa-se-se-va-bong-hoa_693564545-sm-03_e09a55a0b3ab4f5ab27375ca7edb2684_grande.png?v=1746845410130",
      "https://product.hstatic.net/200000532849/product/binh-hoa-35-cm-binh-hoa-se-se-va-bong-hoa_693564545-sm-04_dfb3bb29cb2e4513ae81e9ac1e8c502f_grande.png?v=1746845410130"
    ],
    description: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p>Bình Se Sẻ và Bông Hoa, nơi nghệ thuật truyền thống được tái sinh dưới góc nhìn tươi mới và hiện đại. Hình ảnh chim Se Sẻ nhẹ nhàng đậu trên cành hoa Mẫu Đơn tạo nên bức tranh thiên nhiên tươi đẹp và tràn đầy sức sống. Đồng thời gợi nhắc những cảm xúc mới mẻ về sự sum họp, hạnh phúc, thịnh vượng mà mọi gia đình đều mong ước trong năm mới. Đặc biệt, màu xanh cobalt nổi bật trên nền sứ trắng như sắc xuân đang trỗi dậy, khơi gợi cảm giác an lành. Điểm nhấn vàng 24k tinh tế tạo sự phá cách, giúp bình hoa trở nên nổi bật trong bất kỳ không gian nào.</p>
        <p>Bình Se Sẻ và Bông Hoa không chỉ gói gọn trong ý nghĩa trang trí mà còn mang thông điệp về sự khởi đầu mới suôn sẻ, nhiều hy vọng. Đây cũng là món quà ý nghĩa dành cho người thân, bạn bè, đối tác,… với lời chúc thành công, may mắn và phú quý.</p>
      </div>
    ),
    code: "A001_693564545",
    brand: "Minh Long",
    collection: "Bình Hoa",
    type: "Bình hoa",
    patterns: [
      {
        name: "Se Sẻ Và Bông Hoa",
        slug: "binh-hoa-35-cm-se-se-va-bong-hoa",
        price: 8424000
      },
      {
        name: "Xuân Ca",
        slug: "binh-hoa-35-cm-xuan-ca",
        price: 7560000
      },
    ],
    size: "35 cm",
    quantity: 27,
    rating: [20, 40, 60, 400, 900]
  },
  {
    id: 3,
    name: "Bình hoa lục giác 45 cm (quai rồng) - Thịnh Vượng (vàng)",
    images: [
      "https://product.hstatic.net/200000532849/product/nh-hoa-luc-giac-45-cm-quai-rong-binh-hoa-thinh-vuong-vang_694535520-sm_c657df4ae5fe467aa8e5d72af09a765c_grande.png?v=1746852968839"
    ],
    description: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p>Lộc Bình được thiết kế gồm 3 phần cổ bình, thân bình và đế bình, được trang trí với những họa tiết giàu ý nghĩa, mang đậm truyền thống Việt Nam như hoa sen, hoa mai, hoa đào, dương xỉ… Họa tiết chủ đạo trên 2 mặt chính của Lộc Bình là hình ảnh hoa sen được khắc họa đầy nghệ thuật và sống động. Hai mặt bên của thân bình còn được trang trí hình ảnh bốn linh vật long, lân, quy, phụng - tượng trưng cho sự thái bình và thịnh vượng đem đến nhiều may mắn, điềm lành. Phần cổ bình được trang trí bằng họa tiết hoa mai, hoa đào với vẻ đẹp rực rỡ, thắm tươi, đại diện cho tài lộc, phú quý nhằm gửi gắm thông điệp ý nghĩa về sự hưng thịnh, phát triển.</p>
        <p>Đặc biệt, hai bên cổ bình còn được trang trí thêm linh vật rồng Việt cách điệu - tượng trưng cho nòi giống Rồng – Tiên. Hình ảnh bốn con dơi tượng trưng cho sự may mắn, phước lộc, cùng những họa tiết khác như cá chép hay hoa dương xỉ, tượng trưng cho sự trường cửu (lâu dài) càng tôn lên nét sang trọng, ý nghĩa tinh tế của Lộc Bình. Hình ảnh hoa cúc ở đế bình tượng trưng cho kiết tường (an lành) cũng được thể hiện một cách khéo léo. Tất cả tạo nên bức tranh cảnh sắc mùa xuân, đầy sức sống và giàu nghệ thuật. Tuyệt tác được đội ngũ nghệ nhân tài hoa nhất của Minh Long kỳ công chế tác vừa có giá trị mỹ thuật cao, vừa mang thông điệp, lời chúc phước - lộc - thọ, may mắn, an lành đến chủ sở hữu.</p>
      </div>
    ),
    instruction: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p>Bình hoa là dòng sản phẩm cao cấp không chỉ bởi sự tinh tế, kiểu dáng độc đáo mà còn hội tụ cả cái tâm, cái tài của từng nghệ nhân thực hiện. Mỗi tác phẩm được hình thành từ chính đôi tay tài hoa của người thợ xoay bình cần mẫn, nét cọ khéo léo, tinh tế của người thợ vẽ và sự góp sức miệt mài của bao nghệ nhân khác.</p>
        <p>Mỗi bình hoa mang một phong cách với những cảm xúc riêng, như đất đã được thổi vào hơi thở của chính những người tạo ra nó. Trên mỗi tác phẩm, thiên nhiên và cuộc sống được tái hiện sống động, có hồn với đầy đủ các màu sắc của tình yêu, quê hương, đất nước, con người, gắn với ước vọng bình an, sung túc, thịnh vượng,... Những phong cách ấy được phối kết hài hòa trên những kiểu dáng Đông – Tây, tạo nên bao không gian vừa cổ kính, ấm cúng mà vẫn hiện đại, sang trọng, phù hợp với nhiều cách bày trí ở những không gian khác nhau.</p>
        <p>Nhờ ứng dụng công nghệ nano và vẽ màu ở nhiệt độ cao nên màu chìm dưới men, những nét vẽ khéo léo còn được giữ nguyên vẹn, hình ảnh trên sản phẩm có chiều sâu và sống động như thật.</p>
      </div>
    ),
    code: "A001_694535520",
    brand: "Minh Long",
    collection: "Bình Hoa",
    type: "Bình hoa",
    patterns: [
      {
        name: "Thịnh Vượng (vàng)",
        slug: "binh-hoa-luc-giac-45-cm-quai-rong-thinh-vuong-vang",
        price: 39960000
      }
    ],
    size: "45 cm",
    quantity: 2,
    rating: [15, 25, 50, 320, 900]
  },
  {
    id: 4,
    name: "Bộ trà 1.3 L - Hoàng Cung - Sen Vàng",
    images: [
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-sen-vang_01134034503-sm-01_dfab663977b444dc93db0c920bb1a6bb_grande.png?v=1746856668850",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-sen-vang_01134034503-sm-02_1bee19ba03eb4132a92e5fafbca25c93_grande.png?v=1746856668850",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-sen-vang_01134034503-sm-03_15dd2f9b1d9a46b190dcc219ee219d86_grande.png?v=1746856668850",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-sen-vang_01134034503-sm-05_ec57f161156144de824fa61a741feca7_grande.png?v=1746856668850",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-sen-vang_01134034503-sm-04_1771b603443543158cf0d5c1e0d6ad6f_grande.jpg?v=1746856668850"
    ],
    description: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p>Khoác lên vẻ truyền thống, nền nã của loài hoa Á Đông nhưng lại không kém phần tinh tế hiện đại, những cánh sen bung tròn, phúc hậu ôm lấy nhụy đã được tái hiện sống động bằng màu xanh cobalt đặc trưng của cung đình Huế. Bức tranh chân thực và sống động về lá, cỏ và hoa sen như đưa người ngắm về với một làng quê Việt Nam vốn yên bình, trù phú...  Nghệ nhân cũng khéo léo tạo nét vương giả bằng những chi tiết vẽ vàng 24k uyển chuyển trên từng cánh hoa, vành, tay cầm và nắp tạo nên sắc màu lấp lánh dưới sự phản chiếu của ánh sáng. Bộ sản phẩm thích hợp cho những buổi sum họp thân tình trong không gian yên bình, thư giãn vừa gần gũi vừa sang trọng.</p>
      </div>
    ),
    code: "A001_01134034503",
    brand: "Minh Long",
    collection: "Hoàng Cung",
    type: "Bộ trà 1.3 L",
    patterns: [
      {
        name: "Sen Vàng",
        slug: "bo-tra-1-3-l-hoang-cung-sen-vang",
        price: 5821200
      }
    ],
    volume: "1.3 L",
    quantity: 40,
    rating: [4, 8, 12, 190, 1256]
  },
  {
    id: 5,
    name: "Bộ trà 1.3 L - Hoàng Cung - Quốc Sắc",
    images: [
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-quoc-sac_01134006803-sm-01_89aa4d41236446c2a9e296283b255556_grande.png?v=1746857440318",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-quoc-sac_01134006803-sm-02_cb2d5c14d820433385f8d6085421393f_grande.png?v=1746857440318",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-quoc-sac_01134006803-sm-05_d2f940589f524856ace029a51d481da4_grande.png?v=1746857440318",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-quoc-sac_01134006803-sm-04_5d88a2a78c4145ef80cdffecc278679a_grande.jpg?v=1746857440318"
    ],
    description: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p></p>
      </div>
    ),
    code: "A001_01134006803",
    brand: "Minh Long",
    collection: "Hoàng Cung",
    type: "Bộ trà 1.3 L",
    patterns: [
      {
        name: "Quốc Sắc",
        slug: "bo-tra-1-3-l-hoang-cung-quoc-sac",
        price: 32076000
      }
    ],
    volume: "1.3 L",
    quantity: 9,
    rating: [3, 7, 10, 130, 1450]
  },
  {
    id: 6,
    name: "Bộ trà 1.3 L - Hoàng Cung - Huyền Liên",
    images: [
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-01_28e1e21f102c48b38b19fbd0f17ca8a2_grande.png?v=1746847177048",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-02_fa1175e22d14441faff6dbbdb58078f6_grande.png?v=1746847177048",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-05_b81247d95958423f8c399d46dcde3fa3_grande.png?v=1746847177048",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-04_43409f460da04a1db7b3ab6704f911f9_grande.jpg?v=1746847177048"
    ],
    description: (
      <div className="text-sm md:text-base text-gray-700 space-y-2">
        <p>Bộ sản phẩm Huyền Liên lấy cảm hứng từ vẻ đẹp truyền thống nhưng không kém phần tinh tế của loài hoa Á Đông. Những cánh hoa sen bung tròn, thể hiện trọn vẹn sự sống động bằng sắc đen quý phái. Những chi tiết vẽ vàng 24k uyển chuyển trên từng cánh hoa, vành, tay cầm và nắp giúp sản phẩm thêm phần cao quý. Huyền Liên thích hợp cho những buổi đón tiếp khách mời quan trọng của gia đình. Sản phẩm giữ nhiệt ổn định, giúp thức uống nóng lâu và lưu giữ hương vị thơm ngon đặc trưng. Bộ trà Huyền Liên cũng là chế tác đặc biệt dành tặng Nguyên Thủ các quốc gia ASEAN 2020.</p>
      </div>
    ),
    code: "A001_01134046703",
    brand: "Minh Long",
    collection: "Hoàng Cung",
    type: "Bộ trà 1.3 L",
    patterns:[ 
      {
        slug: "bo-tra-1-3l-hoang-cung-huyen-lien",
        name: "Huyền Liên",
        price: 61236000
      }
    ],
    volume: "1.3 L",
    quantity: 10,
    rating: [5, 10, 15, 180, 1290]
  },
  {
    id: 7,
    name: "Bộ trà 1.3 L - Hoàng Cung - Huyền Liên",
    images: [
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-01_28e1e21f102c48b38b19fbd0f17ca8a2_grande.png?v=1746847177048",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-02_fa1175e22d14441faff6dbbdb58078f6_grande.png?v=1746847177048",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-05_b81247d95958423f8c399d46dcde3fa3_grande.png?v=1746847177048",
      "https://product.hstatic.net/200000532849/product/bo-tra-13-l-hoang-cung-huyen-lien_01134046703-sm-04_43409f460da04a1db7b3ab6704f911f9_grande.jpg?v=1746847177048"
    ],
    code: "A001_01134046703",
    brand: "Minh Long",
    collection: "Hoàng Cung",
    type: "Bộ trà 1.3 L",
    patterns: [
      {
        name: "Huyền Liên",
        slug: "bo-tra-1-3l-hoang-cung-huyen-lien",
        price: 61236000
      }
    ],
    volume: "1.3 L"
  },
];