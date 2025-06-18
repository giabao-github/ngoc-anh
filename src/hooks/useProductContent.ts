import { useMemo } from "react";

import { getProductContent } from "@/libs/productContentUtils";

import { Product, ProductContent } from "@/types/product";

export const useProductContent = (product: Product): ProductContent => {
  return useMemo(() => {
    const result: ProductContent = {};
    const keyMap: Record<
      keyof Pick<Product, "descriptionKey" | "instructionKey" | "noteKey">,
      keyof ProductContent
    > = {
      descriptionKey: "description",
      instructionKey: "instruction",
      noteKey: "note",
    };

    (Object.keys(keyMap) as Array<keyof typeof keyMap>).forEach((k) => {
      const slug = product[k];
      if (!slug) {
        return;
      }
      const c = getProductContent(slug);
      const field = keyMap[k];
      if (c[field]) {
        result[field] = c[field];
      }
    });
    return result;
  }, [product.descriptionKey, product.instructionKey, product.noteKey]);
};
