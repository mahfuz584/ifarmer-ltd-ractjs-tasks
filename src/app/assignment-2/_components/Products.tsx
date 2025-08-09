import ProductDialogForm from "./DialogBox";
import Pagination from "./Pagination";
import { ProductTable } from "./ProductsTable";
import { Category, ProductListResponse } from "./types";

const DEFAULT_LIMIT = 10;

const Products = ({
  products,
  categories,
  totalLength,
}: {
  totalLength: number;
  products: ProductListResponse;
  categories: Category[];
}) => {
  return (
    <>
      <ProductDialogForm categories={categories} />
      <ProductTable products={products} categories={categories} />
      <Pagination defaultLimit={DEFAULT_LIMIT} totalItems={totalLength} />
    </>
  );
};

export default Products;
