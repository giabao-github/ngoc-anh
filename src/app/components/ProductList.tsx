import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { products } from "../storage";
import { CartItem, Product } from "../types";
import CartProduct from "./CartProduct";


interface ProductListProps {
  cartItems: CartItem[],
  handleRemove: (id: number) => void,
  handleQuantityChange: (type: "increment" | "decrement" | "set", product: Product, value?: number) => void,
  isMobile: boolean,
};

const ProductList: React.FC<ProductListProps> = ({ cartItems, handleRemove, handleQuantityChange, isMobile }) => {
  return (
    <ScrollArea className={isMobile ? "px-3" : "px-8"}>
      <div className={isMobile ? "space-y-2 max-h-[400px]" : "space-y-6 max-h-[480px]"}>
        {cartItems.map((item, index) => {
          const product = products.find((product) => product.id === item.id);
          if (!product) {
            return null;
          }
          
          return (
            <CartProduct
              key={item.slug}
              item={item}
              index={index}
              product={product}
              handleRemove={handleRemove}
              handleQuantityChange={handleQuantityChange}
            />
          );
        })}
        <ScrollBar orientation="vertical" />
      </div>
    </ScrollArea>
  );
};

export default ProductList;