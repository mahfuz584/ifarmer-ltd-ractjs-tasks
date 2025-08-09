export type RequestBodyProduct = {
  title: string;
  price: number;
  description: string;
  categoryId: string;
  images: string[];
};

type Category = {
  id: number;
  name: string;
  image: string;
  slug: string;
};

export type ResponseProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  description: string;
  images: string[];
  category: Category;
  creationAt: string;
  updatedAt: string;
};

export type RetrieveProductPayload = Partial<
  Pick<ResponseProduct, "title" | "price">
>;
