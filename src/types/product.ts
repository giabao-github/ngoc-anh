export type BaseProduct = {
  id: number;
  name: string;
  images: string[];
  background?: string;
  zoom?: number[];
  code: string;
  brand: string;
  material?: string;
  bottleMaterial?: string;
  pin?: string;
  category: string;
  details: ProductDetail[];
  size?: string;
  volume?: string;
  quantity: number;
  rating: number[];
};

export type Product = BaseProduct & {
  descriptionKey?: string;
  instructionKey?: string;
  maintenanceKey?: string;
  noteKey?: string;
};

export type ProductDetail = {
  color: string;
  slug: string;
  price: number;
  pattern?: string;
  ingredient?: string;
  drink?: string;
  badge: {
    isNew?: boolean;
    discount?: number;
    isReward?: boolean;
    isBestseller?: boolean;
  };
};

export type ProductContent = {
  description?: React.ReactNode;
  instruction?: React.ReactNode;
  maintenance?: React.ReactNode;
  note?: React.ReactNode;
};

export type ProductWithContent = Product & ProductContent;

export type ImageData = {
  value?: string;
  label?: string;
  image: string;
  background?: string;
};
