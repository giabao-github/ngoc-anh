import { FiHeart } from "react-icons/fi";
import { Product } from "../types";
import { cn } from "../lib/utils";
import { Separator } from "../ui/separator";


interface ProductInfoProps {
  product: Product;
  isFavorite: boolean;
  setIsFavorite: (value: boolean) => void;
}

const ProductInfo: React.FC<ProductInfoProps> = ({ product, isFavorite, setIsFavorite }) => {
  return (
    <>
      <div className="flex justify-between items-start">
        <h1 className="text-xl md:text-3xl font-bold max-w-[90%]">{product.name}</h1>
        <button
          title={`${isFavorite ? 'Remove from Favorite' : 'Add to Favorite'}`}
          onClick={() => setIsFavorite(!isFavorite)}
          className={`group p-0 md:p-3 rounded-lg cursor-pointer outline-none ring-0 focus:ring-0 focus:outline-none md:hover:bg-red-50 ${isFavorite ? "md:bg-red-50" : "bg-transparent md:bg-gray-50"}`}
        >
          <FiHeart
            className={cn(
              "w-6 h-6",
              isFavorite ? "fill-rose-500 stroke-rose-500" : "stroke-gray-500",
              "group-hover:fill-rose-500 group-hover:stroke-rose-500"
            )}
          />
        </button>
      </div>

      <div className="space-y-2 text-xs tracking-wide text-gray-700">
        <p>{`Mã sản phẩm: ${product.code}`}</p>
        <p>{`Thương hiệu: ${product.brand}`}</p>
        <p>{`Bộ sưu tập: ${product.collection}`}</p>
      </div>

      <p className="text-2xl md:text-4xl font-bold text-orange-500">{product.patterns[0]?.price?.toLocaleString('en-US') ?? 'Giá liên hệ'}₫</p>

      <Separator color="#BB9244" opacity={40} />
    </>
  );
}

export default ProductInfo;