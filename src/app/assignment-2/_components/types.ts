export type Category = {
  id: string;
  name: string;
  image: string;
  slug: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
};

export type ProductListResponse = Product[];

export type TotalLengthResponse = {
  totalLength: number;
};

export type PaginationProps = {
  totalItems: number;
  defaultLimit: number;
};

export type UpdateDialogBoxProps = {
  products: ProductListResponse;
  categories: Category[];
  productId: number;
  onClose: () => void;
};
