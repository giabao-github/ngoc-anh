import { ProductContent } from "@/types/product";

// Map slugs to their corresponding dynamic import paths
const productContentImporters: Record<
  string,
  () => Promise<{ default: ProductContent }>
> = {
  "huy-hieu-thach-am-xanh-reu": () => import("@/content/products/GreenBadge"),
  "huy-hieu-thach-am-vang-nhat": () => import("@/content/products/YellowBadge"),
  "khan-bandana-thach-am": () => import("@/content/products/Bandana"),
  "card-visit-thach-am": () => import("@/content/products/VisitCard"),
  "quat-tay-thach-am-khmer-wind": () => import("@/content/products/KhmerWind"),
  "quat-tay-thach-am-naga-wind": () => import("@/content/products/NagaWind"),
};

export const getProductContent = async (
  slug: string,
): Promise<ProductContent> => {
  const importer = productContentImporters[slug];
  if (!importer) {
    return {};
  }
  try {
    const mod = await importer();
    return mod.default;
  } catch {
    return {};
  }
};
