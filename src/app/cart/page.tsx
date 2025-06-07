import { Metadata } from "next";

import { CartView } from "@/modules/cart/views/CartView";

export const metadata: Metadata = {
  title: "Giỏ hàng của bạn",
};

const CartPage = () => {
  return <CartView />;
};

export default CartPage;
