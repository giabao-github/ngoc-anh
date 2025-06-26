import { ProductContent } from "@/types/product";

const beverages: ProductContent = {
  description: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>
        Hòa mình vào hành trình khám phá hương vị tinh túy từ trái tim miền đất
        Phật – Thạch Âm Khmer Pure. Được chắt lọc từ những dòng nước mía thanh
        khiết, nước dừa ngọt lành và dừa nước mọng tươi, mỗi chai nước không chỉ
        là thức uống giải khát mà còn là một tác phẩm nghệ thuật. Lấy cảm hứng
        sâu sắc từ những họa tiết Khmer cổ kính, được chế tác tỉ mỉ bởi nhóm
        Thạch Âm, sản phẩm là sự giao thoa hài hòa giữa thiên nhiên thuần khiết
        và di sản văn hóa độc đáo. Hãy thưởng thức để cảm nhận trọn vẹn sự tươi
        mát và tinh hoa.
      </p>
    </div>
  ),
  instruction: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>
        Lắc nhẹ trước khi dùng: Do sản phẩm được làm từ nguyên liệu tự nhiên, có
        thể có hiện tượng lắng cặn nhẹ. Vui lòng lắc đều chai trước khi uống để
        đảm bảo hương vị đồng nhất.
      </p>
      <p>Uống trực tiếp: Sản phẩm đã sẵn sàng để thưởng thức ngay.</p>
      <p>
        Ngủ đông (Tùy chọn): Có thể thêm đá hoặc ướp lạnh thêm để tăng cảm giác
        sảng khoái, đặc biệt trong thời tiết nóng.
      </p>
      <p>
        Không tái sử dụng chai: Chai thủy tinh của chúng tôi được thiết kế để
        bảo quản sản phẩm tốt nhất. Vui lòng không tái sử dụng chai để đựng các
        chất lỏng khác nhằm đảm bảo vệ sinh và an toàn.
      </p>
      <p>
        Thận trọng: Sản phẩm không chứa chất bảo quản nên cần được bảo quản và
        sử dụng đúng cách để duy trì độ tươi ngon.
      </p>
    </div>
  ),
  maintenance: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>
        Bảo quản lạnh: Sản phẩm cần được bảo quản liên tục trong tủ lạnh (ngăn
        mát) ở nhiệt độ từ 2°C đến 8°C.
      </p>
      <p>
        Tránh ánh nắng trực tiếp: Không để sản phẩm tiếp xúc trực tiếp với ánh
        nắng mặt trời hoặc gần các nguồn nhiệt cao, điều này có thể làm giảm
        chất lượng và thời gian bảo quản.
      </p>
      <p>
        Để xa hóa chất và mùi mạnh: Tránh đặt sản phẩm gần các loại hóa chất,
        chất tẩy rửa hoặc thực phẩm có mùi mạnh để không làm ảnh hưởng đến hương
        vị tự nhiên.
      </p>
      <div className="space-y-2">
        <p>Thời hạn sử dụng:</p>
        <p>
          Trong tủ lạnh: Sử dụng tốt nhất trong vòng [Ví dụ: 3-5 ngày / 5-7
          ngày] kể từ ngày sản xuất. Vui lòng xem "Ngày sản xuất" và "Hạn sử
          dụng" được in trên bao bì sản phẩm.
        </p>
        <p>
          Sau khi mở nắp: Nên sử dụng hết trong vòng [Ví dụ: 12-24 giờ] sau khi
          mở nắp và đậy kín.
        </p>
      </div>
    </div>
  ),
  note: (
    <div className="space-y-4 text-sm tracking-normal text-gray-700 md:text-base md:tracking-wide">
      <p>Sản phẩm chỉ dùng để uống.</p>
      <p>
        Không sử dụng sản phẩm khi đã hết hạn sử dụng, có mùi lạ, hoặc có dấu
        hiệu hư hỏng.
      </p>
      <p>
        Thưởng thức hương vị tinh túy từ thiên nhiên cùng Thạch Âm Khmer Pure!
      </p>
      <div className="space-y-2">
        <p>Giải thích một số điểm quan trọng:</p>
        <p>
          "Thời hạn sử dụng": Đây là yếu tố cực kỳ quan trọng đối với sản phẩm
          tự nhiên, không chất bảo quản. Bạn cần sử dụng trong vòng 1-2 ngày.
        </p>
        <p>
          "Lắc nhẹ trước khi dùng": Rất cần thiết vì các thành phần tự nhiên có
          thể lắng xuống.
        </p>
        <p>
          "Không tái sử dụng chai": Khuyến cáo này giúp đảm bảo vệ sinh an toàn
          và tránh việc người tiêu dùng dùng chai để đựng các chất khác mà có
          thể gây nhiễm khuẩn hoặc phản ứng với vật liệu chai.
        </p>
      </div>
    </div>
  ),
};

export default beverages;
