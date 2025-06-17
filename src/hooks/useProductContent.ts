import { useMemo } from "react";

import { getProductContent } from "@/app/content/productContent";
import { Product, ProductContent } from "@/types/product";

export const useProductContent = (product: Product): ProductContent => {
  return useMemo(() => {
    const content: ProductContent = {};

    if (product.descriptionKey) {
      const productContent = getProductContent(product.descriptionKey);
      if (productContent.description) {
        content.description = productContent.description;
      }
    }

    if (product.instructionKey) {
      const productContent = getProductContent(product.instructionKey);
      if (productContent.instruction) {
        content.instruction = productContent.instruction;
      }
    }

    if (product.noteKey) {
      const productContent = getProductContent(product.noteKey);
      if (productContent.note) {
        content.note = productContent.note;
      }
    }

    return content;
  }, [product.descriptionKey, product.instructionKey, product.noteKey]);
};
