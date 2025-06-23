import { useEffect, useState } from "react";

import { getProductContent } from "@/utils/productContentUtils";

import { Product, ProductContent } from "@/types/product";

// In-memory cache for loaded product content
const contentCache = new Map<string, ProductContent>();

export const useProductContent = (product: Product) => {
  const [content, setContent] = useState<ProductContent>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      const result: ProductContent = {};
      const keyMap: Record<
        keyof Pick<Product, "descriptionKey" | "instructionKey" | "noteKey">,
        keyof ProductContent
      > = {
        descriptionKey: "description",
        instructionKey: "instruction",
        noteKey: "note",
      };

      try {
        await Promise.all(
          (Object.keys(keyMap) as Array<keyof typeof keyMap>).map(async (k) => {
            const slug = product[k];
            if (!slug) {
              return;
            }
            // Use cache if available
            let c: ProductContent | undefined = contentCache.get(slug);
            if (!c) {
              c = await getProductContent(slug);
              contentCache.set(slug, c);
            }
            const field = keyMap[k];
            if (c[field]) {
              result[field] = c[field];
            }
          }),
        );
        if (isMounted) {
          setContent(result);
          setIsLoading(false);
        }
      } catch (e) {
        if (isMounted) {
          setError("Không thể tải nội dung sản phẩm.");
          setIsLoading(false);
        }
      }
    };
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, [product.descriptionKey, product.instructionKey, product.noteKey]);

  return { content, isLoading, error };
};
