import { ProductContent } from "@/types/product";

const handbag: ProductContent = {
  description: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>
        “Túi Ngọc Lục Naga” là sản phẩm do nhóm Thạch Âm thiết kế, lấy cảm hứng
        từ họa tiết Khmer của chùa Phướng. Sự kết hợp tinh tế giữa sắc ngọc lục
        bảo và hình tượng rồng Naga tượng trưng cho may mắn, bảo hộ và thịnh
        vượng. Chiếc túi không chỉ là phụ kiện tiện ích, mà còn là lời nhắn gửi
        giữ gìn và lan tỏa giá trị văn hóa Khmer đặc sắc.
      </p>
    </div>
  ),
  instruction: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>Sử dụng túi để đựng vật dụng cá nhân, tài liệu, hoặc đồ dùng nhẹ.</p>
      <p>
        Tránh để vật nặng, sắc nhọn dễ làm biến dạng hoặc hư hỏng bề mặt vải.
      </p>
      <p>
        Thích hợp sử dụng hằng ngày, đi chợ, đi làm, hoặc du lịch ngắn ngày.
      </p>
    </div>
  ),
  maintenance: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>Giặt tay nhẹ nhàng với nước mát, không sử dụng chất tẩy mạnh.</p>
      <p>
        Phơi nơi thoáng mát, tránh ánh nắng trực tiếp để giữ màu sắc bền lâu.
      </p>
      <p>Không ủi trực tiếp lên bề mặt họa tiết.</p>
      <p>Khi không sử dụng, bảo quản túi ở nơi khô ráo, tránh ẩm mốc.</p>
    </div>
  ),
};

export default handbag;
